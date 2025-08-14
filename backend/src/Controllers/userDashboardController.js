const { ObjectId } = require("mongodb")
const { getUserCollection, getCourseCollection, getEnrollmentCollection } = require("../config/db")

const userCollection = getUserCollection()
const courseCollection = getCourseCollection()
const enrollmentCollection = getEnrollmentCollection()

// Get user dashboard data
const getUserDashboard = async (req, res) => {
    try {
        const { email } = req.params

        // Get user data
        const user = await userCollection.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        // Get user enrollments
        const enrollments = await enrollmentCollection.find({ studentEmail: email }).toArray()

        // Get enrolled courses with details
        const enrolledCourses = []
        for (const enrollment of enrollments) {
            const course = await courseCollection.findOne({ _id: new ObjectId(enrollment.courseId) })
            if (course) {
                enrolledCourses.push({
                    ...course,
                    progress: enrollment.progress?.progressPercentage || 0,
                    status: enrollment.status,
                    lastAccessed: enrollment.progress?.lastAccessed || enrollment.enrollmentDate,
                    enrollmentId: enrollment._id,
                })
            }
        }

        // Calculate stats
        const stats = {
            totalCourses: enrolledCourses.length,
            completedCourses: enrolledCourses.filter((course) => course.progress >= 100).length,
            totalHours: enrolledCourses.reduce((total, course) => {
                const duration = course.duration || "0 hours"
                const hours = Number.parseInt(duration.match(/\d+/)?.[0] || 0)
                return total + hours
            }, 0),
            certificates: enrolledCourses.filter((course) => course.progress >= 100).length,
        }

        // Get favorites
        const favorites = user.favorites || []
        const favoriteCourses = []
        for (const courseId of favorites) {
            const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })
            if (course) {
                favoriteCourses.push(course)
            }
        }

        // Mock achievements (you can implement a proper achievements system)
        const achievements = [
            {
                id: "1",
                title: "First Course Completed",
                icon: "Trophy",
                earned: stats.completedCourses > 0,
                date: stats.completedCourses > 0 ? new Date().toISOString() : null,
            },
            {
                id: "2",
                title: "Quick Learner",
                icon: "Zap",
                earned: stats.completedCourses >= 2,
                date: stats.completedCourses >= 2 ? new Date().toISOString() : null,
            },
            {
                id: "3",
                title: "Course Collector",
                icon: "BookOpen",
                earned: stats.totalCourses >= 5,
                date: stats.totalCourses >= 5 ? new Date().toISOString() : null,
            },
            {
                id: "4",
                title: "Perfect Score",
                icon: "Star",
                earned: false,
            },
        ]

        // Recent activity
        const recentActivity = enrollments
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 5)
            .map((enrollment) => ({
                id: enrollment._id,
                course: enrollment.courseTitle || "Course",
                type: enrollment.progress?.progressPercentage >= 100 ? "completed" : "in progress",
                icon: enrollment.progress?.progressPercentage >= 100 ? "CheckCircle" : "BookOpen",
                date: new Date(enrollment.updatedAt).toLocaleDateString(),
            }))

        res.status(200).json({
            success: true,
            data: {
                user: {
                    name: user.name || user.displayName,
                    email: user.email,
                    imgUrl: user.imgUrl || user.photoURL,
                    createdAt: user.createdAt,
                },
                stats,
                enrolledCourses,
                favorites: favoriteCourses,
                achievements,
                recentActivity,
            },
        })
    } catch (error) {
        console.error("Get user dashboard error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data",
            error: error.message,
        })
    }
}

// Get enrolled courses
const getEnrolledCourses = async (req, res) => {
    try {
        const { email } = req.params

        // Get user enrollments
        const enrollments = await enrollmentCollection.find({ studentEmail: email }).sort({ enrollmentDate: -1 }).toArray()

        // Get enrolled courses with details
        const enrolledCourses = []
        for (const enrollment of enrollments) {
            const course = await courseCollection.findOne({ _id: new ObjectId(enrollment.courseId) })
            if (course) {
                enrolledCourses.push({
                    ...course,
                    progress: enrollment.progress?.progressPercentage || 0,
                    status: enrollment.status,
                    lastAccessed: enrollment.progress?.lastAccessed || enrollment.enrollmentDate,
                    enrollmentId: enrollment._id,
                    enrollmentDate: enrollment.enrollmentDate,
                })
            }
        }

        res.status(200).json({
            success: true,
            data: enrolledCourses,
        })
    } catch (error) {
        console.error("Get enrolled courses error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch enrolled courses",
            error: error.message,
        })
    }
}

// Get user favorites
const getFavorites = async (req, res) => {
    try {
        const { email } = req.params

        const user = await userCollection.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const favorites = user.favorites || []
        const favoriteCourses = []

        for (const courseId of favorites) {
            const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })
            if (course) {
                favoriteCourses.push(course)
            }
        }

        res.status(200).json({
            success: true,
            data: favoriteCourses,
        })
    } catch (error) {
        console.error("Get favorites error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch favorites",
            error: error.message,
        })
    }
}

// Get user achievements
const getAchievements = async (req, res) => {
    try {
        const { email } = req.params

        // Get user enrollments to calculate achievements
        const enrollments = await enrollmentCollection.find({ studentEmail: email }).toArray()

        const completedCourses = enrollments.filter((e) => e.progress?.progressPercentage >= 100).length
        const totalCourses = enrollments.length

        const achievements = [
            {
                id: "1",
                title: "First Course Completed",
                icon: "Trophy",
                earned: completedCourses > 0,
                date: completedCourses > 0 ? new Date().toISOString() : null,
            },
            {
                id: "2",
                title: "Quick Learner",
                icon: "Zap",
                earned: completedCourses >= 2,
                date: completedCourses >= 2 ? new Date().toISOString() : null,
            },
            {
                id: "3",
                title: "Course Collector",
                icon: "BookOpen",
                earned: totalCourses >= 5,
                date: totalCourses >= 5 ? new Date().toISOString() : null,
            },
            {
                id: "4",
                title: "Perfect Score",
                icon: "Star",
                earned: false,
            },
            {
                id: "5",
                title: "Learning Streak",
                icon: "Zap",
                earned: totalCourses >= 3,
                date: totalCourses >= 3 ? new Date().toISOString() : null,
            },
            {
                id: "6",
                title: "Knowledge Seeker",
                icon: "BookOpen",
                earned: completedCourses >= 5,
                date: completedCourses >= 5 ? new Date().toISOString() : null,
            },
        ]

        res.status(200).json({
            success: true,
            data: achievements,
        })
    } catch (error) {
        console.error("Get achievements error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch achievements",
            error: error.message,
        })
    }
}

// Toggle favorite
const toggleFavorite = async (req, res) => {
    try {
        const { userEmail, courseId } = req.body

        if (!userEmail || !courseId) {
            return res.status(400).json({
                success: false,
                message: "User email and course ID are required",
            })
        }

        const user = await userCollection.findOne({ email: userEmail })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const favorites = user.favorites || []
        const isFavorite = favorites.includes(courseId)

        let updateOperation
        if (isFavorite) {
            // Remove from favorites
            updateOperation = { $pull: { favorites: courseId } }
        } else {
            // Add to favorites
            updateOperation = { $addToSet: { favorites: courseId } }
        }

        await userCollection.updateOne({ email: userEmail }, updateOperation)

        res.status(200).json({
            success: true,
            message: isFavorite ? "Removed from favorites" : "Added to favorites",
            isFavorite: !isFavorite,
        })
    } catch (error) {
        console.error("Toggle favorite error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to toggle favorite",
            error: error.message,
        })
    }
}

// Remove from favorites
const removeFavorite = async (req, res) => {
    try {
        const { userEmail, courseId } = req.body

        if (!userEmail || !courseId) {
            return res.status(400).json({
                success: false,
                message: "User email and course ID are required",
            })
        }

        await userCollection.updateOne({ email: userEmail }, { $pull: { favorites: courseId } })

        res.status(200).json({
            success: true,
            message: "Removed from favorites",
        })
    } catch (error) {
        console.error("Remove favorite error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to remove from favorites",
            error: error.message,
        })
    }
}

// Update course progress
const updateCourseProgress = async (req, res) => {
    try {
        const { courseId, lessonId, progressPercentage, completedLessons } = req.body
        const userEmail = req.params.email

        if (!courseId || progressPercentage === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: courseId and progressPercentage",
            })
        }

        const enrollmentCollection = getEnrollmentCollection()

        // Update the enrollment progress
        const updateData = {
            "progress.progressPercentage": progressPercentage,
            "progress.lastAccessed": new Date(),
            updatedAt: new Date(),
        }

        if (lessonId !== undefined) {
            updateData["progress.currentLesson"] = lessonId
        }

        if (completedLessons && Array.isArray(completedLessons)) {
            updateData["progress.completedLessons"] = completedLessons
        }

        const result = await enrollmentCollection.updateOne(
            {
                courseId: new ObjectId(courseId),
                studentEmail: userEmail,
            },
            { $set: updateData },
        )

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Progress updated successfully",
        })
    } catch (error) {
        console.error("Error updating user progress:", error)
        res.status(500).json({
            success: false,
            message: "Failed to update progress",
            error: error.message,
        })
    }
}

const updateUserProgress = async (req, res) => {
    try {
        console.log(req.params.email)
        const { courseId, lessonId, progressPercentage, completedLessons } = req.body
        const userEmail = req.params.email;

        if (!courseId || progressPercentage === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: courseId and progressPercentage",
            })
        }

        const enrollmentCollection = getEnrollmentCollection()

        // Update the enrollment progress
        const updateData = {
            "progress.progressPercentage": progressPercentage,
            "progress.lastAccessed": new Date(),
            updatedAt: new Date(),
        }

        if (lessonId) {
            updateData["progress.currentLesson"] = lessonId
        }

        if (completedLessons) {
            updateData["progress.completedLessons"] = completedLessons
        }

        const result = await enrollmentCollection.updateOne(
            {
                courseId: new ObjectId(courseId),
                studentEmail: userEmail,
            },
            { $set: updateData },
        )

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Progress updated successfully",
        })
    } catch (error) {
        console.error("Error updating user progress:", error)
        res.status(500).json({
            success: false,
            message: "Failed to update progress",
            error: error.message,
        })
    }
}


module.exports = {
    getUserDashboard,
    getEnrolledCourses,
    getFavorites,
    getAchievements,
    toggleFavorite,
    removeFavorite,
    updateCourseProgress,
    updateUserProgress
}
