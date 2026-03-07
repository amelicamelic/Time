// Simple ID popup
const idValue = "Admin";

function showIDPopup(event) {
  event.preventDefault();
  const title = event.target.getAttribute("data-popup-title") || "Get in touch";
  const id = idValue;

  // Create and setup popup
  const popup = document.createElement("div");
  popup.className = "email-popup";
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-label", "User ID");

  const content = document.createElement("div");
  content.className = "email-popup-content";

  // Build content before adding to DOM
  content.innerHTML = `
    <img src="./RabbitPOINT_files/GH0zYWKa4AA15J.png" alt="Avatar" class="email-popup-avatar">
    <h3>${title}</h3>
    <p>${id}</p>
    <button>Copy ID</button>
  `;

  popup.appendChild(content);
  const popupWrapper = document.getElementById("popup-wrapper");

  if (!popupWrapper) {
    console.error("Popup wrapper element not found!");
    return;
  }

  // Add to DOM
  popupWrapper.appendChild(popup);

  // Trigger page zoom
  document.body.classList.add("popup-active");

  const copyButton = content.querySelector("button");

  // Copy handler
  copyButton.onclick = async () => {
    try {
      await navigator.clipboard.writeText(id);
      copyButton.textContent = "Copied!";
      setTimeout(() => (copyButton.textContent = "Copy ID"), 2000);
    } catch (error) {
      console.error("Failed to copy ID:", error);
      copyButton.textContent = "Failed to copy";
      setTimeout(() => (copyButton.textContent = "Copy ID"), 2000);
    }
  };

  // Close popup when clicking outside
  const closePopup = (e) => {
    if (e.target !== popup) return;

    popup.classList.add("closing");
    document.body.classList.remove("popup-active");

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

  // Escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closePopup({ target: popup });
    }
  };

  popup.addEventListener("click", closePopup);
  document.addEventListener("keydown", handleEscape);
}