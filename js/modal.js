import { resetForm, clearErrors, displayError } from "./form.js";
import { modalElements } from "./elements.js";

// Open Modal Function
export function openModal() {
  modalElements.modal.classList.remove("d-none");
}

// Close Modle Function
export function closeModal() {
  resetForm();
  clearErrors();
  modalElements.modal.classList.add("d-none");
}
