const { ObjectId } = require("mongodb");
const { getTestimonialCollection, getFaqCollection } = require("../config/db");

const testimonialCollection = getTestimonialCollection();


// ✅ Create Good Life Style CURD
const createTestimonial = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await testimonialCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await testimonialCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTestimonials = async (req, res) => {
  try {
    const result = await testimonialCollection.find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await testimonialCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await testimonialCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    res.json({
      success: true,
      message: "Testimonial updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  createTestimonial,
  getAllTestimonials,
  deleteTestimonial,
  getTestimonialById,
  updateTestimonial,

};
