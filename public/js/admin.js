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

//Submit room data
document
  .getElementById("roomsForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
      type: formData.get("roomType"),
      single: formData.get("singlePrice"),
      double: formData.get("doublePrice"),
      total: formData.get("totalRooms"),
      url: formData.get("imageUrl"),
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
        this.reset();
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      console.log("An error occured:", error);
    }
  });

//Submit conference room data
document
  .getElementById("confForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
      confname: formData.get("confname"),
      capacity: formData.get("capacity"),
      charges: formData.get("cost"),
      confdesc: formData.get("confdesc"),
      url: formData.get("confImage"),
    };
    try {
      const response = await fetch("/admin/conference/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        showToast(result.message, "success");
        this.reset();
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      console.log("An error occured:", error);
    }
  });

//submit menuItem data
document
  .getElementById("menuForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      imageUrl: formData.get("imageUrl"),
    };
    try {
      const response = await fetch("/admin/menu/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        showToast(result.message, "success");
        this.reset();
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      console.log("An error occured:", error);
    }
  });
