const { ObjectId } = require("mongodb");
const { getFirstLayerSentenceCollection } = require("../config/db");

// ✅ This already returns the collection
const sentenceCollection = getFirstLayerSentenceCollection();

// Create new sentence(s)
const createSentence = async (req, res) => {
  try {
    const sentences = Array.isArray(req.body) ? req.body : [req.body]; // always array
    const result = await sentenceCollection.insertMany(sentences);

    res.status(201).json({
      message: "Sentences added successfully",
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding sentences", error: error.message });
  }
};

// Get all sentences
const getSentences = async (req, res) => {
  try {
    const sentences = await sentenceCollection.find().sort({_id:-1}).toArray();
    res.json(sentences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sentences", error: error.message });
  }
};

// Delete sentence
const deleteSentence = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sentenceCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Sentence not found" });
    }

    res.json({ message: "Sentence deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sentence", error: error.message });
  }
};

module.exports = {
  createSentence,
  getSentences,
  deleteSentence,
};
