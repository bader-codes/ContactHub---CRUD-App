const addContactButton = document.getElementById("addContactBtn");
const contactModal = document.getElementById("contact-modal");

// Open Modal Function
function openModal() {
  contactModal.classList.remove("d-none");
}
// Open Box Modle
addContactButton.addEventListener("click", openModal);

// Close Modle Function
function closeModal() {
  contactModal.classList.add("d-none");
}
const closeModalBtn = document.getElementById("close-btn");
const cancelButton = document.getElementById("cancel-contact-btn");

// Handle Cancel Button
cancelButton.addEventListener("click", closeModal);

// Handle Close Button
closeModalBtn.addEventListener("click", closeModal);
