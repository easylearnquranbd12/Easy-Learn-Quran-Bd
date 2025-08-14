const { ObjectId } = require("mongodb")
const { getEnrollmentCollection } = require("../config/db")

const enrollmentCollection = getEnrollmentCollection()

// Create a new enrollment
const createEnrollment = async (req, res) => {
    try {
        const enrollmentData = req.body
console.log(req.body)
        // Add timestamps
        enrollmentData.enrollmentDate = new Date()
        enrollmentData.createdAt = new Date()
        enrollmentData.updatedAt = new Date()

        // Set default status if not provided
        if (!enrollmentData.status) {
            enrollmentData.status = "pending"
        }

        // Initialize progress if not provided
        if (!enrollmentData.progress) {
            enrollmentData.progress = {
                completedLessons: [],
                currentLesson: 0,
                progressPercentage: 0,
                lastAccessed: new Date(),
            }
        }

        // Convert string IDs to ObjectId
        if (enrollmentData.courseId) {
            enrollmentData.courseId = new ObjectId(enrollmentData.courseId)
        }
        if (enrollmentData.studentId) {
            enrollmentData.studentId = new ObjectId(enrollmentData.studentId)
        }

        const result = await enrollmentCollection.insertOne(enrollmentData)

        res.status(201).json({
            success: true,
            message: "Enrollment created successfully",
            data: result,
        })
    } catch (error) {
        console.error("Create enrollment error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to create enrollment",
            error: error.message,
        })
    }
}

// Get all enrollments
const getAllEnrollments = async (req, res) => {
    try {
        const { status, paymentMethod, search, limit, skip } = req.query

        // Build filter object
        const filter = {}

        if (status) {
            filter.status = status
        }

        if (paymentMethod) {
            filter.paymentMethod = paymentMethod
        }

        if (search) {
            filter.$or = [
                { studentName: { $regex: search, $options: "i" } },
                { studentEmail: { $regex: search, $options: "i" } },
                { courseTitle: { $regex: search, $options: "i" } },
                { transactionId: { $regex: search, $options: "i" } },
            ]
        }

        // Build query with pagination
        let query = enrollmentCollection.find(filter).sort({ createdAt: -1 })

        if (limit) {
            query = query.limit(Number.parseInt(limit))
        }

        if (skip) {
            query = query.skip(Number.parseInt(skip))
        }

        const enrollments = await query.toArray()
        const totalCount = await enrollmentCollection.countDocuments(filter)

        res.status(200).json({
            success: true,
            data: enrollments,
            pagination: {
                total: totalCount,
                limit: Number.parseInt(limit) || enrollments.length,
                skip: Number.parseInt(skip) || 0,
            },
        })
    } catch (error) {
        console.error("Get enrollments error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch enrollments",
            error: error.message,
        })
    }
}

// Get enrollment statistics
const getEnrollmentStats = async (req, res) => {
    try {
        const totalEnrollments = await enrollmentCollection.countDocuments()
        const pendingEnrollments = await enrollmentCollection.countDocuments({ status: "pending" })
        const activeEnrollments = await enrollmentCollection.countDocuments({ status: "active" })
        const cancelledEnrollments = await enrollmentCollection.countDocuments({ status: "cancelled" })

        // Calculate total revenue from active enrollments
        const revenueResult = await enrollmentCollection
            .aggregate([{ $match: { status: "active" } }, { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }])
            .toArray()

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0

        // Get recent enrollments
        const recentEnrollments = await enrollmentCollection.find().sort({ createdAt: -1 }).limit(5).toArray()

        res.status(200).json({
            success: true,
            data: {
                totalEnrollments,
                pendingEnrollments,
                activeEnrollments,
                cancelledEnrollments,
                totalRevenue,
                recentEnrollments,
            },
        })
    } catch (error) {
        console.error("Get enrollment stats error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch enrollment statistics",
            error: error.message,
        })
    }
}

// Get a single enrollment by ID
const getEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enrollment ID format",
            })
        }

        const enrollment = await enrollmentCollection.findOne({ _id: new ObjectId(id) })

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            })
        }

        res.status(200).json({
            success: true,
            data: enrollment,
        })
    } catch (error) {
        console.error("Get enrollment by ID error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch enrollment",
            error: error.message,
        })
    }
}

// Update enrollment status
const updateEnrollmentStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enrollment ID format",
            })
        }

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            })
        }

        // Validate status values
        const validStatuses = ["pending", "active", "cancelled"]
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Must be one of: pending, active, cancelled",
            })
        }

        const updateData = {
            status: status,
            updatedAt: new Date(),
        }

        const result = await enrollmentCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            })
        }

        // Get updated enrollment
        const updatedEnrollment = await enrollmentCollection.findOne({ _id: new ObjectId(id) })

        res.status(200).json({
            success: true,
            message: "Enrollment status updated successfully",
            data: updatedEnrollment,
        })
    } catch (error) {
        console.error("Update enrollment status error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to update enrollment status",
            error: error.message,
        })
    }
}

// Update enrollment progress
const updateEnrollmentProgress = async (req, res) => {
    try {
        const { id } = req.params
        const progressData = req.body

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enrollment ID format",
            })
        }

        const updateData = {
            progress: {
                ...progressData,
                lastAccessed: new Date(),
            },
            updatedAt: new Date(),
        }

        const result = await enrollmentCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            })
        }

        // Get updated enrollment
        const updatedEnrollment = await enrollmentCollection.findOne({ _id: new ObjectId(id) })

        res.status(200).json({
            success: true,
            message: "Enrollment progress updated successfully",
            data: updatedEnrollment,
        })
    } catch (error) {
        console.error("Update enrollment progress error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to update enrollment progress",
            error: error.message,
        })
    }
}

// Delete an enrollment
const deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enrollment ID format",
            })
        }

        const result = await enrollmentCollection.deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Enrollment deleted successfully",
        })
    } catch (error) {
        console.error("Delete enrollment error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to delete enrollment",
            error: error.message,
        })
    }
}

// Get enrollments by student ID
const getEnrollmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params

        if (!ObjectId.isValid(studentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID format",
            })
        }

        const enrollments = await enrollmentCollection
            .find({ studentId: new ObjectId(studentId) })
            .sort({ createdAt: -1 })
            .toArray()

        res.status(200).json({
            success: true,
            data: enrollments,
            count: enrollments.length,
        })
    } catch (error) {
        console.error("Get enrollments by student error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch student enrollments",
            error: error.message,
        })
    }
}

// Get enrollments by course ID
const getEnrollmentsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID format",
            })
        }

        const enrollments = await enrollmentCollection
            .find({ courseId: new ObjectId(courseId) })
            .sort({ createdAt: -1 })
            .toArray()

        // Get enrollment statistics for this course
        const totalEnrollments = enrollments.length
        const activeEnrollments = enrollments.filter((e) => e.status === "active").length
        const pendingEnrollments = enrollments.filter((e) => e.status === "pending").length
        const totalRevenue = enrollments.filter((e) => e.status === "active").reduce((sum, e) => sum + (e.amount || 0), 0)

        res.status(200).json({
            success: true,
            data: enrollments,
            stats: {
                totalEnrollments,
                activeEnrollments,
                pendingEnrollments,
                totalRevenue,
            },
        })
    } catch (error) {
        console.error("Get enrollments by course error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch course enrollments",
            error: error.message,
        })
    }
}

module.exports = {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollmentStatus,
    deleteEnrollment,
    getEnrollmentsByStudent,
    getEnrollmentsByCourse,
    updateEnrollmentProgress,
    getEnrollmentStats,
}
