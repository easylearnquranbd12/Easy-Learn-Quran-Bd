const express = require("express")
const { getUserNotes, addNote, updateNote, deleteNote } = require("../Controllers/userNotesController")

const router = express.Router()

// Notes routes
router.get("/notes/:email/:courseId", getUserNotes)
router.post("/notes", addNote)
router.put("/notes/:noteId", updateNote)
router.delete("/notes/:noteId", deleteNote)

module.exports = router
