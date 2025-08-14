const { ObjectId } = require("mongodb")
const { getUserCollection, getNotesCollection } = require("../config/db")

const notesCollection = getNotesCollection()

// Get user notes for a course
const getUserNotes = async (req, res) => {
    try {
        const { email, courseId } = req.params

        const notes = await notesCollection
            .find({
                userEmail: email,
                courseId: new ObjectId(courseId),
            })
            .sort({ createdAt: -1 })
            .toArray()

        res.status(200).json({
            success: true,
            data: notes,
        })
    } catch (error) {
        console.error("Get user notes error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
            error: error.message,
        })
    }
}

// Add a new note
const addNote = async (req, res) => {
    try {
        const { userEmail, courseId, contentId, contentTitle, note, timestamp } = req.body

        if (!userEmail || !courseId || !contentId || !note) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            })
        }

        const noteData = {
            userEmail,
            courseId: new ObjectId(courseId),
            contentId,
            contentTitle,
            note,
            timestamp: timestamp || 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const result = await notesCollection.insertOne(noteData)

        res.status(201).json({
            success: true,
            message: "Note added successfully",
            data: { ...noteData, _id: result.insertedId },
        })
    } catch (error) {
        console.error("Add note error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to add note",
            error: error.message,
        })
    }
}

// Update a note
const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params
        const { note } = req.body

        if (!note) {
            return res.status(400).json({
                success: false,
                message: "Note content is required",
            })
        }

        const result = await notesCollection.updateOne(
            { _id: new ObjectId(noteId) },
            {
                $set: {
                    note,
                    updatedAt: new Date(),
                },
            },
        )

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
        })
    } catch (error) {
        console.error("Update note error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to update note",
            error: error.message,
        })
    }
}

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params

        const result = await notesCollection.deleteOne({ _id: new ObjectId(noteId) })

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        })
    } catch (error) {
        console.error("Delete note error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to delete note",
            error: error.message,
        })
    }
}

module.exports = {
    getUserNotes,
    addNote,
    updateNote,
    deleteNote,
}
