import { state } from "./elements.js";

// Full Name Validation
export function validateFullName(fullName) {
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
export function validatePhone(phoneNumber) {
  const value = phoneNumber.replace(/\s+/g, "");
  const phone = /^(01[0125])[0-9]{8}$/;

  const phoneExists = state.contactsList.find(
    (contact) =>
      contact.phone === value && contact.id !== state.editingId,
  );

  if (phoneExists) {
    return { valid: false, field: "phone", message: "phone already exists." };
  }

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
export function validateEmail(email) {
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

  const emailExists = state.contactsList.find((contact) => {
    return contact.email === email && contact.id !== state.editingId;
  });

  if (emailExists) {
    return { valid: false, field: "email", message: "Email already exists." };
  }

  return { valid: true, message: null };
}

// Address Validation
export function validateAddress(address) {
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

// Contact Inputs Validation
export function validateContact(contact) {
  const fullNameValidation = validateFullName(contact.fullName);
  if (!fullNameValidation.valid) return fullNameValidation;

  const phoneNumberValidation = validatePhone(contact.phone);
  if (!phoneNumberValidation.valid) return phoneNumberValidation;

  const emailValidation = validateEmail(contact.email);
  if (!emailValidation.valid) return emailValidation;

  const addressValidation = validateAddress(contact.address);
  if (!addressValidation.valid) return addressValidation;

  return {
    valid: true,
    message: null,
  };
}
