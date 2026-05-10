const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealTargets = document.querySelectorAll(".js-reveal");
const mapFrame = document.querySelector(".google-map__frame");
const mapTabs = document.querySelectorAll(".map-tab");

navToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("is-nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("is-nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "メニューを開く");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px",
  }
);

revealTargets.forEach((target) => {
  revealObserver.observe(target);
});

mapTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    mapTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    mapFrame.src = tab.dataset.map;
  });
});
