// const { ObjectId } = require("mongodb");
// const { getYouTubeCollection } = require("../config/db");

// const youtubeCollection = getYouTubeCollection();

// // ✅ Create a YouTube video
// const createYouTubeVideo = async (req, res) => {
//   try {
//     const videoData = req.body;
//     if (!videoData.title || !videoData.title.includes("youtube.com")) {
//       return res.status(400).json({ message: "Valid YouTube URL is required." });
//     }

//     videoData.createdAt = new Date().toISOString();
//     videoData.status = "inactive"; // Default status

//     const result = await youtubeCollection.insertOne(videoData);
//     res.status(201).json(result);
//   } catch (error) {
//     console.error("Create video error:", error);
//     res.status(500).json({ message: "Failed to create video." });
//   }
// };

// // ✅ Get all videos
// const getAllYouTubeVideos = async (req, res) => {
//   try {
//     const { status } = req.query;
//     const query = {};
//     if (status) query.status = status;

//     const videos = await youtubeCollection.find(query).sort({ createdAt: -1 }).toArray();
//     res.status(200).json(videos);
//   } catch (error) {
//     console.error("Get videos error:", error);
//     res.status(500).json({ message: "Failed to fetch videos." });
//   }
// };

// // ✅ Get single video
// const getYouTubeVideoById = async (req, res) => {
//   try {
//     // const { id } = req.params;
//     const video = await youtubeCollection.findOne({ "status": "active" });

//     if (!video) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     res.status(200).json(video);
//   } catch (error) {
//     console.error("Get video by ID error:", error);
//     res.status(500).json({ message: "Failed to fetch video." });
//   }
// };

// const updateYouTubeVideo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     // Only one video can be active
//     if (updatedData.status === "active") {
//       await youtubeCollection.updateMany(
//         { _id: { $ne: new ObjectId(id) }, status: "active" },
//         { $set: { status: "inactive" } }
//       );
//     }

//     const result = await youtubeCollection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updatedData }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     res.status(200).json({ message: "Video updated successfully" });
//   } catch (error) {
//     console.error("Update video error:", error);
//     res.status(500).json({ message: "Failed to update video." });
//   }
// };

// // ✅ Delete video
// const deleteYouTubeVideo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid video ID." });
//     }

//     const result = await youtubeCollection.deleteOne({ _id: new ObjectId(id) });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     res.status(200).json({ message: "Video deleted successfully" });
//   } catch (error) {
//     console.error("Delete video error:", error);
//     res.status(500).json({ message: "Failed to delete video." });
//   }
// };

// module.exports = {
//   createYouTubeVideo,
//   getAllYouTubeVideos,
//   getYouTubeVideoById,
//   updateYouTubeVideo,
//   deleteYouTubeVideo,
// };




const { ObjectId } = require("mongodb");
const { getYouTubeCollection } = require("../config/db");

const youtubeCollection = getYouTubeCollection();

// ✅ Create media (image, video, or text)
const createMedia = async (req, res) => {
  try {
    const { title, mediaType, mediaUrl, content } = req.body;
    
    // Validation
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    if (mediaType === 'video' && !mediaUrl?.includes("youtube.com")) {
      return res.status(400).json({ message: "Valid YouTube URL is required for videos." });
    }

    if (mediaType === 'image' && !mediaUrl) {
      return res.status(400).json({ message: "Image URL is required." });
    }

    if (mediaType === 'text' && !content) {
      return res.status(400).json({ message: "Content is required for text." });
    }

    // Only one active media allowed
    const existingActive = await youtubeCollection.findOne({ status: "active" });
    if (existingActive) {
      return res.status(400).json({ 
        message: "Only one active media allowed. Deactivate the existing one first." 
      });
    }

    const mediaData = {
      title,
      mediaType,
      mediaUrl: mediaType !== 'text' ? mediaUrl : null,
      content: mediaType === 'text' ? content : null,
      createdAt: new Date(),
      status: "active"
    };

    const result = await youtubeCollection.insertOne(mediaData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Create media error:", error);
    res.status(500).json({ message: "Failed to create media." });
  }
};

// ✅ Get all media items
const getAllMedia = async (req, res) => {
  try {
    const { status, mediaType } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (mediaType) query.mediaType = mediaType;

    const mediaItems = await youtubeCollection.find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    res.status(200).json(mediaItems);
  } catch (error) {
    console.error("Get media error:", error);
    res.status(500).json({ message: "Failed to fetch media." });
  }
};

// ✅ Get active media
const getActiveMedia = async (req, res) => {
  try {
    const media = await youtubeCollection.findOne({ status: "active" });

    if (!media) {
      return res.status(404).json({ message: "No active media found" });
    }

    res.status(200).json(media);
  } catch (error) {
    console.error("Get active media error:", error);
    res.status(500).json({ message: "Failed to fetch active media." });
  }
};

// ✅ Update media
const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Only one active media allowed
    if (updatedData.status === "active") {
      await youtubeCollection.updateMany(
        { _id: { $ne: new ObjectId(id) }, status: "active" },
        { $set: { status: "inactive" } }
      );
    }

    const result = await youtubeCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.status(200).json({ message: "Media updated successfully" });
  } catch (error) {
    console.error("Update media error:", error);
    res.status(500).json({ message: "Failed to update media." });
  }
};

// ✅ Delete media
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid media ID." });
    }

    const result = await youtubeCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Delete media error:", error);
    res.status(500).json({ message: "Failed to delete media." });
  }
};

module.exports = {
  createMedia,
  getAllMedia,
  getActiveMedia,
  updateMedia,
  deleteMedia,
};