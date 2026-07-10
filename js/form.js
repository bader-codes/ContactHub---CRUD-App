import { state, modalElements, formElements, defaultImage } from "./elements.js";

// Clear Form Inputs Fields
export function resetForm() {
  state.editingId = null;
  modalElements.saveBtn.textContent = "Save";

  formElements.fullName.value = "";
  formElements.phone.value = "";
  formElements.email.value = "";
  formElements.address.value = "";
  formElements.group.selectedIndex = 0;
  formElements.favorite.checked = false;
  formElements.emergency.checked = false;
}

// Show Error Message
export function displayError(error, field) {
  const errorField = document.getElementById(`${field}-error-msg`);
  errorField.style.display = "block";
  errorField.textContent = error;
}

// Clear Fields Error
export function clearErrors() {
  const errors = document.querySelectorAll(".validation-msg");

  errors.forEach((error) => {
    error.style.display = "none";
    error.textContent = "";
  });
}

export function scrollToNewContact() {
  const lastContact = document.querySelector(".contact-item:last-child");

  if (lastContact) {
    lastContact.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

export function getFormData() {
  return {
    fullName: formElements.fullName.value,
    image: defaultImage,
    phone: formElements.phone.value,
    email: formElements.email.value,
    address: formElements.address.value,
    group: formElements.group.value,
    favorite: formElements.favorite.checked,
    emergency: formElements.emergency.checked,
  };
}
