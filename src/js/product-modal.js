// DOM ELEMENTS

const modal =
  document.getElementById("productModal");

const modalOverlay =
  document.getElementById(
    "productModalOverlay"
  );

const closeButton =
  document.getElementById(
    "productModalClose"
  );

const modalImage =
  document.getElementById(
    "modalProductImage"
  );

const modalCategory =
  document.getElementById(
    "modalProductCategory"
  );

const modalTitle =
  document.getElementById(
    "modalProductTitle"
  );

const modalPrice =
  document.getElementById(
    "modalProductPrice"
  );

const modalDescription =
  document.getElementById(
    "modalProductDescription"
  );

const buyButton =
  document.getElementById(
    "modalBuyButton"
  );

const customizeButton =
  document.getElementById(
    "modalCustomizeButton"
  );


// CURRENT PRODUCT

let currentProduct = null;


// OPEN PRODUCT PREVIEW

export function openProductPreview(product) {

  if (!product) {
    return;
  }


  currentProduct = product;


  // Product image

  modalImage.src =
    product.image;

  modalImage.alt =
    product.title;


  // Product category

  modalCategory.textContent =
    formatCategoryName(
      product.category
    );


  // Product title

  modalTitle.textContent =
    product.title;


  // Product price

  modalPrice.textContent =
    `₹${product.price}`;


  // Product description

  modalDescription.textContent =
    product.description ||
    "No description available.";


  // Show modal

  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  // Prevent background scrolling

  document.body.classList.add(
    "modal-open"
  );

}


// CLOSE PRODUCT PREVIEW

export function closeProductPreview() {

  modal.classList.remove(
    "active"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "modal-open"
  );


  currentProduct = null;

}


// FORMAT CATEGORY NAME

function formatCategoryName(category) {

  if (!category) {
    return "PRODUCT";
  }


  return category
    .replace("-", " ")
    .toUpperCase();

}


// CLOSE BUTTON

closeButton.addEventListener(
  "click",
  closeProductPreview
);


// OVERLAY CLICK

modalOverlay.addEventListener(
  "click",
  closeProductPreview
);


// ESC KEY

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      modal.classList.contains("active")
    ) {

      closeProductPreview();

    }

  }
);


// BUY NOW

buyButton.addEventListener(
  "click",
  () => {

    if (!currentProduct) {
      return;
    }

    console.log(
      "BUY NOW:",
      currentProduct
    );

    /*
      WhatsApp logic will be added later.
    */

  }
);


// CUSTOMIZE

customizeButton.addEventListener(
  "click",
  () => {

    if (!currentProduct) {
      return;
    }

    console.log(
      "CUSTOMIZE:",
      currentProduct
    );

    /*
      Customize logic will be added later.
    */

  }
);