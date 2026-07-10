export const modalElements = {
  modal: document.getElementById("contact-modal"),
  openBtn: document.getElementById("add-contact-btn"),
  closeBtn: document.getElementById("close-btn"),
  cancelBtn: document.getElementById("cancel-contact-btn"),
  saveBtn: document.getElementById("save-contact-btn"),
};

// Contact form elements
export const formElements = {
  fullName: document.getElementById("full-name-input"),
  phone: document.getElementById("phone-input"),
  email: document.getElementById("email-input"),
  address: document.getElementById("address-input"),
  group: document.getElementById("groupe-input"),
  favorite: document.getElementById("fav-input"),
  emergency: document.getElementById("eme-input"),
};

export const dashboardElements = {
  emergency: document.getElementById("emergency-contact-count"),
  favorite: document.getElementById("favorites-contact-count"),
  description: document.getElementById("main-description"),
  total: document.getElementById("total-contact-count"),
};

export const state = {
  contactsList: JSON.parse(localStorage.getItem("contacts")) || [],
  editingId: null,
};

export const GROUP_NAMES = {
  1: "Family",
  2: "Friends",
  3: "Work",
  4: "School",
  5: "Other",
};

export const defaultImage = "./assets/images/phone.webp";

export const cardContainer = document.getElementById("contact-list");

export const searchInput = document.getElementById("search-input");
