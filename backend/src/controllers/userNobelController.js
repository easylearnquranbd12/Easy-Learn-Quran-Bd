// const { ObjectId } = require("mongodb");
// const { getUserNobelCollection } = require("../config/db");

// const userNobelCollection = getUserNobelCollection();

// // =======================================================
// // USER SIDE
// // =======================================================

// // ✅ User Create (default status: pending)
// const createUserNobel = async (req, res) => {
//   try {
//     const { email, ...rest } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required" });
//     }

//     const data = {
//       email, // user email save
//       ...rest,
//       status: "pending", // default pending
//       createdAt: new Date().toISOString(),
//     };

//     const result = await userNobelCollection.insertOne(data);

//     res.status(201).json({
//       success: true,
//       message: "Post submitted successfully. Waiting for admin approval.",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ User Get Own Posts (by email)
// const getUserNobelByEmail = async (req, res) => {
//   try {
//     const { email } = req.query;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const result = await userNobelCollection
//       .find({ email })
//       .sort({ createdAt: -1 })
//       .toArray();

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ User Delete Own Post
// const deleteUserNobel = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await userNobelCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     res.status(200).json({
//       success: true,
//       message: "Post deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // =======================================================
// // ADMIN SIDE
// // =======================================================

// // ✅ Admin Get All Posts
// const getAllUserNobel = async (req, res) => {
//   try {
//     const result = await userNobelCollection
//       .find()
//       .sort({ createdAt: -1 })
//       .toArray();

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Admin Get Single
// const getSingleUserNobel = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await userNobelCollection.findOne({
//       _id: new ObjectId(id),
//     });

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Admin Approve / Reject
// const updateUserNobelStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body; // accepted or rejected

//     if (!["accepted", "rejected"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status value",
//       });
//     }

//     const result = await userNobelCollection.updateOne(
//       { _id: new ObjectId(id) },
//       {
//         $set: {
//           status,
//           reviewedAt: new Date().toISOString(),
//         },
//       }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: `Post ${status} successfully`,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createUserNobel,
//   getUserNobelByEmail,
//   deleteUserNobel,
//   getAllUserNobel,
//   getSingleUserNobel,
//   updateUserNobelStatus,
// };



const { ObjectId } = require("mongodb");
const { getUserNobelCollection } = require("../config/db");

const userNobelCollection = getUserNobelCollection();

// =======================================================
// USER SIDE
// =======================================================

// ✅ Create (Default: pending)
const createUserNobel = async (req, res) => {
  try {
    const { email, ...rest } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const newPost = {
      email,
      ...rest,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await userNobelCollection.insertOne(newPost);

    res.status(201).json({
      success: true,
      message: "Post submitted. Waiting for admin approval.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Own Posts
const getUserNobelByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await userNobelCollection
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Own Post
const deleteUserNobel = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userNobelCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================================================
// ADMIN SIDE
// =======================================================

// ✅ Get All Posts
const getAllUserNobel = async (req, res) => {
  try {
    const result = await userNobelCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Post
const getSingleUserNobel = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await userNobelCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve / Reject
const updateUserNobelStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const result = await userNobelCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          reviewedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      message: `Post ${status} successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================================================
// PUBLIC
// =======================================================

// ✅ Only Accepted Posts
const getAcceptedUserNobel = async (req, res) => {
  try {
    const result = await userNobelCollection
      .find({ status: "accepted" })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserNobel,
  getUserNobelByEmail,
  deleteUserNobel,
  getAllUserNobel,
  getSingleUserNobel,
  updateUserNobelStatus,
  getAcceptedUserNobel,
};