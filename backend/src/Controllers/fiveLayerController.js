// -----------------------------------------------------------------------------
// Old Generation

const { ObjectId } = require("mongodb");
const {
  getFiveLayerOldGenerationFieldsCollection,
  getFiveLayerOldGenerationCollection,
  getFiveLayerOldGenerationExerciseCollection,
  getFiveLayerStoryWritingFieldsCollection,
  getFiveLayerStoryWritingCollection,
  getFiveLayerStoryWritingExerciseCollection,
  getFiveLayerLetterWritingFieldsCollection,
  getFiveLayerLetterWritingCollection,
  getFiveLayerLetterWritingExerciseCollection,
  getFiveLayerMcqFieldsCollection,
  getFiveLayerMcqCollection,
  getFiveLayerMcqExerciseCollection,
} = require("../config/db");
const { get } = require("../routes/fiveLayerRoutes");



// -----------------------------------------------------------------------------
// Old Generation
// -----------------------------------------------------------------------------
const oldGenerationFieldsCollection =
  getFiveLayerOldGenerationFieldsCollection();
const oldGenerationCollection = getFiveLayerOldGenerationCollection();
const oldGenerationExerciseCollection =
  getFiveLayerOldGenerationExerciseCollection();

// ✅ Update Old Generation Field
const updateOldGenerationField = async (req, res) => {
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
const getOldGenerationField = async (req, res) => {
  try {
    const result = await oldGenerationFieldsCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Old Generation
const createOldGeneration = async (req, res) => {
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
const getAllOldGeneration = async (req, res) => {
  try {
    const result = await oldGenerationCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get Single Old Generation
const getSingleOldGeneration = async (req, res) => {
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
const updateOldGeneration = async (req, res) => {
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
const deleteOldGeneration = async (req, res) => {
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
const createExerciseOldGeneration = async (req, res) => {
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
const getAllExerciseOldGeneration = async (req, res) => {
  try {
    const result = await oldGenerationExerciseCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Old Generation Exercise
const deleteExerciseOldGeneration = async (req, res) => {
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

// -----------------------------------------------------------------------------
// Story Writing
// -----------------------------------------------------------------------------
const storyWritingFieldsCollection =
  getFiveLayerStoryWritingFieldsCollection();
const storyWritingCollection = getFiveLayerStoryWritingCollection();
const storyWritingExerciseCollection =
  getFiveLayerStoryWritingExerciseCollection();

// ✅ Update Story Writing Field
const updateStoryWritingField = async (req, res) => {
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
const getStoryWritingField = async (req, res) => {
  try {
    const result = await storyWritingFieldsCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Old Generation
const createStoryWriting = async (req, res) => {
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
const getAllStoryWriting = async (req, res) => {
  try {
    const result = await storyWritingCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get Single Story Writing
const getSingleStoryWriting = async (req, res) => {
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
const updateStoryWriting = async (req, res) => {
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
const deleteStoryWriting = async (req, res) => {
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
const createExerciseStoryWriting = async (req, res) => {
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
const getAllExerciseStoryWriting = async (req, res) => {
  try {
    const result = await storyWritingExerciseCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Old Generation Exercise
const deleteExerciseStoryWriting = async (req, res) => {
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
// -----------------------------------------------------------------------------
// Letter Writing
// -----------------------------------------------------------------------------
const letterWritingFieldsCollection =
  getFiveLayerLetterWritingFieldsCollection();
const letterWritingCollection = getFiveLayerLetterWritingCollection();
const letterWritingExerciseCollection =
  getFiveLayerLetterWritingExerciseCollection();

// ✅ Update Letter Writing Field
const updateLetterWritingField = async (req, res) => {
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
const getLetterWritingField = async (req, res) => {
  try {
    const result = await letterWritingFieldsCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Old Generation
const createLetterWriting = async (req, res) => {
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
const getAllLetterWriting = async (req, res) => {
  try {
    const result = await letterWritingCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get Single Letter Writing
const getSingleLetterWriting = async (req, res) => {
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
const updateLetterWriting = async (req, res) => {
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
const deleteLetterWriting = async (req, res) => {
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
const createExerciseLetterWriting = async (req, res) => {
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
const getAllExerciseLetterWriting = async (req, res) => {
  try {
    const result = await letterWritingExerciseCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Old Generation Exercise
const deleteExerciseLetterWriting = async (req, res) => {
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

// -----------------------------------------------------------------------------
// MCq Writing
// -----------------------------------------------------------------------------
const mcqFieldsCollection = getFiveLayerMcqFieldsCollection();
const mcqCollection = getFiveLayerMcqCollection();

// ✅ Update Letter Writing Field
const updateMcqField = async (req, res) => {
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
      { $set: updateData }
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
const getMcqField = async (req, res) => {
  try {
    const result = await mcqFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Letter Writing
const createMcq = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await mcqCollection.insertOne(data);
    res
      .status(201)
      .json({
        success: true,
        message: "Letter Writing created successfully",
        data: result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Letter Writing
const deleteMcq = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await mcqCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Letter Writing
const getAllMcq = async (req, res) => {
  try {
    const result = await mcqCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------------------------
// EXPORT (add these)
// -----------------------------------------------------------------------------
module.exports = {
  // ✅ Add below new exports
  updateOldGenerationField,
  getOldGenerationField,
  createExerciseOldGeneration,
  createOldGeneration,
  deleteOldGeneration,
  getAllOldGeneration,
  getSingleOldGeneration,
  updateOldGeneration,
  deleteExerciseOldGeneration,
  getAllExerciseOldGeneration,


  updateStoryWritingField,
  getStoryWritingField,
  createExerciseStoryWriting,
  createStoryWriting,
  deleteStoryWriting,
  getAllStoryWriting,
  getSingleStoryWriting,
  updateStoryWriting,
  deleteExerciseStoryWriting,
  getAllExerciseStoryWriting,

  updateLetterWritingField,
  getLetterWritingField,
  createExerciseLetterWriting,
  createLetterWriting,
  deleteLetterWriting,
  getAllLetterWriting,
  getSingleLetterWriting,
  updateLetterWriting,
  deleteExerciseLetterWriting,
  getAllExerciseLetterWriting,

  updateMcqField,
  getMcqField,
  createMcq,
  deleteMcq,
  getAllMcq,
};
