const express = require("express");
const router = express.Router();
const { login, logout, ping } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/jwt", login);
router.get("/logout", logout);
router.get("/ping", verifyToken, ping);

module.exports = router;
