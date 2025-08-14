"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    ArrowLeft,
    Search,
    Filter,
    Loader2,
    AlertCircle,
    RefreshCw,
    FolderOpen,
    Clock,
    DollarSign,
    Users,
    Star,
    Tag,
    ChevronRight,
} from "lucide-react"
import { FaGraduationCap } from "react-icons/fa"
import CourseApiClient from "../api-client"

const SelectCourseForResourcesPage = () => {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")
    const [filterLevel, setFilterLevel] = useState("all")

    const apiClient = new CourseApiClient()

    useEffect(() => {
        fetchCourses()
    }, [])

    useEffect(() => {
        filterCourses()
    }, [courses, searchTerm, filterCategory, filterLevel])

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
                    (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        }

        if (filterCategory !== "all") {
            filtered = filtered.filter((course) => course.category === filterCategory)
        }

        if (filterLevel !== "all") {
            filtered = filtered.filter((course) => course.level === filterLevel)
        }

        setFilteredCourses(filtered)
    }

    const handleCourseSelect = (course) => {
        navigate(`/admin-dashboard/content/resources/${course._id}`, { state: { course } })
    }

    const handleRetry = () => {
        fetchCourses()
    }

    const getUniqueCategories = () => {
        const categories = courses.map((course) => course.category).filter(Boolean)
        return [...new Set(categories)]
    }

    const getUniqueLevels = () => {
        const levels = courses.map((course) => course.level).filter(Boolean)
        return [...new Set(levels)]
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
                    <button
                        onClick={() => navigate("/admin-dashboard/content")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Content Management</span>
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Select Course for Resource Management</h1>
                        <p className="text-gray-600 mt-1">Choose a course to manage its content resources</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search courses by title, description, or category..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="sm:w-48">
                                <div className="relative">
                                    <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
                            <div className="sm:w-48">
                                <select
                                    value={filterLevel}
                                    onChange={(e) => setFilterLevel(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">All Levels</option>
                                    {getUniqueLevels().map((level) => (
                                        <option key={level} value={level}>
                                            {level}
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
                                <FolderOpen className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">With Content</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {courses.filter((course) => course.contents && course.contents.length > 0).length}
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
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Users className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Total Students</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {courses.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="space-y-4">
                    {filteredCourses.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <div className="max-w-md mx-auto">
                                <FaGraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-lg font-medium text-gray-900 mb-2">No courses found</p>
                                <p className="text-gray-600 mb-4">
                                    {searchTerm || filterCategory !== "all" || filterLevel !== "all"
                                        ? "Try adjusting your search or filter criteria."
                                        : "No courses are available for resource management."}
                                </p>
                                {!searchTerm && filterCategory === "all" && filterLevel === "all" && (
                                    <button
                                        onClick={() => navigate("/admin-dashboard/courses/add")}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        <FaGraduationCap className="w-4 h-4" />
                                        Create Your First Course
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {filteredCourses.map((course) => (
                                <div
                                    key={course._id}
                                    onClick={() => handleCourseSelect(course)}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                            {/* Course Thumbnail */}
                                            <div className="flex-shrink-0">
                                                {course.thumbnailUrl ? (
                                                    <img
                                                        src={course.thumbnailUrl || "/placeholder.svg"}
                                                        alt={course.title}
                                                        className="w-full lg:w-32 h-32 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <FaGraduationCap className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Course Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                            {course.title}
                                                        </h3>
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
                                                            {course.status && (
                                                                <span
                                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${course.status === "published"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-gray-100 text-gray-800"
                                                                        }`}
                                                                >
                                                                    {course.status}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                                </div>

                                                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                                                {/* Course Stats */}
                                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <DollarSign size={14} className="text-green-600" />
                                                        <span>${course.price || 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <Clock size={14} className="text-blue-600" />
                                                        <span>{course.duration || "N/A"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <Users size={14} className="text-purple-600" />
                                                        <span>{course.enrollmentCount || 0} students</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <FolderOpen size={14} className="text-orange-600" />
                                                        <span>{course.contents?.length || 0} content items</span>
                                                    </div>
                                                    {course.rating > 0 && (
                                                        <div className="flex items-center gap-1 text-gray-600">
                                                            <Star size={14} className="text-yellow-500" />
                                                            <span>{course.rating.toFixed(1)}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <Tag size={14} className="text-gray-500" />
                                                        <span>
                                                            {course.contents?.reduce(
                                                                (total, content) => total + (content.resources?.length || 0),
                                                                0,
                                                            ) || 0}{" "}
                                                            resources
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content Preview */}
                                                {course.contents && course.contents.length > 0 && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <p className="text-sm font-medium text-gray-700 mb-2">Recent Content:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {course.contents.slice(0, 3).map((content) => (
                                                                <span
                                                                    key={content.id}
                                                                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                                                                >
                                                                    {content.title}
                                                                </span>
                                                            ))}
                                                            {course.contents.length > 3 && (
                                                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                                                                    +{course.contents.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Effect Indicator */}
                                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results Summary */}
                {filteredCourses.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Showing {filteredCourses.length} of {courses.length} courses
                            {(searchTerm || filterCategory !== "all" || filterLevel !== "all") && " (filtered)"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectCourseForResourcesPage
