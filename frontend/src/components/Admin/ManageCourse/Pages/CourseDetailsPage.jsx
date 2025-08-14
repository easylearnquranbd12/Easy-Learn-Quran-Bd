"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import {
    ArrowLeft,
    Clock,
    DollarSign,
    Users,
    Star,
    Tag,
    Play,
    Trash2,
    Calendar,
    User,
    Mail,
    PlusCircle,
    Edit,
    Loader2,
    AlertCircle,
} from "lucide-react"
import CourseApiClient from "../api-client"

const CourseDetailsPage = () => {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const location = useLocation()
    const [course, setCourse] = useState(location.state?.course || null)
    const [isLoadingCourse, setIsLoadingCourse] = useState(!course)
    const [operationLoading, setOperationLoading] = useState({})
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
            setError(null)
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

    const setOperationLoadingState = (operation, loading) => {
        setOperationLoading((prev) => ({
            ...prev,
            [operation]: loading,
        }))
    }

    const handleDeleteContent = async (courseId, contentId) => {
        if (window.confirm("Are you sure you want to delete this content?")) {
            try {
                setOperationLoadingState(`deleteContent_${contentId}`, true)
                const result = await apiClient.deleteContent(courseId, contentId)
                setCourse(result.course)
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

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    if (isLoadingCourse) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
                        <p className="text-lg text-gray-600">Loading course details...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
                            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                            <p className="text-lg text-red-700 mb-2">Course Not Found</p>
                            <p className="text-gray-600 mb-4">{error || "The course you're looking for could not be found."}</p>
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
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/admin-dashboard/courses/list")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Courses</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Info Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
                            {/* Course Thumbnail */}
                            {course.thumbnailUrl ? (
                                <img
                                    src={course.thumbnailUrl || "/placeholder.svg"}
                                    alt={course.title}
                                    className="w-full aspect-video object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400">No thumbnail</span>
                                </div>
                            )}

                            <div className="p-6">
                                {/* Course Stats */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <DollarSign size={18} className="text-green-600" />
                                            <span className="font-medium text-gray-700">Price</span>
                                        </div>
                                        <span className="text-xl font-bold text-gray-900">${course.price || 0}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Clock size={18} className="text-blue-600" />
                                            <span className="font-medium text-gray-700">Duration</span>
                                        </div>
                                        <span className="text-gray-900">{course.duration || "N/A"}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Users size={18} className="text-purple-600" />
                                            <span className="font-medium text-gray-700">Students</span>
                                        </div>
                                        <span className="text-gray-900">{course.enrollmentCount || 0}</span>
                                    </div>

                                    {course.rating > 0 && (
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Star size={18} className="text-yellow-500" />
                                                <span className="font-medium text-gray-700">Rating</span>
                                            </div>
                                            <span className="text-gray-900">
                                                {course.rating.toFixed(1)} ({course.reviewCount || 0})
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-red-500" />
                                            <span className="font-medium text-gray-700">Created</span>
                                        </div>
                                        <span className="text-gray-900 text-sm">{formatDate(course.createdAt)}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-orange-500" />
                                            <span className="font-medium text-gray-700">Updated</span>
                                        </div>
                                        <span className="text-gray-900 text-sm">{formatDate(course.updatedAt)}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={() => navigate(`/admin-dashboard/courses/edit/${course._id}`, { state: { course } })}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        <Edit size={16} />
                                        <span>Edit Course</span>
                                    </button>
                                    <button
                                        onClick={() => navigate(`/admin-dashboard/content/add`, { state: { course } })}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                    >
                                        <PlusCircle size={16} />
                                        <span>Add Content</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                            {/* Course Header */}
                            <div className="mb-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                                        {course.level || "Beginner"}
                                    </span>
                                    {course.category && (
                                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800">
                                            {course.category}
                                        </span>
                                    )}
                                    {course.status && (
                                        <span
                                            className={`px-3 py-1 text-sm font-medium rounded-full ${course.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {course.status}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">{course.description}</p>
                                </div>

                                {course.tags && course.tags.length > 0 && (
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Tags</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {course.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-1"
                                                >
                                                    <Tag size={12} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {course.instructor && (
                                    <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructor</h2>
                                        <div className="flex items-start gap-4">
                                            {course.instructor.avatarUrl ? (
                                                <img
                                                    src={course.instructor.avatarUrl || "/placeholder.svg"}
                                                    alt={course.instructor.name}
                                                    className="w-16 h-16 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <User size={24} className="text-gray-400" />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{course.instructor.name}</h3>
                                                <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                                                    <Mail size={14} />
                                                    <span>{course.instructor.email}</span>
                                                </div>
                                                {course.instructor.bio && <p className="mt-2 text-gray-600">{course.instructor.bio}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Course Content */}
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
                                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                        {course.contents?.length || 0} items
                                    </span>
                                </div>

                                {!course.contents || course.contents.length === 0 ? (
                                    <div className="p-8 bg-gray-50 rounded-lg text-center">
                                        <PlusCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 mb-4">No content available for this course yet.</p>
                                        <button
                                            onClick={() => navigate(`/admin-dashboard/content/add`, { state: { course } })}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                        >
                                            <PlusCircle size={16} />
                                            <span>Add Your First Content</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {course.contents.map((content, index) => (
                                            <div
                                                key={content.id}
                                                className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                {index + 1}
                                                            </span>
                                                            <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                                                            {content.isPreview && (
                                                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                                    Preview
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                                            <span className="flex items-center gap-1">
                                                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                                {content.type}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock size={14} />
                                                                {content.duration}
                                                            </span>
                                                        </div>
                                                        {content.description && <p className="text-gray-600 mb-3">{content.description}</p>}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {content.type === "video" && content.videoUrl && (
                                                            <button
                                                                onClick={() => openYoutubeVideo(content.videoUrl)}
                                                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                                            >
                                                                <Play size={18} />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteContent(course._id, content.id)}
                                                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                            disabled={operationLoading[`deleteContent_${content.id}`]}
                                                        >
                                                            {operationLoading[`deleteContent_${content.id}`] ? (
                                                                <Loader2 size={18} className="animate-spin" />
                                                            ) : (
                                                                <Trash2 size={18} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                {content.type === "video" && content.videoThumbnail && (
                                                    <div className="mt-4 relative max-w-md">
                                                        <img
                                                            src={content.videoThumbnail || "/placeholder.svg"}
                                                            alt={content.title}
                                                            className="w-full h-48 object-cover rounded-lg cursor-pointer"
                                                            onClick={() => openYoutubeVideo(content.videoUrl)}
                                                        />
                                                        <div
                                                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity rounded-lg cursor-pointer"
                                                            onClick={() => openYoutubeVideo(content.videoUrl)}
                                                        >
                                                            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full">
                                                                <Play size={32} className="text-white ml-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {content.type === "article" && content.content && (
                                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                        <p className="text-gray-700 line-clamp-3">{content.content}</p>
                                                    </div>
                                                )}

                                                {content.type === "quiz" && (
                                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <span className="text-gray-700">
                                                                Questions: <strong>{content.questions}</strong>
                                                            </span>
                                                            <span className="text-gray-700">
                                                                Passing Score: <strong>{content.passingScore}%</strong>
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                {(content.type === "exercise" || content.type === "project") && (
                                                    <div className="mt-4">
                                                        {content.instructions && (
                                                            <div className="p-4 bg-gray-50 rounded-lg mb-3">
                                                                <p className="text-gray-700 line-clamp-2">{content.instructions}</p>
                                                            </div>
                                                        )}
                                                        {content.resources && content.resources.length > 0 && (
                                                            <div className="flex flex-wrap gap-2">
                                                                {content.resources.map((resource, idx) => (
                                                                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                                                                        {resource}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsPage
