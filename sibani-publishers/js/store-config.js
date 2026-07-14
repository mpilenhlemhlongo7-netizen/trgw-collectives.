// Sibani Publishers — store configuration.
// Prices are the two figures Melokuhle confirmed directly. Every field marked
// "ADD YOUR" is a real credential only he can supply — nothing here is invented.
window.SibaniStore = {
  currency: 'R',
  orderEmail: 'sibani.publishers@gmail.com',

  products: [
    {
      id: 'trgw-second-edition',
      title: 'Think Rich, Grow Wise',
      edition: 'Second Edition',
      price: 450,
      image: 'assets/images/book-cover-front.jpg',
      description: 'The complete flagship edition: 283 pages, 21 chapters across 6 Parts, teaching the Five Pocket Wealth System through story and principle.',
      meta: ['283 pages', '21 chapters · 6 parts', 'ISBN 978-1-83492-603-2'],
    },
    {
      id: 'trgw-first-edition',
      title: 'Think Rich, Grow Wise',
      edition: 'First Edition — A6 Print',
      price: 250,
      image: 'assets/images/book-cover-front.jpg',
      description: 'A compact, print-ready A6 edition of the original release — the same core teaching in a pocket-sized format.',
      meta: ['119 pages', 'A6 print format'],
    },
  ],

  // Fixed-price purchasable service, confirmed real by Melokuhle — unlike the
  // quote-only `services` below, this one is sold directly through the cart.
  packages: [
    {
      id: 'publishing-package-premium',
      title: 'Premium Publishing Package',
      edition: 'Full-Service Publishing',
      price: 15000,
      description: 'End-to-end publishing under the Sibani imprint, from manuscript to launch.',
      includes: ['Full manuscript editing', 'Cover design', 'ISBN registration & print coordination', 'Launch marketing support'],
    },
  ],

  services: [
    { key: 'publishing', title: 'Publishing Submissions', description: 'Manuscript review and publication under the Sibani imprint.' },
    { key: 'media', title: 'Media & Press', description: 'Interviews, coverage requests and press coordination.' },
    { key: 'partnerships', title: 'Corporate Partnerships', description: 'Bulk orders, sponsorships and institutional proposals.' },
    { key: 'speaking', title: 'Speaking & School Programmes', description: 'Book Melokuhle for a talk, workshop or school programme.' },
    { key: 'rights', title: 'Rights & Licensing', description: 'Translation, adaptation and licensing enquiries.' },
    { key: 'support', title: 'Reader & Partner Support', description: 'Support for existing readers, schools and partners.' },
  ],

  // ---- Payment configuration -------------------------------------------
  // PRIMARY, live today: direct-to-Capitec payment. No merchant sign-up,
  // no KYC wait — works immediately with Melokuhle's real account details.
  capitec: {
    accountHolder: 'Mr. Melokuhle M. Mhlongo',
    accountNumber: '2368365415',
    accountType: 'Savings Account',
    branchCode: '470010', // Capitec's universal branch code — same for every Capitec account
    payCellphone: '067 304 1992', // enables instant Capitec Pay by phone number
  },

  // SECONDARY, upgrade path: automated card / Instant EFT via PayFast, which
  // settles directly into any South African bank account including Capitec.
  // Requires Melokuhle to open a free merchant account at payfast.co.za —
  // that sign-up needs his own ID and banking details, so it can't be done
  // on his behalf. Fill in merchantId/merchantKey and set enabled: true to
  // switch checkout over to it; the redirect logic is already wired below.
  payfast: {
    enabled: false,
    merchantId: 'ADD YOUR PAYFAST MERCHANT ID',
    merchantKey: 'ADD YOUR PAYFAST MERCHANT KEY',
    processUrl: 'https://www.payfast.co.za/eng/process',
    returnUrl: 'https://sibanipublishers.com/checkout.html?status=success',
    cancelUrl: 'https://sibanipublishers.com/checkout.html?status=cancelled',
  },
};
