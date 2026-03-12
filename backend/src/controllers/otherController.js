const { ObjectId } = require("mongodb");
const { getOthersCollection, getForNextCollection } = require("../config/db");

const otherCollection = getOthersCollection();
const fornextCollection = getForNextCollection();

// ✅ Create Good Life Style CURD
const createOthers = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await otherCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Other created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteOthers = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await otherCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllOthers = async (req, res) => {
  try {
    const result = await otherCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleOthers = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await otherCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Other not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateOthers = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await otherCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Other not found" });
    }

    res.json({
      success: true,
      message: "Other updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create For Next CURD
const createForNext = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await fornextCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Other created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteForNext = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fornextCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllForNext = async (req, res) => {
  try {
    const result = await fornextCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
    console.log(result)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleForNext = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await fornextCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Other not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateForNext = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await fornextCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Other not found" });
    }

    res.json({
      success: true,
      message: "Other updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOthers,
  deleteOthers,
  getAllOthers,
  getSingleOthers,
  updateOthers,
  createForNext,
  deleteForNext,
  getAllForNext,
  getSingleForNext,
  updateForNext,
};
