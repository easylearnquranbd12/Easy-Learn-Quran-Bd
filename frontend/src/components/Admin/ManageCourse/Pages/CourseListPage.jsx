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
    Search,
    Filter,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { FaGraduationCap } from "react-icons/fa" // Import FaGraduationCap
import CourseApiClient from "../api-client"

const CourseListPage = () => {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([])
    const [expandedCourses, setExpandedCourses] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [operationLoading, setOperationLoading] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")

    const apiClient = new CourseApiClient()

    useEffect(() => {
        fetchCourses()
    }, [])

    useEffect(() => {
        filterCourses()
    }, [courses, searchTerm, filterCategory])

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

    const filterCourses = () => {
        let filtered = courses

        if (searchTerm) {
            filtered = filtered.filter(
                (course) =>
                    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.category.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        if (filterCategory !== "all") {
            filtered = filtered.filter((course) => course.category === filterCategory)
        }

        setFilteredCourses(filtered)
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

    const getUniqueCategories = () => {
        const categories = courses.map((course) => course.category).filter(Boolean)
        return [...new Set(categories)]
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
                        <p className="text-lg text-gray-600">Loading courses...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
                            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                            <p className="text-lg text-red-700 mb-2">Error Loading Courses</p>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={handleRetry}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    <RefreshCw size={16} />
                                    Try Again
                                </button>
                                <button
                                    onClick={() => setError(null)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                                >
                                    Dismiss
                                </button>
                            </div>
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Course Management</h1>
                            <p className="text-gray-600 mt-1">Manage and organize your courses</p>
                        </div>
                        <button
                            onClick={() => navigate("/admin-dashboard/courses/add")}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                        >
                            <PlusCircle size={18} />
                            <span>Add New Course</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="sm:w-48">
                            <div className="relative">
                                <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">All Categories</option>
                                    {getUniqueCategories().map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FaGraduationCap className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                                <p className="text-lg font-semibold text-gray-900">{courses.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Total Students</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {courses.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Tag className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Categories</p>
                                <p className="text-lg font-semibold text-gray-900">{getUniqueCategories().length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <DollarSign className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    $
                                    {courses.length > 0
                                        ? (courses.reduce((sum, course) => sum + (course.price || 0), 0) / courses.length).toFixed(0)
                                        : 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course List */}
                <div className="space-y-4">
                    {filteredCourses.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <div className="max-w-md mx-auto">
                                <FaGraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-lg font-medium text-gray-900 mb-2">No courses found</p>
                                <p className="text-gray-600 mb-4">
                                    {searchTerm || filterCategory !== "all"
                                        ? "Try adjusting your search or filter criteria."
                                        : "Get started by creating your first course."}
                                </p>
                                {!searchTerm && filterCategory === "all" && (
                                    <button
                                        onClick={() => navigate("/admin-dashboard/courses/add")}
                                        className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        <PlusCircle size={18} />
                                        Add Your First Course
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        filteredCourses.map((course) => (
                            <div
                                key={course._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <button
                                                onClick={() => toggleCourseExpansion(course._id)}
                                                className="text-gray-400 hover:text-gray-600 mt-1 flex-shrink-0"
                                            >
                                                {expandedCourses[course._id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>

                                            <div className="flex items-start gap-4 flex-1">
                                                {course.thumbnailUrl && (
                                                    <img
                                                        src={course.thumbnailUrl || "/placeholder.svg"}
                                                        alt={course.title}
                                                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                            {course.level || "Beginner"}
                                                        </span>
                                                        {course.category && (
                                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                                                                <Tag size={10} />
                                                                {course.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {!expandedCourses[course._id] && (
                                                        <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:flex-shrink-0">
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <DollarSign size={14} className="text-green-600" />
                                                    <span>${course.price || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} className="text-blue-600" />
                                                    <span>{course.duration || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={14} className="text-purple-600" />
                                                    <span>{course.enrollmentCount || 0}</span>
                                                </div>
                                                {course.rating > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        <Star size={14} className="text-yellow-500" />
                                                        <span>{course.rating.toFixed(1)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin-dashboard/courses/details/${course._id}`, { state: { course } })
                                                    }
                                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                                >
                                                    <Eye size={16} />
                                                    <span className="hidden sm:inline">Details</span>
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin-dashboard/content/add`, { state: { course } })}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                                                >
                                                    <PlusCircle size={16} />
                                                    <span className="hidden sm:inline">Content</span>
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin-dashboard/courses/edit/${course._id}`, { state: { course } })}
                                                    className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCourse(course._id)}
                                                    className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
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
                                    </div>
                                </div>

                                {expandedCourses[course._id] && (
                                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 mb-2">Description:</h4>
                                            <p className="text-gray-600">{course.description}</p>
                                        </div>

                                        <h4 className="font-medium text-gray-900 mb-3">
                                            Course Content ({course.contents?.length || 0} items):
                                        </h4>
                                        {!course.contents || course.contents.length === 0 ? (
                                            <p className="text-gray-500 italic">No content available for this course yet.</p>
                                        ) : (
                                            <div className="grid gap-3">
                                                {course.contents.map((content) => (
                                                    <div key={content.id} className="bg-white p-4 rounded-lg border border-gray-200">
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                            <div className="flex-1">
                                                                <div className="font-medium text-gray-900">{content.title}</div>
                                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                                                                    <span className="flex items-center gap-1">
                                                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                                        {content.type}
                                                                    </span>
                                                                    <span>{content.duration}</span>
                                                                    {content.isPreview && (
                                                                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                                            Preview
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {content.type === "video" && content.videoUrl && (
                                                                    <button
                                                                        onClick={() => openYoutubeVideo(content.videoUrl)}
                                                                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                                                    >
                                                                        <Play size={16} />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleDeleteContent(course._id, content.id)}
                                                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
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
                                                            <div className="mt-3 relative max-w-sm">
                                                                <img
                                                                    src={content.videoThumbnail || "/placeholder.svg"}
                                                                    alt={content.title}
                                                                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                                                                    onClick={() => openYoutubeVideo(content.videoUrl)}
                                                                />
                                                                <div
                                                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity rounded-lg cursor-pointer"
                                                                    onClick={() => openYoutubeVideo(content.videoUrl)}
                                                                >
                                                                    <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                                                                        <Play size={20} className="text-white ml-0.5" />
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
        </div>
    )
}

export default CourseListPage
