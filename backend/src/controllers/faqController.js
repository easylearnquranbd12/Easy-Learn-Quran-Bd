const { ObjectId } = require("mongodb");
const { getFaqsCollection } = require("../config/db");


const FaqsCollection = getFaqsCollection();


const createFaqs = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await FaqsCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Faq created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteFaqs = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FaqsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllFaqs = async (req, res) => {
  try {
    const result = await FaqsCollection.find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createFaqs,
  getAllFaqs,
  deleteFaqs,
};
