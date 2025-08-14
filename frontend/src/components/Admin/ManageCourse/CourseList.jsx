"use client"

import { useState, useEffect } from "react"
import {
    Edit,
    Trash2,
    ChevronDown,
    ChevronUp,
    Play,
    Loader2,
    Tag,
    Clock,
    DollarSign,
    Users,
    Star,
    AlertCircle,
    RefreshCw,
    Eye,
    PlusCircle,
} from "lucide-react"
import CourseApiClient from "./api-client"

const CourseList = ({ onEditCourse, onViewDetails, onAddContent }) => {
    const [courses, setCourses] = useState([])
    const [expandedCourses, setExpandedCourses] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [operationLoading, setOperationLoading] = useState({})

    const apiClient = new CourseApiClient()

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await apiClient.getAllCourses()
            setCourses(data)
        } catch (err) {
            console.error("Error fetching courses:", err)
            setError(err.message || "Failed to load courses. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }

    const showNotification = (message, type = "success") => {
        const notification = document.createElement("div")
        notification.className = `fixed top-4 right-4 p-4 rounded-md z-50 ${type === "success" ? "bg-green-600" : "bg-red-600"
            } text-white`
        notification.textContent = message
        document.body.appendChild(notification)

        setTimeout(() => {
            document.body.removeChild(notification)
        }, 3000)
    }

    const setOperationLoadingState = (operation, loading) => {
        setOperationLoading((prev) => ({
            ...prev,
            [operation]: loading,
        }))
    }

    const toggleCourseExpansion = (courseId) => {
        setExpandedCourses((prev) => ({
            ...prev,
            [courseId]: !prev[courseId],
        }))
    }

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                setOperationLoadingState(`deleteCourse_${courseId}`, true)
                const deletedCourse = await apiClient.deleteCourse(courseId)
                setCourses(courses.filter((course) => course._id !== courseId))
                showNotification("Course deleted successfully!")
                console.log("Course Deleted:", deletedCourse)
            } catch (err) {
                console.error("Error deleting course:", err)
                showNotification(err.message || "Failed to delete course. Please try again.", "error")
            } finally {
                setOperationLoadingState(`deleteCourse_${courseId}`, false)
            }
        }
    }

    const handleDeleteContent = async (courseId, contentId) => {
        if (window.confirm("Are you sure you want to delete this content?")) {
            try {
                setOperationLoadingState(`deleteContent_${contentId}`, true)
                const result = await apiClient.deleteContent(courseId, contentId)
                setCourses(courses.map((course) => (course._id === courseId ? result.course : course)))
                showNotification("Content deleted successfully!")
                console.log("Content Deleted:", result.deletedContent)
            } catch (err) {
                console.error("Error deleting content:", err)
                showNotification(err.message || "Failed to delete content. Please try again.", "error")
            } finally {
                setOperationLoadingState(`deleteContent_${contentId}`, false)
            }
        }
    }

    const openYoutubeVideo = (videoUrl) => {
        window.open(videoUrl, "_blank")
    }

    const handleRetry = () => {
        fetchCourses()
    }

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-4 bg-gray-900 rounded-lg shadow-lg text-gray-200 flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 size={40} className="animate-spin text-blue-500 mb-4" />
                <p className="text-lg">Loading courses...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-4 bg-gray-900 rounded-lg shadow-lg text-gray-200">
                <div className="bg-red-900/30 border border-red-700 p-6 rounded-md text-center">
                    <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                    <p className="text-lg text-red-300 mb-2">Error Loading Courses</p>
                    <p className="text-gray-300 mb-4">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={handleRetry}
                            className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
                        >
                            <RefreshCw size={16} />
                            Try Again
                        </button>
                        <button
                            onClick={() => setError(null)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-4 bg-gray-900 rounded-lg shadow-lg text-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-100">Course List</h1>
                <span className="text-gray-400">{courses.length} courses</span>
            </div>

            <div className="space-y-4">
                {courses.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <p className="text-lg mb-4">No courses available.</p>
                    </div>
                ) : (
                    courses.map((course) => (
                        <div key={course._id} className="border border-gray-700 rounded-lg overflow-hidden">
                            <div className="bg-gray-800 p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleCourseExpansion(course._id)}
                                            className="text-gray-400 hover:text-gray-200"
                                        >
                                            {expandedCourses[course._id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <div className="flex items-center gap-3">
                                            {course.thumbnailUrl && (
                                                <img
                                                    src={course.thumbnailUrl || "/placeholder.svg"}
                                                    alt={course.title}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                />
                                            )}
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-100">{course.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-900 text-blue-200">
                                                        {course.level || "Beginner"}
                                                    </span>
                                                    {course.category && (
                                                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-900 text-purple-200 flex items-center gap-1">
                                                            <Tag size={10} />
                                                            {course.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onViewDetails(course)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                                        >
                                            <Eye size={16} />
                                            <span>View Details</span>
                                        </button>
                                        <button
                                            onClick={() => onAddContent(course)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                                        >
                                            <PlusCircle size={16} />
                                            <span>Add Content</span>
                                        </button>
                                        <button
                                            onClick={() => onEditCourse(course)}
                                            className="p-1.5 text-yellow-500 hover:text-yellow-400 hover:bg-gray-700 rounded-md transition-colors"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCourse(course._id)}
                                            className="p-1.5 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors"
                                            disabled={operationLoading[`deleteCourse_${course._id}`]}
                                        >
                                            {operationLoading[`deleteCourse_${course._id}`] ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : (
                                                <Trash2 size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <DollarSign size={14} />
                                        <span>${course.price || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{course.duration || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={14} />
                                        <span>{course.enrollmentCount || 0} students</span>
                                    </div>
                                    {course.rating > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="text-yellow-500" />
                                            <span>
                                                {course.rating.toFixed(1)} ({course.reviewCount || 0} reviews)
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {!expandedCourses[course._id] && (
                                    <p className="mt-2 text-gray-400 line-clamp-2">{course.description}</p>
                                )}
                            </div>

                            {expandedCourses[course._id] && (
                                <div className="p-4 bg-gray-900">
                                    <div className="mb-4">
                                        <h4 className="font-medium text-gray-300 mb-2">Description:</h4>
                                        <p className="text-gray-400">{course.description}</p>
                                    </div>

                                    <h4 className="font-medium text-gray-300 mb-2">Course Content:</h4>
                                    {!course.contents || course.contents.length === 0 ? (
                                        <p className="text-gray-500 italic">No content available for this course yet.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {course.contents.map((content) => (
                                                <div key={content.id} className="p-3 bg-gray-800 rounded-md border border-gray-700">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className="font-medium text-gray-200">{content.title}</div>
                                                            <div className="flex gap-4 text-sm text-gray-400 mt-1">
                                                                <span className="flex items-center gap-1">
                                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                                    {content.type}
                                                                </span>
                                                                <span>{content.duration}</span>
                                                                {content.isPreview && (
                                                                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-900 text-green-200">
                                                                        Preview
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {content.type === "video" && content.videoUrl && (
                                                                <button
                                                                    onClick={() => openYoutubeVideo(content.videoUrl)}
                                                                    className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-md transition-colors"
                                                                >
                                                                    <Play size={16} />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteContent(course._id, content.id)}
                                                                className="p-1.5 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors"
                                                                disabled={operationLoading[`deleteContent_${content.id}`]}
                                                            >
                                                                {operationLoading[`deleteContent_${content.id}`] ? (
                                                                    <Loader2 size={16} className="animate-spin" />
                                                                ) : (
                                                                    <Trash2 size={16} />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {content.type === "video" && content.videoThumbnail && (
                                                        <div className="mt-2 relative">
                                                            <img
                                                                src={content.videoThumbnail || "/placeholder.svg"}
                                                                alt={content.title}
                                                                className="w-full h-36 object-cover rounded-md cursor-pointer"
                                                                onClick={() => openYoutubeVideo(content.videoUrl)}
                                                            />
                                                            <div
                                                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity rounded-md cursor-pointer"
                                                                onClick={() => openYoutubeVideo(content.videoUrl)}
                                                            >
                                                                <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full">
                                                                    <Play size={24} className="text-white ml-1" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CourseList
