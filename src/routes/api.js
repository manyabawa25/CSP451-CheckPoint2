const express = require("express");
const { listUsers, createUser } = require("../controllers/usersController");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    data: { status: "ok" },
    errors: [],
    meta: { time: new Date().toISOString() },
  });
});

// API endpoints branch adds REST-style routes
router.get("/users", listUsers);
router.post("/users", createUser);

module.exports = { router };
