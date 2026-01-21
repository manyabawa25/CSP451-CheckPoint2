const express = require("express");

const router = express.Router();

/* ------------------ Validation helpers ------------------ */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateLoginInput(email, password) {
  const errors = [];

  if (!email || !password) {
    errors.push("Email and password are required.");
    return errors;
  }

  if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  return errors;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function sendError(res, statusCode, message, details = []) {
  return res.status(statusCode).json({
    success: false,
    data: null,
    errors: [
      {
        message,
        details,
      },
    ],
    meta: {
      time: new Date().toISOString(),
    },
  });
}

/* ------------------ Routes ------------------ */

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    data: { status: "ok" },
    errors: [],
    meta: { time: new Date().toISOString() },
  });
});

// Login validation
router.post("/login", (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;

  const errors = validateLoginInput(email, password);

  if (errors.length > 0) {
    return sendError(res, 400, "Validation failed", errors);
  }

  return res.status(200).json({
    success: true,
    data: { email },
    errors: [],
    meta: { time: new Date().toISOString() },
  });
});

module.exports = { router };
