"use strict";

// Get form and input elements
const form = document.getElementById("contactForm");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("message");

// Error message elements
const nameErr = document.getElementById("nameErr");
const emailErr = document.getElementById("emailErr");
const msgErr = document.getElementById("msgErr");

// Other elements
const clearBtn = document.getElementById("clearBtn");
const successMsg = document.getElementById("successMsg");
const charCount = document.getElementById("charCount");

// Maximum number of characters allowed in the message
const MAX = 200;

// Helper function to show or clear errors
// -sets error text
// - adds or removes red border on the input
function setErr(el, errEl, text) {
  errEl.textContent = text;
  el.classList.toggle("input-error", !!text);
}

// Hide the success message
function hideSuccess() {
  successMsg.style.display = "none";
  successMsg.textContent = "";
}

// Email validation
function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

// Update the character counter
function updateCount() {
  const len = msgEl.value.length;
  charCount.textContent = `${len} / ${MAX} characters`;
  // Turn red if the limit is exceeded
  charCount.style.color = len > MAX ? "#d10000" : "#2e7d32";
}

// Event listeners

// Update character counter while typing in message
msgEl.addEventListener("input", () => { updateCount(); hideSuccess(); });

[nameEl, emailEl].forEach(el => el.addEventListener("input", hideSuccess));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  hideSuccess();
  updateCount();

  let ok = true;

  const nameOk = !!nameEl.value.trim();
  setErr(nameEl, nameErr, nameOk ? "" : "Name is required.");
  if (!nameOk) ok = false;

  const emailOk = validEmail(emailEl.value);
  setErr(emailEl, emailErr, emailOk ? "" : "Please enter a valid email address.");
  if (!emailOk) ok = false;

  let msgText = "";
  if (!msgEl.value.trim()) msgText = "Message is required.";
  else if (msgEl.value.length > MAX) msgText = `Max ${MAX} characters.`;
  setErr(msgEl, msgErr, msgText);
  if (msgText) ok = false;

  if (!ok) return;

  successMsg.textContent = "Thank you! I will get back to you soon.";
  successMsg.style.display = "block";

  form.reset();
  updateCount();
  setErr(nameEl, nameErr, "");
  setErr(emailEl, emailErr, "");
  setErr(msgEl, msgErr, "");
});

clearBtn.addEventListener("click", () => {
  form.reset();
  hideSuccess();
  updateCount();
  setErr(nameEl, nameErr, "");
  setErr(emailEl, emailErr, "");
  setErr(msgEl, msgErr, "");
});

updateCount();
