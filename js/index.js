const addContactButton = document.getElementById("addContactBtn");
const contactModal = document.getElementById("contact-modal");

const closeModalBtn = document.getElementById("close-btn");
const cancelButton = document.getElementById("cancel-contact-btn");

const defaultImage = "./assets/images/phone.webp";

// Contact form elements
const fullNameInput = document.getElementById("full-name-input");
const phoneNumber = document.getElementById("phone-input");
const userEmail = document.getElementById("email-input");
const userAddress = document.getElementById("address-input");
const userGroupe = document.getElementById("groupe-input");
const userNotes = document.getElementById("note-input");

const favInput = document.getElementById("fav-input");
const emeInput = document.getElementById("eme-input");

const saveContactBtn = document.getElementById("save-contact-btn");

/* ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ */
/* Box Modal */
/* ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ */

// Open Modal Function
function openModal() {
  contactModal.classList.remove("d-none");
}

// Open Box Modle
addContactButton.addEventListener("click", openModal);

// Close Modle Function
function resetModalState() {
  resetForm();
  clearErrors();
  contactModal.classList.add("d-none");
}

// Handle Cancel Button & Handle Close Button
[cancelButton, closeModalBtn].forEach((button) => {
  button.addEventListener("click", resetModalState);
});

/* ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ */
/* Box Modal */
/* ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ ـ */

// Full Name Validation
function validateFullName(fullName) {
  if (!fullName.trim()) {
    return {
      valid: false,
      field: "name",
      message: "Full name is required",
    };
  }

  if (fullName.trim().length < 3) {
    return {
      valid: false,
      field: "name",
      message: "Full name Must be more than 3 char",
    };
  }

  return {
    valid: true,
    message: null,
  };
}

// Phone Number Validation
function validatePhone(phoneNumber) {
  const value = phoneNumber.replace(/\s+/g, "");
  const phone = /^(01[0125])[0-9]{8}$/;

  if (!value) {
    return {
      valid: false,
      field: "phone",
      message: "Phone number is required",
    };
  }

  if (!phone.test(value)) {
    return {
      valid: false,
      field: "phone",
      message: "Invalid Egyptian phone number",
    };
  }

  return { valid: true, message: null };
}

// Email Validation
function validateEmail(email) {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!email.trim()) {
    return { valid: false, field: "email", message: "Email is required" };
  }

  if (!emailReg.test(email)) {
    return {
      valid: false,
      field: "email",
      message: "Invalid Email",
    };
  }

  return { valid: true, message: null };
}

// Address Validation
function validateAddress(address) {
  if (!address.trim()) {
    return { valid: false, field: "address", message: "Address is required" };
  }

  const addressRegx = /^[a-zA-Z0-9\u0600-\u06FF\s,.-]+$/;
  if (!addressRegx.test(address)) {
    return {
      valid: false,
      field: "address",
      message: "Address contains invalid characters",
    };
  }

  if (address.trim().length < 5) {
    return {
      valid: false,
      field: "address",
      message: "Address is too short",
    };
  }

  return { valid: true, message: null };
}

// Notes Validation
function validateNotes(notes) {
  if (notes && !notes.trim()) {
    return {
      valid: false,
      field: "notes",
      message: "Notes cannot contain only spaces",
    };
  }

  if (notes && notes.length > 300) {
    return {
      valid: false,
      field: "notes",
      message: "Notes cannot exceed 300 characters",
    };
  }

  return { valid: true, message: null };
}

// Contact Inputs Validation
function validateContact(contact) {
  const fullNameValidation = validateFullName(contact.fullName);
  if (!fullNameValidation.valid) return fullNameValidation;

  const phoneNumberValidation = validatePhone(contact.phone);
  if (!phoneNumberValidation.valid) return phoneNumberValidation;

  const emailValidation = validateEmail(contact.email);
  if (!emailValidation.valid) return emailValidation;

  const addressValidation = validateAddress(contact.address);
  if (!addressValidation.valid) return addressValidation;

  const notesValidation = validateNotes(contact.notes);
  if (!notesValidation.valid) return notesValidation;

  return {
    valid: true,
    message: null,
  };
}

saveContactBtn.addEventListener("click", () => {
  clearErrors();

  const contact = {
    fullName: fullNameInput.value,
    phone: phoneNumber.value,
    email: userEmail.value,
    address: userAddress.value,
    group: userGroupe.value,
    notes: userNotes.value,
    favorite: favInput.checked,
    emergency: emeInput.checked,
  };

  const result = validateContact(contact);

  if (!result.valid) {
    displayError(result.message, result.field);
    return;
  }
});

// Show Error Message
function displayError(error, field) {
  const errorField = document.getElementById(`${field}-error-msg`);
  errorField.style.display = "block";
  errorField.textContent = error;
}

// Clear Fields Error
function clearErrors() {
  const errors = document.querySelectorAll(".validation-msg");

  errors.forEach((error) => {
    error.style.display = "none";
    error.textContent = "";
  });
}

// Clear Form Inputs Fields
function resetForm() {
  fullNameInput.value = "";
  phoneNumber.value = "";
  userEmail.value = "";
  userAddress.value = "";
  userNotes.value = "";
  userGroupe.selectedIndex = 0;
  favInput.checked = false;
  emeInput.checked = false;
}
