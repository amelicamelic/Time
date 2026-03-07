// Theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

function showReaction() {
  const reaction = document.createElement("img");
  reaction.src = "./images/my-eyes.gif";
  reaction.className = "reaction-overlay";

  const maxX = window.innerWidth - 308;
  const maxY = window.innerHeight - 176;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  reaction.style.left = `${randomX}px`;
  reaction.style.top = `${randomY}px`;

  reaction.onload = () => {
    document.body.appendChild(reaction);
    setTimeout(() => reaction.remove(), 1000);
  };
}

function setTheme(isDark, showAnimation = false) {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  sunIcon.style.display = isDark ? "none" : "block";
  moonIcon.style.display = isDark ? "block" : "none";
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Update theme-color meta tag
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  metaThemeColor.setAttribute("content", isDark ? "#1a1a1e" : "#fafafa");

  if (!isDark && showAnimation) {
    showReaction();
  }
}

// Skip initial theme setup since it's handled by the inline script in HTML head
const savedTheme = localStorage.getItem("theme");
const isDark = document.documentElement.getAttribute("data-theme") === "dark";
sunIcon.style.display = isDark ? "none" : "block";
moonIcon.style.display = isDark ? "block" : "none";

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  setTheme(!isDark, true);
});

// Signature animation
document.addEventListener("DOMContentLoaded", () => {
  const signature = document.getElementById("signature");
  const length = signature.getTotalLength();

  signature.style.opacity = "0";
  signature.style.strokeDasharray = length;
  signature.style.strokeDashoffset = length;

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      signature.style.opacity = "1";
      signature.style.transition = "stroke-dashoffset 2s cubic-bezier(.6,0,.4,1), opacity 0.3s ease";
      signature.style.strokeDashoffset = "0";
    }
  }).observe(document.querySelector(".signature-container"));
});
