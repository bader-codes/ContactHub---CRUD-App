import { showSuccess, warningMsg } from "./notifications.js";
import {
  renderContactList,
  renderFavoritesContacts,
  renderUI,
} from "./render.js";
import { closeModal, openModal } from "./modal.js";
import { clearErrors } from "./form.js";

import {
  state,
  cardContainer,
  modalElements,
  searchInput,
} from "./elements.js";

import {
  addContact,
  deleteContact,
  handleEmergency,
  handleFavorite,
  updateContact,
  updateContactData,
} from "./contactService.js";

renderUI();

// Open Box Modle
modalElements.openBtn.addEventListener("click", openModal);

// Handle Cancel Button & Handle Close Button
[modalElements.cancelBtn, modalElements.closeBtn].forEach((button) => {
  button.addEventListener("click", closeModal);
});

modalElements.saveBtn.addEventListener("click", () => {
  clearErrors();

  if (state.editingId === null) {
    addContact();
  } else {
    updateContactData();
  }
});

cardContainer.addEventListener("click", function (e) {
  const card = e.target.closest(".contact-item");

  if (!card) return;

  const id = Number(card.dataset.id);

  searchInput.value = "";

  // Handle Delete Button & Delete Contact Logic
  const deleteButton = e.target.closest(".delete-btn");

  if (deleteButton) {
    warningMsg("Do you want to delete Contact?").then((result) => {
      if (result.isConfirmed) {
        deleteContact(id);

        showSuccess("Contact deleted successfully");
      }
    });

    return;
  }

  // Update Contact
  const updateButton = e.target.closest(".edit-btn");

  if (updateButton) {
    updateContact(id);
  }

  // Handle Favorite Button & Swap Favorite Contact Logic
  const favoriteButton = e.target.closest(".favorite-btn");

  if (favoriteButton) {
    handleFavorite(id);

    const favoritesContacts = state.contactsList.filter(
      (contact) => contact.favorite,
    );

    renderContactList(favoritesContacts, "favorite-contact-menu", false);
  }

  // Handle Emergency Button & Swap Emergency Contact Logic
  const emergencyButton = e.target.closest(".emergency-btn");

  if (emergencyButton) {
    handleEmergency(id);
  }
});

searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.trim().toLowerCase();

  const filteredContacts = state.contactsList.filter((contact) => {
    return contact.fullName.toLowerCase().includes(keyword.toLowerCase());
  });

  renderContactList(filteredContacts, "contact-list");
  renderFavoritesContacts(filteredContacts);
});
