const { ObjectId } = require("mongodb");

const {
  getFourthLayerTravelingFieldsCollection,
  getFourthLayerTravelingCollection,
  getFourthLayerTravelingExerciseCollection,
  getFourthLayerGoodSongFieldsCollection,
  getFourthLayerGoodSongCollection,
  getFourthLayerGoodSongExerciseCollection,
  getFourthLayerGoodPoremFieldsCollection,
  getFourthLayerGoodMovieCollection,
  getFourthLayerGoodMovieExerciseCollection,
  getFourthLayerGoodMovieFieldsCollection,
  getFourthLayerGoodPoremCollection,
  getFourthLayerGoodPoremExerciseCollection,
  getFourthLayerGoodNobelFieldsCollection,
  getFourthLayerGoodNobelCollection,
  getFourthLayerGoodNobelExerciseCollection,
} = require("../config/db");

// -----------------------------------------------------------------------------
// Traveling
// -----------------------------------------------------------------------------
const travelingFieldsCollection = getFourthLayerTravelingFieldsCollection();
const travelingCollection = getFourthLayerTravelingCollection();
const travelingExerciseCollection = getFourthLayerTravelingExerciseCollection();

// ✅ Update Good Life Style Field
const updateTravelingField = async (req, res) => {
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
const getTravelingField = async (req, res) => {
  try {
    const result = await travelingFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createTraveling = async (req, res) => {
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
const deleteTraveling = async (req, res) => {
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
const getAllTraveling = async (req, res) => {
  try {
    const result = await travelingCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleTraveling = async (req, res) => {
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
const updateTraveling = async (req, res) => {
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
const createExerciseTraveling = async (req, res) => {
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

const getAllExerciseTraveling = async (req, res) => {
  try {
    const result = await travelingExerciseCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseTraveling = async (req, res) => {
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
const goodSongFieldsCollection = getFourthLayerGoodSongFieldsCollection();
const goodSongCollection = getFourthLayerGoodSongCollection();
const goodSongExerciseCollection = getFourthLayerGoodSongExerciseCollection();

// ✅ Update Good Life Style Field
const updateGoodSongField = async (req, res) => {
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
const getGoodSongField = async (req, res) => {
  try {
    const result = await goodSongFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodSong = async (req, res) => {
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
const deleteGoodSong = async (req, res) => {
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
const getAllGoodSong = async (req, res) => {
  try {
    const result = await goodSongCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodSong = async (req, res) => {
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
const updateGoodSong = async (req, res) => {
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
const createExerciseGoodSong = async (req, res) => {
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

const getAllExerciseGoodSong = async (req, res) => {
  try {
    const result = await goodSongExerciseCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodSong = async (req, res) => {
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
const goodMovieFieldsCollection = getFourthLayerGoodMovieFieldsCollection();
const goodMovieCollection = getFourthLayerGoodMovieCollection();
const goodMovieExerciseCollection = getFourthLayerGoodMovieExerciseCollection();

// ✅ Update Good Life Style Field
const updateGoodMovieField = async (req, res) => {
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
const getGoodMovieField = async (req, res) => {
  try {
    const result = await goodMovieFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodMovie = async (req, res) => {
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
const deleteGoodMovie = async (req, res) => {
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
const getAllGoodMovie = async (req, res) => {
  try {
    const result = await goodMovieCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodMovie = async (req, res) => {
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
const updateGoodMovie = async (req, res) => {
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
const createExerciseGoodMovie = async (req, res) => {
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

const getAllExerciseGoodMovie = async (req, res) => {
  try {
    const result = await goodMovieExerciseCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodMovie = async (req, res) => {
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
const goodPoremFieldsCollection = getFourthLayerGoodPoremFieldsCollection();
const goodPoremCollection = getFourthLayerGoodPoremCollection();
const goodPoremExerciseCollection = getFourthLayerGoodPoremExerciseCollection();

// ✅ Update Good Life Style Field
const updateGoodPoremField = async (req, res) => {
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
const getGoodPoremField = async (req, res) => {
  try {
    const result = await goodPoremFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodPorem = async (req, res) => {
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
const deleteGoodPorem = async (req, res) => {
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
const getAllGoodPorem = async (req, res) => {
  try {
    const result = await goodPoremCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodPorem = async (req, res) => {
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
const updateGoodPorem = async (req, res) => {
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
const createExerciseGoodPorem = async (req, res) => {
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

const getAllExerciseGoodPorem = async (req, res) => {
  try {
    const result = await goodPoremExerciseCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodPorem = async (req, res) => {
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
const goodNobelFieldsCollection = getFourthLayerGoodNobelFieldsCollection();
const goodNobelCollection = getFourthLayerGoodNobelCollection();
const goodNobelExerciseCollection = getFourthLayerGoodNobelExerciseCollection();

// ✅ Update Good Life Style Field
const updateGoodNobelField = async (req, res) => {
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
const getGoodNobelField = async (req, res) => {
  try {
    const result = await goodNobelFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodNobel = async (req, res) => {
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
const deleteGoodNobel = async (req, res) => {
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
const getAllGoodNobel = async (req, res) => {
  try {
    const result = await goodNobelCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodNobel = async (req, res) => {
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
const updateGoodNobel = async (req, res) => {
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
const createExerciseGoodNobel = async (req, res) => {
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

const getAllExerciseGoodNobel = async (req, res) => {
  try {
    const result = await goodNobelExerciseCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodNobel = async (req, res) => {
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

module.exports = {
  // Traveling
  updateTravelingField,
  getTravelingField,
  createTraveling,
  deleteTraveling,
  getAllTraveling,
  getSingleTraveling,
  updateTraveling,
  createExerciseTraveling,
  getAllExerciseTraveling,
  deleteExerciseTraveling,
  // Good Song
  updateGoodSongField,
  getGoodSongField,
  createGoodSong,
  deleteGoodSong,
  getAllGoodSong,
  getSingleGoodSong,
  updateGoodSong,
  createExerciseGoodSong,
  getAllExerciseGoodSong,
  deleteExerciseGoodSong,
  // Good Movie
  updateGoodMovieField,
  getGoodMovieField,
  createGoodMovie,
  deleteGoodMovie,
  getAllGoodMovie,
  getSingleGoodMovie,
  updateGoodMovie,
  createExerciseGoodMovie,
  getAllExerciseGoodMovie,
  deleteExerciseGoodMovie,
  // Good Porem
  updateGoodPoremField,
  getGoodPoremField,
  createGoodPorem,
  deleteGoodPorem,
  getAllGoodPorem,
  getSingleGoodPorem,
  updateGoodPorem,
  createExerciseGoodPorem,
  getAllExerciseGoodPorem,
  deleteExerciseGoodPorem,
  // Good Nobel
  updateGoodNobelField,
  getGoodNobelField,
  createGoodNobel,
  deleteGoodNobel,
  getAllGoodNobel,
  getSingleGoodNobel,
  updateGoodNobel,
  createExerciseGoodNobel,
  getAllExerciseGoodNobel,
  deleteExerciseGoodNobel,
};
