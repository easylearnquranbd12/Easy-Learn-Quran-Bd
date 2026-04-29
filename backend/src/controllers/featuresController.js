const { ObjectId } = require("mongodb");
const {
  getFeaturesCollection,
  getAchievementsCollection,
  getCoursesCollection,
  getCountryCollection,
} = require("../config/db");

const FeaturesCollection = getFeaturesCollection();
const AchievementsCollection = getAchievementsCollection();
const coursesCollection = getCoursesCollection();
const countrysCollection = getCountryCollection();



// ✅ Create Good Life Style CURD
const createFeature = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await FeaturesCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Feature created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FeaturesCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllFeatures = async (req, res) => {
  try {
    const result = await FeaturesCollection.find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Create Good Life Style CURD
const createAchievements = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await AchievementsCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteAchievements = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AchievementsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllAchievements = async (req, res) => {
  try {
    const result = await AchievementsCollection.find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Create Course CURD
const createCourses = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await coursesCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await coursesCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllCourses = async (req, res) => {
  try {
    const result = await coursesCollection.find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Create Good Life Style CURD
const createCountry = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await countrysCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Country created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await countrysCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllCountry = async (req, res) => {
  try {
    const result = await countrysCollection.find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createFeature,
  getAllFeatures,
  deleteFeature,
  createAchievements,
  getAllAchievements,
  deleteAchievements,
  createCourses,
  getAllCourses,
  deleteCourses,
  createCountry,
  getAllCountry,
  deleteCountry,
};
