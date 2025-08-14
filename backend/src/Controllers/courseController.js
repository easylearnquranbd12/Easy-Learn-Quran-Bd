const moment = require("moment")
const { ObjectId } = require("mongodb")
const { getUserCollection, getCourseCollection, getEnrollmentCollection } = require("../config/db")
const userCollection = getUserCollection()
const courseCollection = getCourseCollection()
const enrollmentCollection = getEnrollmentCollection()
// Get all courses (existing function - updated to support new API format)
const getAllCourse = async (req, res) => {
    try {
        const courses = await courseCollection.find({}).toArray()

        // Check if this is the new API format (has success field expected)
        if (req.path.includes("/courses") && !req.path.includes("get-all-course")) {
            res.status(200).json({ success: true, data: courses })
        } else {
            // Keep backward compatibility for existing endpoint
            res.status(200).json(courses)
        }
    } catch (error) {
        console.error("Error fetching courses:", error)
        if (req.path.includes("/courses") && !req.path.includes("get-all-course")) {
            res.status(500).json({ success: false, message: "Failed to fetch courses", error: error.message })
        } else {
            res.status(500).json({ error: "Failed to fetch courses" })
        }
    }
}

// Get a single course by ID (with enrollment check)
const getCourse = async (req, res) => {
    try {
        const courseId = req.params.id
        const userEmail = req.query.userEmail || req.headers['user-email'] // Get user email from query or header

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        // Check if user is provided
        if (!userEmail) {
            return res.status(401).json({
                success: false,
                message: "User authentication required to access course content"
            })
        }

        // Find the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Check if user is enrolled in this course
        const enrollment = await enrollmentCollection.findOne({
            courseId: new ObjectId(courseId),
            studentEmail: userEmail
        })

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You must be enrolled in this course to view its content.",
                code: "NOT_ENROLLED"
            })
        }

        // Check if enrollment is active (not just pending)
        if (enrollment.status !== "active") {
            return res.status(403).json({
                success: false,
                message: `Course access is ${enrollment.status}. Please contact support if you believe this is an error.`,
                code: "ENROLLMENT_NOT_ACTIVE",
                enrollmentStatus: enrollment.status
            })
        }

        // Return course data with enrollment information
        const courseWithEnrollment = {
            ...course,
            enrollment: {
                enrollmentId: enrollment._id,
                enrollmentDate: enrollment.enrollmentDate,
                status: enrollment.status,
                progress: enrollment.progress,
                transactionId: enrollment.transactionId,
                paymentMethod: enrollment.paymentMethod
            }
        }

        res.status(200).json({ success: true, data: courseWithEnrollment })
    } catch (error) {
        console.error("Error fetching course:", error)
        res.status(500).json({ success: false, message: "Failed to fetch course", error: error.message })
    }
}

const getCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.id

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        // Find the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Check if course is published
        if (course.status !== "published") {
            return res.status(403).json({
                success: false,
                message: "This course is not available for public viewing",
            })
        }

        // Create safe course data without sensitive content
        const safeCourseData = {
            _id: course._id,
            title: course.title,
            slug: course.slug,
            description: course.description,
            price: course.price,
            duration: course.duration,
            level: course.level,
            category: course.category,
            thumbnailUrl: course.thumbnailUrl,
            status: course.status,
            instructor: course.instructor,
            tags: course.tags,
            enrollmentCount: course.enrollmentCount || 0,
            rating: course.rating || 0,
            reviewCount: course.reviewCount || 0,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
            // Only include basic content info without sensitive data
            contentSummary: {
                totalLessons: course.contents?.length || 0,
                previewLessons: course.contents?.filter(content => content.isPreview)?.length || 0,
                videoLessons: course.contents?.filter(content => content.type === "video")?.length || 0,
                articleLessons: course.contents?.filter(content => content.type === "article")?.length || 0,
                quizLessons: course.contents?.filter(content => content.type === "quiz")?.length || 0,
            },
            // Only include preview content for public viewing
            previewContent: course.contents?.filter(content => content.isPreview)?.map(content => ({
                id: content.id,
                title: content.title,
                type: content.type,
                duration: content.duration,
                description: content.description,
                isPreview: content.isPreview,
                videoUrl: content.videoUrl,
                videoThumbnail: content.videoThumbnail,
            })) || [],
        }

        res.status(200).json({ success: true, data: safeCourseData })
    } catch (error) {
        console.error("Error fetching course details:", error)
        res.status(500).json({ success: false, message: "Failed to fetch course details", error: error.message })
    }
}

// Create a new course
const createCourse = async (req, res) => {
    try {
        const courseData = req.body

        // Validate required fields
        if (!courseData.title || !courseData.description || !courseData.price) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                requiredFields: ["title", "description", "price"],
            })
        }

        // Generate slug if not provided
        if (!courseData.slug) {
            courseData.slug = courseData.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, "")
                .replace(/\s+/g, "-")
        }

        // Add metadata
        courseData.createdAt = new Date()
        courseData.updatedAt = new Date()
        courseData.enrollmentCount = courseData.enrollmentCount || 0
        courseData.rating = courseData.rating || 0
        courseData.reviewCount = courseData.reviewCount || 0
        courseData.status = courseData.status || "draft"
        courseData.contents = courseData.contents || []

        const result = await courseCollection.insertOne(courseData)

        // Get the newly created course
        const newCourse = await courseCollection.findOne({ _id: result.insertedId })

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        })
    } catch (error) {
        console.error("Error creating course:", error)
        res.status(500).json({ success: false, message: "Failed to create course", error: error.message })
    }
}

// Update a course
const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id
        const updates = req.body

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        // Don't allow direct modification of these fields
        delete updates._id
        delete updates.createdAt
        delete updates.enrollmentCount
        delete updates.rating
        delete updates.reviewCount

        // Update the timestamp
        updates.updatedAt = new Date()

        const result = await courseCollection.updateOne({ _id: new ObjectId(courseId) }, { $set: updates })

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Get the updated course
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error("Error updating course:", error)
        res.status(500).json({ success: false, message: "Failed to update course", error: error.message })
    }
};

// Add to your course controller
const updateCourseStatus = async (req, res) => {
    try {
        const courseId = req.params.id
        const { status } = req.body

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        if (!['published', 'draft'].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" })
        }

        const result = await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            { $set: { status, updatedAt: new Date() } }
        )

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(200).json({
            success: true,
            message: "Course status updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update course status", error: error.message })
    }
}

// Delete a course
const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        // Get the course before deletion for the response
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        await courseCollection.deleteOne({ _id: new ObjectId(courseId) })

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data: course,
        })
    } catch (error) {
        console.error("Error deleting course:", error)
        res.status(500).json({ success: false, message: "Failed to delete course", error: error.message })
    }
}

// Add content to a course
const addContent = async (req, res) => {
    try {
        const courseId = req.params.id
        const contentData = req.body

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        // Validate required fields
        if (!contentData.title || !contentData.type || !contentData.duration) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                requiredFields: ["title", "type", "duration"],
            })
        }

        // Get the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Prepare the content with an ID
        const contents = course.contents || []
        const newContent = {
            ...contentData,
            id: contents.length > 0 ? Math.max(...contents.map((c) => c.id)) + 1 : 1,
        }

        // Add the content to the course
        const result = await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            {
                $push: { contents: newContent },
                $set: { updatedAt: new Date() },
            },
        )

        // Get the updated course
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(201).json({
            success: true,
            message: "Content added successfully",
            data: {
                course: updatedCourse,
                addedContent: newContent,
            },
        })
    } catch (error) {
        console.error("Error adding content:", error)
        res.status(500).json({ success: false, message: "Failed to add content", error: error.message })
    }
}

// Update content in a course
const updateContent = async (req, res) => {
    try {
        const courseId = req.params.courseId
        const contentId = Number.parseInt(req.params.contentId)
        const updates = req.body

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        if (isNaN(contentId)) {
            return res.status(400).json({ success: false, message: "Invalid content ID format" })
        }

        // Don't allow changing the content ID
        delete updates.id

        // Get the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Check if the content exists
        const contentIndex = course.contents ? course.contents.findIndex((c) => c.id === contentId) : -1

        if (contentIndex === -1) {
            return res.status(404).json({ success: false, message: "Content not found in this course" })
        }

        // Update the content
        const updatedContents = [...course.contents]
        updatedContents[contentIndex] = { ...updatedContents[contentIndex], ...updates }

        const result = await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            {
                $set: {
                    contents: updatedContents,
                    updatedAt: new Date(),
                },
            },
        )

        // Get the updated course
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(200).json({
            success: true,
            message: "Content updated successfully",
            data: {
                course: updatedCourse,
                updatedContent: updatedContents[contentIndex],
            },
        })
    } catch (error) {
        console.error("Error updating content:", error)
        res.status(500).json({ success: false, message: "Failed to update content", error: error.message })
    }
}

// Delete content from a course
const deleteContent = async (req, res) => {
    try {
        const courseId = req.params.courseId
        const contentId = Number.parseInt(req.params.contentId)

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        if (isNaN(contentId)) {
            return res.status(400).json({ success: false, message: "Invalid content ID format" })
        }

        // Get the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Check if the content exists
        const contentToDelete = course.contents ? course.contents.find((c) => c.id === contentId) : null

        if (!contentToDelete) {
            return res.status(404).json({ success: false, message: "Content not found in this course" })
        }

        // Remove the content
        const result = await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            {
                $pull: { contents: { id: contentId } },
                $set: { updatedAt: new Date() },
            },
        )

        // Get the updated course
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(200).json({
            success: true,
            message: "Content deleted successfully",
            data: {
                course: updatedCourse,
                deletedContent: contentToDelete,
            },
        })
    } catch (error) {
        console.error("Error deleting content:", error)
        res.status(500).json({ success: false, message: "Failed to delete content", error: error.message })
    }
}

// Bulk add content to a course
const bulkAddContent = async (req, res) => {
    try {
        const courseId = req.params.id
        const contentsData = req.body.contents

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        if (!Array.isArray(contentsData) || contentsData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body. Expected an array of contents",
            })
        }

        // Get the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Prepare the contents with IDs
        const existingContents = course.contents || []
        let nextId = existingContents.length > 0 ? Math.max(...existingContents.map((c) => c.id)) + 1 : 1

        const newContents = contentsData.map((content) => ({
            ...content,
            id: nextId++,
        }))

        // Add the contents to the course
        const result = await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            {
                $push: { contents: { $each: newContents } },
                $set: { updatedAt: new Date() },
            },
        )

        // Get the updated course
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(201).json({
            success: true,
            message: `${newContents.length} contents added successfully`,
            data: {
                course: updatedCourse,
                addedContents: newContents,
            },
        })
    } catch (error) {
        console.error("Error adding bulk contents:", error)
        res.status(500).json({ success: false, message: "Failed to add contents", error: error.message })
    }
}

// Reorder contents in a course
const reorderContents = async (req, res) => {
    try {
        const courseId = req.params.id
        const { contentIds } = req.body // Array of content IDs in the new order

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        if (!Array.isArray(contentIds)) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body. Expected an array of content IDs",
            })
        }

        // Get the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Check if all content IDs exist in the course
        const existingContents = course.contents || []
        const existingIds = existingContents.map((c) => c.id)

        if (contentIds.length !== existingContents.length || !contentIds.every((id) => existingIds.includes(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid content IDs. All IDs must exist in the course and all contents must be included",
            })
        }

        // Reorder the contents
        const reorderedContents = contentIds.map((id) => existingContents.find((c) => c.id === id))

        const result = await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            {
                $set: {
                    contents: reorderedContents,
                    updatedAt: new Date(),
                },
            },
        )

        // Get the updated course
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(200).json({
            success: true,
            message: "Contents reordered successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error("Error reordering contents:", error)
        res.status(500).json({ success: false, message: "Failed to reorder contents", error: error.message })
    }
}
// Enroll a student in a course
const enrollStudent = async (req, res) => {
    try {
        const { courseId, studentData, transactionData } = req.body

        // Validate required fields
        if (!courseId || !studentData || !transactionData) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                requiredFields: ["courseId", "studentData", "transactionData"],
            })
        }

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: "Invalid course ID format" })
        }

        // Check if course exists
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Get user collection
        const userCollection = getUserCollection()

        // Check if user exists
        let userId = studentData.id
        let user = null

        if (userId && ObjectId.isValid(userId)) {
            user = await userCollection.findOne({ _id: new ObjectId(userId) })
        } else if (studentData.email) {
            user = await userCollection.findOne({ email: studentData.email })
            if (user) userId = user._id
        }

        // If user doesn't exist, create a new user record
        if (!user && studentData.email) {
            const newUser = {
                name: studentData.name,
                email: studentData.email,
                purchasedCourses: [],
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const result = await userCollection.insertOne(newUser)
            userId = result.insertedId
            user = newUser
            user._id = userId
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Could not identify or create user. Email is required."
            })
        }

        // Create enrollment record
        const enrollmentData = {
            courseId: new ObjectId(courseId),
            courseTitle: course.title,
            courseSlug: course.slug,
            courseThumbnail: course.thumbnailUrl,
            coursePrice: course.price,
            studentId: new ObjectId(userId),
            studentName: studentData.name,
            studentEmail: studentData.email,
            enrollmentDate: new Date(),
            transactionId: transactionData.transactionId,
            paymentMethod: transactionData.paymentMethod,
            amount: transactionData.amount,
            status: "pending",
            progress: {
                completedLessons: [],
                currentLesson: 1,
                progressPercentage: 0,
                lastAccessed: new Date(),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        // Get enrollments collection (create if it doesn't exist)
        const enrollmentCollection = getEnrollmentCollection();

        // Save enrollment to database
        const enrollmentResult = await enrollmentCollection.insertOne(enrollmentData)

        // Update user with purchased course ID only
        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $addToSet: { purchasedCourses: new ObjectId(courseId) },
                $set: { updatedAt: new Date() }
            }
        )

        // Update course enrollment count
        await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            {
                $inc: { enrollmentCount: 1 },
                $set: { updatedAt: new Date() },
            }
        )

        // Get updated course and user
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })
        const updatedUser = await userCollection.findOne({ _id: new ObjectId(userId) })

        res.status(201).json({
            success: true,
            message: "Enrollment successful",
            data: {
                enrollment: {
                    ...enrollmentData,
                    _id: enrollmentResult.insertedId
                },
                course: updatedCourse,
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    purchasedCourses: updatedUser.purchasedCourses
                }
            },
        })
    } catch (error) {
        console.error("Error enrolling student:", error)
        res.status(500).json({ success: false, message: "Failed to enroll student", error: error.message })
    }


};

const addContentResource = async (req, res) => {
    try {
        const { courseId, contentId } = req.params
        const resourceData = req.body

        // Validate required parameters
        if (!courseId || !contentId) {
            return res.status(400).json({
                success: false,
                message: "Course ID and Content ID are required"
            })
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID format"
            })
        }

        // Validate resource data
        if (!resourceData || !resourceData.name || !resourceData.url) {
            return res.status(400).json({
                success: false,
                message: "Resource name and URL are required"
            })
        }

        // Find the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        // Find the content item
        const contentIndex = course.contents?.findIndex(content => content.id === parseInt(contentId))

        if (contentIndex === -1 || contentIndex === undefined) {
            return res.status(404).json({
                success: false,
                message: "Content not found in course"
            })
        }

        // Prepare resource object
        const newResource = {
            id: Date.now(), // Generate unique ID
            name: resourceData.name,
            url: resourceData.url,
            type: resourceData.type || 'file',
            size: resourceData.size || null,
            uploadedAt: moment().toISOString(),
            description: resourceData.description || '',
            ...resourceData // Include any additional fields
        }

        // Initialize resources array if it doesn't exist
        if (!course.contents[contentIndex].resources) {
            course.contents[contentIndex].resources = []
        }

        // Add resource to content
        course.contents[contentIndex].resources.push(newResource)

        // Update the course in database
        const updateResult = await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            {
                $set: {
                    contents: course.contents,
                    updatedAt: moment().toISOString()
                }
            }
        )

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Failed to update course"
            })
        }

        // Get updated course
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(201).json({
            success: true,
            message: "Resource added successfully",
            data: {
                course: updatedCourse,
                addedResource: newResource,
                contentId: parseInt(contentId)
            }
        })

    } catch (error) {
        console.error("Error adding resource to content:", error)
        res.status(500).json({
            success: false,
            message: "Failed to add resource",
            error: error.message
        })
    }
}

// Delete resource from course content
const deleteContentResource = async (req, res) => {
    try {
        const { courseId, contentId, resourceId } = req.params

        // Validate required parameters
        if (!courseId || !contentId || !resourceId) {
            return res.status(400).json({
                success: false,
                message: "Course ID, Content ID, and Resource ID are required"
            })
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID format"
            })
        }

        // Find the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        // Find the content item
        const contentIndex = course.contents?.findIndex(content => content.id === parseInt(contentId))

        if (contentIndex === -1 || contentIndex === undefined) {
            return res.status(404).json({
                success: false,
                message: "Content not found in course"
            })
        }

        // Find and remove the resource
        const resources = course.contents[contentIndex].resources || []
        const resourceIndex = resources.findIndex(resource => resource.id === parseInt(resourceId))

        if (resourceIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Resource not found in content"
            })
        }

        const deletedResource = resources[resourceIndex]
        course.contents[contentIndex].resources.splice(resourceIndex, 1)

        // Update the course in database
        const updateResult = await courseCollection.updateOne(
            { _id: new ObjectId(courseId) },
            {
                $set: {
                    contents: course.contents,
                    updatedAt: moment().toISOString()
                }
            }
        )

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Failed to update course"
            })
        }

        // Get updated course
        const updatedCourse = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        res.status(200).json({
            success: true,
            message: "Resource deleted successfully",
            data: {
                course: updatedCourse,
                deletedResource: deletedResource,
                contentId: parseInt(contentId)
            }
        })

    } catch (error) {
        console.error("Error deleting resource from content:", error)
        res.status(500).json({
            success: false,
            message: "Failed to delete resource",
            error: error.message
        })
    }
}

// Get all resources for a specific content
const getContentResources = async (req, res) => {
    try {
        const { courseId, contentId } = req.params

        // Validate required parameters
        if (!courseId || !contentId) {
            return res.status(400).json({
                success: false,
                message: "Course ID and Content ID are required"
            })
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID format"
            })
        }

        // Find the course
        const course = await courseCollection.findOne({ _id: new ObjectId(courseId) })

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        // Find the content item
        const content = course.contents?.find(content => content.id === parseInt(contentId))

        if (!content) {
            return res.status(404).json({
                success: false,
                message: "Content not found in course"
            })
        }

        const resources = content.resources || []

        res.status(200).json({
            success: true,
            data: {
                courseId: courseId,
                contentId: parseInt(contentId),
                contentTitle: content.title,
                resources: resources,
                totalResources: resources.length
            }
        })

    } catch (error) {
        console.error("Error fetching content resources:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch content resources",
            error: error.message
        })
    }
}

module.exports = {
    getAllCourse,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addContent,
    updateContent,
    deleteContent,
    bulkAddContent,
    reorderContents,
    enrollStudent,
    addContentResource,
    deleteContentResource,
    getContentResources,
    updateCourseStatus,
    getCourseDetails
}
