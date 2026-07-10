import { displayError, getFormData, scrollToNewContact } from "./form.js";
import { closeModal, openModal } from "./modal.js";
import { validateContact } from "./validation.js";
import { showSuccess } from "./notifications.js";
import { saveContacts } from "./storage.js";
import { renderUI } from "./render.js";

import {
  defaultImage,
  formElements,
  modalElements,
  state,
} from "./elements.js";

export function updateContactData() {
  const updatedContact = getFormData();

  const result = validateContact(updatedContact);

  if (!result.valid) {
    displayError(result.message, result.field);
    return;
  }

  state.contactsList = state.contactsList.map((contact) => {
    if (contact.id === state.editingId) {
      return {
        ...contact,
        ...updatedContact,
      };
    }

    return contact;
  });

  saveContacts(state.contactsList);

  showSuccess("Contact updated successfully");

  state.editingId = null;

  modalElements.saveBtn.textContent = "Save";

  closeModal();

  renderUI();
}

export function handleFavorite(contactId) {
  const currentContact = state.contactsList.find(
    (contact) => contact.id === contactId,
  );

  if (!currentContact) return;

  currentContact.favorite = !currentContact.favorite;

  saveContacts(state.contactsList);
  renderUI();
}

export function handleEmergency(contactId) {
  const currentContact = state.contactsList.find(
    (contact) => contact.id === contactId,
  );

  if (!currentContact) return;

  currentContact.emergency = !currentContact.emergency;

  saveContacts(state.contactsList);

  renderUI();
}

export function addContact() {
  const contact = {
    id: Date.now(),
    ...getFormData(),
  };

  const result = validateContact(contact);

  if (!result.valid) {
    displayError(result.message, result.field);
    return;
  }

  state.contactsList.push(contact);
  saveContacts(state.contactsList);

  showSuccess("Contact added successfully");

  closeModal();

  renderUI();

  scrollToNewContact();
}

export function deleteContact(id) {
  state.contactsList = state.contactsList.filter((contact) => {
    return contact.id !== id;
  });

  saveContacts(state.contactsList);
  renderUI();
}

export function updateContact(id) {
  state.editingId = id;

  modalElements.saveBtn.textContent = "Update";

  const currentEditcontact = state.contactsList.find((contact) => {
    return contact.id === id;
  });

  openModal();

  formElements.fullName.value = currentEditcontact.fullName;
  formElements.phone.value = currentEditcontact.phone;
  formElements.email.value = currentEditcontact.email;
  formElements.address.value = currentEditcontact.address;
  formElements.group.value = currentEditcontact.group;
  formElements.favorite.checked = currentEditcontact.favorite;
  formElements.emergency.checked = currentEditcontact.emergency;
}
