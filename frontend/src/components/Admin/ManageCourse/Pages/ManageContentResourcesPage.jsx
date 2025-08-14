"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import {
    ArrowLeft,
    AlertCircle,
    Loader2,
    Plus,
    Search,
    Filter,
    FileText,
    Video,
    ImageIcon,
    Archive,
    Download,
    Eye,
    Trash2,
} from "lucide-react"
import CourseApiClient from "../api-client"
import AddResourceModal from "../Modal/AddResourceModal"

const ManageContentResourcesPage = () => {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const location = useLocation()
    const [course, setCourse] = useState(location.state?.course || null)
    const [selectedContent, setSelectedContent] = useState(null)
    const [isLoadingCourse, setIsLoadingCourse] = useState(!course)
    const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")
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

    const handleResourceAdded = (updatedCourse) => {
        setCourse(updatedCourse)
        setIsAddResourceModalOpen(false)
        showNotification("Resource added successfully!")
    }

    const handleDeleteResource = async (contentId, resourceId) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            try {
                const result = await apiClient.deleteContentResource(course._id, contentId, resourceId)
                setCourse(result.course)
                showNotification("Resource deleted successfully!")
            } catch (err) {
                console.error("Error deleting resource:", err)
                showNotification(err.message || "Failed to delete resource.", "error")
            }
        }
    }

    const getResourceIcon = (type) => {
        switch (type) {
            case "video":
                return <Video size={16} className="text-red-500" />
            case "image":
                return <ImageIcon size={16} className="text-blue-500" />
            case "archive":
                return <Archive size={16} className="text-purple-500" />
            default:
                return <FileText size={16} className="text-gray-500" />
        }
    }

    const getFilteredContent = () => {
        if (!course?.contents) return []

        let filtered = course.contents

        if (searchTerm) {
            filtered = filtered.filter((content) => content.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        if (filterType !== "all") {
            filtered = filtered.filter((content) => content.type === filterType)
        }

        return filtered
    }

    if (isLoadingCourse) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
                        <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
                        <p className="text-lg text-gray-600">Loading course data...</p>
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
                            <p className="text-gray-600 mb-4">{error || "The course could not be found."}</p>
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
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Content Resources</h1>
                        <p className="text-gray-600 mt-1">Add and manage resources for "{course.title}"</p>
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
                                    placeholder="Search content..."
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
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">All Types</option>
                                    <option value="video">Videos</option>
                                    <option value="article">Articles</option>
                                    <option value="quiz">Quizzes</option>
                                    <option value="exercise">Exercises</option>
                                    <option value="project">Projects</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content List */}
                <div className="space-y-6">
                    {getFilteredContent().length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">No content found</p>
                            <p className="text-gray-600">
                                {searchTerm || filterType !== "all"
                                    ? "Try adjusting your search or filter criteria."
                                    : "This course doesn't have any content yet."}
                            </p>
                        </div>
                    ) : (
                        getFilteredContent().map((content, index) => (
                            <div key={content.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {index + 1}
                                                </span>
                                                <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
                                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                    {content.type}
                                                </span>
                                                {content.isPreview && (
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                        Preview
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-600 mb-4">{content.description}</p>

                                            {/* Resources Section */}
                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-medium text-gray-900">Resources ({content.resources?.length || 0})</h4>
                                                    {console.log(content)}
                                                    <button
                                                        onClick={() => {
                                                            setSelectedContent(content)
                                                            setIsAddResourceModalOpen(true)
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                        Add Resource
                                                    </button>
                                                </div>

                                                {!content.resources || content.resources.length === 0 ? (
                                                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                                                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                        <p className="text-gray-600 text-sm">No resources added yet</p>
                                                    </div>
                                                ) : (
                                                    <div className="grid gap-3">
                                                        {content.resources.map((resource) => (
                                                            <div
                                                                key={resource.id}
                                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                                            >
                                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                                    {getResourceIcon(resource.type)}
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="font-medium text-gray-900 truncate">{resource.name}</p>
                                                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                            <span>{resource.type}</span>
                                                                            {resource.size && <span>{resource.size}</span>}
                                                                            {resource.description && <span className="truncate">{resource.description}</span>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={() => window.open(resource.url, "_blank")}
                                                                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                                                        title="Preview"
                                                                    >
                                                                        <Eye size={16} />
                                                                    </button>
                                                                    <a
                                                                        href={resource.url}
                                                                        download={resource.name}
                                                                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                                                                        title="Download"
                                                                    >
                                                                        <Download size={16} />
                                                                    </a>
                                                                    <button
                                                                        onClick={() => handleDeleteResource(content.id, resource.id)}
                                                                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                                        title="Delete"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Resource Modal */}
            {isAddResourceModalOpen && selectedContent && (
                <AddResourceModal
                    course={course}
                    content={selectedContent}
                    onClose={() => {
                        setIsAddResourceModalOpen(false)
                        setSelectedContent(null)
                    }}
                    onResourceAdded={handleResourceAdded}
                />
            )}
        </div>
    )
}

export default ManageContentResourcesPage
