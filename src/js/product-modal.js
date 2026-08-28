import {
  openWhatsApp
} from "./whatsapp.js";


// ==========================================
// DOM ELEMENTS
// ==========================================

const modal =
  document.getElementById(
    "productModal"
  );

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

const sizeOptions =
  document.getElementById(
    "sizeOptions"
  );

const sizeError =
  document.getElementById(
    "sizeError"
  );

const buyButton =
  document.getElementById(
    "modalBuyButton"
  );

const customizeButton =
  document.getElementById(
    "modalCustomizeButton"
  );


// ==========================================
// SIZE GUIDE ELEMENTS
// ==========================================

const sizeGuideButton =
  document.getElementById(
    "sizeGuideButton"
  );

const sizeGuideModal =
  document.getElementById(
    "sizeGuideModal"
  );

const sizeGuideOverlay =
  document.getElementById(
    "sizeGuideOverlay"
  );

const sizeGuideClose =
  document.getElementById(
    "sizeGuideClose"
  );

const sizeGuideImage =
  document.getElementById(
    "sizeGuideImage"
  );

const sizeGuideTitle =
  document.getElementById(
    "sizeGuideTitle"
  );


// ==========================================
// CURRENT PRODUCT
// ==========================================

let currentProduct = null;

let selectedSize = null;


// ==========================================
// SIZE CONFIGURATION
// ==========================================

const sizeConfig = {

  oversize: [
    "S",
    "M",
    "L",
    "XL",
    "XXL"
  ],

  hoodies: [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL"
  ],

  polo: [
    "S",
    "M",
    "L",
    "XL",
    "XXL"
  ]

};


// ==========================================
// SIZE GUIDE CONFIGURATION
// ==========================================

const sizeGuideConfig = {

  oversize: {

    title:
      "OVERSIZED T-SHIRT SIZE GUIDE",

    image:
      "assets/size-guides/tshirts-size-guide.png"

  },


  hoodies: {

    title:
      "HOODIE SIZE GUIDE",

    image:
      "assets/size-guides/hoodies-size-guide.png"

  },


  polo: {

    title:
      "POLO SIZE GUIDE",

    image:
      "assets/size-guides/polos-size-guide.png"

  }

};


// ==========================================
// OPEN PRODUCT PREVIEW
// ==========================================

export function openProductPreview(
  product
) {

  if (!product) {
    return;
  }


  currentProduct =
    product;


  selectedSize =
    null;


  // ========================================
  // PRODUCT IMAGE
  // ========================================

  const modalImageWrapper = document.querySelector(".product-modal-image-wrapper");

  modalImage.classList.remove("loaded");
  if (modalImageWrapper) {
    modalImageWrapper.classList.add("image-loading-placeholder");
    modalImageWrapper.classList.remove("loaded");
  }

  function handleModalImageLoad() {
    modalImage.classList.add("loaded");
    if (modalImageWrapper) {
      modalImageWrapper.classList.add("loaded");
    }
  }

  let activeDecodeUrl = product.image;

  // Bind onload / onerror handlers before setting the src to ensure reliability
  modalImage.onload = () => {
    if (activeDecodeUrl === modalImage.src) {
      handleModalImageLoad();
    }
  };

  modalImage.onerror = () => {
    if (activeDecodeUrl === modalImage.src) {
      handleModalImageLoad();
    }
  };

  modalImage.src =
    product.image;


  modalImage.alt =
    product.title;

  // Fallback for immediate cached hits
  if (modalImage.complete) {
    handleModalImageLoad();
  }


  // ========================================
  // PRODUCT CATEGORY
  // ========================================

  modalCategory.textContent =
    formatCategoryName(
      product.category
    );


  // ========================================
  // PRODUCT TITLE
  // ========================================

  modalTitle.textContent =
    product.title;


  // ========================================
  // PRODUCT PRICE
  // ========================================

  modalPrice.textContent =
    `₹${product.price}`;


  // ========================================
  // PRODUCT DESCRIPTION
  // ========================================

  modalDescription.textContent =
    product.description ||
    "No description available.";


  // ========================================
  // SIZE OPTIONS
  // ========================================

  renderSizeOptions(
    product.category
  );


  // Reset error

  sizeError.classList.remove(
    "visible"
  );


  // ========================================
  // SHOW MODAL
  // ========================================

  modal.classList.add(
    "active"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "modal-open"
  );

}


// ==========================================
// RENDER SIZE OPTIONS
// ==========================================

function renderSizeOptions(
  category
) {

  sizeOptions.innerHTML = "";


  const sizes =
    sizeConfig[category] || [];


  sizes.forEach(
    size => {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "size-option";


      button.textContent =
        size;


      button.addEventListener(
        "click",
        () => {

          selectSize(
            size,
            button
          );

        }
      );


      sizeOptions.appendChild(
        button
      );

    }
  );

}


// ==========================================
// SELECT SIZE
// ==========================================

function selectSize(
  size,
  button
) {

  selectedSize =
    size;


  // Remove selection

  document
    .querySelectorAll(
      ".size-option"
    )
    .forEach(
      option => {

        option.classList.remove(
          "selected"
        );

      }
    );


  // Select current button

  button.classList.add(
    "selected"
  );


  // Hide error

  sizeError.classList.remove(
    "visible"
  );

}


// ==========================================
// CLOSE PRODUCT PREVIEW
// ==========================================

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


  currentProduct =
    null;


  selectedSize =
    null;

}


// ==========================================
// FORMAT CATEGORY
// ==========================================

function formatCategoryName(
  category
) {

  const names = {

    oversize:
      "OVERSIZED T-SHIRT",

    hoodies:
      "HOODIE",

    polo:
      "POLO"

  };


  return (
    names[category] ||
    "PRODUCT"
  );

}


// ==========================================
// CLOSE BUTTON
// ==========================================

closeButton.addEventListener(
  "click",
  closeProductPreview
);


// ==========================================
// OVERLAY
// ==========================================

modalOverlay.addEventListener(
  "click",
  closeProductPreview
);


// ==========================================
// ESC KEY
// ==========================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      if (
        modal.classList.contains(
          "active"
        )
      ) {

        closeProductPreview();

      }


      if (
        sizeGuideModal.classList.contains(
          "active"
        )
      ) {

        closeSizeGuide();

      }

    }

  }
);


// ==========================================
// BUY NOW
// ==========================================

buyButton.addEventListener(
  "click",
  () => {

    if (!currentProduct) {
      return;
    }


    // Size is required

    if (!selectedSize) {

      sizeError.classList.add(
        "visible"
      );

      return;

    }


    // ======================================
    // WHATSAPP MESSAGE
    // ======================================

    const message =
      `Hi RAYY, 
I'm interested in buying this:
Product: ${currentProduct.title} (ID: ${currentProduct.id})
Size: ${selectedSize}

Please let me know how to proceed with the order.`;


    openWhatsApp(
      message
    );

  }
);


// ==========================================
// CUSTOMIZE
// ==========================================

customizeButton.addEventListener(
  "click",
  () => {

    if (!currentProduct) {
      return;
    }


    // Size is required

    if (!selectedSize) {

      sizeError.classList.add(
        "visible"
      );

      return;

    }


    // ======================================
    // WHATSAPP MESSAGE (CUSTOMIZE)
    // ======================================

    const message =
      `Hi RAYY, I'm interested in customizing this:
Product: ${currentProduct.title} (ID: ${currentProduct.id})
Size: ${selectedSize}

I would like to discuss custom design options for this piece.`;


    openWhatsApp(
      message
    );

  }
);


// ==========================================
// OPEN SIZE GUIDE
// ==========================================

sizeGuideButton.addEventListener(
  "click",
  () => {

    if (!currentProduct) {
      return;
    }


    openSizeGuide(
      currentProduct.category
    );

  }
);


// ==========================================
// OPEN SIZE GUIDE
// ==========================================

function openSizeGuide(
  category
) {

  const guide =
    sizeGuideConfig[category];


  if (!guide) {
    return;
  }


  sizeGuideTitle.textContent =
    guide.title;


  sizeGuideImage.src =
    guide.image;


  sizeGuideImage.alt =
    guide.title;


  sizeGuideModal.classList.add(
    "active"
  );


  sizeGuideModal.setAttribute(
    "aria-hidden",
    "false"
  );

}


// ==========================================
// CLOSE SIZE GUIDE
// ==========================================

function closeSizeGuide() {

  sizeGuideModal.classList.remove(
    "active"
  );


  sizeGuideModal.setAttribute(
    "aria-hidden",
    "true"
  );


  sizeGuideImage.src =
    "";

}


// ==========================================
// SIZE GUIDE CLOSE BUTTON
// ==========================================

sizeGuideClose.addEventListener(
  "click",
  closeSizeGuide
);


// ==========================================
// SIZE GUIDE OVERLAY
// ==========================================

sizeGuideOverlay.addEventListener(
  "click",
  closeSizeGuide
);