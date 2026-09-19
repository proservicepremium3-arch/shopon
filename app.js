/**
 * PRO SERVICE PREMIUM - Store Logic (No Price Version)
 * Handles Rendering (List/Grid), Search, Filter, Cart, Modals & Telegram Checkout
 */

// Application State
const state = {
  products: typeof productsData !== 'undefined' ? productsData : [],
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  currentView: 'grid', // Default: Grid View as requested
  currentLang: 'km', // 'km' or 'en'
  cart: [],
  selectedProduct: null,
  selectedPlanIndex: 0,
  // AI Image Generator State
  selectedAiStyle: 'photorealistic',
  selectedAiRatio: '1:1',
  currentAiPrompt: '',
  currentAiImageUrl: '',
  isGeneratingAiImage: false,
  // Media Downloader State
  selectedMediaFormat: 'video', // 'video' or 'audio'
  detectedMediaPlatform: null
};

// DOM Element Selectors
const DOM = {
  productsContainer: document.getElementById('productsContainer'),
  categoryTabs: document.getElementById('categoryTabs'),
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  sortSelect: document.getElementById('sortSelect'),
  resultsCount: document.getElementById('resultsCount'),
  emptyState: document.getElementById('emptyState'),
  resetFilterBtn: document.getElementById('resetFilterBtn'),
  listViewBtn: document.getElementById('listViewBtn'),
  gridViewBtn: document.getElementById('gridViewBtn'),
  langToggleBtn: document.getElementById('langToggleBtn'),
  currentLangLabel: document.getElementById('currentLangLabel'),
  cartTriggerBtn: document.getElementById('cartTriggerBtn'),
  cartCountBadge: document.getElementById('cartCountBadge'),
  cartDrawerOverlay: document.getElementById('cartDrawerOverlay'),
  closeCartBtn: document.getElementById('closeCartBtn'),
  cartDrawerItems: document.getElementById('cartDrawerItems'),
  cartTotalItems: document.getElementById('cartTotalItems'),
  cartHeaderCount: document.getElementById('cartHeaderCount'),
  openCheckoutBtn: document.getElementById('openCheckoutBtn'),
  clearCartBtn: document.getElementById('clearCartBtn'),
  productDetailModal: document.getElementById('productDetailModal'),
  closeDetailModalBtn: document.getElementById('closeDetailModalBtn'),
  detailModalBody: document.getElementById('detailModalBody'),
  checkoutModal: document.getElementById('checkoutModal'),
  closeCheckoutModalBtn: document.getElementById('closeCheckoutModalBtn'),
  checkoutItemsList: document.getElementById('checkoutItemsList'),
  checkoutTotalCount: document.getElementById('checkoutTotalCount'),
  orderForm: document.getElementById('orderForm'),
  imageLightboxModal: document.getElementById('imageLightboxModal'),
  lightboxImg: document.getElementById('lightboxImg'),
  lightboxCaption: document.getElementById('lightboxCaption'),
  lightboxCloseBtn: document.getElementById('lightboxCloseBtn'),
  toastContainer: document.getElementById('toastContainer'),
  siteHeader: document.getElementById('siteHeader'),
  open2faBtn: document.getElementById('open2faBtn'),
  hero2faBtn: document.getElementById('hero2faBtn'),
  twoFactorModal: document.getElementById('twoFactorModal'),
  close2faModalBtn: document.getElementById('close2faModalBtn'),
  twoFactorSecretInput: document.getElementById('twoFactorSecretInput'),
  twoFactorPasteBtn: document.getElementById('twoFactorPasteBtn'),
  twoFactorClearBtn: document.getElementById('twoFactorClearBtn'),
  sampleKeyBtn: document.getElementById('sampleKeyBtn'),
  twoFactorGenerateBtn: document.getElementById('twoFactorGenerateBtn'),
  twoFactorResultCard: document.getElementById('twoFactorResultCard'),
  twoFactorSecondsLeft: document.getElementById('twoFactorSecondsLeft'),
  twoFactorTimerPath: document.getElementById('twoFactorTimerPath'),
  twoFactorCodeDisplay: document.getElementById('twoFactorCodeDisplay'),
  twoFactorCodeBox: document.getElementById('twoFactorCodeBox'),
  twoFactorCopyBtn: document.getElementById('twoFactorCopyBtn'),
  twoFactorCopyLabel: document.getElementById('twoFactorCopyLabel'),
  // AI Image Generator Elements
  heroAiImageBtn: document.getElementById('heroAiImageBtn'),
  aiImageModal: document.getElementById('aiImageModal'),
  closeAiImageModalBtn: document.getElementById('closeAiImageModalBtn'),
  aiPromptInput: document.getElementById('aiPromptInput'),
  samplePromptBtn: document.getElementById('samplePromptBtn'),
  clearAiPromptBtn: document.getElementById('clearAiPromptBtn'),
  generateAiImageBtn: document.getElementById('generateAiImageBtn'),
  aiBtnText: document.getElementById('aiBtnText'),
  aiBtnSpinner: document.getElementById('aiBtnSpinner'),
  aiImageLoadingBox: document.getElementById('aiImageLoadingBox'),
  aiImageResultCard: document.getElementById('aiImageResultCard'),
  aiResultImg: document.getElementById('aiResultImg'),
  aiResultAspect: document.getElementById('aiResultAspect'),
  downloadAiImgBtn: document.getElementById('downloadAiImgBtn'),
  regenerateAiImgBtn: document.getElementById('regenerateAiImgBtn'),
  copyPromptBtn: document.getElementById('copyPromptBtn'),
  // Media Downloader Elements
  heroDownloaderBtn: document.getElementById('heroDownloaderBtn'),
  mediaDownloaderModal: document.getElementById('mediaDownloaderModal'),
  closeMediaModalBtn: document.getElementById('closeMediaModalBtn'),
  mediaUrlInput: document.getElementById('mediaUrlInput'),
  pasteMediaUrlBtn: document.getElementById('pasteMediaUrlBtn'),
  clearMediaUrlBtn: document.getElementById('clearMediaUrlBtn'),
  sampleMediaLinkBtn: document.getElementById('sampleMediaLinkBtn'),
  detectedPlatformBadge: document.getElementById('detectedPlatformBadge'),
  detectedPlatformText: document.getElementById('detectedPlatformText'),
  mediaUrlIcon: document.getElementById('mediaUrlIcon'),
  formatVideoBtn: document.getElementById('formatVideoBtn'),
  formatAudioBtn: document.getElementById('formatAudioBtn'),
  startDownloadMediaBtn: document.getElementById('startDownloadMediaBtn'),
  downloadBtnText: document.getElementById('downloadBtnText'),
  serverFastBtn: document.getElementById('serverFastBtn'),
  serverHdBtn: document.getElementById('serverHdBtn'),
  serverMp3Btn: document.getElementById('serverMp3Btn'),
  mediaLoadingBox: document.getElementById('mediaLoadingBox'),
  mediaResultCard: document.getElementById('mediaResultCard'),
  mediaThumbWrap: document.getElementById('mediaThumbWrap'),
  mediaResultThumbnail: document.getElementById('mediaResultThumbnail'),
  mediaDefaultThumbIcon: document.getElementById('mediaDefaultThumbIcon'),
  mediaPlatformTag: document.getElementById('mediaPlatformTag'),
  mediaResultTitle: document.getElementById('mediaResultTitle'),
  mediaResultUrlText: document.getElementById('mediaResultUrlText'),
  mediaActionButtonsList: document.getElementById('mediaActionButtonsList')
};

// Language Dictionary for Dynamic Elements
const i18n = {
  km: {
    langBtn: "🇰🇭 KH",
    all: "ទាំងអស់ (All)",
    orderNow: "កម្ម៉ង់ទិញ",
    addToCart: "ដាក់ចូលកន្ត្រក",
    details: "មើលលម្អិត",
    plan: "កញ្ចប់",
    warranty: "ការធានា",
    addedToCart: "បានបន្ថែមចូលកន្ត្រក!",
    emptyCart: "មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយទេ",
    viewList: "បញ្ជី (List)",
    viewGrid: "ក្រឡា (Grid)",
    cartTitle: "កន្ត្រកទំនិញរបស់អ្នក",
    checkoutBtn: "បន្តទៅការបញ្ជាក់កម្ម៉ង់ & ផ្ញើទៅ Admin"
  },
  en: {
    langBtn: "🇬🇧 EN",
    all: "All Products",
    orderNow: "Order Now",
    addToCart: "Add to Cart",
    details: "View Details",
    plan: "Plan",
    warranty: "Warranty",
    addedToCart: "Added to cart!",
    emptyCart: "Your cart is currently empty",
    viewList: "List View",
    viewGrid: "Grid View",
    cartTitle: "Your Shopping Cart",
    checkoutBtn: "Proceed to Order"
  }
};

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  updateCategoryCounts();
  renderProducts();
  setupEventListeners();
  updateCartUI();
});

/* ==========================================================================
   LOCAL STORAGE FOR CART
   ========================================================================== */
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('proservice_cart');
    if (saved) {
      state.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load cart from storage', e);
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('proservice_cart', JSON.stringify(state.cart));
  } catch (e) {
    console.error('Failed to save cart', e);
  }
}

/* ==========================================================================
   EVENT LISTENERS SETUP
   ========================================================================== */
function setupEventListeners() {
  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      DOM.siteHeader.classList.add('scrolled');
    } else {
      DOM.siteHeader.classList.remove('scrolled');
    }
  });

  // Search Input
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    DOM.clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
    renderProducts();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    DOM.clearSearchBtn.style.display = 'none';
    DOM.searchInput.focus();
    renderProducts();
  });

  // Category Tabs
  DOM.categoryTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-pill');
    if (!btn) return;

    document.querySelectorAll('.cat-pill').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');

    state.currentCategory = btn.dataset.category;
    renderProducts();
  });

  // Reset Filter Button on Empty State
  DOM.resetFilterBtn.addEventListener('click', () => {
    state.searchQuery = '';
    DOM.searchInput.value = '';
    DOM.clearSearchBtn.style.display = 'none';
    state.currentCategory = 'all';
    document.querySelectorAll('.cat-pill').forEach(el => {
      el.classList.toggle('active', el.dataset.category === 'all');
    });
    renderProducts();
  });

  // Sort Select
  DOM.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // View Switcher (if present)
  if (DOM.listViewBtn) DOM.listViewBtn.addEventListener('click', () => toggleView('list'));
  if (DOM.gridViewBtn) DOM.gridViewBtn.addEventListener('click', () => toggleView('grid'));

  // Language Switcher
  DOM.langToggleBtn.addEventListener('click', () => {
    state.currentLang = state.currentLang === 'km' ? 'en' : 'km';
    DOM.currentLangLabel.textContent = i18n[state.currentLang].langBtn;
    renderProducts();
    updateCartUI();
  });

  // Cart Open & Close
  DOM.cartTriggerBtn.addEventListener('click', openCart);
  DOM.closeCartBtn.addEventListener('click', closeCart);
  DOM.cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.cartDrawerOverlay) closeCart();
  });

  // Clear Cart
  DOM.clearCartBtn.addEventListener('click', () => {
    if (state.cart.length === 0) return;
    if (confirm('តើអ្នកពិតជាចង់សម្អាតកន្ត្រកទំនិញមែនទេ? / Clear all items?')) {
      state.cart = [];
      saveCartToStorage();
      updateCartUI();
      showToast('កន្ត្រកទំនិញត្រូវបានសម្អាត!');
    }
  });

  // Checkout Modal
  DOM.openCheckoutBtn.addEventListener('click', openCheckout);
  DOM.closeCheckoutModalBtn.addEventListener('click', closeCheckout);
  DOM.checkoutModal.addEventListener('click', (e) => {
    if (e.target === DOM.checkoutModal) closeCheckout();
  });

  // Detail Modal
  DOM.closeDetailModalBtn.addEventListener('click', closeDetailModal);
  DOM.productDetailModal.addEventListener('click', (e) => {
    if (e.target === DOM.productDetailModal) closeDetailModal();
  });

  // Lightbox Close
  DOM.lightboxCloseBtn.addEventListener('click', closeLightbox);
  DOM.imageLightboxModal.addEventListener('click', (e) => {
    if (e.target === DOM.imageLightboxModal) closeLightbox();
  });

  // Payment Options change
  document.querySelectorAll('input[name="payMethod"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.pay-option').forEach(el => el.classList.remove('selected'));
      e.target.closest('.pay-option').classList.add('selected');
      const khqrBox = document.getElementById('khqrPreview');
      if (khqrBox) {
        khqrBox.style.display = e.target.value === 'KHQR' ? 'block' : 'none';
      }
    });
  });

  // 2FA Code Generator Modal
  if (DOM.open2faBtn) DOM.open2faBtn.addEventListener('click', openTwoFactorModal);
  if (DOM.hero2faBtn) DOM.hero2faBtn.addEventListener('click', openTwoFactorModal);
  if (DOM.close2faModalBtn) DOM.close2faModalBtn.addEventListener('click', closeTwoFactorModal);
  if (DOM.twoFactorModal) {
    DOM.twoFactorModal.addEventListener('click', (e) => {
      if (e.target === DOM.twoFactorModal) closeTwoFactorModal();
    });
  }
  if (DOM.twoFactorPasteBtn) DOM.twoFactorPasteBtn.addEventListener('click', pasteTwoFactorKey);
  if (DOM.twoFactorClearBtn) DOM.twoFactorClearBtn.addEventListener('click', clearTwoFactorInput);
  if (DOM.sampleKeyBtn) DOM.sampleKeyBtn.addEventListener('click', fillSample2faKey);
  if (DOM.twoFactorGenerateBtn) DOM.twoFactorGenerateBtn.addEventListener('click', generate2fa);
  if (DOM.twoFactorSecretInput) {
    DOM.twoFactorSecretInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') generate2fa();
    });
    DOM.twoFactorSecretInput.addEventListener('input', () => {
      if (DOM.twoFactorClearBtn) {
        DOM.twoFactorClearBtn.style.display = DOM.twoFactorSecretInput.value.trim() ? 'flex' : 'none';
      }
    });
  }
  if (DOM.twoFactorCopyBtn) DOM.twoFactorCopyBtn.addEventListener('click', copyTwoFactorCode);
  if (DOM.twoFactorCodeBox) DOM.twoFactorCodeBox.addEventListener('click', copyTwoFactorCode);

  // AI Image Generator Modal Listeners
  if (DOM.heroAiImageBtn) DOM.heroAiImageBtn.addEventListener('click', openAiImageModal);
  if (DOM.closeAiImageModalBtn) DOM.closeAiImageModalBtn.addEventListener('click', closeAiImageModal);
  if (DOM.aiImageModal) {
    DOM.aiImageModal.addEventListener('click', (e) => {
      if (e.target === DOM.aiImageModal) closeAiImageModal();
    });
  }
  if (DOM.samplePromptBtn) DOM.samplePromptBtn.addEventListener('click', setSampleAiPrompt);
  if (DOM.clearAiPromptBtn) DOM.clearAiPromptBtn.addEventListener('click', clearAiPrompt);
  if (DOM.generateAiImageBtn) DOM.generateAiImageBtn.addEventListener('click', () => generateAiImage(false));
  if (DOM.regenerateAiImgBtn) DOM.regenerateAiImgBtn.addEventListener('click', () => generateAiImage(true));
  if (DOM.downloadAiImgBtn) DOM.downloadAiImgBtn.addEventListener('click', downloadAiImage);
  if (DOM.copyPromptBtn) DOM.copyPromptBtn.addEventListener('click', copyAiPrompt);
  if (DOM.aiResultImg) DOM.aiResultImg.addEventListener('click', openAiImageLightbox);

  if (DOM.aiPromptInput) {
    DOM.aiPromptInput.addEventListener('input', () => {
      if (DOM.clearAiPromptBtn) {
        DOM.clearAiPromptBtn.style.display = DOM.aiPromptInput.value.trim() ? 'flex' : 'none';
      }
    });
    DOM.aiPromptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        generateAiImage(false);
      }
    });
  }

  // AI Style pills selection
  document.querySelectorAll('#aiStylePills .style-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#aiStylePills .style-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedAiStyle = btn.dataset.style || 'photorealistic';
    });
  });

  // AI Ratio buttons selection
  document.querySelectorAll('#aiRatioGroup .ratio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#aiRatioGroup .ratio-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedAiRatio = btn.dataset.ratio || '1:1';
      if (DOM.aiResultAspect) DOM.aiResultAspect.textContent = state.selectedAiRatio;
    });
  });

  // Media Downloader Modal Listeners
  if (DOM.heroDownloaderBtn) DOM.heroDownloaderBtn.addEventListener('click', openMediaDownloaderModal);
  if (DOM.closeMediaModalBtn) DOM.closeMediaModalBtn.addEventListener('click', closeMediaDownloaderModal);
  if (DOM.mediaDownloaderModal) {
    DOM.mediaDownloaderModal.addEventListener('click', (e) => {
      if (e.target === DOM.mediaDownloaderModal) closeMediaDownloaderModal();
    });
  }
  if (DOM.sampleMediaLinkBtn) DOM.sampleMediaLinkBtn.addEventListener('click', setSampleMediaLink);
  if (DOM.pasteMediaUrlBtn) DOM.pasteMediaUrlBtn.addEventListener('click', pasteMediaUrl);
  if (DOM.clearMediaUrlBtn) DOM.clearMediaUrlBtn.addEventListener('click', clearMediaUrl);
  if (DOM.formatVideoBtn) DOM.formatVideoBtn.addEventListener('click', () => selectMediaFormat('video'));
  if (DOM.formatAudioBtn) DOM.formatAudioBtn.addEventListener('click', () => selectMediaFormat('audio'));
  if (DOM.startDownloadMediaBtn) DOM.startDownloadMediaBtn.addEventListener('click', handleMediaDownload);
  if (DOM.serverFastBtn) DOM.serverFastBtn.addEventListener('click', () => openServerDownload('server1'));
  if (DOM.serverHdBtn) DOM.serverHdBtn.addEventListener('click', () => openServerDownload('server2'));
  if (DOM.serverMp3Btn) DOM.serverMp3Btn.addEventListener('click', () => openServerDownload('mp3'));

  if (DOM.mediaUrlInput) {
    DOM.mediaUrlInput.addEventListener('input', onMediaUrlChange);
    DOM.mediaUrlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleMediaDownload();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeCart();
      closeCheckout();
      closeLightbox();
      closeTwoFactorModal();
      closeAiImageModal();
      closeMediaDownloaderModal();
    }
  });
}

/* ==========================================================================
   VIEW SWITCHER: LIST VS GRID
   ========================================================================== */
function toggleView(view) {
  state.currentView = view;
  if (DOM.listViewBtn) DOM.listViewBtn.classList.toggle('active', view === 'list');
  if (DOM.gridViewBtn) DOM.gridViewBtn.classList.toggle('active', view === 'grid');

  DOM.productsContainer.classList.remove('view-list', 'view-grid');
  DOM.productsContainer.classList.add(`view-${view}`);

  renderProducts();
}

/* ==========================================================================
   CATEGORY COUNTS
   ========================================================================== */
function updateCategoryCounts() {
  const counts = { all: state.products.length };
  state.products.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  for (const [cat, count] of Object.entries(counts)) {
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = count;
  }
}

/* ==========================================================================
   PRODUCT FILTERING & SORTING
   ========================================================================== */
function getFilteredProducts() {
  let list = [...state.products];

  // Category filter
  if (state.currentCategory !== 'all') {
    list = list.filter(p => p.category === state.currentCategory);
  }

  // Search filter
  if (state.searchQuery) {
    const q = state.searchQuery;
    list = list.filter(p => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.titleKh.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    });
  }

  // Sorting
  switch (state.sortBy) {
    case 'rating':
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    case 'name-asc':
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'featured':
    default:
      // default list order
      break;
  }

  return list;
}

/* ==========================================================================
   RENDER PRODUCTS (LIST & GRID)
   ========================================================================== */
function renderProducts() {
  const filtered = getFilteredProducts();
  DOM.resultsCount.textContent = filtered.length;

  if (filtered.length === 0) {
    DOM.productsContainer.innerHTML = '';
    DOM.emptyState.style.display = 'block';
    return;
  }

  DOM.emptyState.style.display = 'none';

  if (state.currentView === 'list') {
    DOM.productsContainer.innerHTML = filtered.map(product => renderListItemHTML(product)).join('');
  } else {
    DOM.productsContainer.innerHTML = filtered.map(product => renderGridItemHTML(product)).join('');
  }
}

/* ==========================================================================
   LIST VIEW ITEM HTML (User's Primary Request - No Price)
   ========================================================================== */
function renderListItemHTML(product) {
  const isKh = state.currentLang === 'km';
  const displayTitle = isKh ? product.titleKh : product.title;
  const displayCat = isKh ? product.categoryKh : product.category.toUpperCase();

  // Generate plans dropdown options
  const planOptionsHTML = product.plans.map((plan, idx) => {
    return `<option value="${idx}">${escapeHTML(plan.name)}</option>`;
  }).join('');

  // Top feature pills
  const featurePillsHTML = product.tags.slice(0, 3).map(tag => {
    return `<span class="feat-tag"><span class="check">✓</span> ${escapeHTML(tag)}</span>`;
  }).join('');

  return `
    <article class="product-item-list" data-id="${product.id}">
      <!-- Left: Poster Thumbnail with Zoom -->
      <div class="product-thumb-box" onclick="openLightbox('${escapeHTML(product.image)}', '${escapeHTML(displayTitle)}')">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(displayTitle)}" class="product-thumb-img" loading="lazy">
        <span class="product-badge-flag">${escapeHTML(product.badge)}</span>
        <div class="thumb-zoom-overlay">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span>ពង្រីករូបភាព</span>
        </div>
      </div>

      <!-- Center: Details & Metadata -->
      <div class="product-details-main">
        <div class="item-cat-tag">
          <span>●</span> ${escapeHTML(displayCat)}
        </div>
        <h2 class="item-title" onclick="openProductDetail('${product.id}')">${escapeHTML(displayTitle)}</h2>
        <div class="item-meta-rating">
          <span class="star-icons">★★★★★</span>
          <strong>${product.rating}</strong>
          <span class="reviews-txt">(${product.reviewsCount} នាក់បានទិញ)</span>
        </div>
        <p class="item-desc-short">${escapeHTML(product.description)}</p>
        <div class="item-feature-tags">
          ${featurePillsHTML}
          <span class="feat-tag"><span class="check">✓</span> ធានាពេញលេញ</span>
        </div>
      </div>

      <!-- Right: Plan Selector & Action Buttons -->
      <div class="product-actions-col">
        <div class="plan-select-wrap">
          <label style="font-size: 0.85rem; color: #1e293b; font-weight: 700; display: block; margin-bottom: 0.4rem; text-align: left;">🗓️ ជ្រើសរើសរយៈពេល (Plan):</label>
          <select class="plan-select-dropdown" id="plan-select-${product.id}">
            ${planOptionsHTML}
          </select>
        </div>

        <div class="btn-group-stacked">
          <button class="btn btn-primary" onclick="quickBuyItem('${product.id}')">
            <span>⚡ ${i18n[state.currentLang].orderNow}</span>
          </button>
          <button class="btn btn-secondary btn-sm" onclick="quickAddToCart('${product.id}')">
            <span>🛒 ${i18n[state.currentLang].addToCart}</span>
          </button>
          <button class="btn btn-outline btn-sm" onclick="openProductDetail('${product.id}')">
            <span>ℹ️ ${i18n[state.currentLang].details}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   GRID VIEW ITEM HTML (No Price)
   ========================================================================== */
function renderGridItemHTML(product) {
  const isKh = state.currentLang === 'km';
  const displayTitle = isKh ? product.titleKh : product.title;
  const displayCat = isKh ? product.categoryKh : product.category.toUpperCase();

  return `
    <article class="product-item-grid" data-id="${product.id}">
      <div class="grid-thumb-wrap" onclick="openProductDetail('${product.id}')">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(displayTitle)}" class="grid-thumb-img" loading="lazy">
        <span class="product-badge-flag">${escapeHTML(product.badge)}</span>
      </div>

      <div class="grid-card-body">
        <div class="item-cat-tag"><span>●</span> ${escapeHTML(displayCat)}</div>
        <h3 class="item-title" onclick="openProductDetail('${product.id}')">${escapeHTML(displayTitle)}</h3>
        <div class="item-meta-rating">
          <span class="star-icons">★★★★★</span>
          <strong>${product.rating}</strong>
        </div>
        <p class="item-desc-short">${escapeHTML(product.description)}</p>

        <div class="grid-card-actions" style="margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-glass);">
          <button class="btn btn-primary btn-sm" onclick="openProductDetail('${product.id}')">
            <span>${i18n[state.currentLang].orderNow}</span>
          </button>
          <button class="btn btn-secondary btn-sm" onclick="quickAddToCart('${product.id}')">
            <span>+ កន្ត្រក</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   PRODUCT DETAIL MODAL (No Price)
   ========================================================================== */
function openProductDetail(productId, selectedPlanIndex = 0) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProduct = product;
  state.selectedPlanIndex = selectedPlanIndex;

  const isKh = state.currentLang === 'km';
  const displayTitle = isKh ? product.titleKh : product.title;

  const planOptionsRadioHTML = product.plans.map((plan, idx) => {
    const isChecked = idx === state.selectedPlanIndex ? 'checked' : '';
    const activeClass = idx === state.selectedPlanIndex ? 'active' : '';
    return `
      <label class="plan-option-label ${activeClass}" id="plan-label-${idx}">
        <div>
          <input type="radio" name="modalPlan" value="${idx}" ${isChecked} onchange="onModalPlanChange(${idx})">
          <strong>${escapeHTML(plan.name)}</strong>
        </div>
        <span class="plan-status-badge">● មានសេវាកម្ម</span>
      </label>
    `;
  }).join('');

  const featuresListHTML = product.features.map(feat => {
    return `<li><span class="chk-icon">✔</span> <span>${escapeHTML(feat)}</span></li>`;
  }).join('');

  DOM.detailModalBody.innerHTML = `
    <div class="detail-modal-grid">
      <!-- Left: Poster View with Click-to-Zoom -->
      <div class="detail-img-col">
        <div class="detail-poster-wrap" onclick="openLightbox('${escapeHTML(product.image)}', '${escapeHTML(displayTitle)}')">
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(displayTitle)}">
          <span class="product-badge-flag">${escapeHTML(product.badge)}</span>
        </div>
        <p class="poster-zoom-tip">🔍 ចុចលើរូបភាពដើម្បីពង្រីកមើល Poster ពេញលេញ</p>
        <div class="warranty-box">
          <span>🛡️</span>
          <span>${escapeHTML(product.warranty)}</span>
        </div>
      </div>

      <!-- Right: Detailed Information & Plan Selection -->
      <div class="detail-info-col">
        <div class="item-cat-tag"><span>●</span> ${escapeHTML(product.categoryKh || product.category)}</div>
        <h2 class="detail-title">${escapeHTML(displayTitle)}</h2>

        <div class="item-meta-rating">
          <span class="star-icons">★★★★★</span>
          <strong>${product.rating}</strong>
          <span class="reviews-txt">(${product.reviewsCount} នាក់ពេញចិត្ត)</span>
        </div>

        <p class="detail-desc">${escapeHTML(product.description)}</p>

        <!-- Plan Selection Box -->
        <div class="detail-price-box">
          <span style="font-size: 0.88rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.5rem;">ជ្រើសរើសរយៈពេលប្រើប្រាស់ (Plan):</span>
          <div class="plan-options-list">
            ${planOptionsRadioHTML}
          </div>
        </div>

        <!-- Features Breakdown -->
        <div>
          <h4 class="detail-section-title">✨ លក្ខណៈពិសេសនៃការជាវ៖</h4>
          <ul class="features-check-list">
            ${featuresListHTML}
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="detail-actions-row">
          <button class="btn btn-telegram" onclick="buyCurrentModalPlanViaTelegram()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.48-.83-.27-1.48-.42-1.42-.88.03-.24.37-.49 1.02-.75 4-1.74 6.67-2.88 8.01-3.44 3.81-1.58 4.6-.86 4.67.65z"/></svg>
            <span>ឆាតកម្ម៉ង់តាម Telegram</span>
          </button>
          <button class="btn btn-primary" onclick="addCurrentModalPlanToCart()">
            <span>🛒 ដាក់ចូលកន្ត្រក</span>
          </button>
        </div>
      </div>
    </div>
  `;

  DOM.productDetailModal.classList.add('active');
  DOM.productDetailModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  DOM.productDetailModal.classList.remove('active');
  DOM.productDetailModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function onModalPlanChange(planIndex) {
  state.selectedPlanIndex = planIndex;
  document.querySelectorAll('.plan-option-label').forEach((el, idx) => {
    el.classList.toggle('active', idx === planIndex);
  });
}

function addCurrentModalPlanToCart() {
  if (!state.selectedProduct) return;
  const product = state.selectedProduct;
  const plan = product.plans[state.selectedPlanIndex] || product.plans[0];

  addToCart(product, plan);
  closeDetailModal();
  showToast(`បានបន្ថែម "${product.titleKh}" (${plan.name}) ទៅកន្ត្រក!`);
}

function buyCurrentModalPlanViaTelegram() {
  if (!state.selectedProduct) return;
  const product = state.selectedProduct;
  const plan = product.plans[state.selectedPlanIndex] || product.plans[0];

  const text = `សួស្តី Admin! ខ្ញុំចង់កម្ម៉ង់ទិញគណនី Premium ពី Website៖\n- ផលិតផល: ${product.title} (${product.titleKh})\n- កញ្ចប់: ${plan.name}\nសូមជួយពិនិត្យ និងប្រាប់តម្លៃមកខ្ញុំបាទ/ចាស!`;
  const url = `https://t.me/proserviceshop?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

/* ==========================================================================
   CART OPERATIONS (No Price)
   ========================================================================== */
function quickAddToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const planSelect = document.getElementById(`plan-select-${productId}`);
  const planIndex = planSelect ? parseInt(planSelect.value, 10) : 0;
  const plan = product.plans[planIndex] || product.plans[0];

  addToCart(product, plan);
  showToast(`បានបន្ថែម "${product.titleKh}" ទៅកន្ត្រក!`);
}

function quickBuyItem(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const planSelect = document.getElementById(`plan-select-${productId}`);
  const planIndex = planSelect ? parseInt(planSelect.value, 10) : 0;
  const plan = product.plans[planIndex] || product.plans[0];

  addToCart(product, plan);
  openCart();
}

function addToCart(product, plan) {
  const cartItemId = `${product.id}-${plan.name}`;
  const existing = state.cart.find(item => item.id === cartItemId);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: cartItemId,
      productId: product.id,
      title: product.titleKh,
      titleEn: product.title,
      planName: plan.name,
      quantity: 1,
      image: product.image
    });
  }

  saveCartToStorage();
  updateCartUI();

  // Badge bump animation
  DOM.cartCountBadge.classList.add('bump');
  setTimeout(() => DOM.cartCountBadge.classList.remove('bump'), 400);
}

function updateCartQuantity(cartItemId, delta) {
  const item = state.cart.find(i => i.id === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== cartItemId);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeCartItem(cartItemId) {
  state.cart = state.cart.filter(i => i.id !== cartItemId);
  saveCartToStorage();
  updateCartUI();
  showToast('បានដកទំនិញចេញពីកន្ត្រក!');
}

function calculateCartTotals() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  return { totalItems };
}

function updateCartUI() {
  const { totalItems } = calculateCartTotals();

  // Update header badges
  DOM.cartCountBadge.textContent = totalItems;
  DOM.cartHeaderCount.textContent = totalItems;
  if (DOM.cartTotalItems) DOM.cartTotalItems.textContent = totalItems;

  // Render items inside drawer
  if (state.cart.length === 0) {
    DOM.cartDrawerItems.innerHTML = `
      <div class="empty-cart-msg">
        <div class="empty-cart-icon">🛒</div>
        <p>${i18n[state.currentLang].emptyCart}</p>
      </div>
    `;
    DOM.openCheckoutBtn.disabled = true;
  } else {
    DOM.openCheckoutBtn.disabled = false;
    DOM.cartDrawerItems.innerHTML = state.cart.map(item => `
      <div class="cart-item-card">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHTML(item.title)}</div>
          <div class="cart-item-plan">📌 ${escapeHTML(item.planName)}</div>
        </div>
        <div class="cart-qty-ctrls">
          <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
        </div>
        <button class="remove-cart-item" title="លុបចេញ" onclick="removeCartItem('${item.id}')">&times;</button>
      </div>
    `).join('');
  }
}

function openCart() {
  updateCartUI();
  DOM.cartDrawerOverlay.classList.add('active');
  DOM.cartDrawerOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  DOM.cartDrawerOverlay.classList.remove('active');
  DOM.cartDrawerOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ==========================================================================
   CHECKOUT & TELEGRAM ORDER (No Price)
   ========================================================================== */
function openCheckout() {
  if (state.cart.length === 0) {
    showToast('សូមបន្ថែមទំនិញចូលកន្ត្រកជាមុនសិន!');
    return;
  }

  closeCart();
  const { totalItems } = calculateCartTotals();

  // Populate checkout summary
  DOM.checkoutItemsList.innerHTML = state.cart.map(item => `
    <div class="checkout-item-row">
      <span>${escapeHTML(item.title)} (${escapeHTML(item.planName)})</span>
      <strong>x ${item.quantity}</strong>
    </div>
  `).join('');

  if (DOM.checkoutTotalCount) {
    DOM.checkoutTotalCount.textContent = `${totalItems} មុខ`;
  }

  DOM.checkoutModal.classList.add('active');
  DOM.checkoutModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  DOM.checkoutModal.classList.remove('active');
  DOM.checkoutModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function submitOrder() {
  const name = document.getElementById('custName').value.trim();
  const contact = document.getElementById('custContact').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const note = document.getElementById('custNote').value.trim();
  const payMethod = document.querySelector('input[name="payMethod"]:checked')?.value || 'KHQR';

  if (!name || !contact) {
    alert('សូមបំពេញឈ្មោះ និងលេខទូរស័ព្ទ/Telegram របស់អ្នក!');
    return;
  }

  const { totalItems } = calculateCartTotals();

  // Build items invoice text without price
  const itemsListText = state.cart.map((item, idx) => {
    return `${idx + 1}. ${item.title} (${item.planName}) x ${item.quantity}`;
  }).join('\n');

  const invoice = `🛍️ [ការកម្ម៉ង់ទំនិញថ្មីពី WEBSITE] 🛍️
-----------------------------------
👤 អតិថិជន: ${name}
📱 ទំនាក់ទំនង: ${contact}
${email ? `📧 Email សម្រាប់ Upgrade: ${email}\n` : ''}💳 វិធីសាស្ត្រទូទាត់: ${payMethod}
${note ? `📝 កំណត់ចំណាំ: ${note}\n` : ''}-----------------------------------
📋 បញ្ជីទំនិញ (${totalItems} មុខ)៖
${itemsListText}
-----------------------------------
⏰ កាលបរិច្ឆេទ: ${new Date().toLocaleString('km-KH')}

សូម Admin ជួយពិនិត្យតម្លៃ និងប្រគល់គណនីជូនខ្ញុំបាទ/ចាស! សូមអរគុណ!`;

  const tgUrl = `https://t.me/proserviceshop?text=${encodeURIComponent(invoice)}`;

  // Clear cart and close modal
  state.cart = [];
  saveCartToStorage();
  updateCartUI();
  closeCheckout();

  showToast('ការកម្ម៉ង់បានជោគជ័យ! កំពុងបើក Telegram Admin...');

  setTimeout(() => {
    window.open(tgUrl, '_blank');
  }, 600);
}

/* ==========================================================================
   LIGHTBOX FULL PREVIEW
   ========================================================================== */
function openLightbox(imgSrc, caption = '') {
  DOM.lightboxImg.src = imgSrc;
  DOM.lightboxCaption.textContent = caption;
  DOM.imageLightboxModal.classList.add('active');
  DOM.imageLightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  DOM.imageLightboxModal.classList.remove('active');
  DOM.imageLightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ==========================================================================
   TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--neon-cyan); font-size: 1.1rem;">⚡</span>
    <span>${escapeHTML(message)}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   UTILITY HELPERS
   ========================================================================== */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setCategoryFilter(category) {
  state.currentCategory = category;
  document.querySelectorAll('.cat-pill').forEach(el => {
    el.classList.toggle('active', el.dataset.category === category);
  });
  renderProducts();

  const el = document.getElementById('storeSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================================================
   2FA LIVE AUTHENTICATOR (RFC 6238 TOTP ENGINE)
   ========================================================================== */
function openTwoFactorModal() {
  if (!DOM.twoFactorModal) return;
  DOM.twoFactorModal.classList.add('active');
  DOM.twoFactorModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (DOM.twoFactorSecretInput) {
    setTimeout(() => DOM.twoFactorSecretInput.focus(), 150);
  }
}

function closeTwoFactorModal() {
  if (!DOM.twoFactorModal) return;
  DOM.twoFactorModal.classList.remove('active');
  DOM.twoFactorModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  stop2faTimer();
}

async function pasteTwoFactorKey() {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText();
      if (text) {
        DOM.twoFactorSecretInput.value = text.trim();
        if (DOM.twoFactorClearBtn) DOM.twoFactorClearBtn.style.display = 'flex';
        generate2fa();
        return;
      }
    }
  } catch (err) {
    console.warn('Clipboard readText permission denied or unavailable', err);
  }
  DOM.twoFactorSecretInput.focus();
  showToast('សូមចុចបញ្ជា Ctrl + V ដើម្បី Paste Key របស់អ្នក!');
}

function clearTwoFactorInput() {
  DOM.twoFactorSecretInput.value = '';
  if (DOM.twoFactorClearBtn) DOM.twoFactorClearBtn.style.display = 'none';
  if (DOM.twoFactorResultCard) DOM.twoFactorResultCard.style.display = 'none';
  state.active2faKey = '';
  state.generated2faCode = '';
  stop2faTimer();
  DOM.twoFactorSecretInput.focus();
}

function fillSample2faKey() {
  DOM.twoFactorSecretInput.value = 'JBSWY3DPEHPK3PXP';
  if (DOM.twoFactorClearBtn) DOM.twoFactorClearBtn.style.display = 'flex';
  generate2fa();
}

function generate2fa() {
  const rawKey = DOM.twoFactorSecretInput.value.trim();
  if (!rawKey) {
    showToast('សូមបញ្ចូល 2FA Secret Key ជាមុនសិន!');
    DOM.twoFactorSecretInput.focus();
    return;
  }

  // Clean key: remove spaces and hyphens
  const cleanKey = rawKey.replace(/[\s\-]/g, '').toUpperCase();
  const validBase32 = /^[A-Z2-7]+=*$/i.test(cleanKey);
  if (!validBase32 || cleanKey.length < 8) {
    alert('2FA Secret Key មិនត្រឹមត្រូវទេ! Key ត្រូវតែមានតួអក្សរ A-Z និងលេខ 2-7 (ឧ. JBSWY3DPEHPK3PXP)');
    return;
  }

  state.active2faKey = cleanKey;
  DOM.twoFactorResultCard.style.display = 'flex';
  update2faDisplay();
  start2faTimer();
}

function update2faDisplay() {
  if (!state.active2faKey) return;
  const totp = getTOTPCode(state.active2faKey);
  if (!totp) return;

  state.generated2faCode = totp.code;
  DOM.twoFactorCodeDisplay.textContent = totp.formatted;
  DOM.twoFactorSecondsLeft.textContent = `${totp.remaining}s`;

  // Update SVG timer ring stroke
  if (DOM.twoFactorTimerPath) {
    const strokeDash = `${totp.percentage}, 100`;
    DOM.twoFactorTimerPath.setAttribute('stroke-dasharray', strokeDash);
    if (totp.remaining <= 5) {
      DOM.twoFactorTimerPath.style.stroke = 'var(--accent-red)';
    } else {
      DOM.twoFactorTimerPath.style.stroke = 'var(--primary-blue)';
    }
  }
}

function start2faTimer() {
  stop2faTimer();
  state.twoFactorTimer = setInterval(() => {
    update2faDisplay();
  }, 1000);
}

function stop2faTimer() {
  if (state.twoFactorTimer) {
    clearInterval(state.twoFactorTimer);
    state.twoFactorTimer = null;
  }
}

function copyTwoFactorCode() {
  if (!state.generated2faCode) return;
  const code = state.generated2faCode;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(handleCopySuccess).catch(() => fallbackCopy(code));
  } else {
    fallbackCopy(code);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    handleCopySuccess();
  } catch (err) {
    prompt('សូមចម្លងលេខកូដនេះដោយដៃ៖', text);
  }
  document.body.removeChild(textArea);
}

function handleCopySuccess() {
  const code = state.generated2faCode;
  DOM.twoFactorCopyBtn.classList.add('copied');
  DOM.twoFactorCopyLabel.textContent = '✓ បានចម្លងលេខកូដ (Copied!)';
  showToast(`📋 បានចម្លងលេខកូដ 2FA: ${code}`);

  setTimeout(() => {
    DOM.twoFactorCopyBtn.classList.remove('copied');
    DOM.twoFactorCopyLabel.textContent = 'ចម្លងលេខកូដ (Copy Code)';
  }, 2200);
}

/* ==========================================================================
   PURE JS TOTP & HMAC-SHA1 IMPLEMENTATION (RFC 6238 / RFC 3174)
   ========================================================================== */
function base32ToBytes(str) {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const clean = str.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (let i = 0; i < clean.length; i++) {
    const val = base32chars.indexOf(clean.charAt(i));
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substr(i, 8), 2));
  }
  return new Uint8Array(bytes);
}

function sha1(bytes) {
  let len = bytes.length;
  let words = [];
  for (let i = 0; i < len; i++) {
    words[i >> 2] |= (bytes[i] & 0xff) << (24 - (i % 4) * 8);
  }
  words[len >> 2] |= 0x80 << (24 - (len % 4) * 8);
  let blockCount = (((len + 8) >> 6) + 1) * 16;
  while (words.length < blockCount) words.push(0);
  words[blockCount - 1] = (len * 8) & 0xffffffff;
  words[blockCount - 2] = Math.floor((len * 8) / 0x100000000);

  let w = new Array(80);
  let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;

  for (let i = 0; i < blockCount; i += 16) {
    for (let j = 0; j < 16; j++) w[j] = words[i + j];
    for (let j = 16; j < 80; j++) {
      let v = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
      w[j] = (v << 1) | (v >>> 31);
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    for (let j = 0; j < 80; j++) {
      let f, k;
      if (j < 20) { f = (b & c) | ((~b) & d); k = 0x5a827999; }
      else if (j < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
      else if (j < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
      else { f = b ^ c ^ d; k = 0xca62c1d6; }
      let temp = (((a << 5) | (a >>> 27)) + f + e + k + w[j]) & 0xffffffff;
      e = d; d = c; c = (b << 30) | (b >>> 2); b = a; a = temp;
    }
    h0 = (h0 + a) & 0xffffffff;
    h1 = (h1 + b) & 0xffffffff;
    h2 = (h2 + c) & 0xffffffff;
    h3 = (h3 + d) & 0xffffffff;
    h4 = (h4 + e) & 0xffffffff;
  }

  let res = new Uint8Array(20);
  let h = [h0, h1, h2, h3, h4];
  for (let i = 0; i < 5; i++) {
    res[i * 4] = (h[i] >>> 24) & 0xff;
    res[i * 4 + 1] = (h[i] >>> 16) & 0xff;
    res[i * 4 + 2] = (h[i] >>> 8) & 0xff;
    res[i * 4 + 3] = h[i] & 0xff;
  }
  return res;
}

function hmacSha1(key, message) {
  const blockSize = 64;
  if (key.length > blockSize) {
    key = sha1(key);
  }
  let kPad = new Uint8Array(blockSize);
  kPad.set(key);
  let oKeyPad = new Uint8Array(blockSize);
  let iKeyPad = new Uint8Array(blockSize);
  for (let i = 0; i < blockSize; i++) {
    oKeyPad[i] = kPad[i] ^ 0x5c;
    iKeyPad[i] = kPad[i] ^ 0x36;
  }
  let inner = new Uint8Array(blockSize + message.length);
  inner.set(iKeyPad);
  inner.set(message, blockSize);
  let innerHash = sha1(inner);

  let outer = new Uint8Array(blockSize + 20);
  outer.set(oKeyPad);
  outer.set(innerHash, blockSize);
  return sha1(outer);
}

function getTOTPCode(secretKey) {
  const keyBytes = base32ToBytes(secretKey);
  if (keyBytes.length === 0) return null;

  const epoch = Math.floor(Date.now() / 1000);
  const timeStep = 30;
  const counter = Math.floor(epoch / timeStep);
  const remainingSeconds = timeStep - (epoch % timeStep);

  const counterBytes = new Uint8Array(8);
  let tmp = counter;
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = tmp & 0xff;
    tmp = Math.floor(tmp / 256);
  }

  const hmac = hmacSha1(keyBytes, counterBytes);
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = (binary % 1000000).toString().padStart(6, '0');
  return {
    code: otp,
    formatted: `${otp.slice(0, 3)} ${otp.slice(3)}`,
    remaining: remainingSeconds,
    percentage: (remainingSeconds / 30) * 100
  };
}

/* ==========================================================================
   AI IMAGE GENERATOR (Pollinations.ai Free Ultra-HD Engine)
   ========================================================================== */
const sampleAiPrompts = [
  "A cute fluffy cyberpunk kitten wearing neon cyberpunk sunglasses on neon Tokyo street, 4k ultra realistic, cinematic lighting",
  "Beautiful Angkor Wat Cambodian ancient temple in misty sunrise jungle, golden hour god rays, high detail photography, 8k resolution",
  "Futuristic electric supercar racing on rain-slicked highway at night, neon streaks, motion blur, Unreal Engine 5 render, cinematic",
  "Stunning anime warrior princess with silver flowing hair and glowing mystical katana, cherry blossom wind, Makoto Shinkai aesthetic",
  "Cozy coffee shop bookstore in Paris on a rainy autumn evening, warm ambient lighting, soft bokeh, ultra detailed digital art",
  "Majestic celestial golden dragon soaring among nebula stars and galaxies, cosmic fantasy art, epic masterpiece",
  "Modern minimalist luxury penthouse apartment with floor-to-ceiling glass windows overlooking glowing metropolis, architectural photo"
];
let samplePromptIndex = 0;

function openAiImageModal() {
  if (!DOM.aiImageModal) return;
  DOM.aiImageModal.classList.add('active');
  DOM.aiImageModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (DOM.aiPromptInput && !DOM.aiPromptInput.value.trim()) {
    setTimeout(() => DOM.aiPromptInput.focus(), 150);
  }
}

function closeAiImageModal() {
  if (!DOM.aiImageModal) return;
  DOM.aiImageModal.classList.remove('active');
  DOM.aiImageModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setSampleAiPrompt() {
  const prompt = sampleAiPrompts[samplePromptIndex % sampleAiPrompts.length];
  samplePromptIndex++;
  DOM.aiPromptInput.value = prompt;
  if (DOM.clearAiPromptBtn) DOM.clearAiPromptBtn.style.display = 'flex';
  DOM.aiPromptInput.focus();
  showToast('✨ បានជ្រើសរើស Prompt គំរូ!');
}

function clearAiPrompt() {
  DOM.aiPromptInput.value = '';
  if (DOM.clearAiPromptBtn) DOM.clearAiPromptBtn.style.display = 'none';
  DOM.aiPromptInput.focus();
}

function openAiImageLightbox() {
  if (!state.currentAiImageUrl) return;
  openLightbox(state.currentAiImageUrl, state.currentAiPrompt || 'AI Generated Image');
}

function copyAiPrompt() {
  const prompt = state.currentAiPrompt || DOM.aiPromptInput.value.trim();
  if (!prompt) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(prompt).then(() => showToast('📋 បានចម្លង Prompt!'));
  } else {
    fallbackCopy(prompt);
  }
}

function downloadAiImage() {
  if (!state.currentAiImageUrl) return;
  showToast('⏳ កំពុងរៀបចំទាញយករូបភាព...');

  // Direct download link
  const a = document.createElement('a');
  a.href = state.currentAiImageUrl;
  a.download = `proservice-ai-${Date.now()}.jpg`;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('✓ បានទាញយករូបភាព!');
}

function generateAiImage(isRegenerate = false) {
  if (state.isGeneratingAiImage) return;

  const rawPrompt = DOM.aiPromptInput.value.trim();
  if (!rawPrompt) {
    showToast('សូមបញ្ចូលពាក្យបញ្ជា (Prompt) ឬចុច "សាកល្បង Prompt គំរូ"');
    setSampleAiPrompt();
    return;
  }

  state.currentAiPrompt = rawPrompt;

  // Style Enhancers
  const styleModifiers = {
    photorealistic: ", professional 35mm photograph, 8k resolution, ultra-detailed, photorealistic, natural cinematic lighting, sharp focus",
    anime: ", high quality anime style, makoto shinkai aesthetic, vivid colors, detailed lineart, clean anime masterpiece",
    cinematic: ", 3D cinematic render, unreal engine 5, octane render, dramatic lighting, volumetric fog, photorealistic textures",
    cyberpunk: ", cyberpunk aesthetic, neon glowing lights, futuristic cityscape, high contrast, synthwave mood, 4k",
    digitalart: ", beautiful digital painting, trending on artstation, detailed illustration, vibrant palette, concept art",
    fantasy: ", magical fantasy art, ethereal glow, enchanting atmosphere, mythical creatures, high fantasy illustration"
  };

  const styleEnhancement = styleModifiers[state.selectedAiStyle] || styleModifiers.photorealistic;
  const fullPrompt = `${rawPrompt}${styleEnhancement}`;

  // Dimensions based on Aspect Ratio (Optimized for speed and high definition)
  let width = 768;
  let height = 768;
  if (state.selectedAiRatio === '16:9') {
    width = 960;
    height = 540;
  } else if (state.selectedAiRatio === '9:16') {
    width = 540;
    height = 960;
  }

  // Random Seed & URL with Turbo Model for 2-4 second generation speed
  const seed = Math.floor(Math.random() * 10000000);
  const cleanPrompt = encodeURIComponent(fullPrompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?model=turbo&width=${width}&height=${height}&seed=${seed}&nologo=true`;

  // UI State: Loading
  state.isGeneratingAiImage = true;
  DOM.generateAiImageBtn.disabled = true;
  DOM.aiBtnText.textContent = isRegenerate ? 'កំពុងបង្កើតម្តងទៀត...' : 'កំពុងបង្កើតរូបភាព...';
  DOM.aiBtnSpinner.style.display = 'inline-block';
  DOM.aiImageLoadingBox.style.display = 'block';
  DOM.aiImageResultCard.style.display = 'none';

  // Load Image (Do NOT use crossOrigin='anonymous' to prevent local file:/// CORS errors)
  const img = new Image();

  img.onload = () => {
    state.isGeneratingAiImage = false;
    state.currentAiImageUrl = imageUrl;
    DOM.generateAiImageBtn.disabled = false;
    DOM.aiBtnText.textContent = '⚡ បង្កើតរូបភាព (Generate AI Image)';
    DOM.aiBtnSpinner.style.display = 'none';
    DOM.aiImageLoadingBox.style.display = 'none';

    DOM.aiResultImg.src = imageUrl;
    if (DOM.aiResultAspect) DOM.aiResultAspect.textContent = state.selectedAiRatio;
    DOM.aiImageResultCard.style.display = 'flex';

    setTimeout(() => {
      DOM.aiImageResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    showToast('✨ បង្កើតរូបភាព AI បានជោគជ័យ!');
  };

  img.onerror = () => {
    // Retry with standard model fallback
    const fallbackUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
    const fallbackImg = new Image();

    fallbackImg.onload = () => {
      state.isGeneratingAiImage = false;
      state.currentAiImageUrl = fallbackUrl;
      DOM.generateAiImageBtn.disabled = false;
      DOM.aiBtnText.textContent = '⚡ បង្កើតរូបភាព (Generate AI Image)';
      DOM.aiBtnSpinner.style.display = 'none';
      DOM.aiImageLoadingBox.style.display = 'none';

      DOM.aiResultImg.src = fallbackUrl;
      if (DOM.aiResultAspect) DOM.aiResultAspect.textContent = state.selectedAiRatio;
      DOM.aiImageResultCard.style.display = 'flex';

      setTimeout(() => {
        DOM.aiImageResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);

      showToast('✨ បង្កើតរូបភាព AI បានជោគជ័យ!');
    };

    fallbackImg.onerror = () => {
      state.isGeneratingAiImage = false;
      DOM.generateAiImageBtn.disabled = false;
      DOM.aiBtnText.textContent = '⚡ បង្កើតរូបភាព (Generate AI Image)';
      DOM.aiBtnSpinner.style.display = 'none';
      DOM.aiImageLoadingBox.style.display = 'none';
      showToast('⚠️ ការបង្កើតរូបភាពមានបញ្ហាបណ្តាញ សូមចុចសាកល្បងម្តងទៀត!');
    };

    fallbackImg.src = fallbackUrl;
  };

  img.src = imageUrl;
}

/* ==========================================================================
   SOCIAL MEDIA VIDEO & MP3 DOWNLOADER (YouTube, TikTok, Facebook...)
   ========================================================================== */
const sampleMediaLinks = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.tiktok.com/@tiktok/video/7106594312292453678",
  "https://www.facebook.com/watch/?v=1234567890",
  "https://www.instagram.com/reel/C3xXyZ123/"
];
let sampleMediaLinkIndex = 0;

function openMediaDownloaderModal() {
  if (!DOM.mediaDownloaderModal) return;
  DOM.mediaDownloaderModal.classList.add('active');
  DOM.mediaDownloaderModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (DOM.mediaUrlInput && !DOM.mediaUrlInput.value.trim()) {
    setTimeout(() => DOM.mediaUrlInput.focus(), 150);
  }
}

function closeMediaDownloaderModal() {
  if (!DOM.mediaDownloaderModal) return;
  DOM.mediaDownloaderModal.classList.remove('active');
  DOM.mediaDownloaderModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

async function pasteMediaUrl() {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText();
      if (text) {
        DOM.mediaUrlInput.value = text.trim();
        onMediaUrlChange();
        showToast('📋 បាន Paste តំណភ្ជាប់!');
        return;
      }
    }
  } catch (err) {
    console.warn('Clipboard readText denied', err);
  }
  DOM.mediaUrlInput.focus();
  showToast('សូមចុច Ctrl + V ដើម្បី Paste Link របស់អ្នក!');
}

function clearMediaUrl() {
  DOM.mediaUrlInput.value = '';
  onMediaUrlChange();
  DOM.mediaUrlInput.focus();
}

function setSampleMediaLink() {
  const url = sampleMediaLinks[sampleMediaLinkIndex % sampleMediaLinks.length];
  sampleMediaLinkIndex++;
  DOM.mediaUrlInput.value = url;
  onMediaUrlChange();
  showToast('✨ បានជ្រើសរើស Link គំរូ!');
}

function detectPlatform(url) {
  const clean = url.trim().toLowerCase();
  if (clean.includes('youtube.com') || clean.includes('youtu.be')) {
    return { name: 'YouTube', icon: '🔴', key: 'youtube' };
  } else if (clean.includes('tiktok.com')) {
    return { name: 'TikTok (No Watermark)', icon: '🖤', key: 'tiktok' };
  } else if (clean.includes('facebook.com') || clean.includes('fb.watch') || clean.includes('fb.com')) {
    return { name: 'Facebook Video / Reels', icon: '🔵', key: 'facebook' };
  } else if (clean.includes('instagram.com')) {
    return { name: 'Instagram Reel / Post', icon: '🟣', key: 'instagram' };
  } else if (clean.includes('twitter.com') || clean.includes('x.com')) {
    return { name: 'Twitter / X Video', icon: '⚪', key: 'twitter' };
  } else if (clean.length > 5) {
    return { name: 'Universal Web Link', icon: '🌐', key: 'general' };
  }
  return null;
}

function onMediaUrlChange() {
  const url = DOM.mediaUrlInput ? DOM.mediaUrlInput.value.trim() : '';
  if (DOM.clearMediaUrlBtn) {
    DOM.clearMediaUrlBtn.style.display = url ? 'flex' : 'none';
  }

  const detected = detectPlatform(url);
  state.detectedMediaPlatform = detected;

  if (DOM.detectedPlatformBadge && DOM.detectedPlatformText) {
    if (detected) {
      DOM.detectedPlatformText.textContent = `✓ ${detected.icon} បានស្គាល់: ${detected.name}`;
      DOM.detectedPlatformBadge.style.display = 'flex';
      if (DOM.mediaUrlIcon) DOM.mediaUrlIcon.textContent = detected.icon;
    } else {
      DOM.detectedPlatformBadge.style.display = 'none';
      if (DOM.mediaUrlIcon) DOM.mediaUrlIcon.textContent = '🔗';
    }
  }
}

function selectMediaFormat(format) {
  state.selectedMediaFormat = format;
  if (DOM.formatVideoBtn) DOM.formatVideoBtn.classList.toggle('active', format === 'video');
  if (DOM.formatAudioBtn) DOM.formatAudioBtn.classList.toggle('active', format === 'audio');

  if (DOM.downloadBtnText) {
    DOM.downloadBtnText.textContent = format === 'video'
      ? '⚡ ទាញយកវីដេអូឥឡូវនេះ (Download MP4)'
      : '🎵 ទាញយកជាចម្រៀង (Download MP3)';
  }
}

function handleMediaDownload() {
  let url = DOM.mediaUrlInput ? DOM.mediaUrlInput.value.trim() : '';
  if (!url) {
    setSampleMediaLink();
    url = DOM.mediaUrlInput.value.trim();
  }

  const format = state.selectedMediaFormat || 'video';
  const ytId = getYouTubeId(url);
  const isAudio = format === 'audio';

  // Automatically copy URL to clipboard for user convenience
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).catch(() => {});
  }

  // Determine direct download gateway for INSTANT 1-CLICK DOWNLOAD
  let directDownloadUrl = '';
  if (ytId) {
    directDownloadUrl = `https://ssyoutube.com/watch?v=${ytId}`;
  } else if (url.includes('tiktok.com')) {
    directDownloadUrl = isAudio ? 'https://musicaldown.com/tiktok-mp3' : 'https://snaptik.app/';
  } else if (url.includes('facebook.com') || url.includes('fb.watch') || url.includes('fb.com')) {
    directDownloadUrl = 'https://snapsave.app/';
  } else if (url.includes('instagram.com')) {
    directDownloadUrl = 'https://fastdl.app/';
  } else {
    directDownloadUrl = 'https://cobalt.tools/';
  }

  // IMMEDIATELY open download stream without delaying or blocking
  if (directDownloadUrl) {
    window.open(directDownloadUrl, '_blank', 'noopener,noreferrer');
    showToast('⚡ កំពុងទាញយកភ្លាមៗ...! (Download Started)');
  }

  // Render Result Card in modal for additional formats & resolutions
  if (DOM.mediaLoadingBox) {
    DOM.mediaLoadingBox.style.display = 'none';
  }
  renderMediaDownloadResult(url, format);
}

function getYouTubeId(u) {
  const match = u.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

function renderMediaDownloadResult(url, format) {
  if (!DOM.mediaResultCard) return;

  const ytId = getYouTubeId(url);
  const isTikTok = url.includes('tiktok.com');
  const isFB = url.includes('facebook.com') || url.includes('fb.watch') || url.includes('fb.com');
  const isIG = url.includes('instagram.com');

  const isAudio = format === 'audio';

  // Reset / Set thumbnail & platform badge
  if (ytId) {
    if (DOM.mediaResultThumbnail) {
      DOM.mediaResultThumbnail.src = `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
      DOM.mediaResultThumbnail.style.display = 'block';
    }
    if (DOM.mediaDefaultThumbIcon) DOM.mediaDefaultThumbIcon.style.display = 'none';
    if (DOM.mediaPlatformTag) DOM.mediaPlatformTag.textContent = '🔴 YouTube';
    if (DOM.mediaResultTitle) DOM.mediaResultTitle.textContent = isAudio ? '🎵 YouTube Audio (HQ MP3)' : '🎬 YouTube Video (1080p / 720p HD)';
  } else if (isTikTok) {
    if (DOM.mediaResultThumbnail) DOM.mediaResultThumbnail.style.display = 'none';
    if (DOM.mediaDefaultThumbIcon) {
      DOM.mediaDefaultThumbIcon.textContent = '🖤';
      DOM.mediaDefaultThumbIcon.style.display = 'flex';
    }
    if (DOM.mediaPlatformTag) DOM.mediaPlatformTag.textContent = '🖤 TikTok';
    if (DOM.mediaResultTitle) DOM.mediaResultTitle.textContent = '🎬 TikTok Video (គ្មាន Watermark No-Watermark)';
  } else if (isFB) {
    if (DOM.mediaResultThumbnail) DOM.mediaResultThumbnail.style.display = 'none';
    if (DOM.mediaDefaultThumbIcon) {
      DOM.mediaDefaultThumbIcon.textContent = '🔵';
      DOM.mediaDefaultThumbIcon.style.display = 'flex';
    }
    if (DOM.mediaPlatformTag) DOM.mediaPlatformTag.textContent = '🔵 Facebook';
    if (DOM.mediaResultTitle) DOM.mediaResultTitle.textContent = '🎬 Facebook Video / Reels (Full HD)';
  } else if (isIG) {
    if (DOM.mediaResultThumbnail) DOM.mediaResultThumbnail.style.display = 'none';
    if (DOM.mediaDefaultThumbIcon) {
      DOM.mediaDefaultThumbIcon.textContent = '🟣';
      DOM.mediaDefaultThumbIcon.style.display = 'flex';
    }
    if (DOM.mediaPlatformTag) DOM.mediaPlatformTag.textContent = '🟣 Instagram';
    if (DOM.mediaResultTitle) DOM.mediaResultTitle.textContent = '🎬 Instagram Reel / Video HD';
  } else {
    if (DOM.mediaResultThumbnail) DOM.mediaResultThumbnail.style.display = 'none';
    if (DOM.mediaDefaultThumbIcon) {
      DOM.mediaDefaultThumbIcon.textContent = '🌐';
      DOM.mediaDefaultThumbIcon.style.display = 'flex';
    }
    if (DOM.mediaPlatformTag) DOM.mediaPlatformTag.textContent = '🌐 Web Media';
    if (DOM.mediaResultTitle) DOM.mediaResultTitle.textContent = '🎬 Online Media Stream';
  }

  if (DOM.mediaResultUrlText) {
    DOM.mediaResultUrlText.textContent = url;
  }

  // Generate Direct Action Download Buttons
  let actionButtonsHTML = '';

  if (ytId) {
    actionButtonsHTML = `
      <a href="https://ssyoutube.com/watch?v=${ytId}" target="_blank" rel="noopener noreferrer" class="btn-res-download video" onclick="onDirectDownloadClick('Video Full HD')">
        <span>🎬 ទាញយក Video Full HD (MP4 1080p / 720p)</span>
        <span class="srv-badge" style="background:#ffffff; color:#047857;">⚡ SaveFrom Direct</span>
      </a>
      <a href="https://yt5s.biz/enwr200/?q=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${ytId}" target="_blank" rel="noopener noreferrer" class="btn-res-download video" onclick="onDirectDownloadClick('YT5s 1080p')">
        <span>🎬 ទាញយក Video 1080p (YT5s Fast Server)</span>
        <span class="srv-badge" style="background:#ffffff; color:#047857;">⚡ YT5s Fast</span>
      </a>
      <a href="https://ssyoutube.com/watch?v=${ytId}" target="_blank" rel="noopener noreferrer" class="btn-res-download audio" onclick="onDirectDownloadClick('Audio HQ MP3')">
        <span>🎵 ទាញយកជាចម្រៀង Audio (HQ MP3 320kbps)</span>
        <span class="srv-badge" style="background:#ffffff; color:#1d4ed8;">⚡ Direct MP3</span>
      </a>
      <a href="https://cobalt.tools/" target="_blank" rel="noopener noreferrer" class="btn-res-download direct" onclick="onDirectDownloadClick('Cobalt Server')">
        <span>🚀 បើក Cobalt Multi-Quality Server (គ្មានផ្ទាំងពាណិជ្ជកម្ម No Ads)</span>
        <span style="font-size:0.78rem; color:#64748b;">Fast Server ↗</span>
      </a>
    `;
  } else if (isTikTok) {
    actionButtonsHTML = `
      <a href="https://snaptik.app/" target="_blank" rel="noopener noreferrer" class="btn-res-download video" onclick="onDirectDownloadClick('SnapTik HD')">
        <span>🎬 ទាញយក TikTok HD គ្មាន Watermark (SnapTik)</span>
        <span class="srv-badge" style="background:#ffffff; color:#047857;">⚡ No Watermark</span>
      </a>
      <a href="https://ssstik.io/" target="_blank" rel="noopener noreferrer" class="btn-res-download video" onclick="onDirectDownloadClick('SSSTik')">
        <span>🎬 ទាញយក TikTok MP4 Full Speed (SSSTik)</span>
        <span class="srv-badge" style="background:#ffffff; color:#047857;">⚡ Server 2</span>
      </a>
      <a href="https://musicaldown.com/tiktok-mp3" target="_blank" rel="noopener noreferrer" class="btn-res-download audio" onclick="onDirectDownloadClick('TikTok MP3')">
        <span>🎵 ទាញយកជាចម្រៀង TikTok MP3 Audio</span>
        <span class="srv-badge" style="background:#ffffff; color:#1d4ed8;">⚡ Audio MP3</span>
      </a>
      <a href="https://cobalt.tools/" target="_blank" rel="noopener noreferrer" class="btn-res-download direct" onclick="onDirectDownloadClick('Cobalt')">
        <span>🚀 បើក Cobalt Fast Downloader (No Ads)</span>
        <span style="font-size:0.78rem; color:#64748b;">Server 3 ↗</span>
      </a>
    `;
  } else if (isFB) {
    actionButtonsHTML = `
      <a href="https://snapsave.app/" target="_blank" rel="noopener noreferrer" class="btn-res-download video" onclick="onDirectDownloadClick('SnapSave FB HD')">
        <span>🎬 ទាញយក Facebook Video Full HD 1080p (SnapSave)</span>
        <span class="srv-badge" style="background:#ffffff; color:#047857;">⚡ Full HD</span>
      </a>
      <a href="https://fdown.net/" target="_blank" rel="noopener noreferrer" class="btn-res-download direct" onclick="onDirectDownloadClick('FDown FB')">
        <span>🎬 ទាញយក Facebook Video SD / HD (FDown)</span>
        <span style="font-size:0.78rem; color:#64748b;">Server 2 ↗</span>
      </a>
      <a href="https://cobalt.tools/" target="_blank" rel="noopener noreferrer" class="btn-res-download direct" onclick="onDirectDownloadClick('Cobalt FB')">
        <span>🚀 បើក Cobalt Facebook Server (No Ads)</span>
        <span style="font-size:0.78rem; color:#64748b;">Server 3 ↗</span>
      </a>
    `;
  } else if (isIG) {
    actionButtonsHTML = `
      <a href="https://fastdl.app/" target="_blank" rel="noopener noreferrer" class="btn-res-download video" onclick="onDirectDownloadClick('FastDL IG')">
        <span>🎬 ទាញយក Instagram Reel / Post HD (FastDL)</span>
        <span class="srv-badge" style="background:#ffffff; color:#047857;">⚡ Fast HD</span>
      </a>
      <a href="https://snapinsta.app/" target="_blank" rel="noopener noreferrer" class="btn-res-download direct" onclick="onDirectDownloadClick('SnapInsta')">
        <span>🎬 ទាញយក Instagram Video (SnapInsta)</span>
        <span style="font-size:0.78rem; color:#64748b;">Server 2 ↗</span>
      </a>
      <a href="https://cobalt.tools/" target="_blank" rel="noopener noreferrer" class="btn-res-download direct" onclick="onDirectDownloadClick('Cobalt IG')">
        <span>🚀 បើក Cobalt Instagram Server</span>
        <span style="font-size:0.78rem; color:#64748b;">No Ads ↗</span>
      </a>
    `;
  } else {
    actionButtonsHTML = `
      <a href="https://cobalt.tools/" target="_blank" rel="noopener noreferrer" class="btn-res-download video" onclick="onDirectDownloadClick('Cobalt Multi')">
        <span>🚀 ទាញយកជាមួយ Cobalt Multi-Platform (No Ads)</span>
        <span class="srv-badge" style="background:#ffffff; color:#047857;">⚡ Fast Stream</span>
      </a>
      <a href="https://savefrom.net/" target="_blank" rel="noopener noreferrer" class="btn-res-download direct" onclick="onDirectDownloadClick('SaveFrom')">
        <span>🎬 ទាញយកជាមួយ SaveFrom Multi-Server</span>
        <span style="font-size:0.78rem; color:#64748b;">Server 2 ↗</span>
      </a>
    `;
  }

  if (DOM.mediaActionButtonsList) {
    DOM.mediaActionButtonsList.innerHTML = actionButtonsHTML;
  }

  DOM.mediaResultCard.style.display = 'flex';
  setTimeout(() => {
    DOM.mediaResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function onDirectDownloadClick(type) {
  const url = DOM.mediaUrlInput ? DOM.mediaUrlInput.value.trim() : '';
  if (url && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).catch(() => {});
  }
  showToast(`⚡ កំពុងទាញយក (${type})!`);
}

function openServerDownload(serverType) {
  let url = DOM.mediaUrlInput ? DOM.mediaUrlInput.value.trim() : '';
  if (!url) {
    setSampleMediaLink();
    url = DOM.mediaUrlInput.value.trim();
  }

  const format = state.selectedMediaFormat || 'video';
  const ytId = getYouTubeId(url);
  const isAudio = format === 'audio' || serverType === 'mp3';

  let destinationUrl = '';

  if (serverType === 'server1') {
    if (ytId) {
      destinationUrl = `https://ssyoutube.com/watch?v=${ytId}`;
    } else if (url.includes('tiktok.com')) {
      destinationUrl = `https://snaptik.app/`;
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
      destinationUrl = `https://snapsave.app/`;
    } else {
      destinationUrl = `https://cobalt.tools/`;
    }
  } else if (serverType === 'server2') {
    if (ytId) {
      destinationUrl = `https://yt5s.biz/enwr200/?q=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${ytId}`;
    } else if (url.includes('tiktok.com')) {
      destinationUrl = `https://ssstik.io/`;
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
      destinationUrl = `https://fdown.net/`;
    } else {
      destinationUrl = `https://savefrom.net/`;
    }
  } else if (serverType === 'mp3') {
    if (ytId) {
      destinationUrl = `https://ssyoutube.com/watch?v=${ytId}`;
    } else if (url.includes('tiktok.com')) {
      destinationUrl = `https://musicaldown.com/tiktok-mp3`;
    } else {
      destinationUrl = `https://cobalt.tools/`;
    }
  }

  if (url && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).catch(() => {});
  }

  // Also render result card in modal
  handleMediaDownload();

  // Open direct destination
  if (destinationUrl) {
    window.open(destinationUrl, '_blank', 'noopener,noreferrer');
  }
}


