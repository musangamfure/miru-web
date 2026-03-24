// Nav scroll effect
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// Intersection observer for reveals
const reveals = document.querySelectorAll(".reveal, .journey-step");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

reveals.forEach((el) => observer.observe(el));

// Stagger reveals
document.querySelectorAll(".reveal").forEach((el, i) => {
  const siblings = el.parentElement?.querySelectorAll(".reveal");
  let delay = 0;
  if (siblings) {
    Array.from(siblings).forEach((sib, j) => {
      if (sib === el) delay = j * 0.1;
    });
  }
  el.style.transitionDelay = delay + "s";
});

// Mobile menu
function toggleMenu() {
  const links = document.querySelector(".nav-links");
  const cta = document.querySelector("nav .nav-cta");
  if (links.style.display === "flex") {
    links.style.display = "none";
    if (cta) cta.style.display = "none";
  } else {
    links.style.cssText =
      "display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--cream);padding:2rem;gap:1.5rem;border-bottom:1px solid var(--mist);";
    if (cta) cta.style.display = "block";
  }
}

// Milestone bar animation.
const milestoneObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector(".milestone-bar");
        if (bar) {
          const targetWidth = bar.style.width;
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
        }
      }
    });
  },
  { threshold: 0.3 }
);

document
  .querySelectorAll(".milestone")
  .forEach((el) => milestoneObserver.observe(el));

// Smooth anchor scrolling.
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Hero Carousel
(function () {
  var carousel = document.getElementById("heroCarousel");
  if (!carousel) return;
  var slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  var dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
  var prev = document.getElementById("carouselPrev");
  var next = document.getElementById("carouselNext");
  var current = 0;
  var timer = null;

  function goTo(n) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function () {
      goTo(current + 1);
    }, 4800);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goTo(i);
      startAuto();
    });
  });
  if (prev)
    prev.addEventListener("click", function () {
      goTo(current - 1);
      startAuto();
    });
  if (next)
    next.addEventListener("click", function () {
      goTo(current + 1);
      startAuto();
    });

  // Swipe / touch support
  var touchStartX = 0;
  carousel.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );
  carousel.addEventListener(
    "touchend",
    function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        goTo(current + (dx < 0 ? 1 : -1));
        startAuto();
      }
    },
    { passive: true }
  );

  startAuto();
})();

// Parallax on hero text
window.addEventListener("scroll", function () {
  var scrolled = window.scrollY;
  var heroLeft = document.querySelector(".hero-left");
  if (heroLeft && scrolled < window.innerHeight) {
    heroLeft.style.transform = "translateY(" + scrolled * 0.08 + "px)";
  }
});
