function initNavbar() {
  const navbarElement = document.querySelector(".navbar");
  if (!navbarElement) return;

  const currentPath = window.location.pathname;
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  const isHome = filename === "" || filename === "index.html";
  const isCollections = filename === "collections.html" || filename === "category.html";
  const isContact = filename === "contact.html";

  navbarElement.innerHTML = `
    <a class="logo" href="index.html">RAYY</a>

    <nav class="nav-links" id="navLinks">
      <a href="index.html"${isHome ? ' class="active"' : ''}>Home</a>
      <a href="collections.html"${isCollections ? ' class="active"' : ''}>Collections</a>
      <a href="contact.html"${isContact ? ' class="active"' : ''}>Contact</a>
    </nav>

    <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
  `;

  // Bind the mobile menu toggle event listener
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
}

initNavbar();

// Small reveal animation for sections.
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach(section => observer.observe(section));

// Intersection Observer for Collections Category Cards (fade in once on scroll)
const categoryCards = document.querySelectorAll(".category-card");
if (categoryCards.length > 0) {
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
  categoryCards.forEach(card => cardObserver.observe(card));
}