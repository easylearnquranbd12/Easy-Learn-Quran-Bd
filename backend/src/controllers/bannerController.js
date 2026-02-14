// const { ObjectId } = require("mongodb");

const { ObjectId, isValidObjectId } = require("mongodb");
const { getBannersCollection } = require("../config/db");

const bannersCollection = getBannersCollection();

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

    // Jodi status active kora hoy
    if (updatedData.status === "active") {
      // Prothome baki sob banner ke inactive kore dao
      await bannersCollection.updateMany(
        { _id: { $ne: new ObjectId(id) }, status: "active" },
        { $set: { status: "inactive" } }
      );
    }

    // Tarpor ei banner update koro
    const result = await bannersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner updated successfully" });
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



module.exports = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
};
