const cloudinary = require("../config/cloudinary.js");

// Delete video
const deleteVideo = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId)
      return res.status(400).json({ error: "publicId is required" });

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });

    if (result.result === "ok") {
      return res.json({ success: true, message: "Video deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Cloudinary delete failed" });
    }
  } catch (error) {
    console.error("Delete video error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete image
const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId)
      return res.status(400).json({ error: "publicId is required" });

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result === "ok") {
      return res.json({ success: true, message: "Image deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Cloudinary delete failed" });
    }
  } catch (error) {
    console.error("Delete image error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { deleteVideo, deleteImage };
