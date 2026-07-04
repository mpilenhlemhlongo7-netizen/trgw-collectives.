(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero video: pause on prefers-reduced-motion, holding on the poster frame.
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo && reduceMotion) {
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
  }

  // Sticky nav state
  const nav = document.querySelector('.nav');
  const onScrollNav = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });

  // Scroll reveal via IntersectionObserver (lighter than a full GSAP ScrollTrigger dependency)
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Magnetic buttons
  if (!reduceMotion) {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.setProperty('--btn-tx', `${x * 0.18}px`);
        btn.style.setProperty('--btn-ty', `${y * 0.35}px`);
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--btn-tx', '0px');
        btn.style.setProperty('--btn-ty', '0px');
      });
    });
  }

  // Animated stat counters
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (reduceMotion) {
      el.textContent = target.toLocaleString();
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  };
  const counterIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterIo.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterIo.observe(el));

  // Contact form: enquiry category updates helper text
  const categorySelect = document.querySelector('#enquiry-type');
  const categoryHint = document.querySelector('#enquiry-hint');
  const categoryNotes = {
    general: 'General enquiries are read directly by the Sibani team.',
    publishing: 'Submission and publishing enquiries are reviewed personally.',
    media: 'Press and media requests are prioritised and answered within 48 hours.',
    partnerships: 'Corporate and institutional partnership proposals go to the founder directly.',
    speaking: 'Speaking and school programme requests are reviewed for calendar fit.',
    rights: 'Rights and licensing enquiries are handled with formal correspondence.',
    support: 'Support requests for existing readers or partners are actioned first.',
  };
  if (categorySelect && categoryHint) {
    categorySelect.addEventListener('change', () => {
      categoryHint.textContent = categoryNotes[categorySelect.value] || '';
    });
  }
})();
