const { ObjectId } = require("mongodb");
const {
  getSevenLayerTravelingFormatFieldsCollection,
  getSevenLayerTravelingFormatCollection,
  getSevenLayerTravelingFormatExerciseCollection,
  getSevenLayerGoodSongFormatFieldsCollection,
  getSevenLayerGoodSongFormatCollection,
  getSevenLayerGoodSongFormatExerciseCollection,
  getSevenLayerGoodMovieFormatFieldsCollection,
  getSevenLayerGoodMovieFormatCollection,
  getSevenLayerGoodMovieFormatExerciseCollection,
  getSevenLayerGoodPoremFormatFieldsCollection,
  getSevenLayerGoodPoremFormatCollection,
  getSevenLayerGoodPoremFormatExerciseCollection,
  getSevenLayerGoodNobelFormatFieldsCollection,
  getSevenLayerGoodNobelFormatCollection,
  getSevenLayerGoodNobelFormatExerciseCollection,
  getSevenLayerOldGenerationFormatFieldsCollection,
  getSevenLayerOldGenerationFormatCollection,
  getSevenLayerOldGenerationFormatExerciseCollection,
  getSevenLayerStoryWritingFormatFieldsCollection,
  getSevenLayerStoryWritingFormatCollection,
  getSevenLayerStoryWritingFormatExerciseCollection,
  getSevenLayerLetterWritingFormatFieldsCollection,
  getSevenLayerLetterWritingFormatCollection,
  getSevenLayerLetterWritingFormatExerciseCollection,
  getSevenLayerMcqFormatFieldsCollection,
  getSevenLayerMcqFormatCollection,
} = require("../config/db");

// Good Traveling
const travelingFieldsCollection =
  getSevenLayerTravelingFormatFieldsCollection();
const travelingCollection = getSevenLayerTravelingFormatCollection();
const travelingExerciseCollection =
  getSevenLayerTravelingFormatExerciseCollection();

// Good Song
const goodSongFieldsCollection = getSevenLayerGoodSongFormatFieldsCollection();
const goodSongCollection = getSevenLayerGoodSongFormatCollection();
const goodSongExerciseCollection =
  getSevenLayerGoodSongFormatExerciseCollection();

//   good Movie
const goodMovieFieldsCollection =
  getSevenLayerGoodMovieFormatFieldsCollection();
const goodMovieCollection = getSevenLayerGoodMovieFormatCollection();
const goodMovieExerciseCollection =
  getSevenLayerGoodMovieFormatExerciseCollection();
//   Good Porem
const goodPoremFieldsCollection =
  getSevenLayerGoodPoremFormatFieldsCollection();
const goodPoremCollection = getSevenLayerGoodPoremFormatCollection();
const goodPoremExerciseCollection =
  getSevenLayerGoodPoremFormatExerciseCollection();
//   Good Nobel
const goodNobelFieldsCollection =
  getSevenLayerGoodNobelFormatFieldsCollection();
const goodNobelCollection = getSevenLayerGoodNobelFormatCollection();
const goodNobelExerciseCollection =
  getSevenLayerGoodNobelFormatExerciseCollection();

// Old Generation
const oldGenerationFieldsCollection =
  getSevenLayerOldGenerationFormatFieldsCollection();
const oldGenerationCollection = getSevenLayerOldGenerationFormatCollection();
const oldGenerationExerciseCollection =
  getSevenLayerOldGenerationFormatExerciseCollection();
// Story Writting
const storyWritingFieldsCollection =
  getSevenLayerStoryWritingFormatFieldsCollection();
const storyWritingCollection = getSevenLayerStoryWritingFormatCollection();
const storyWritingExerciseCollection =
  getSevenLayerStoryWritingFormatExerciseCollection();

// Letter Writting
const letterWritingFieldsCollection =
  getSevenLayerLetterWritingFormatFieldsCollection();
const letterWritingCollection = getSevenLayerLetterWritingFormatCollection();
const letterWritingExerciseCollection =
  getSevenLayerLetterWritingFormatExerciseCollection();

// MCQ Format
const mcqFieldsCollection = getSevenLayerMcqFormatFieldsCollection();
const mcqCollection = getSevenLayerMcqFormatCollection();

// -----------------------------------------------------------------------------
// Traveling
// -----------------------------------------------------------------------------
// ✅ Update Good Life Style Field
const updateTravelingFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await travelingFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No traveling field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await travelingFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getTravelingFormatField = async (req, res) => {
  try {
    const result = await travelingFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createTravelingFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await travelingCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Traveling created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteTravelingFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await travelingCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTravelingFormat = async (req, res) => {
  try {
    const result = await travelingCollection.find().sort({ _id: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleTravelingFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await travelingCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Traveling not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateTravelingFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await travelingCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Traveling not found" });
    }

    res.json({
      success: true,
      message: "Traveling updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Exercise Develop Skills
const createExerciseTravelingFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      link, // optional
      ideaShareImage, // optional
      userInfo,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    // Base data (required fields)
    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    // Optional fields (only add if provided)
    if (link && link.trim() !== "") {
      data.link = link.trim();
    }

    if (ideaShareImage && ideaShareImage.trim() !== "") {
      data.ideaShareImage = ideaShareImage.trim();
    }

    const result = await travelingExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days (create index once in app init ideally)
    await travelingExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const getAllExerciseTravelingFormat = async (req, res) => {
  try {
    const result = await travelingExerciseCollection
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseTravelingFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await travelingExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -----------------------------------------------------------------------------
// Traveling
// -----------------------------------------------------------------------------

// ✅ Update Good Life Style Field
const updateGoodSongFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await goodSongFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No good song field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await goodSongFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getGoodSongFormatField = async (req, res) => {
  try {
    const result = await goodSongFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodSongFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await goodSongCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Good Song created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteGoodSongFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await goodSongCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllGoodSongFormat = async (req, res) => {
  try {
    const result = await goodSongCollection.find().sort({ _id: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodSongFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodSongCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Good Song not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateGoodSongFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await goodSongCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Good Song not found" });
    }

    res.json({
      success: true,
      message: "Good Song updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Exercise Develop Skills
const createExerciseGoodSongFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      link, // optional
      ideaShareImage, // optional
      userInfo,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    // Base data (required fields)
    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    // Optional fields (only add if provided)
    if (link && link.trim() !== "") {
      data.link = link.trim();
    }

    if (ideaShareImage && ideaShareImage.trim() !== "") {
      data.ideaShareImage = ideaShareImage.trim();
    }

    const result = await goodSongExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days (create index once in app init ideally)
    await goodSongExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const getAllExerciseGoodSongFormat = async (req, res) => {
  try {
    const result = await goodSongExerciseCollection
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodSongFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodSongExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -----------------------------------------------------------------------------
// Good Movie
// -----------------------------------------------------------------------------

// ✅ Update Good Life Style Field
const updateGoodMovieFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await goodMovieFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No good movie field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await goodMovieFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getGoodMovieFormatField = async (req, res) => {
  try {
    const result = await goodMovieFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodMovieFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await goodMovieCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Good Movie created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteGoodMovieFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await goodMovieCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllGoodMovieFormat = async (req, res) => {
  try {
    const result = await goodMovieCollection.find().sort({ _id: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodMovieFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodMovieCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Good Movie not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateGoodMovieFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await goodMovieCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Good Movie not found" });
    }

    res.json({
      success: true,
      message: "Good Movie updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Exercise Develop Skills
const createExerciseGoodMovieFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      link, // optional
      ideaShareImage, // optional
      userInfo,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    // Base data (required fields)
    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    // Optional fields (only add if provided)
    if (link && link.trim() !== "") {
      data.link = link.trim();
    }

    if (ideaShareImage && ideaShareImage.trim() !== "") {
      data.ideaShareImage = ideaShareImage.trim();
    }

    const result = await goodMovieExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days (create index once in app init ideally)
    await goodMovieExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const getAllExerciseGoodMovieFormat = async (req, res) => {
  try {
    const result = await goodMovieExerciseCollection
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodMovieFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodMovieExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -----------------------------------------------------------------------------
// Good Porem
// -----------------------------------------------------------------------------
// ✅ Update Good Life Style Field
const updateGoodPoremFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await goodPoremFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No good Porem field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await goodPoremFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getGoodPoremFormatField = async (req, res) => {
  try {
    const result = await goodPoremFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodPoremFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await goodPoremCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Good Porem created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteGoodPoremFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await goodPoremCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllGoodPoremFormat = async (req, res) => {
  try {
    const result = await goodPoremCollection.find().sort({ _id: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodPoremFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodPoremCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Good Porem not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateGoodPoremFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await goodPoremCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Good Porem not found" });
    }

    res.json({
      success: true,
      message: "Good Porem updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Exercise Develop Skills
const createExerciseGoodPoremFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      link, // optional
      ideaShareImage, // optional
      userInfo,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    // Base data (required fields)
    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    // Optional fields (only add if provided)
    if (link && link.trim() !== "") {
      data.link = link.trim();
    }

    if (ideaShareImage && ideaShareImage.trim() !== "") {
      data.ideaShareImage = ideaShareImage.trim();
    }

    const result = await goodPoremExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days (create index once in app init ideally)
    await goodPoremExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const getAllExerciseGoodPoremFormat = async (req, res) => {
  try {
    const result = await goodPoremExerciseCollection
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodPoremFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodPoremExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -----------------------------------------------------------------------------
// Good Nobel
// -----------------------------------------------------------------------------
// ✅ Update Good Life Style Field
const updateGoodNobelFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await goodNobelFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No good Nobel field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await goodNobelFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getGoodNobelFormatField = async (req, res) => {
  try {
    const result = await goodNobelFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodNobelFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await goodNobelCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Good Nobel created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteGoodNobelFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await goodNobelCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllGoodNobelFormat = async (req, res) => {
  try {
    const result = await goodNobelCollection.find().sort({ _id: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodNobelFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodNobelCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Good Nobel not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateGoodNobelFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await goodNobelCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Good Nobel not found" });
    }

    res.json({
      success: true,
      message: "Good Nobel updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Exercise Develop Skills
const createExerciseGoodNobelFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      link, // optional
      ideaShareImage, // optional
      userInfo,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    // Base data (required fields)
    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    // Optional fields (only add if provided)
    if (link && link.trim() !== "") {
      data.link = link.trim();
    }

    if (ideaShareImage && ideaShareImage.trim() !== "") {
      data.ideaShareImage = ideaShareImage.trim();
    }

    const result = await goodNobelExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days (create index once in app init ideally)
    await goodNobelExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const getAllExerciseGoodNobelFormat = async (req, res) => {
  try {
    const result = await goodNobelExerciseCollection
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodNobelFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodNobelExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Old generation format

// ✅ Update Old Generation Field
const updateOldGenerationFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await oldGenerationFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No Old Generation field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await oldGenerationFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({
        success: false,
        message: "No Old Generation field found to update",
      });

    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Old Generation Fields
const getOldGenerationFormatField = async (req, res) => {
  try {
    const result = await oldGenerationFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Old Generation
const createOldGenerationFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await oldGenerationCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Old Generation created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get All Old Generations
const getAllOldGenerationFormat = async (req, res) => {
  try {
    const result = await oldGenerationCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get Single Old Generation
const getSingleOldGenerationFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await oldGenerationCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Old Generation not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Update Old Generation
const updateOldGenerationFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await oldGenerationCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Old Generation not found" });
    }

    res.json({
      success: true,
      message: "Old Generation updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Old Generation
const deleteOldGenerationFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await oldGenerationCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Create Exercise Old Generation (with userInfo)
const createExerciseOldGenerationFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      userInfo, // 👈 frontend theke আসবে
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    const result = await oldGenerationExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await oldGenerationExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Get All Old Generation Exercises
const getAllExerciseOldGenerationFormat = async (req, res) => {
  try {
    const result = await oldGenerationExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Old Generation Exercise
const deleteExerciseOldGenerationFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await oldGenerationExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Story Wrrinting format

// ✅ Update Story Writing Field
const updateStoryWritingFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await storyWritingFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No Story Writing field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await storyWritingFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({
        success: false,
        message: "No Story Writing field found to update",
      });

    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Story Writing Fields
const getStoryWritingFormatField = async (req, res) => {
  try {
    const result = await storyWritingFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Old Generation
const createStoryWritingFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await storyWritingCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Story Writing created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get All Story Writings
const getAllStoryWritingFormat = async (req, res) => {
  try {
    const result = await storyWritingCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get Single Story Writing
const getSingleStoryWritingFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await storyWritingCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Story Writing not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Update Story Writing
const updateStoryWritingFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await storyWritingCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Story Writing not found" });
    }

    res.json({
      success: true,
      message: "Story Writing updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Story Writing
const deleteStoryWritingFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await storyWritingCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Create Exercise Story Writing (with userInfo)
const createExerciseStoryWritingFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      userInfo, // 👈 frontend theke আসবে
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    const result = await storyWritingExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await storyWritingExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Get All Old Generation Exercises
const getAllExerciseStoryWritingFormat = async (req, res) => {
  try {
    const result = await storyWritingExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Old Generation Exercise
const deleteExerciseStoryWritingFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await storyWritingExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Letter Writting
// ✅ Update Letter Writing Field
const updateLetterWritingFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await letterWritingFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No Letter Writing field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await letterWritingFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({
        success: false,
        message: "No Letter Writing field found to update",
      });

    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Letter Writing Fields
const getLetterWritingFormatField = async (req, res) => {
  try {
    const result = await letterWritingFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Old Generation
const createLetterWritingFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await letterWritingCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Letter Writing created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get All Letter Writings
const getAllLetterWritingFormat = async (req, res) => {
  try {
    const result = await letterWritingCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get Single Letter Writing
const getSingleLetterWritingFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await letterWritingCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Letter Writing not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Update Letter Writing
const updateLetterWritingFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await letterWritingCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Letter Writing not found" });
    }

    res.json({
      success: true,
      message: "Letter Writing updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Letter Writing
const deleteLetterWritingFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await letterWritingCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Create Exercise Letter Writing (with userInfo)
const createExerciseLetterWritingFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      userInfo, // 👈 frontend theke আসবে
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    const result = await letterWritingExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await letterWritingExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Get All Old Generation Exercises
const getAllExerciseLetterWritingFormat = async (req, res) => {
  try {
    const result = await letterWritingExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Old Generation Exercise
const deleteExerciseLetterWritingFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await letterWritingExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// MCQ format

// ✅ Update Letter Writing Field
const updateMcqFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await mcqFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No letter writing field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await mcqFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Letter Writing Fields
const getMcqFormatField = async (req, res) => {
  try {
    const result = await mcqFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Letter Writing
const createMcqFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await mcqCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Letter Writing created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Letter Writing
const deleteMcqFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await mcqCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Letter Writing
const getAllMcqFormat = async (req, res) => {
  try {
    const result = await mcqCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  // Traveling
  updateTravelingFormatField,
  getTravelingFormatField,
  createTravelingFormat,
  deleteTravelingFormat,
  getAllTravelingFormat,
  getSingleTravelingFormat,
  updateTravelingFormat,
  createExerciseTravelingFormat,
  getAllExerciseTravelingFormat,
  deleteExerciseTravelingFormat,
  // Good Song
  updateGoodSongFormatField,
  getGoodSongFormatField,
  createGoodSongFormat,
  deleteGoodSongFormat,
  getAllGoodSongFormat,
  getSingleGoodSongFormat,
  updateGoodSongFormat,
  createExerciseGoodSongFormat,
  getAllExerciseGoodSongFormat,
  deleteExerciseGoodSongFormat,
  // Good Movie
  updateGoodMovieFormatField,
  getGoodMovieFormatField,
  createGoodMovieFormat,
  deleteGoodMovieFormat,
  getAllGoodMovieFormat,
  getSingleGoodMovieFormat,
  updateGoodMovieFormat,
  createExerciseGoodMovieFormat,
  getAllExerciseGoodMovieFormat,
  deleteExerciseGoodMovieFormat,
  // Good Porem
  updateGoodPoremFormatField,
  getGoodPoremFormatField,
  createGoodPoremFormat,
  deleteGoodPoremFormat,
  getAllGoodPoremFormat,
  getSingleGoodPoremFormat,
  updateGoodPoremFormat,
  createExerciseGoodPoremFormat,
  getAllExerciseGoodPoremFormat,
  deleteExerciseGoodPoremFormat,
  // Good Nobel
  updateGoodNobelFormatField,
  getGoodNobelFormatField,
  createGoodNobelFormat,
  deleteGoodNobelFormat,
  getAllGoodNobelFormat,
  getSingleGoodNobelFormat,
  updateGoodNobelFormat,
  createExerciseGoodNobelFormat,
  getAllExerciseGoodNobelFormat,
  deleteExerciseGoodNobelFormat,
  //   five layer format
  // ✅ Add below new exports
  updateOldGenerationFormatField,
  getOldGenerationFormatField,
  createExerciseOldGenerationFormat,
  createOldGenerationFormat,
  deleteOldGenerationFormat,
  getAllOldGenerationFormat,
  getSingleOldGenerationFormat,
  updateOldGenerationFormat,
  deleteExerciseOldGenerationFormat,
  getAllExerciseOldGenerationFormat,

  updateStoryWritingFormatField,
  getStoryWritingFormatField,
  createExerciseStoryWritingFormat,
  createStoryWritingFormat,
  deleteStoryWritingFormat,
  getAllStoryWritingFormat,
  getSingleStoryWritingFormat,
  updateStoryWritingFormat,
  deleteExerciseStoryWritingFormat,
  getAllExerciseStoryWritingFormat,

  updateLetterWritingFormatField,
  getLetterWritingFormatField,
  createExerciseLetterWritingFormat,
  createLetterWritingFormat,
  deleteLetterWritingFormat,
  getAllLetterWritingFormat,
  getSingleLetterWritingFormat,
  updateLetterWritingFormat,
  deleteExerciseLetterWritingFormat,
  getAllExerciseLetterWritingFormat,

  updateMcqFormatField,
  getMcqFormatField,
  createMcqFormat,
  deleteMcqFormat,
  getAllMcqFormat,
};
