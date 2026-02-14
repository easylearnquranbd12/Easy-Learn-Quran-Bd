const { ObjectId } = require("mongodb");
const { getImageAndTextCollection } = require("../config/db");

const imageAndTextCollection = getImageAndTextCollection();

// Create a new entry
const createImageAndText = async (req, res) => {
  try {
    const data = req.body;
    data.createdAt = new Date().toISOString();
    data.status = "inactive"; // default status

    const result = await imageAndTextCollection.insertOne(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("Create imageandtext error:", error);
    res.status(500).json({ message: "Failed to create entry." });
  }
};

// Get all entries
const getAllImageAndText = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) {
      query.status = status;
    }

    const result = await imageAndTextCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error("Get imageandtext error:", error);
    res.status(500).json({ message: "Failed to fetch entries." });
  }
};

// Get one entry by ID
const getImageAndTextById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const result = await imageAndTextCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result)
      return res.status(404).json({ message: "Entry not found" });

    res.status(200).json(result);
  } catch (error) {
    console.error("Get entry by ID error:", error);
    res.status(500).json({ message: "Failed to fetch entry." });
  }
};

// Update entry by ID (with make-active logic)
const updateImageAndText = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // ✅ Remove _id if accidentally sent
    delete updatedData._id;

    // Optional: If you want only one active
    if (updatedData.status === "active") {
      await imageAndTextCollection.updateMany({}, { $set: { status: "inactive" } });
    }

    const result = await imageAndTextCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({
      acknowledged: result.acknowledged,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Update entry error:", error);
    res.status(500).json({ message: "Failed to update entry." });
  }
};

// Delete entry by ID
const deleteImageAndText = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const result = await imageAndTextCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({
      message: "Entry deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete entry error:", error);
    res.status(500).json({ message: "Failed to delete entry." });
  }
};

module.exports = {
  createImageAndText,
  getAllImageAndText,
  getImageAndTextById,
  updateImageAndText,
  deleteImageAndText,
};
