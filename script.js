"use strict";

// Get form and input elements
const form = document.getElementById("contactForm");
const firstNameEl = document.getElementById("firstName");
const lastNameEl = document.getElementById("lastName");
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("message");

// Error message elements
const firstNameErr = document.getElementById("firstNameErr");
const lastNameErr = document.getElementById("lastNameErr");
const emailErr = document.getElementById("emailErr");
const msgErr = document.getElementById("msgErr");

// Other elements
const clearBtn = document.getElementById("clearBtn");
const successMsg = document.getElementById("successMsg");
const charCount = document.getElementById("charCount");

// Maximum number of characters allowed in the message
const MAX = 200;

// Timer for success message
let successTimer;

/* ===== Helper functions ===== */

// Show or clear error message
function setErr(inputEl, errorEl, text) {
  errorEl.textContent = text;
  inputEl.classList.toggle("input-error", !!text);
}

// Hide the success message
function hideSuccess() {
  successMsg.style.display = "none";
  successMsg.textContent = "";
}

// Validate email format
function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// Validate name (letters, spaces, hyphen, apostrophe)
function validName(value) {
  return /^[a-zA-ZåäöÅÄÖ\s'-]+$/.test(value.trim());
}

// Update character counter
function updateCount() {
  const len = msgEl.value.length;
  charCount.textContent = `${len} / ${MAX} characters`;
  charCount.style.color = len > MAX ? "#d10000" : "#2e7d32";
}

/* ===== Event listeners ===== */

// Update character counter while typing message
msgEl.addEventListener("input", () => {
  updateCount();
  hideSuccess();
});

// Hide success message when user edits fields
[firstNameEl, lastNameEl, emailEl].forEach(el =>
  el.addEventListener("input", hideSuccess)
);

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  hideSuccess();
  updateCount();

  let ok = true;

  // First name validation
  const firstOk =
    firstNameEl.value.trim() !== "" && validName(firstNameEl.value);

  setErr(
    firstNameEl,
    firstNameErr,
    firstOk ? "" : "Please enter a valid first name."
  );
  if (!firstOk) ok = false;

  // Last name validation
  const lastOk =
    lastNameEl.value.trim() !== "" && validName(lastNameEl.value);

  setErr(
    lastNameEl,
    lastNameErr,
    lastOk ? "" : "Please enter a valid last name."
  );
  if (!lastOk) ok = false;

  // Email validation
  const emailOk = validEmail(emailEl.value);
  setErr(
    emailEl,
    emailErr,
    emailOk ? "" : "Please enter a valid email address."
  );
  if (!emailOk) ok = false;

  // Message validation
  let msgText = "";
  if (!msgEl.value.trim()) {
    msgText = "Message is required.";
  } else if (msgEl.value.length > MAX) {
    msgText = `Max ${MAX} characters.`;
  }
  setErr(msgEl, msgErr, msgText);
  if (msgText) ok = false;

  // Stop if validation failed
  if (!ok) return;

  // Show success message
  successMsg.textContent = "Thank you! I will get back to you soon.";
  successMsg.style.display = "block";

  // Hide success message after 3 seconds
  clearTimeout(successTimer);
  successTimer = setTimeout(hideSuccess, 3000);

  // Reset form and errors
  form.reset();
  updateCount();
  setErr(firstNameEl, firstNameErr, "");
  setErr(lastNameEl, lastNameErr, "");
  setErr(emailEl, emailErr, "");
  setErr(msgEl, msgErr, "");
});

// Clear button
clearBtn.addEventListener("click", () => {
  clearTimeout(successTimer);
  form.reset();
  hideSuccess();
  updateCount();
  setErr(firstNameEl, firstNameErr, "");
  setErr(lastNameEl, lastNameErr, "");
  setErr(emailEl, emailErr, "");
  setErr(msgEl, msgErr, "");
});

// Initialize character counter
updateCount();
