
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const header = document.querySelector(".header");
const year = document.getElementById("year");

// Automatically display the current year.
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation.
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu after selecting a navigation link.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Add a shadow to the header when the page is scrolled.
window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
});

// Reveal sections as they enter the viewport.
const revealElements = document.querySelectorAll(
  ".problem-card, .step, .timeline-item, .revenue-card, .gtm-grid article, .team-roles > div, .unit-economics"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}
