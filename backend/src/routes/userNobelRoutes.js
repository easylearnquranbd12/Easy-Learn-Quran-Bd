// const express = require("express");
// const {
//   createUserNobel,
//   getUserNobelByEmail,
//   deleteUserNobel,
//   getAllUserNobel,
//   getSingleUserNobel,
//   updateUserNobelStatus,
// } = require("../controllers/userNobelController");

// const router = express.Router();

// // =====================================================
// // USER ROUTES
// // =====================================================

// router.post("/", createUserNobel);                 // Create post
// router.get("/", getUserNobelByEmail);      // Get own posts
// router.delete("/:id", deleteUserNobel);            // Delete own post

// // =====================================================
// // ADMIN ROUTES
// // =====================================================

// router.get("/admin/all", getAllUserNobel);         // Get all posts
// router.get("/admin/:id", getSingleUserNobel);      // Get single post
// router.patch("/admin/:id/status", updateUserNobelStatus); // Approve/Reject

// module.exports = router;



const express = require("express");
const {
  createUserNobel,
  getUserNobelByEmail,
  deleteUserNobel,
  getAllUserNobel,
  getSingleUserNobel,
  updateUserNobelStatus,
  getAcceptedUserNobel,
} = require("../controllers/userNobelController");

const router = express.Router();

// ==========================
// USER ROUTES
// ==========================

// Create Post (pending by default)
router.post("/", createUserNobel);

// Get Own Posts (by email query)
router.get("/my-posts", getUserNobelByEmail);

// Delete Own Post
router.delete("/:id", deleteUserNobel);

// ==========================
// ADMIN ROUTES
// ==========================

// Get All Posts
router.get("/admin/all", getAllUserNobel);

// Get Single Post
router.get("/admin/:id", getSingleUserNobel);

// Approve / Reject
router.patch("/admin/:id/status", updateUserNobelStatus);

// ==========================
// PUBLIC ROUTE
// ==========================

// Only Accepted Posts
router.get("/public/accepted", getAcceptedUserNobel);

module.exports = router;