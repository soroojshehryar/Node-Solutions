const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const {
  createUsers,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getSecureResource,
  login,
} = require("../controllers/userController");

// Secure Resourse
router.get("/secure-resource", authenticateToken, getSecureResource);

router.post("/", createUsers);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login);

module.exports = router;
