const { ObjectId } = require("mongodb");
const { getAboutPagesCollection } = require("../config/db");


const aboutPagesCollection = getAboutPagesCollection();



// ✅ Create Good Life Style CURD
const createAboutPage = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await aboutPagesCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "About page created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteAboutPage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await aboutPagesCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllAboutPages = async (req, res) => {
  try {
    const result = await aboutPagesCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAboutPageById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await aboutPagesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "About page not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateAboutPage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await aboutPagesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "About page not found" });
    }

    res.json({
      success: true,
      message: "About page updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  createAboutPage,
  deleteAboutPage,
  getAllAboutPages,
  getAboutPageById,
  updateAboutPage,
};
