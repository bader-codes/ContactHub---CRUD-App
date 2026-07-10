import { dashboardElements, searchInput, state } from "./elements.js";

export function renderContactList(
  contactList,
  containerId,
  showActions = true,
) {
  let HTMLMarkup = "";

  if (contactList.length === 0) {
    HTMLMarkup = `
    <div class="no-contact-data d-flex justify-content-center align-items-center">
      <i class="fa-solid fa-address-book no-contact-data-icon"></i>
      <p class="m-0">No contacts yet.</p>
    </div>
  `;

    document.getElementById(containerId).innerHTML = HTMLMarkup;
    return;
  }

  const GROUP_NAMES = {
    1: "Family",
    2: "Friends",
    3: "Work",
    4: "School",
    5: "Other",
  };

  contactList.forEach((contact) => {
    let groupValue = GROUP_NAMES[contact.group] || "";

    HTMLMarkup += `

    <div class="contact-item d-flex card my-3 shadow position-relative" data-id="${contact.id}">
      <div class="group-name position-absolute m-2 px-2 py-1 rounded-1">
        ${groupValue}
      </div>

      <div class="user-data d-flex p-3">
        <div class="user-info p-2 d-flex flex-column gap-2">

        ${userImage(contact)}

        ${userData(contact)}

        ${renderContactBadges(contact)}

        ${showActions ? `${cardFeature(contact)}` : ""}

        </div>
      </div>
    </div>
    `;
  });

  document.getElementById(containerId).innerHTML = HTMLMarkup;
}

export function userImage(contact) {
  return `
          <div class="image-box d-flex align-items-center gap-3">
            <img
              class="w-100"
              src="${contact.image}"
              alt="${contact.fullName} image"
            />
            <h2 class="user-name">${contact.fullName}</h2>
          </div>
  `;
}

export function userData(contact) {
  return `
          <div class="user-phone d-flex align-items-center gap-2 mt-2">
            <i class="fa-solid fs-6 fa-phone phone-icon"></i>
            <h3 class="mb-0 user-phone">${contact.phone}</h3>
          </div>

          <div class="user-email d-flex align-items-center gap-2 my-1">
            <i class="fs-6 fa-solid fa-envelope email-icon"></i>
            <h3 class="mb-0 user-email">${contact.email}</h3>
          </div>

          <div class="user-loction d-flex align-items-center gap-2 my-1">
            <i class="fa-solid fa-location-dot address-icon"></i>
            <h4 class="mb-0 user-address">${contact.address}</h4>
          </div>
  `;
}

export function cardFeature(contact) {
  return `
          <div class="contact-actions mt-2 d-flex gap-2">
            <button class="favorite-btn px-2 py-1 rounded-1">
              <i class="${contact.favorite ? "fa-solid favorite-btn-icon" : "fa-regular"} fa-star fs-5"></i>
            </button>

            <button class="emergency-btn px-2 py-1 rounded-1">
              <i class="${contact.emergency ? "fa-solid emergency-btn-icon" : "fa-regular"} fa-heart fs-5"></i>
            </button>

            <button class="edit-btn px-2 py-1 rounded-1">
              <i class="fa-solid fa-pen fs-5"></i> 
            </button>  
              
            <button class="delete-btn px-2 py-1 rounded-1">  
              <i class="fa-solid fa-trash fs-5"></i>
            </button>
          </div>
  `;
}

export function renderContactBadges(contact) {
  return `
              ${
                contact.favorite || contact.emergency
                  ? `
                <div class="d-flex gap-3 mt-2">

                    ${
                      contact.favorite
                        ? `
                      <div class="favorite-user rounded-2 px-2 py-1">
                        <i class="fa-solid fa-star favorite-user-icon"></i>
                        Favorite
                      </div>
                      `
                        : ""
                    }

                    ${
                      contact.emergency
                        ? `
                      <div class="emergency-user rounded-2 px-2 py-1">
                        <i class="fa-solid fa-triangle-exclamation emergency-user-icon"></i>
                        Emergency
                      </div>
                      `
                        : ""
                    }

                    </div>
                  `
                  : ""
              }
  `;
}

export function renderTotalCount() {
  dashboardElements.total.textContent = state.contactsList.length;
  dashboardElements.description.textContent = `Manage and organize your ${state.contactsList.length} contacts`;
}

export function renderFavoritesContacts() {
  const favoritesContacts = state.contactsList.filter(
    (contact) => contact.favorite,
  );
  
  dashboardElements.favorite.textContent = favoritesContacts.length;

  renderContactList(favoritesContacts, "favorite-contact-menu", false);
}

export function renderEmergencyContacts() {
  const emergencyContacts = state.contactsList.filter(
    (contact) => contact.emergency,
  );

  dashboardElements.emergency.textContent = emergencyContacts.length;

  renderContactList(emergencyContacts, "emergency-contact-menu", false);
}

// Render UI
export function renderUI() {
  renderContactList(state.contactsList, "contact-list");
  renderTotalCount();
  renderFavoritesContacts();
  renderEmergencyContacts();
}
