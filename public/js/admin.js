// JavaScript to handle panel switching
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });
  // Show the clicked section
  document.getElementById(sectionId).classList.remove("hidden");
}

// Function to show toast notifications
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  if (type === "success") {
    toast.classList.add("toast-success");
  } else if (type === "error") {
    toast.classList.add("toast-error");
  }
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

//submit room data
document
  .getElementById("roomsForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
      type: formData.get("roomType"),
      single: formData.get("singlePrice"),
      double: formData.get("doublePrice"),
    };
    try {
      const response = await fetch("/admin/rooms/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        showToast(result.message, "success");
      } else {
        showToast("Error adding room", "error");
      }
    } catch (error) {
      console.log("An error occured:", error);
    }
  });
