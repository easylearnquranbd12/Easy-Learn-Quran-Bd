"use client"

import { BarChart3, BookmarkPlus, BookOpen, CheckCircle, Clock, Eye, LoaderIcon, Play, Star, Users } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import EmptyState from "../../components/Common/EmptyState"
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import useAuth from "../../hooks/useAuth"

const MyCourses = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterBy, setFilterBy] = useState("all")
    const [sortBy, setSortBy] = useState("recent")
    const [viewMode, setViewMode] = useState("grid")

    useEffect(() => {
        fetchEnrolledCourses()
    }, [])

    const fetchEnrolledCourses = async () => {
        try {
            setLoading(true)

            const response = await fetch(`http://localhost:5000/api/user/enrolled-courses/${user.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            if (result.success) {
                setEnrolledCourses(result.data || [])
            } else {
                throw new Error(result.message || "Failed to fetch enrolled courses")
            }
        } catch (error) {
            console.error("Error fetching courses:", error)
            setEnrolledCourses([])
        } finally {
            setLoading(false)
        }
    }

    const filteredAndSortedCourses = useMemo(() => {
        const filtered = enrolledCourses.filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor?.name.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesFilter =
                filterBy === "all" ||
                (filterBy === "completed" && course.progress >= 100) ||
                (filterBy === "in-progress" && course.progress > 0 && course.progress < 100) ||
                (filterBy === "not-started" && course.progress === 0)

            return matchesSearch && matchesFilter
        })

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "recent":
                    return new Date(b.lastAccessed) - new Date(a.lastAccessed)
                case "progress":
                    return (b.progress || 0) - (a.progress || 0)
                case "alphabetical":
                    return a.title.localeCompare(b.title)
                case "rating":
                    return (b.rating || 0) - (a.rating || 0)
                default:
                    return 0
            }
        })

        return filtered
    }, [enrolledCourses, searchQuery, filterBy, sortBy])

    const handleCourseView = (course) => {
        navigate(`/course-details/${course._id}`)
    }

    const handleContinueLearning = (course) => {
        navigate(`/course-player/${course._id}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="xl" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Loading Courses</h3>
                    <p className="text-gray-600">Fetching your enrolled courses...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Library</h1>
                            <p className="text-gray-600">Manage and track your course progress ({enrolledCourses.length} courses)</p>
                        </div>
                        <button
                            onClick={() => navigate("/courses")}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            <BookmarkPlus size={20} />
                            Explore More Courses
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search courses, instructors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value)}
                                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                            >
                                <option value="all">All Courses</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="not-started">Not Started</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                            >
                                <option value="recent">Recently Accessed</option>
                                <option value="progress">Progress</option>
                                <option value="alphabetical">A-Z</option>
                                <option value="rating">Rating</option>
                            </select>
                            <div className="flex bg-gray-50 rounded-lg border border-gray-200">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-3 rounded-l-lg transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    <BarChart3 size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-3 rounded-r-lg transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    <BookOpen size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Grid/List */}
                {filteredAndSortedCourses.length === 0 ? (
                    <EmptyState
                        icon={BookOpen}
                        title={searchQuery || filterBy !== "all" ? "No courses found" : "Start Your Learning Journey"}
                        description={
                            searchQuery || filterBy !== "all"
                                ? "Try adjusting your search or filter criteria"
                                : "Discover amazing courses and begin your path to mastery"
                        }
                        actionText="Browse Courses"
                        onAction={() => navigate("/courses")}
                    />
                ) : (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                        {filteredAndSortedCourses.map((course) => (
                            <div
                                key={course._id}
                                className={`group bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md ${viewMode === "list" ? "flex items-center gap-6 p-6" : "overflow-hidden"
                                    }`}
                            >
                                {viewMode === "grid" ? (
                                    <>
                                        <div className="relative">
                                            <img
                                                src={course.thumbnailUrl || "/placeholder.svg?height=200&width=350"}
                                                alt={course.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                                                        <div
                                                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${course.progress || 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-white text-sm font-medium">{course.progress || 0}% Complete</div>
                                                </div>
                                            </div>
                                            {course.progress >= 100 && (
                                                <div className="absolute top-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                                    <CheckCircle size={20} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                                            <p className="text-gray-600 text-sm mb-4">{course.instructor?.name}</p>
                                            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{course.duration || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="text-yellow-500 fill-current" />
                                                    <span>{course.rating || "4.5"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={14} />
                                                    <span>{course.enrollmentCount || 0}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                {course?.status === "active" ? (
                                                    <button
                                                        onClick={() => handleContinueLearning(course)}
                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                                    >
                                                        <Play size={16} />
                                                        {course.progress > 0 ? "Continue" : "Start"}
                                                    </button>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                                                    >
                                                        <LoaderIcon size={16} />
                                                        Pending
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleCourseView(course)}
                                                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={course.thumbnailUrl || "/placeholder.svg?height=80&width=120"}
                                            alt={course.title}
                                            className="w-20 h-20 rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 font-bold text-lg mb-1">{course.title}</h3>
                                            <p className="text-gray-600 text-sm mb-2">{course.instructor?.name}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{course.duration || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="text-yellow-500 fill-current" />
                                                    <span>{course.rating || "4.5"}</span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${course.progress || 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {course?.status === "active" ? (
                                                <button
                                                    onClick={() => handleContinueLearning(course)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                                >
                                                    <Play size={16} />
                                                    {course.progress > 0 ? "Continue" : "Start"}
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                                                >
                                                    <LoaderIcon size={16} />
                                                    Pending
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleCourseView(course)}
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyCourses
