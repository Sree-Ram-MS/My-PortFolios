const roleWords = ["Graphic Designer", "UI/UX Designer", "Framer Expert"];
const roleEl = document.querySelector(".role-word");
let roleIndex = 0;

setInterval(() => {
  roleIndex = (roleIndex + 1) % roleWords.length;
  roleEl.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-8px)" },
    ],
    { duration: 180, easing: "ease-out" }
  ).onfinish = () => {
    roleEl.textContent = roleWords[roleIndex];
    roleEl.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "ease-out" }
    );
  };
}, 2200);

const counters = document.querySelectorAll("[data-count]");
const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.count);
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        entry.target.textContent = Math.round(progress * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => countObserver.observe(counter));

const loadMore = document.querySelector(".load-more");
const projectsGrid = document.querySelector(".projects-grid");

loadMore.addEventListener("click", () => {
  const open = projectsGrid.classList.toggle("show-extra");
  loadMore.textContent = open ? "Show Less" : "Load More";
  loadMore.setAttribute("aria-expanded", String(open));
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const original = button.textContent;
  button.textContent = "Message Ready";
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
});
