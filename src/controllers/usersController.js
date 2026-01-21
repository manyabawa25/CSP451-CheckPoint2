// src/controllers/usersController.js

function listUsers(req, res) {
  // mock data for checkpoint 2
  const users = [
    { id: 1, name: "Alex", email: "alex@example.com" },
    { id: 2, name: "Sam", email: "sam@example.com" },
  ];

  return res.status(200).json({
    success: true,
    data: users,
    errors: [],
    meta: { time: new Date().toISOString() },
  });
}

function createUser(req, res) {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim().toLowerCase();

  const details = [];
  if (!name) details.push("Name is required.");
  if (!email) details.push("Email is required.");

  if (details.length > 0) {
    return res.status(400).json({
      success: false,
      data: null,
      errors: [{ message: "Validation failed", details }],
      meta: { time: new Date().toISOString() },
    });
  }

  const newUser = { id: Date.now(), name, email };

  return res.status(201).json({
    success: true,
    data: newUser,
    errors: [],
    meta: { time: new Date().toISOString() },
  });
}

module.exports = { listUsers, createUser };
