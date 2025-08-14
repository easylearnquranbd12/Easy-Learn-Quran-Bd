"use client"

import {
    AlertCircle,
    ArrowRight,
    BookOpen,
    CheckCircle,
    Clock,
    Grid,
    List,
    MoreHorizontal,
    Play,
    Search,
    Star,
    Target,
    TrendingUp,
    Users,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ContinueLearning = ({ userEmail = "masudrezaog5@gmail.com" }) => {
    const navigate = useNavigate()
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [progressData, setProgressData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterBy, setFilterBy] = useState("all")
    const [sortBy, setSortBy] = useState("recent")
    const [viewMode, setViewMode] = useState("grid")
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        if (userEmail) {
            fetchContinueLearningData()
        }
    }, [userEmail])

    const fetchContinueLearningData = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`http://localhost:5000/api/user/dashboard/${userEmail}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            if (result.success) {
                setEnrolledCourses(result.data.enrolledCourses || [])
                setProgressData(result.data.stats || {})
            } else {
                throw new Error(result.message || "Failed to fetch learning data")
            }
        } catch (error) {
            console.error("Error fetching continue learning data:", error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleStartLearning = (course) => {
        navigate(`/course-player/${course._id}`)
    }

    const formatTimeAgo = (dateString) => {
        if (!dateString) return "Never"

        const now = new Date()
        const date = new Date(dateString)
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

        if (diffInHours < 1) return "Just now"
        if (diffInHours < 24) return `${diffInHours}h ago`
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) return `${diffInDays}d ago`
        return date.toLocaleDateString()
    }

    const getProgressColor = (progress) => {
        if (progress >= 100) return "from-green-500 to-emerald-500"
        if (progress >= 75) return "from-blue-500 to-cyan-500"
        if (progress >= 50) return "from-yellow-500 to-orange-500"
        if (progress >= 25) return "from-purple-500 to-pink-500"
        return "from-gray-500 to-gray-600"
    }

    const getDifficultyColor = (level) => {
        switch (level?.toLowerCase()) {
            case "beginner":
                return "text-green-400 bg-green-500/20 border-green-500/30"
            case "intermediate":
                return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
            case "advanced":
                return "text-red-400 bg-red-500/20 border-red-500/30"
            default:
                return "text-gray-400 bg-gray-500/20 border-gray-500/30"
        }
    }

    const filteredAndSortedCourses = enrolledCourses
        .filter((course) => {
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
        .sort((a, b) => {
            switch (sortBy) {
                case "recent":
                    return new Date(b.lastAccessed || b.enrolledAt) - new Date(a.lastAccessed || a.enrolledAt)
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                        <div
                            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin mx-auto"
                            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                        ></div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Loading Your Courses</h3>
                    <p className="text-purple-200">Preparing your learning journey...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Failed to load courses</h2>
                    <p className="text-purple-200 mb-6">{error}</p>
                    <button
                        onClick={fetchContinueLearningData}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Enhanced Header Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <BookOpen size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Continue Learning</h1>
                                <p className="text-purple-200">Pick up where you left off and keep growing</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate("/courses")}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                            >
                                <BookOpen size={20} />
                                Explore More
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Progress Overview */}
                    {progressData && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                {
                                    label: "Total Courses",
                                    value: progressData.totalCourses || 0,
                                    icon: Target,
                                    gradient: "from-blue-500 to-cyan-500",
                                    change: "+2 this month",
                                },
                                {
                                    label: "Completed",
                                    value: progressData.completedCourses || 0,
                                    icon: CheckCircle,
                                    gradient: "from-green-500 to-emerald-500",
                                    change: "+1 this week",
                                },
                                {
                                    label: "Total Hours",
                                    value: `${progressData.totalHours || 0}h`,
                                    icon: Clock,
                                    gradient: "from-purple-500 to-pink-500",
                                    change: "+5.2h this week",
                                },
                            ].map((stat, index) => {
                                const IconComponent = stat.icon
                                return (
                                    <div
                                        key={index}
                                        className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div
                                                className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <IconComponent size={24} className="text-white" />
                                            </div>
                                            <div className="text-green-400 text-xs font-medium bg-green-400/20 px-2 py-1 rounded-full">
                                                {stat.change}
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-purple-200 text-sm">{stat.label}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Enhanced Search and Filter Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
                            <input
                                type="text"
                                placeholder="Search courses, instructors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value)}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400"
                            >
                                <option value="all">All Courses</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="not-started">Not Started</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400"
                            >
                                <option value="recent">Recently Accessed</option>
                                <option value="progress">Progress</option>
                                <option value="alphabetical">A-Z</option>
                                <option value="rating">Rating</option>
                            </select>
                            <div className="flex bg-white/10 rounded-xl border border-white/20">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-3 rounded-l-xl transition-colors ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-purple-200 hover:text-white"}`}
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-3 rounded-r-xl transition-colors ${viewMode === "list" ? "bg-purple-600 text-white" : "text-purple-200 hover:text-white"}`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Courses Grid/List */}
                {filteredAndSortedCourses.length === 0 ? (
                    <div className="text-center py-16 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={32} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            {searchQuery || filterBy !== "all" ? "No courses found" : "No courses enrolled yet"}
                        </h3>
                        <p className="text-purple-200 mb-8 max-w-md mx-auto">
                            {searchQuery || filterBy !== "all"
                                ? "Try adjusting your search or filter criteria"
                                : "Start your learning journey by enrolling in a course"}
                        </p>
                        <button
                            onClick={() => navigate("/courses")}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                        {filteredAndSortedCourses.map((course) => (
                            <div
                                key={course._id}
                                className={`group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 ${viewMode === "list" ? "flex items-center gap-6 p-6" : "overflow-hidden"
                                    }`}
                            >
                                {viewMode === "grid" ? (
                                    <>
                                        {/* Course Thumbnail */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={course.thumbnailUrl || "/placeholder.svg?height=200&width=350"}
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button
                                                    onClick={() => handleStartLearning(course)}
                                                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                                >
                                                    <Play size={24} className="text-white ml-1" />
                                                </button>
                                            </div>
                                            {course.progress >= 100 && (
                                                <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <CheckCircle size={16} className="text-white" />
                                                </div>
                                            )}
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <div className="w-full bg-black/50 backdrop-blur-sm rounded-full h-2">
                                                    <div
                                                        className={`bg-gradient-to-r ${getProgressColor(course.progress || 0)} h-2 rounded-full transition-all duration-500`}
                                                        style={{ width: `${course.progress || 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Course Info */}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">{course.title}</h3>
                                                <div className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(course.level)}`}>
                                                    {course.level || "Beginner"}
                                                </div>
                                            </div>

                                            <p className="text-purple-200 text-sm mb-3">{course.instructor?.name || "Unknown Instructor"}</p>

                                            {/* Course Stats */}
                                            <div className="flex items-center gap-4 mb-4 text-sm text-purple-300">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{course.duration || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="text-yellow-400 fill-current" />
                                                    <span>{course.rating || "4.5"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={14} />
                                                    <span>{course.enrollmentCount || 0}</span>
                                                </div>
                                            </div>

                                            {/* Progress Info */}
                                            <div className="mb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-purple-200 text-sm font-medium">Progress</span>
                                                    <span className="text-white text-sm font-semibold">{course.progress || 0}%</span>
                                                </div>
                                                <div className="text-xs text-purple-300 mb-3">
                                                    Last accessed {formatTimeAgo(course.lastAccessed)}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleStartLearning(course)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
                                                >
                                                    <Play size={16} />
                                                    {course.progress > 0 ? "Continue" : "Start"}
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/course-details/${course._id}`)}
                                                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                                                >
                                                    <ArrowRight size={16} />
                                                </button>
                                                <button className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                                                    <MoreHorizontal size={16} />
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
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-white font-bold text-lg">{course.title}</h3>
                                                <div className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(course.level)}`}>
                                                    {course.level || "Beginner"}
                                                </div>
                                            </div>
                                            <p className="text-purple-200 text-sm mb-2">{course.instructor?.name}</p>
                                            <div className="flex items-center gap-4 text-sm text-purple-300 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{course.duration || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="text-yellow-400 fill-current" />
                                                    <span>{course.rating || "4.5"}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={14} />
                                                    <span>{course.enrollmentCount || 0}</span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-white/20 rounded-full h-2">
                                                <div
                                                    className={`bg-gradient-to-r ${getProgressColor(course.progress || 0)} h-2 rounded-full transition-all duration-500`}
                                                    style={{ width: `${course.progress || 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleStartLearning(course)}
                                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200"
                                            >
                                                <Play size={16} />
                                                {course.progress > 0 ? "Continue" : "Start"}
                                            </button>
                                            <button
                                                onClick={() => navigate(`/course-details/${course._id}`)}
                                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                                            >
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Enhanced Quick Stats */}
                {filteredAndSortedCourses.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <TrendingUp size={16} className="text-white" />
                            </div>
                            Learning Statistics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center p-4 bg-white/10 rounded-xl">
                                <div className="text-3xl font-bold text-blue-400 mb-2">{enrolledCourses.length}</div>
                                <div className="text-purple-200 text-sm">Enrolled</div>
                            </div>
                            <div className="text-center p-4 bg-white/10 rounded-xl">
                                <div className="text-3xl font-bold text-green-400 mb-2">
                                    {enrolledCourses.filter((c) => c.progress >= 100).length}
                                </div>
                                <div className="text-purple-200 text-sm">Completed</div>
                            </div>
                            <div className="text-center p-4 bg-white/10 rounded-xl">
                                <div className="text-3xl font-bold text-purple-400 mb-2">
                                    {enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length}
                                </div>
                                <div className="text-purple-200 text-sm">In Progress</div>
                            </div>
                            <div className="text-center p-4 bg-white/10 rounded-xl">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">
                                    {Math.round(
                                        enrolledCourses.reduce((acc, course) => acc + (course.progress || 0), 0) / enrolledCourses.length,
                                    ) || 0}
                                    %
                                </div>
                                <div className="text-purple-200 text-sm">Avg Progress</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContinueLearning
