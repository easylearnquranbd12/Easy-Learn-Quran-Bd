const { ObjectId } = require("mongodb");
const {
  getFourthLayerGoodSongCollection,
  getFourthLayerGoodSongFieldsCollection,
  getFourthLayerGoodSongExerciseCollection,
  getFourthLayerGoodMovieFieldsCollection,
  getFourthLayerGoodMovieCollection,
  getFourthLayerGoodMovieExerciseCollection,
} = require("../config/db");

// Song
const goodSongFieldsCollection = getFourthLayerGoodSongFieldsCollection();
const goodSongCollection = getFourthLayerGoodSongCollection();
const goodSongExerciseCollection = getFourthLayerGoodSongExerciseCollection();
// Movie
const goodMovieFieldsCollection = getFourthLayerGoodMovieFieldsCollection();
const goodMovieCollection = getFourthLayerGoodMovieCollection();
const goodMovieExerciseCollection = getFourthLayerGoodMovieExerciseCollection();

// ✅ Update Good Song Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateGoodSongField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;

    if (!fieldName) {
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });
    }

    let updateData = {};

    if (fieldName === "isActive") {
      // যদি isActive update হয়, toggle কর
      const doc = await goodSongFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No good song found" });
      }

      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value) {
        return res.status(400).json({
          success: false,
          message: "value is required for this field",
        });
      }
      updateData[fieldName] = value;
    }

    const result = await goodSongFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No elegant found to update" });
    }

    res.json({
      success: true,
      message:
        fieldName === "isActive"
          ? `isActive toggled successfully`
          : `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Good Song Fields
const getGoodSongField = async (req, res) => {
  try {
    const result = await goodSongFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
// Exercise Controller
const createExerciseGoodSong = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await goodSongExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await goodSongExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 10 * 24 * 60 * 60 } // 30 days
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created. It will auto-delete after 30 days.",
    });
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new author info
const createSongs = async (req, res) => {
  try {
    const songData = req.body;

    // ✅ Create date added
    songData.createdAt = new Date().toISOString();

    // ✅ Insert song data without limit
    const result = await goodSongCollection.insertOne(songData);

    res.status(201).json({
      success: true,
      message: "Song created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create song",
      error: error.message,
    });
  }
};

// Delete author info
const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodSongCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete author info", error: error.message });
  }
};
// =============================
// Get All Songs
// =============================
const getAllSongs = async (req, res) => {
  try {
    const songs = await goodSongCollection.find().toArray();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch songs",
      error: error.message,
    });
  }
};

// ✅ Update Good Song Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateGoodMovieField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;

    if (!fieldName) {
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });
    }

    let updateData = {};

    if (fieldName === "isActive") {
      // যদি isActive update হয়, toggle কর
      const doc = await goodMovieFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No good song found" });
      }

      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value) {
        return res.status(400).json({
          success: false,
          message: "value is required for this field",
        });
      }
      updateData[fieldName] = value;
    }

    const result = await goodMovieFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No elegant found to update" });
    }

    res.json({
      success: true,
      message:
        fieldName === "isActive"
          ? `isActive toggled successfully`
          : `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Good Song Fields
const getGoodMovieField = async (req, res) => {
  try {
    const result = await goodMovieFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
// Exercise Controller
const createExerciseGoodMovie = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await goodMovieExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await goodMovieExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 10 * 24 * 60 * 60 } // 30 days
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created. It will auto-delete after 30 days.",
    });
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new author info
const createMovies = async (req, res) => {
  try {
    const songData = req.body;

    // ✅ Create date added
    songData.createdAt = new Date().toISOString();

    // ✅ Insert song data without limit
    const result = await goodMovieCollection.insertOne(songData);

    res.status(201).json({
      success: true,
      message: "Song created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create song",
      error: error.message,
    });
  }
};

// Delete author info
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodMovieCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete author info", error: error.message });
  }
};
// =============================
// Get All Songs
// =============================
const getAllMovies = async (req, res) => {
  try {
    const songs = await goodMovieCollection.find().toArray();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch songs",
      error: error.message,
    });
  }
};

module.exports = {
  updateGoodSongField,
  getGoodSongField,
  createExerciseGoodSong,
  createSongs,
  deleteSong,
  getAllSongs,
  // Movie
  updateGoodMovieField,
  getGoodMovieField,
  createExerciseGoodMovie,
  createMovies,
  deleteMovie,
  getAllMovies,
};
