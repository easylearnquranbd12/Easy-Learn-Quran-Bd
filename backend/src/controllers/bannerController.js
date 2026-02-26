// const { ObjectId } = require("mongodb");

const { ObjectId, isValidObjectId } = require("mongodb");
const { getBannersCollection, getSuccessStoriesCollection } = require("../config/db");

const bannersCollection = getBannersCollection();
const successStoriesCollection = getSuccessStoriesCollection();

// Create a banner
const createBanner = async (req, res) => {
  try {
    const bannerData = req.body;
    bannerData.createdAt = new Date().toISOString();
    bannerData.status = "inactive"; // default status

    const result = await bannersCollection.insertOne(bannerData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Create banner error:", error);
    res.status(500).json({ message: "Failed to create banner." });
  }
};

const getAllBanners = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) {
      query.status = status; // ✅ properly use query
    }

    const banners = await bannersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(banners);
  } catch (error) {
    console.error("Get banners error:", error);
    res.status(500).json({ message: "Failed to fetch banners." });
  }
};

// Get a single banner by ID
const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await bannersCollection.findOne({ _id: new ObjectId(id) });

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json(banner);
  } catch (error) {
    console.error("Get banner by ID error:", error);
    res.status(500).json({ message: "Failed to fetch banner." });
  }
};

// Update a banner
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID." });
    }

    const bannerId = new ObjectId(id);

    // If making active → deactivate others
    if (updatedData.status === "active") {
      await bannersCollection.updateMany(
        { _id: { $ne: bannerId }, status: "active" },
        { $set: { status: "inactive" } }
      );
    }

    const result = await bannersCollection.updateOne(
      { _id: bannerId },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // ✅ IMPORTANT: return full result
    res.status(200).json({
      acknowledged: result.acknowledged,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });

  } catch (error) {
    console.error("Update banner error:", error);
    res.status(500).json({ message: "Failed to update banner." });
  }
};
// Delete a banner

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID." });
    }

    const result = await bannersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Delete banner error:", error);
    res.status(500).json({ message: "Failed to delete banner." });
  }
};

const getAllStoriesVideo = async (req, res) => {
  try {
    const stories = await successStoriesCollection.find().toArray();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stories", error: error.message });
  }
};

const createStoriesVideo = async (req, res) => {
  try {
    const { title, video, status } = req.body;

    if (!video) {
      return res.status(400).json({ success: false, message: "Video is required" });
    }

    const count = await successStoriesCollection.countDocuments();
    if (count >= 5) {
      return res.status(400).json({ success: false, message: "You can create a maximum of 5 stories only." });
    }

    const newStory = { 
      title: title || null,   // optional, default null if not provided
      video, 
      status: status || "inactive", 
      createdAt: new Date() 
    };

    const result = await successStoriesCollection.insertOne(newStory);

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: "Failed to create story", error: error.message });
  }
};


const deleteStoriesVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await successStoriesCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete story", error: error.message });
  }
};

module.exports = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  getAllStoriesVideo,
  createStoriesVideo,
  deleteStoriesVideo,
};
