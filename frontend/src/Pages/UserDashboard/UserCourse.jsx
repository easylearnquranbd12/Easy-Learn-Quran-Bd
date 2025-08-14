"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  BookOpen,
  Clock,
  Play,
  CheckCircle,
  Star,
  Users,
  Award,
  Target,
  TrendingUp,
  Search,
  Grid,
  List,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react"

const UserCourse = ({ userEmail = "masudrezaog5@gmail.com" }) => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    fetchUserCourses()
  }, [userEmail])

  const fetchUserCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      // Mock data for demonstration - replace with actual API call
      const mockCourses = [
        {
          _id: "1",
          title: "Complete Web Development Bootcamp",
          instructor: { name: "Dr. Angela Yu", avatar: "/placeholder.svg?height=40&width=40" },
          thumbnailUrl: "/placeholder.svg?height=200&width=350",
          description: "Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more.",
          category: "Web Development",
          level: "Beginner",
          duration: "65 hours",
          rating: 4.8,
          enrollmentCount: 45230,
          price: 89.99,
          originalPrice: 199.99,
          progress: 75,
          lastAccessed: "2024-01-15",
          enrolledAt: "2024-01-01",
          completedLessons: 45,
          totalLessons: 60,
          certificate: true,
          tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
          features: ["Lifetime Access", "Certificate", "Mobile Access", "Assignments"],
          nextLesson: "Advanced React Hooks",
        },
        {
          _id: "2",
          title: "Machine Learning A-Z",
          instructor: { name: "Kirill Eremenko", avatar: "/placeholder.svg?height=40&width=40" },
          thumbnailUrl: "/placeholder.svg?height=200&width=350",
          description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.",
          category: "Data Science",
          level: "Intermediate",
          duration: "44 hours",
          rating: 4.9,
          enrollmentCount: 32150,
          price: 94.99,
          originalPrice: 199.99,
          progress: 100,
          lastAccessed: "2024-01-10",
          enrolledAt: "2023-12-15",
          completedLessons: 40,
          totalLessons: 40,
          certificate: true,
          tags: ["Python", "Machine Learning", "Data Science", "AI"],
          features: ["Lifetime Access", "Certificate", "Code Templates", "Datasets"],
          nextLesson: null,
        },
        {
          _id: "3",
          title: "iOS App Development with Swift",
          instructor: { name: "Angela Yu", avatar: "/placeholder.svg?height=40&width=40" },
          thumbnailUrl: "/placeholder.svg?height=200&width=350",
          description: "Learn iOS app development and build real apps for the App Store.",
          category: "Mobile Development",
          level: "Intermediate",
          duration: "58 hours",
          rating: 4.7,
          enrollmentCount: 28940,
          price: 79.99,
          originalPrice: 179.99,
          progress: 30,
          lastAccessed: "2024-01-12",
          enrolledAt: "2024-01-05",
          completedLessons: 18,
          totalLessons: 60,
          certificate: true,
          tags: ["Swift", "iOS", "Xcode", "App Store"],
          features: ["Lifetime Access", "Certificate", "Source Code", "App Store Guide"],
          nextLesson: "Auto Layout Fundamentals",
        },
        {
          _id: "4",
          title: "Digital Marketing Masterclass",
          instructor: { name: "Phil Ebiner", avatar: "/placeholder.svg?height=40&width=40" },
          thumbnailUrl: "/placeholder.svg?height=200&width=350",
          description: "Learn digital marketing strategies including SEO, social media, email marketing and more.",
          category: "Marketing",
          level: "Beginner",
          duration: "23 hours",
          rating: 4.6,
          enrollmentCount: 19850,
          price: 69.99,
          originalPrice: 149.99,
          progress: 0,
          lastAccessed: null,
          enrolledAt: "2024-01-14",
          completedLessons: 0,
          totalLessons: 35,
          certificate: true,
          tags: ["SEO", "Social Media", "Email Marketing", "Analytics"],
          features: ["Lifetime Access", "Certificate", "Templates", "Case Studies"],
          nextLesson: "Introduction to Digital Marketing",
        },
      ]

      setCourses(mockCourses)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user courses:", error)
      setError(error.message)
      setLoading(false)
    }
  }

  const handleCourseAction = (course, action) => {
    switch (action) {
      case "continue":
      case "start":
        navigate(`/course-player/${course._id}`)
        break
      case "view":
        navigate(`/course-details/${course._id}`)
        break
      default:
        break
    }
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

  const getProgressColor = (progress) => {
    if (progress >= 100) return "from-green-500 to-emerald-500"
    if (progress >= 75) return "from-blue-500 to-cyan-500"
    if (progress >= 50) return "from-yellow-500 to-orange-500"
    if (progress >= 25) return "from-purple-500 to-pink-500"
    return "from-gray-500 to-gray-600"
  }

  const filteredAndSortedCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "completed" && course.progress >= 100) ||
        (filterBy === "in-progress" && course.progress > 0 && course.progress < 100) ||
        (filterBy === "not-started" && course.progress === 0)

      return matchesSearch && matchesCategory && matchesFilter
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

  const categories = ["all", ...new Set(courses.map((course) => course.category))]

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
          <p className="text-purple-200">Preparing your learning library...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Failed to load courses</h2>
          <p className="text-purple-200 mb-6">{error}</p>
          <button
            onClick={fetchUserCourses}
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
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">My Learning Library</h1>
          </div>
          <p className="text-purple-200 text-lg">Manage and track your course collection</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Courses",
              value: courses.length,
              icon: BookOpen,
              gradient: "from-blue-500 to-cyan-500",
              description: "Enrolled courses",
            },
            {
              label: "Completed",
              value: courses.filter((c) => c.progress >= 100).length,
              icon: CheckCircle,
              gradient: "from-green-500 to-emerald-500",
              description: "Finished courses",
            },
            {
              label: "In Progress",
              value: courses.filter((c) => c.progress > 0 && c.progress < 100).length,
              icon: Target,
              gradient: "from-yellow-500 to-orange-500",
              description: "Currently learning",
            },
            {
              label: "Certificates",
              value: courses.filter((c) => c.progress >= 100 && c.certificate).length,
              icon: Award,
              gradient: "from-purple-500 to-pink-500",
              description: "Earned certificates",
            },
          ].map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <TrendingUp size={16} className="text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-purple-200 text-sm font-medium">{stat.label}</div>
                <div className="text-purple-300 text-xs mt-1">{stat.description}</div>
              </div>
            )
          })}
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
              <input
                type="text"
                placeholder="Search courses, instructors, categories..."
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
                <option value="all">All Status</option>
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

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-200 hover:text-white hover:bg-white/20"
                  }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid/List */}
        {filteredAndSortedCourses.length === 0 ? (
          <div className="text-center py-16 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {searchQuery || filterBy !== "all" || selectedCategory !== "all"
                ? "No courses found"
                : "No courses enrolled yet"}
            </h3>
            <p className="text-purple-200 mb-8 max-w-md mx-auto">
              {searchQuery || filterBy !== "all" || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start your learning journey by enrolling in courses"}
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
                        src={course.thumbnailUrl || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleCourseAction(course, course.progress > 0 ? "continue" : "start")}
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
                      <div className="absolute top-3 left-3">
                        <div className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(course.level)}`}>
                          {course.level}
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="w-full bg-black/50 backdrop-blur-sm rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${getProgressColor(course.progress)} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">{course.title}</h3>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={course.instructor.avatar || "/placeholder.svg"}
                          alt={course.instructor.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <p className="text-purple-200 text-sm">{course.instructor.name}</p>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-purple-300">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{course.enrollmentCount.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-purple-200 text-sm font-medium">Progress</span>
                          <span className="text-white text-sm font-semibold">{course.progress}%</span>
                        </div>
                        <div className="text-xs text-purple-300 mb-3">
                          {course.completedLessons}/{course.totalLessons} lessons completed
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleCourseAction(course, course.progress > 0 ? "continue" : "start")}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all transform hover:scale-105"
                        >
                          <Play size={16} />
                          {course.progress > 0 ? "Continue" : "Start"}
                        </button>
                        <button
                          onClick={() => handleCourseAction(course, "view")}
                          className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                        <button className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <img
                        src={course.thumbnailUrl || "/placeholder.svg"}
                        alt={course.title}
                        className="w-24 h-16 rounded-xl object-cover"
                      />
                      {course.progress >= 100 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-bold text-lg">{course.title}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(course.level)}`}>
                          {course.level}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={course.instructor.avatar || "/placeholder.svg"}
                          alt={course.instructor.name}
                          className="w-5 h-5 rounded-full"
                        />
                        <p className="text-purple-200 text-sm">{course.instructor.name}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-purple-300 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{course.enrollmentCount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${getProgressColor(course.progress)} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleCourseAction(course, course.progress > 0 ? "continue" : "start")}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200"
                      >
                        <Play size={16} />
                        {course.progress > 0 ? "Continue" : "Start"}
                      </button>
                      <button
                        onClick={() => handleCourseAction(course, "view")}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      >
                        <ChevronRight size={16} />
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

export default UserCourse
