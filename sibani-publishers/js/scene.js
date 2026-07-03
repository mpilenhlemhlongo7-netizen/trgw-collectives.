/*
  Sibani Publishers — cinematic hero scene.
  Symbolic 3D environment: a road receding toward a distant skyline under a
  sunrise gradient, dust particles, drifting birds, and gentle parallax.
  No literal human figure is rendered here (see README for why).
*/
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const heroEl = document.querySelector('.hero');
const canvas = document.querySelector('.hero-canvas');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initScene() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  } catch (e) {
    heroEl.classList.add('no-webgl');
    return;
  }
  if (!renderer) {
    heroEl.classList.add('no-webgl');
    return;
  }

  const scene = new THREE.Scene();

  // Sky gradient: warm township dawn low on the horizon, cooling to navy above.
  const skyCanvas = document.createElement('canvas');
  skyCanvas.width = 2; skyCanvas.height = 512;
  const ctx = skyCanvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#0F1E3D');
  grad.addColorStop(0.45, '#1A2E5A');
  grad.addColorStop(0.72, '#8a5a3a');
  grad.addColorStop(1, '#e8a860');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2, 512);
  const skyTexture = new THREE.CanvasTexture(skyCanvas);
  scene.background = skyTexture;

  const fogColor = new THREE.Color('#4a3a2e');
  scene.fog = new THREE.FogExp2(fogColor.getHex(), 0.028);

  const camera = new THREE.PerspectiveCamera(55, heroEl.clientWidth / heroEl.clientHeight, 0.1, 200);
  camera.position.set(0, 1.7, 8);
  camera.lookAt(0, 1.2, -40);

  function resize() {
    const w = heroEl.clientWidth, h = heroEl.clientHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();

  // Sunrise light
  const sunLight = new THREE.DirectionalLight(0xffcf8a, 1.6);
  sunLight.position.set(-4, 3, -30);
  scene.add(sunLight);
  const ambient = new THREE.AmbientLight(0x2a3a5c, 0.9);
  scene.add(ambient);

  // Sun glow sprite
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = glowCanvas.height = 256;
  const gctx = glowCanvas.getContext('2d');
  const rg = gctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  rg.addColorStop(0, 'rgba(255, 220, 160, 0.95)');
  rg.addColorStop(0.4, 'rgba(255, 190, 110, 0.5)');
  rg.addColorStop(1, 'rgba(255, 190, 110, 0)');
  gctx.fillStyle = rg;
  gctx.fillRect(0, 0, 256, 256);
  const sunTexture = new THREE.CanvasTexture(glowCanvas);
  const sunMat = new THREE.SpriteMaterial({ map: sunTexture, transparent: true, depthWrite: false });
  const sun = new THREE.Sprite(sunMat);
  sun.scale.set(22, 22, 1);
  sun.position.set(-4, 4.5, -55);
  scene.add(sun);

  // Road: receding plane with a dashed centre line
  const roadGeo = new THREE.PlaneGeometry(9, 160, 1, 40);
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x2b2f38, roughness: 0.95 });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, -70);
  scene.add(road);

  const lineGeo = new THREE.PlaneGeometry(0.18, 160);
  const lineCanvas = document.createElement('canvas');
  lineCanvas.width = 4; lineCanvas.height = 256;
  const lctx = lineCanvas.getContext('2d');
  lctx.fillStyle = '#000';
  lctx.fillRect(0, 0, 4, 256);
  lctx.fillStyle = '#d8c48a';
  for (let i = 0; i < 256; i += 32) lctx.fillRect(0, i, 4, 16);
  const lineTexture = new THREE.CanvasTexture(lineCanvas);
  lineTexture.wrapS = lineTexture.wrapT = THREE.RepeatWrapping;
  lineTexture.repeat.set(1, 20);
  const lineMat = new THREE.MeshBasicMaterial({ map: lineTexture, transparent: true });
  const centreLine = new THREE.Mesh(lineGeo, lineMat);
  centreLine.rotation.x = -Math.PI / 2;
  centreLine.position.set(0, 0.01, -70);
  scene.add(centreLine);

  // Ground either side, warmer near camera (township tone) cooling toward the city
  const groundGeo = new THREE.PlaneGeometry(60, 160);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x3a2f22, roughness: 1 });
  [-1, 1].forEach((side) => {
    const g = new THREE.Mesh(groundGeo, groundMat);
    g.rotation.x = -Math.PI / 2;
    g.position.set(side * 34, -0.02, -70);
    scene.add(g);
  });

  // Skyline silhouette, further down the road
  const skylineGroup = new THREE.Group();
  const buildingMat = new THREE.MeshStandardMaterial({ color: 0x0c1730, roughness: 0.8 });
  const windowMat = new THREE.MeshBasicMaterial({ color: 0xffdca0 });
  const buildingCount = 26;
  for (let i = 0; i < buildingCount; i++) {
    const w = 1.4 + Math.random() * 2.2;
    const h = 4 + Math.random() * 16;
    const d = 1.4 + Math.random() * 2.2;
    const geo = new THREE.BoxGeometry(w, h, d);
    const b = new THREE.Mesh(geo, buildingMat);
    const spread = 46;
    b.position.set((Math.random() - 0.5) * spread, h / 2, -95 - Math.random() * 30);
    skylineGroup.add(b);

    if (Math.random() > 0.3) {
      const winCount = Math.floor(h);
      const winGeo = new THREE.PlaneGeometry(0.12, 0.12);
      for (let j = 0; j < winCount; j++) {
        if (Math.random() > 0.55) continue;
        const win = new THREE.Mesh(winGeo, windowMat);
        win.position.set(
          b.position.x + (Math.random() - 0.5) * w * 0.7,
          Math.random() * h,
          b.position.z + d / 2 + 0.01
        );
        skylineGroup.add(win);
      }
    }
  }
  scene.add(skylineGroup);

  // Dust particles
  const particleCount = 220;
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = Math.random() * 8;
    positions[i * 3 + 2] = -Math.random() * 90;
    speeds[i] = 0.15 + Math.random() * 0.35;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xffe3b0, size: 0.06, transparent: true, opacity: 0.55, depthWrite: false,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Birds: small chevron sprites drifting across the sky
  const birdCanvas = document.createElement('canvas');
  birdCanvas.width = birdCanvas.height = 32;
  const bctx = birdCanvas.getContext('2d');
  bctx.strokeStyle = '#1a1512';
  bctx.lineWidth = 2.5;
  bctx.beginPath();
  bctx.moveTo(2, 10); bctx.quadraticCurveTo(16, 22, 16, 10);
  bctx.quadraticCurveTo(16, 22, 30, 10);
  bctx.stroke();
  const birdTexture = new THREE.CanvasTexture(birdCanvas);
  const birdMat = new THREE.SpriteMaterial({ map: birdTexture, transparent: true, opacity: 0.75 });
  const birds = [];
  const birdCount = 6;
  for (let i = 0; i < birdCount; i++) {
    const bird = new THREE.Sprite(birdMat);
    bird.scale.set(0.9, 0.5, 1);
    bird.position.set(-20 - Math.random() * 10, 5 + Math.random() * 4, -30 - Math.random() * 40);
    bird.userData.speed = 0.6 + Math.random() * 0.5;
    bird.userData.bob = Math.random() * Math.PI * 2;
    scene.add(bird);
    birds.push(bird);
  }

  // Interaction state
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let scrollProgress = 0;

  function onMouseMove(e) {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function onScroll() {
    const heroHeight = heroEl.offsetHeight;
    scrollProgress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
  }

  if (!reduceMotion) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();

  function render() {
    const t = clock.getElapsedTime();

    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    camera.position.x = mouseX * 0.6;
    camera.position.y = 1.7 - mouseY * 0.25 - scrollProgress * 0.4;
    camera.position.z = 8 - scrollProgress * 14;
    camera.lookAt(mouseX * 2, 1.2, -40);

    sun.position.y = 4.5 + Math.sin(t * 0.15) * 0.15;
    sunMat.opacity = 0.85 + Math.sin(t * 0.3) * 0.1;

    const posAttr = particleGeo.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      posAttr.array[i * 3 + 1] += speeds[i] * 0.01;
      posAttr.array[i * 3] += Math.sin(t * 0.5 + i) * 0.002;
      if (posAttr.array[i * 3 + 1] > 8) posAttr.array[i * 3 + 1] = 0;
    }
    posAttr.needsUpdate = true;

    birds.forEach((bird) => {
      bird.position.x += bird.userData.speed * 0.03;
      bird.position.y += Math.sin(t * 2 + bird.userData.bob) * 0.004;
      if (bird.position.x > 25) bird.position.x = -25;
    });

    renderer.render(scene, camera);
  }

  if (reduceMotion) {
    render();
    return;
  }

  function loop() {
    render();
    requestAnimationFrame(loop);
  }
  loop();
}

if (canvas && heroEl) {
  try {
    initScene();
  } catch (err) {
    heroEl.classList.add('no-webgl');
  }
}
