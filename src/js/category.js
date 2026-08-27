import { products } from "../data/products.js";

import {
  openProductPreview
} from "./product-modal.js";


// ==========================================
// GET CATEGORY FROM URL
// ==========================================

const urlParams =
  new URLSearchParams(
    window.location.search
  );

const category =
  urlParams.get("category");


// ==========================================
// DOM ELEMENTS
// ==========================================

const productGrid =
  document.getElementById(
    "productGrid"
  );

const categoryTitle =
  document.getElementById(
    "categoryTitle"
  );

const categoryDescription =
  document.getElementById(
    "categoryDescription"
  );

const emptyState =
  document.getElementById(
    "emptyState"
  );


// ==========================================
// CATEGORY INFORMATION
// ==========================================

const categoryInfo = {

  oversize: {
    title: "OVERSIZED T-SHIRTS",
    description: "Heavyweight oversized tees designed for comfort, movement and everyday street style.",
    metaCategory: "TEES",
    metaTotal: "08 PIECES",
    specFabric: "PREMIUM COMBED COTTON LOOPKNIT",
    specFit: "BOXIER RELAXED / DROPPED SHOULDER",
    specGsm: "240 GSM HEAVY SHIFT",
    specDetails: "COTTON COLLARS / DOUBLE-STITCH HEMS"
  },

  hoodies: {
    title: "HOODIES",
    description: "Premium heavyweight hoodies built around a relaxed oversized silhouette.",
    metaCategory: "HOODIES",
    metaTotal: "03 PIECES",
    specFabric: "SUPER COMBED FLEECE COTTON",
    specFit: "OVERSIZED DROP / RELAXED HOOD",
    specGsm: "430 GSM ULTRA HEAVYWEIGHT",
    specDetails: "RIBBED SIDE PANELS & DEEP POCKETS"
  },

  polo: {
    title: "POLOS",
    description: "Classic polos crafted from premium cotton with a clean, refined fit.",
    metaCategory: "POLOS",
    metaTotal: "09 PIECES",
    specFabric: "PREMIUM COMBED COTTON PIQUE",
    specFit: "REGULAR REFINE FIT / RIBBED SLEEVES",
    specGsm: "240 GSM BREATHABLE MESH",
    specDetails: "REINFORCED PLACKET / DEBOSS BUTTONS"
  }

};


// ==========================================
// SET CATEGORY HEADER
// ==========================================

function setCategoryHeader() {

  const info =
    categoryInfo[category];


  if (!info) {

    categoryTitle.textContent =
      "COLLECTION";

    categoryDescription.textContent =
      "Explore the latest RAYY pieces.";

    return;

  }


  // Split title programmatically to support word mask entrance animations
  const words = info.title.split(" ");
  categoryTitle.innerHTML = "";
  words.forEach((word, idx) => {
    const wordWrap = document.createElement("span");
    wordWrap.className = "word-wrap";

    const animateWord = document.createElement("span");
    animateWord.className = `animate-word delay-${idx + 1}`;
    animateWord.textContent = word;

    wordWrap.appendChild(animateWord);
    categoryTitle.appendChild(wordWrap);

    if (idx < words.length - 1) {
      categoryTitle.appendChild(document.createTextNode(" "));
    }
  });


  categoryDescription.textContent =
    info.description;


  document.title =
    `RAYY — ${info.title}`;


  // Populate dynamic header metrics and specifications
  const metaCategoryTag = document.getElementById("metaCategoryTag");
  const specFabric = document.getElementById("specFabric");
  const specFit = document.getElementById("specFit");
  const specGsm = document.getElementById("specGsm");
  const specDetails = document.getElementById("specDetails");

  if (metaCategoryTag) metaCategoryTag.textContent = `[ INDEX: ${info.metaTotal} ]`;
  if (specFabric) specFabric.textContent = info.specFabric;
  if (specFit) specFit.textContent = info.specFit;
  if (specGsm) specGsm.textContent = info.specGsm;
  if (specDetails) specDetails.textContent = info.specDetails;

}


// ==========================================
// CREATE PRODUCT CARD
// ==========================================

function createProductCard(product) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "product-card";


  card.innerHTML = `

    <div class="product-card-image image-loading-placeholder">

      ${product.customizable ? '<span class="badge-custom">✦ CUSTOMIZABLE</span>' : ''}

      <img
        src="${product.image}"
        alt="${product.title}"
        class="smooth-load-image"
        loading="lazy"
        decoding="async"
      >

      <div class="quick-view-bar">QUICK VIEW</div>

    </div>


    <div class="product-card-info">

      <div class="product-card-meta">

        <h2>
          ${product.title}
        </h2>

        <span class="product-card-fit">
          ${product.category === 'oversize' ? 'Oversized Fit' : product.category === 'hoodies' ? 'Unisex Hoodie' : 'Classic Fit'}
        </span>

      </div>

      <p class="product-card-price">
        ₹${product.price}
      </p>

    </div>

  `;


  const imgWrapper = card.querySelector(".product-card-image");
  const img = card.querySelector("img");

  function handleImageLoad() {
    img.classList.add("loaded");
    imgWrapper.classList.add("loaded");
  }

  if (typeof img.decode === "function") {
    img.decode()
      .then(handleImageLoad)
      .catch(() => {
        if (img.complete) {
          handleImageLoad();
        } else {
          img.addEventListener("load", handleImageLoad);
        }
      });
  } else {
    if (img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
    }
  }


  // ========================================
  // OPEN PRODUCT PREVIEW
  // ========================================

  card.addEventListener(
    "click",
    () => {

      openProductPreview(
        product
      );

    }
  );


  return card;

}


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts() {

  if (!category) {

    showEmptyState();

    return;

  }


  const categoryProducts =
    products.filter(
      product =>
        product.category ===
        category
    );


  if (
    categoryProducts.length === 0
  ) {

    showEmptyState();

    return;

  }


  productGrid.innerHTML = "";

  emptyState.hidden = true;


  categoryProducts.forEach(
    product => {

      const card =
        createProductCard(
          product
        );


      productGrid.appendChild(
        card
      );

    }
  );

  initProductScrollObserver();

}


// ==========================================
// EMPTY STATE
// ==========================================

function showEmptyState() {

  productGrid.innerHTML = "";

  emptyState.hidden = false;

}


// ==========================================
// INITIALIZE
// ==========================================

setCategoryHeader();

renderProducts();

// Intersection Observer for Product Cards (fade in once on scroll)
function initProductScrollObserver() {
  const productCards = document.querySelectorAll(".product-card");
  if (productCards.length > 0) {
    const cardObserver = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );
    productCards.forEach(card => cardObserver.observe(card));
  }
}