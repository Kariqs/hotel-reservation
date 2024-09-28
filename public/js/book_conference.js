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

//book a conference room
document
  .getElementById("bookConferenceForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
      roomName: formData.get("roomName"),
      arrivalDate: formData.get("arrivalDate"),
      departureDate: formData.get("departureDate"),
      checkinTime: formData.get("checkinTime"),
      checkoutTime: formData.get("checkoutTime"),
      organisationName: formData.get("organisationName"),
      email: formData.get("email"),
    };
    try {
      const response = await fetch("/book-conference", {
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
