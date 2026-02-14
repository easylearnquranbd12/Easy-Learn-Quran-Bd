const { ObjectId } = require("mongodb");
const { getAuthorTextCollection } = require("../config/db");

const db = getAuthorTextCollection(); // db মানে এখন authorCollection

// Get all author info
const getAllAuthors = async (req, res) => {
  try {
    const authors = await db.find().toArray();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch authors", error: error.message });
  }
};

// Create new author info
const createAuthor = async (req, res) => {
  try {
    const authorData = req.body;

    // Count current number of authors
    const count = await db.countDocuments();

    if (count >= 3) {
      return res.status(400).json({
        success: false,
        message: "You can create a maximum of 3 authors only.",
      });
    }

    authorData.createdAt = new Date().toISOString();
    const result = await db.insertOne(authorData);

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: "Failed to create author info", error: error.message });
  }
};

// Delete author info
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.deleteOne({
      _id: new ObjectId(id),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete author info", error: error.message });
  }
};

module.exports = {
  getAllAuthors,
  createAuthor,
  deleteAuthor,
};
