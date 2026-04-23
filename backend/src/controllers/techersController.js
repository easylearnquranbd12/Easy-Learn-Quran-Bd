const { ObjectId } = require("mongodb");
const { getTechersCollection } = require("../config/db");

const TechersCollection = getTechersCollection();

// ✅ Create Good Life Style CURD
const createTecher = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await TechersCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Techer created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteTecher = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TechersCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTechers = async (req, res) => {
  try {
    const result = await TechersCollection.find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTecherById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await TechersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Techer not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateTecher = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await TechersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Techer not found" });
    }

    res.json({
      success: true,
      message: "Techer updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTecher,
  getAllTechers,
  deleteTecher,
  getTecherById,
  updateTecher,
};
