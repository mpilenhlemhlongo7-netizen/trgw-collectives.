// Sibani Publishers — cart engine. Shared across index.html, shop.html and
// checkout.html via localStorage, so the cart persists as a visitor browses.
(function () {
  const STORAGE_KEY = 'sibani-cart-v1';
  const store = window.SibaniStore;

  function readCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderAll();
  }

  function findProduct(id) {
    return [...store.products, ...(store.packages || [])].find((p) => p.id === id);
  }

  function getItems() {
    const cart = readCart();
    return Object.keys(cart)
      .map((id) => ({ product: findProduct(id), qty: cart[id] }))
      .filter((item) => item.product && item.qty > 0);
  }

  function getSubtotal() {
    return getItems().reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }

  function getCount() {
    return getItems().reduce((sum, item) => sum + item.qty, 0);
  }

  function add(id, qty) {
    const cart = readCart();
    cart[id] = (cart[id] || 0) + (qty || 1);
    writeCart(cart);
  }

  function setQty(id, qty) {
    const cart = readCart();
    if (qty <= 0) delete cart[id];
    else cart[id] = qty;
    writeCart(cart);
  }

  function remove(id) {
    const cart = readCart();
    delete cart[id];
    writeCart(cart);
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
    renderAll();
  }

  function formatPrice(amount) {
    return `${store.currency}${amount.toLocaleString('en-ZA')}`;
  }

  // ---- Drawer rendering ---------------------------------------------------

  function ensureDrawer() {
    if (document.getElementById('cart-drawer')) return;
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" aria-hidden="true">
        <div class="cart-drawer-backdrop" data-cart-close></div>
        <div class="cart-drawer-panel">
          <div class="cart-drawer-header">
            <h3>Your Cart</h3>
            <button class="cart-drawer-close" data-cart-close aria-label="Close cart">&times;</button>
          </div>
          <div class="cart-drawer-items" id="cart-drawer-items"></div>
          <div class="cart-drawer-footer">
            <div class="cart-subtotal"><span>Subtotal</span><span id="cart-subtotal">R0</span></div>
            <p class="cart-delivery-note">Delivery or collection is arranged directly with Sibani after your order is placed.</p>
            <a href="checkout.html" class="btn btn-primary cart-checkout-btn" id="cart-checkout-btn">Proceed to Checkout</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(div.firstElementChild);
  }

  function renderDrawerItems() {
    const container = document.getElementById('cart-drawer-items');
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (!container) return;
    const items = getItems();
    if (items.length === 0) {
      container.innerHTML = '<p class="cart-empty">Your cart is empty. Visit the <a href="shop.html">Shop</a> to add a title.</p>';
      if (checkoutBtn) checkoutBtn.classList.add('is-disabled');
      if (checkoutBtn) checkoutBtn.setAttribute('aria-disabled', 'true');
      if (checkoutBtn) checkoutBtn.addEventListener('click', preventIfEmpty);
    } else {
      container.innerHTML = items
        .map(
          (item) => `
        <div class="cart-line" data-id="${item.product.id}">
          ${item.product.image ? `<img src="${item.product.image}" alt="" class="cart-line-image">` : '<span class="cart-line-image cart-line-image--placeholder" aria-hidden="true"></span>'}
          <div class="cart-line-info">
            <span class="cart-line-title">${item.product.title}</span>
            <span class="cart-line-edition">${item.product.edition}</span>
            <div class="cart-line-controls">
              <button class="cart-qty-btn" data-action="dec" aria-label="Decrease quantity">&minus;</button>
              <span class="cart-qty" aria-label="Quantity">${item.qty}</span>
              <button class="cart-qty-btn" data-action="inc" aria-label="Increase quantity">+</button>
              <button class="cart-line-remove" data-action="remove" aria-label="Remove ${item.product.title}">Remove</button>
            </div>
          </div>
          <span class="cart-line-price">${formatPrice(item.product.price * item.qty)}</span>
        </div>`
        )
        .join('');
      if (checkoutBtn) checkoutBtn.classList.remove('is-disabled');
      if (checkoutBtn) checkoutBtn.removeAttribute('aria-disabled');
    }
    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) subtotalEl.textContent = formatPrice(getSubtotal());
  }

  function preventIfEmpty(e) {
    if (getItems().length === 0) e.preventDefault();
  }

  function renderBadge() {
    document.querySelectorAll('.cart-count').forEach((el) => {
      const count = getCount();
      el.textContent = String(count);
      el.classList.toggle('is-visible', count > 0);
    });
  }

  function renderAll() {
    renderDrawerItems();
    renderBadge();
  }

  function openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-drawer-locked');
  }

  function closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-drawer-locked');
  }

  // ---- Event wiring --------------------------------------------------------

  document.addEventListener('DOMContentLoaded', () => {
    ensureDrawer();
    renderAll();

    document.getElementById('cart-toggle')?.addEventListener('click', openDrawer);
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cart-close]')) closeDrawer();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });

    // Add-to-cart buttons anywhere on the page (index.html + shop.html)
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        const id = addBtn.getAttribute('data-add-to-cart');
        const qtyInput = addBtn.closest('.purchase-option, .product-card')?.querySelector('[data-qty-input]');
        const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
        add(id, qty);
        openDrawer();
        return;
      }
      const qtyBtn = e.target.closest('[data-qty-step]');
      if (qtyBtn) {
        const wrap = qtyBtn.closest('.qty-stepper');
        const input = wrap?.querySelector('[data-qty-input]');
        if (input) {
          const dir = qtyBtn.getAttribute('data-qty-step') === 'inc' ? 1 : -1;
          input.value = Math.max(1, parseInt(input.value, 10) + dir);
        }
        return;
      }
      const cartLineBtn = e.target.closest('.cart-line [data-action]');
      if (cartLineBtn) {
        const line = cartLineBtn.closest('.cart-line');
        const id = line.getAttribute('data-id');
        const action = cartLineBtn.getAttribute('data-action');
        const currentQty = getItems().find((i) => i.product.id === id)?.qty || 0;
        if (action === 'inc') setQty(id, currentQty + 1);
        if (action === 'dec') setQty(id, currentQty - 1);
        if (action === 'remove') remove(id);
      }
    });
  });

  window.SibaniCart = { add, remove, setQty, clear, getItems, getSubtotal, getCount, formatPrice, openDrawer, closeDrawer };
})();
