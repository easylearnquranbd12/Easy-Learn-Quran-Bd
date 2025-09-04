const express = require("express");
const {
  registerUser,
  getAllUsers,
  getUserRole,
  updateUserProfile,
  getUserByEmail,
  deleteUser,
  updateUserRole,
} = require("../Controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.get("/all", getAllUsers);
router.get("/role/:email", getUserRole);
router.delete("/delete/:id", deleteUser);
router.patch("/update/:email", updateUserProfile);
router.get("/:email", getUserByEmail);
router.patch("/role/:id", updateUserRole);

module.exports = router;
