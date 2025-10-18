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
          .json({ success: false, message: "No old generation field found" });
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

// ✅ Get Old Generation Fields
const getOldGenerationField = async (req, res) => {
  try {
    const result = await oldGenerationFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Old Generation
const createExerciseOldGeneration = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date() };
    const result = await oldGenerationExerciseCollection.insertOne(data);
    await oldGenerationExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
    res
      .status(201)
      .json({
        success: true,
        id: result.insertedId,
        message: "Exercise created. Auto-delete after 30 days.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Old Generation
const createOldGeneration = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await oldGenerationCollection.insertOne(data);
    res
      .status(201)
      .json({
        success: true,
        message: "Old Generation created successfully",
        data: result,
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

// ✅ Get All Old Generation
const getAllOldGeneration = async (req, res) => {
  try {
    const result = await oldGenerationCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------------------------
// Story Writing
// -----------------------------------------------------------------------------
const storyWritingFieldsCollection = getFiveLayerStoryWritingFieldsCollection();
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
          .json({ success: false, message: "No story writing field found" });
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

// ✅ Get Story Writing Fields
const getStoryWritingField = async (req, res) => {
  try {
    const result = await storyWritingFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Story Writing
const createExerciseStoryWriting = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date() };
    const result = await storyWritingExerciseCollection.insertOne(data);
    await storyWritingExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
    res
      .status(201)
      .json({
        success: true,
        id: result.insertedId,
        message: "Exercise created. Auto-delete after 30 days.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Story Writing
const createStoryWriting = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await storyWritingCollection.insertOne(data);
    res
      .status(201)
      .json({
        success: true,
        message: "Story Writing created successfully",
        data: result,
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

// ✅ Get All Story Writing
const getAllStoryWriting = async (req, res) => {
  try {
    const result = await storyWritingCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
          .json({ success: false, message: "No letter writing field found" });
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
const getLetterWritingField = async (req, res) => {
  try {
    const result = await letterWritingFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Letter Writing
const createExerciseLetterWriting = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date() };
    const result = await letterWritingExerciseCollection.insertOne(data);
    await letterWritingExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
    res
      .status(201)
      .json({
        success: true,
        id: result.insertedId,
        message: "Exercise created. Auto-delete after 30 days.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Letter Writing
const createLetterWriting = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await letterWritingCollection.insertOne(data);
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

// ✅ Get All Letter Writing
const getAllLetterWriting = async (req, res) => {
  try {
    const result = await letterWritingCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  // Existing exports...
  // ✅ Add below new exports
  updateOldGenerationField,
  getOldGenerationField,
  createExerciseOldGeneration,
  createOldGeneration,
  deleteOldGeneration,
  getAllOldGeneration,

  updateStoryWritingField,
  getStoryWritingField,
  createExerciseStoryWriting,
  createStoryWriting,
  deleteStoryWriting,
  getAllStoryWriting,

  updateLetterWritingField,
  getLetterWritingField,
  createExerciseLetterWriting,
  createLetterWriting,
  deleteLetterWriting,
  getAllLetterWriting,

  updateMcqField,
  getMcqField,
  createMcq,
  deleteMcq,
  getAllMcq,
};
