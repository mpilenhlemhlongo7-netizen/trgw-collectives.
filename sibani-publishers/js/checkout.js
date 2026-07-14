// Sibani Publishers — checkout flow. Static-site friendly: no backend, no
// server-side signature. Primary path is direct Capitec payment (works with
// zero third-party sign-up); PayFast is wired but disabled until a merchant
// account exists (see js/store-config.js).
(function () {
  const store = window.SibaniStore;
  const cart = window.SibaniCart;

  function renderSummary() {
    const items = cart.getItems();
    const linesEl = document.getElementById('summary-lines');
    const totalEl = document.getElementById('summary-total');
    const emptyNotice = document.getElementById('empty-cart-notice');
    const form = document.getElementById('checkout-form');

    if (items.length === 0) {
      linesEl.innerHTML = '';
      totalEl.textContent = cart.formatPrice(0);
      emptyNotice.classList.remove('hidden');
      form.classList.add('hidden');
      return false;
    }

    emptyNotice.classList.add('hidden');
    form.classList.remove('hidden');
    linesEl.innerHTML = items
      .map(
        (item) => `
      <div class="checkout-line">
        <span class="checkout-line-title">${item.product.title} &times; ${item.qty}<span class="checkout-line-edition">${item.product.edition}</span></span>
        <span>${cart.formatPrice(item.product.price * item.qty)}</span>
      </div>`
      )
      .join('');
    totalEl.textContent = cart.formatPrice(cart.getSubtotal());
    return true;
  }

  function generateReference() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `SIB-${y}${m}${d}-${rand}`;
  }

  function buildOrderText(reference, buyer, items, total) {
    const lines = items.map((i) => `  ${i.qty} x ${i.product.title} (${i.product.edition}) — ${cart.formatPrice(i.product.price * i.qty)}`).join('\n');
    return [
      `New Sibani order — ${reference}`,
      '',
      `Name: ${buyer.name}`,
      `Email: ${buyer.email}`,
      `Phone: ${buyer.phone}`,
      `Delivery address: ${buyer.address}`,
      buyer.notes ? `Notes: ${buyer.notes}` : null,
      '',
      'Items:',
      lines,
      '',
      `Total: ${cart.formatPrice(total)}`,
      `Payment method: Capitec Pay / Direct EFT`,
    ]
      .filter(Boolean)
      .join('\n');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const items = cart.getItems();
    if (items.length === 0) return;

    const buyer = {
      name: document.getElementById('full-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim(),
      notes: document.getElementById('notes').value.trim(),
    };
    const total = cart.getSubtotal();
    const reference = generateReference();

    document.getElementById('order-reference').textContent = reference;
    document.getElementById('capitec-holder').textContent = store.capitec.accountHolder;
    document.getElementById('capitec-account').textContent = store.capitec.accountNumber;
    document.getElementById('capitec-type').textContent = store.capitec.accountType || '—';
    document.getElementById('capitec-branch').textContent = store.capitec.branchCode;
    document.getElementById('capitec-amount').textContent = cart.formatPrice(total);
    document.getElementById('capitec-reference').textContent = reference;

    const cellRow = document.getElementById('capitec-cell-row');
    if (store.capitec.payCellphone && !store.capitec.payCellphone.startsWith('ADD YOUR')) {
      document.getElementById('capitec-cell').textContent = store.capitec.payCellphone;
      cellRow.classList.remove('hidden');
    } else {
      cellRow.classList.add('hidden');
    }

    const orderText = buildOrderText(reference, buyer, items, total);
    const subject = encodeURIComponent(`New Sibani Order — ${reference}`);
    const body = encodeURIComponent(orderText);
    document.getElementById('email-order-link').href = `mailto:${store.orderEmail}?subject=${subject}&body=${body}`;

    document.getElementById('checkout-form').classList.add('hidden');
    document.getElementById('checkout-summary').classList.add('hidden');
    document.getElementById('order-confirmation').classList.remove('hidden');

    cart.clear();
  }

  // ---- PayFast redirect (upgrade path, inactive until store-config enables it) ----
  function submitToPayFast(buyer, items, total) {
    const cfg = store.payfast;
    if (!cfg.enabled) return false;
    const itemName = items.map((i) => `${i.qty}x ${i.product.edition}`).join(', ').slice(0, 100);
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = cfg.processUrl;
    const fields = {
      merchant_id: cfg.merchantId,
      merchant_key: cfg.merchantKey,
      return_url: cfg.returnUrl,
      cancel_url: cfg.cancelUrl,
      name_first: buyer.name,
      email_address: buyer.email,
      m_payment_id: generateReference(),
      amount: total.toFixed(2),
      item_name: itemName || 'Sibani Publishers order',
    };
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    return true;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    document.getElementById('checkout-form')?.addEventListener('submit', handleSubmit);

    // Re-render summary if the cart changes in another tab/page.
    window.addEventListener('storage', renderSummary);
  });

  window.SibaniCheckout = { submitToPayFast };
})();
