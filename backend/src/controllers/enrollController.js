const { ObjectId } = require("mongodb");
const { getEnrollCollection } = require("../config/db");


const EnrollsCollection = getEnrollCollection();



// ✅ Create Good Life Style CURD
const createEnroll = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await EnrollsCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Enroll created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteEnroll = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EnrollsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllEnrolls = async (req, res) => {
  try {
    const result = await EnrollsCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEnrollById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await EnrollsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Enroll not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateEnroll = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await EnrollsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Enroll not found" });
    }

    res.json({
      success: true,
      message: "Enroll updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  createEnroll,
  getAllEnrolls,
  deleteEnroll,
  getEnrollById,
  updateEnroll
};
