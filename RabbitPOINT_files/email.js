// Simple email obfuscation
const emailParts = {
  user: "mirai03",
  domain: "raitomirai",
  tld: "com",
};

function showEmailPopup(event) {
  event.preventDefault();
  const title = event.target.getAttribute("data-popup-title") || "Get in touch";
  const email = `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;

  // Create and setup popup
  const popup = document.createElement("div");
  popup.className = "email-popup";
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-label", "Email Address");

  const content = document.createElement("div");
  content.className = "email-popup-content";

  // Build content before adding to DOM
  content.innerHTML = `
    <img src="./RabbitPOINT_files/GExn1L7bYAAjTEL.png" alt="Mighty Alex" class="email-popup-avatar">
    <h3>${title}</h3>
    <p>${email}</p>
    <button>Copy Email</button>
  `;

  popup.appendChild(content);
  const popupWrapper = document.getElementById("popup-wrapper");

  // Check if popup wrapper exists
  if (!popupWrapper) {
    console.error("Popup wrapper element not found!");
    return;
  }

  // Add to DOM
  popupWrapper.appendChild(popup);

  // Trigger page zoom in next frame
  document.body.classList.add("popup-active");

  const copyButton = content.querySelector("button");

  // Setup copy handler
  copyButton.onclick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Copied!";
      setTimeout(() => (copyButton.textContent = "Copy Email"), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
      copyButton.textContent = "Failed to copy";
      setTimeout(() => (copyButton.textContent = "Copy Email"), 2000);
    }
  };

  // Close popup when clicking outside
  const closePopup = (e) => {
    if (e.target !== popup) return;

    // Add closing class to trigger animations
    popup.classList.add("closing");
    document.body.classList.remove("popup-active");

    // Listen for the content animation to finish
    const content = popup.querySelector(".email-popup-content");
    content.addEventListener(
      "animationend",
      () => {
        document.removeEventListener("keydown", handleEscape);
        popup.removeEventListener("click", closePopup);
        popup.remove();
      },
      { once: true }
    );
  };

  // Add escape key handler
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closePopup({ target: popup });
    }
  };

  popup.addEventListener("click", closePopup);
  document.addEventListener("keydown", handleEscape);
}
