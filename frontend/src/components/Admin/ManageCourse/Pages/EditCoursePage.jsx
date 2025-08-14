"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { ArrowLeft, AlertCircle, Loader2, Eye, FileText } from "lucide-react"
import CourseApiClient from "../api-client"
import CourseForm from "../Forms/CourseForm"

const EditCoursePage = () => {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const location = useLocation()
    const [course, setCourse] = useState(location.state?.course || null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingCourse, setIsLoadingCourse] = useState(!course)
    const [error, setError] = useState(null)

    const apiClient = new CourseApiClient()

    useEffect(() => {
        if (!course && courseId) {
            fetchCourse()
        }
    }, [courseId, course])

    const fetchCourse = async () => {
        try {
            setIsLoadingCourse(true)
            const courseData = await apiClient.getCourse(courseId)
            setCourse(courseData)
        } catch (err) {
            console.error("Error fetching course:", err)
            setError(err.message || "Failed to load course data.")
        } finally {
            setIsLoadingCourse(false)
        }
    }

    const showNotification = (message, type = "success") => {
        const notification = document.createElement("div")
        notification.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"
            } border shadow-lg`
        notification.textContent = message
        document.body.appendChild(notification)

        setTimeout(() => {
            document.body.removeChild(notification)
        }, 3000)
    }

    const handleEditCourse = async (updatedCourse, saveAsDraft = false) => {
        try {
            setIsLoading(true)
            setError(null)

            const result = await apiClient.updateCourse(updatedCourse._id, updatedCourse)

            const message = saveAsDraft
                ? "Course saved as draft successfully!"
                : updatedCourse.status === "published"
                    ? "Course updated and published successfully!"
                    : "Course updated successfully!"

            showNotification(message)
            console.log("Course Updated:", result)

            // Update local course state
            setCourse(result)

            navigate("/admin-dashboard/courses/list")
        } catch (err) {
            console.error("Error updating course:", err)
            const errorMessage = err.message || "Failed to update course. Please try again."
            setError(errorMessage)
            showNotification(errorMessage, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const handleStatusToggle = async () => {
        if (!course) return

        try {
            setIsLoading(true)
            const newStatus = course.status === "published" ? "draft" : "published"

            const result = await apiClient.updateCourseStatus(course._id, newStatus)

            setCourse(result)
            showNotification(
                newStatus === "published" ? "Course published successfully!" : "Course moved to draft successfully!",
            )
        } catch (err) {
            console.error("Error updating course status:", err)
            showNotification(err.message || "Failed to update course status", "error")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        navigate("/admin-dashboard/courses/list")
    }

    if (isLoadingCourse) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
                        <p className="text-lg text-gray-600">Loading course data...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
                            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                            <p className="text-lg text-red-700 mb-2">Course Not Found</p>
                            <p className="text-gray-600 mb-4">The course you're trying to edit could not be found.</p>
                            <button
                                onClick={() => navigate("/admin-dashboard/courses/list")}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Back to Courses
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/admin-dashboard/courses/list")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Courses</span>
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Course</h1>
                            <p className="text-gray-600 mt-1">Update course information and settings</p>
                        </div>

                        {/* Status Badge and Toggle */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${course.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {course.status === "published" ? (
                                        <>
                                            <Eye size={12} />
                                            Published
                                        </>
                                    ) : (
                                        <>
                                            <FileText size={12} />
                                            Draft
                                        </>
                                    )}
                                </span>
                            </div>

                            <button
                                onClick={handleStatusToggle}
                                disabled={isLoading}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${course.status === "published"
                                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                            >
                                {isLoading ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : course.status === "published" ? (
                                    "Unpublish"
                                ) : (
                                    "Publish"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Course Stats */}
                    {course.enrollmentCount !== undefined && (
                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>📚 {course.enrollmentCount || 0} enrollments</span>
                            {course.rating && (
                                <span>
                                    ⭐ {course.rating}/5 ({course.reviewCount || 0} reviews)
                                </span>
                            )}
                            <span>📅 Created {new Date(course.createdAt).toLocaleDateString()}</span>
                        </div>
                    )}
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-2">
                                <AlertCircle size={20} className="text-red-500" />
                                <span className="text-red-700">{error}</span>
                            </div>
                        )}

                        <CourseForm
                            course={course}
                            onSubmit={handleEditCourse}
                            onCancel={handleCancel}
                            isEditing={true}
                            isLoading={isLoading}
                            showPublishOptions={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCoursePage
