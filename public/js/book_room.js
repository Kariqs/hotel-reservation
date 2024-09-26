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

//book room
document
  .getElementById("bookRoomForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
      roomType: formData.get("roomType"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      type: formData.get("type"),
      number: formData.get("number"),
      arrival: formData.get("arrival"),
      departure: formData.get("departure"),
    };
    try {
      const response = await fetch("/book-room", {
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
        showToast("Error booking room", "error");
      }
    } catch (error) {
      console.log("An error occured:", error);
    }
  });
