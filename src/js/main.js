function initNavbar() {
  const navbarElement = document.querySelector(".navbar");
  if (!navbarElement) return;

  const currentPath = window.location.pathname;
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  const isHome = filename === "" || filename === "index.html";
  const isCollections = filename === "collections.html" || filename === "category.html";
  const isContact = filename === "contact.html";

  navbarElement.innerHTML = `
    <a class="logo" href="index.html">
      <img src="assets/additionalimages/favicon.png" alt="RAYY logo" class="logo-icon">
      
    </a>

    <nav class="nav-links" id="navLinks">
      <a href="index.html"${isHome ? ' class="active"' : ''}>Home</a>
      <a href="collections.html"${isCollections ? ' class="active"' : ''}>Collections</a>
      <a href="contact.html"${isContact ? ' class="active"' : ''}>Contact</a>
      <div class="nav-indicator" id="navIndicator"></div>
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
      menuToggle.classList.toggle("open");
    });
  }

  // Handle single line sliding tab indicator (Desktop only)
  const indicator = document.getElementById("navIndicator");
  const activeLink = navLinks ? navLinks.querySelector("a.active") : null;

  if (indicator && activeLink && window.innerWidth > 800) {
    const updatePosition = () => {
      indicator.style.transition = "none";
      indicator.style.left = activeLink.offsetLeft + "px";
      indicator.style.width = activeLink.offsetWidth + "px";
      indicator.offsetHeight; // Force reflow
      indicator.style.transition = "left 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    // Position indicator instantly on load
    updatePosition();

    // Re-verify layouts when window loads and fonts are loaded to avoid alignment drifts
    window.addEventListener("load", updatePosition);
    if (document.fonts) {
      document.fonts.ready.then(updatePosition);
    }

    // Update position on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        updatePosition();
      }
    });
  }

  // Intercept navigation link clicks for smooth tab line slide transitions (Desktop only)
  if (window.innerWidth > 800 && navLinks && indicator) {
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetUrl = link.getAttribute("href");

        // If the link is already active, or it is an external link, do standard behavior
        if (link.classList.contains("active") || targetUrl.startsWith("http") || targetUrl.startsWith("#")) {
          return;
        }

        e.preventDefault();

        // Slide the indicator line to the target clicked tab
        indicator.style.left = link.offsetLeft + "px";
        indicator.style.width = link.offsetWidth + "px";

        // Delay page navigation to allow the line slide transition to complete (350ms)
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 350);
      });
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