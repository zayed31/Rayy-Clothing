import { products } from "../data/products.js";

import {
  openProductPreview
} from "./product-modal.js";


// GET CATEGORY FROM URL

const urlParams = new URLSearchParams(
  window.location.search
);

const category = urlParams.get("category");


// DOM ELEMENTS

const productGrid =
  document.getElementById("productGrid");

const categoryTitle =
  document.getElementById("categoryTitle");

const categoryDescription =
  document.getElementById("categoryDescription");

const emptyState =
  document.getElementById("emptyState");


// CATEGORY INFORMATION

const categoryInfo = {

  tshirts: {
    title: "T-SHIRTS",
    description:
      "Explore the latest RAYY T-shirts."
  },

  hoodies: {
    title: "HOODIES",
    description:
      "Premium oversized hoodies made for comfort."
  },

  sweatshirts: {
    title: "SWEATSHIRTS",
    description:
      "Clean silhouettes built for everyday wear."
  }

};


// SET CATEGORY HEADER

function setCategoryHeader() {

  const info = categoryInfo[category];

  if (!info) {

    categoryTitle.textContent =
      "COLLECTION";

    categoryDescription.textContent =
      "Explore the latest RAYY pieces.";

    return;
  }

  categoryTitle.textContent =
    info.title;

  categoryDescription.textContent =
    info.description;

  document.title =
    `RAYY — ${info.title}`;

}


// CREATE PRODUCT CARD

function createProductCard(product) {

  const card =
    document.createElement("article");

  card.className =
    "product-card";


  card.innerHTML = `

    <div class="product-card-image">

      <img
        src="${product.image}"
        alt="${product.title}"
        loading="lazy"
      >

    </div>


    <div class="product-card-info">

      <h2>
        ${product.title}
      </h2>

      <p>
        ₹${product.price}
      </p>

    </div>

  `;


  // OPEN PRODUCT PREVIEW

  card.addEventListener(
    "click",
    () => {

      openProductPreview(product);

    }
  );


  return card;
}


// RENDER PRODUCTS

function renderProducts() {

  if (!category) {

    showEmptyState();

    return;
  }


  const categoryProducts =
    products.filter(
      product =>
        product.category === category
    );


  // No products

  if (categoryProducts.length === 0) {

    showEmptyState();

    return;
  }


  // Clear existing products

  productGrid.innerHTML = "";


  // Render products

  categoryProducts.forEach(
    product => {

      const card =
        createProductCard(product);

      productGrid.appendChild(card);

    }
  );

}


// EMPTY STATE

function showEmptyState() {

  productGrid.innerHTML = "";

  emptyState.hidden = false;

}


// INITIALIZE PAGE

setCategoryHeader();

renderProducts();