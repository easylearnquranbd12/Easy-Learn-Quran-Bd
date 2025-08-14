const { ObjectId } = require("mongodb");
const { getInstructorsCollection } = require("../config/db");

const instructorsCollection = getInstructorsCollection();

// Create an instructor
const createInstructor = async (req, res) => {
  try {
    const data = req.body;
    data.createdAt = new Date().toISOString();
    data.status = "inactive"; // optional, if needed

    const result = await instructorsCollection.insertOne(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("Create instructor error:", error);
    res.status(500).json({ message: "Failed to create instructor." });
  }
};

// Get all instructors
const getAllInstructors = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) {
      query.status = status; // ✅ properly use query
    }

    const result = await instructorsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error("Get instructors error:", error);
    res.status(500).json({ message: "Failed to fetch instructors." });
  }
};

// Get a single instructor
const getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const result = await instructorsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result)
      return res.status(404).json({ message: "Instructor not found" });

    res.status(200).json(result);
  } catch (error) {
    console.error("Get instructor by ID error:", error);
    res.status(500).json({ message: "Failed to fetch instructor." });
  }
};

// Update instructor
const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    
  // Jodi status active kora hoy
    if (updatedData.status === "active") {
      // Prothome baki sob banner ke inactive kore dao
      await instructorsCollection.updateMany(
        { _id: { $ne: new ObjectId(id) }, status: "active" },
        { $set: { status: "inactive" } }
      );
    }

    const result = await instructorsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res
      .status(200)
      .json({
        acknowledged: result.acknowledged,
        modifiedCount: result.modifiedCount,
      });
  } catch (error) {
    console.error("Update instructor error:", error);
    res.status(500).json({ message: "Failed to update instructor." });
  }
};



// const updateBanner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     // Jodi status active kora hoy
//     if (updatedData.status === "active") {
//       // Prothome baki sob banner ke inactive kore dao
//       await bannersCollection.updateMany(
//         { _id: { $ne: new ObjectId(id) }, status: "active" },
//         { $set: { status: "inactive" } }
//       );
//     }

//     // Tarpor ei banner update koro
//     const result = await bannersCollection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updatedData }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     res.status(200).json({ message: "Banner updated successfully" });
//   } catch (error) {
//     console.error("Update banner error:", error);
//     res.status(500).json({ message: "Failed to update banner." });
//   }
// };







// Delete instructor
const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid instructor ID." });

    const result = await instructorsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res
      .status(200)
      .json({
        message: "Instructor deleted successfully",
        deletedCount: result.deletedCount,
      });
  } catch (error) {
    console.error("Delete instructor error:", error);
    res.status(500).json({ message: "Failed to delete instructor." });
  }
};

module.exports = {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
};
