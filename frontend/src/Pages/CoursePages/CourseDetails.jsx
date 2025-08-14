"use client"

import {
    AlertCircle,
    ArrowRight,
    Award,
    BookOpen,
    CheckCircle,
    ChevronDown,
    Clock,
    Code,
    Download,
    Eye,
    FileText,
    Globe,
    Heart,
    HelpCircle,
    Infinity,
    Lock,
    MessageCircle,
    Monitor,
    PlayCircle,
    Share2,
    Shield,
    Smartphone,
    Star,
    Target,
    Unlock,
    Users,
    Volume2,
    VolumeX,
    X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import useAuth from "../../hooks/useAuth"

const CourseDetails = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  // State management
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState(new Set(["curriculum"]))
  const [favorites, setFavorites] = useState(new Set())
  const [enrolledCourses, setEnrolledCourses] = useState(new Set())
  const [expandedLessons, setExpandedLessons] = useState(new Set())

  // Video player state
  const [showInlineVideo, setShowInlineVideo] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentModalVideo, setCurrentModalVideo] = useState(null)

  // Fetch course data on component mount
  useEffect(() => {
    if (courseId) {
      fetchCourseDetails()
      if (user?.email) {
        fetchUserData()
      }
    }
  }, [courseId, user])

  const fetchCourseDetails = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`http://localhost:5000/courses/view-courses/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          setError("Course not found")
        } else if (response.status === 403) {
          setError("This course is not available for public viewing")
        } else {
          setError("Failed to fetch course details")
        }
        return
      }

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.message || "Failed to load course")
      }

      setCourse(result.data)
    } catch (error) {
      console.error("Error fetching course details:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserData = async () => {
    if (!user?.email) return

    try {
      // Fetch user's enrolled courses
      const enrolledResponse = await fetch(`http://localhost:5000/api/user/enrolled-courses/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "Content-Type": "application/json",
        },
      })

      if (enrolledResponse.ok) {
        const enrolledResult = await enrolledResponse.json()
        if (enrolledResult.success) {
          const enrolledIds = new Set(enrolledResult.data.map((course) => course._id))
          setEnrolledCourses(enrolledIds)
        }
      }

      // Fetch user's favorites
      const favoritesResponse = await fetch(`http://localhost:5000/api/user/favorites/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "Content-Type": "application/json",
        },
      })

      if (favoritesResponse.ok) {
        const favoritesResult = await favoritesResponse.json()
        if (favoritesResult.success) {
          const favoriteIds = new Set(favoritesResult.data.map((course) => course._id))
          setFavorites(favoriteIds)
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId)
      } else {
        newSet.add(lessonId)
      }
      return newSet
    })
  }

  const toggleFavorite = async () => {
    if (!course || !user?.email) {
      showNotification("Please log in to add favorites", "warning")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/user/favorites/toggle`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          courseId: course._id,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setFavorites((prev) => {
            const newFavorites = new Set(prev)
            if (result.isFavorite) {
              newFavorites.add(course._id)
            } else {
              newFavorites.delete(course._id)
            }
            return newFavorites
          })
          showNotification(result.message, "success")
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
      showNotification("Failed to update favorites", "error")
    }
  }

  const handleEnroll = () => {
    if (!course) return

    if (!user?.email) {
      showNotification("Please log in to enroll", "warning")
      navigate("/login")
      return
    }

    if (course.price === 0) {
      // Handle free enrollment
      showNotification("Redirecting to enrollment...", "info")
      // Add your enrollment logic here
    } else {
      showNotification("Redirecting to payment...", "info")
      // Add your payment logic here
    }
  }

  const handlePreviewVideoPlay = () => {
    setShowInlineVideo(true)
    setIsVideoPlaying(true)
  }

  const handleVideoPlay = (content) => {
    if (!content.videoUrl) return

    const isEnrolled = enrolledCourses.has(course._id)
    if (!content.isPreview && !isEnrolled) {
      showNotification("Please enroll to access this content", "warning")
      return
    }

    // For preview content, show inline video
    if (content.isPreview) {
      handlePreviewVideoPlay()
      return
    }

    // For enrolled content, show modal
    setCurrentModalVideo(content)
    setShowVideoModal(true)
  }

  const showNotification = (message, type = "info") => {
    const notification = document.createElement("div")
    const bgColor =
      {
        success: "bg-emerald-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        warning: "bg-amber-600",
      }[type] || "bg-gray-600"

    notification.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${bgColor} text-white shadow-lg transition-all duration-300 opacity-0 transform translate-x-full`
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-white rounded-full"></div>
        <span class="text-sm font-medium">${message}</span>
      </div>
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.classList.remove("opacity-0", "translate-x-full")
      notification.classList.add("opacity-100", "translate-x-0")
    }, 100)

    setTimeout(() => {
      notification.classList.remove("opacity-100", "translate-x-0")
      notification.classList.add("opacity-0", "translate-x-full")
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  const getContentIcon = (type) => {
    switch (type) {
      case "video":
        return PlayCircle
      case "article":
        return FileText
      case "quiz":
        return HelpCircle
      case "exercise":
        return Code
      case "project":
        return Target
      default:
        return BookOpen
    }
  }

  const getContentTypeColor = (type) => {
    switch (type) {
      case "video":
        return "bg-indigo-600 border-indigo-700 text-white"
      case "article":
        return "bg-blue-600 border-blue-700 text-white"
      case "quiz":
        return "bg-purple-600 border-purple-700 text-white"
      case "exercise":
        return "bg-emerald-600 border-emerald-700 text-white"
      case "project":
        return "bg-orange-600 border-orange-700 text-white"
      default:
        return "bg-gray-800/50 border-gray-700/50 text-gray-400"
    }
  }

  const formatDuration = (duration) => {
    if (!duration) return "N/A"
    return duration
  }

  const getYouTubeVideoId = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Modal component for enrolled content
  const VideoModal = () => {
    if (!showVideoModal || !currentModalVideo?.videoUrl) return null

    const videoId = getYouTubeVideoId(currentModalVideo.videoUrl)
    if (!videoId) return null

    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">{currentModalVideo.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span>{course.title}</span>
                  <span>•</span>
                  <span>{currentModalVideo.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVideoMuted(!videoMuted)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  {videoMuted ? (
                    <VolumeX size={18} className="text-white" />
                  ) : (
                    <Volume2 size={18} className="text-white" />
                  )}
                </button>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${videoMuted ? 1 : 0}&rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowVideoModal(false)
        setShowInlineVideo(false)
        setIsVideoPlaying(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Loading Course Details</h3>
          <p className="text-gray-600">Please wait while we fetch the course information</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-xl border border-gray-200 shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Course Not Available</h3>
          <p className="text-gray-600 mb-6">{error || "Unable to load course details"}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const isFavorite = favorites.has(course._id)
  const isEnrolled = enrolledCourses.has(course._id)
  const previewContent = course.previewContent?.[0] // Get first preview content

  return (
    <div className="min-h-screen bg-[#edf7f4] text-gray-900">
      {/* Video Modal - Only render when needed */}
      {showVideoModal && <VideoModal />}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Course Info */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                  {course.category}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${course.level === "Beginner"
                    ? "bg-green-600 text-white"
                    : course.level === "Intermediate"
                      ? "bg-yellow-600 text-white"
                      : "bg-red-600 text-white"
                    }`}
                >
                  {course.level}
                </span>
                {course.status === "published" && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                    <Globe size={12} />
                    Published
                  </span>
                )}
                {isEnrolled && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full">
                    <CheckCircle size={12} />
                    Enrolled
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">{course.title}</h1>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{course.duration || "Self-paced"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{(course.enrollmentCount || 0).toLocaleString()} students</span>
                </div>
                {course.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span>
                      {course.rating.toFixed(1)} ({course.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{course.contentSummary?.totalLessons || 0} lessons</span>
                </div>
              </div>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {course.tags.slice(0, 5).map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 5 && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                      +{course.tags.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 lg:flex-shrink-0">
              <button
                onClick={handleEnroll}
                disabled={isEnrolled}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${isEnrolled
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                  }`}
              >
                {isEnrolled ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle size={16} />
                    Enrolled
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ArrowRight size={16} />
                    {course.price === 0 ? "Enroll Free" : `Enroll - ৳ ${course.price}`}
                  </span>
                )}
              </button>
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-lg border transition-colors ${isFavorite
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200"
                  }`}
              >
                <Heart size={16} className={isFavorite ? "fill-current" : ""} />
              </button>
              <button className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:text-gray-700 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Preview Section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="relative aspect-video bg-gray-900">
                {showInlineVideo && previewContent?.videoUrl ? (
                  // Inline Video Player
                  <div className="relative w-full h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(previewContent.videoUrl)}?autoplay=1&mute=${videoMuted ? 1 : 0}&rel=0&modestbranding=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* Video Controls Overlay */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <button
                        onClick={() => setVideoMuted(!videoMuted)}
                        className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                      >
                        {videoMuted ? (
                          <VolumeX size={16} className="text-white" />
                        ) : (
                          <Volume2 size={16} className="text-white" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setShowInlineVideo(false)
                          setIsVideoPlaying(false)
                        }}
                        className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Thumbnail with Play Button
                  <>
                    {course.thumbnailUrl ? (
                      <img
                        src={course.thumbnailUrl || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen size={48} className="text-gray-400" />
                      </div>
                    )}
                    {/* Play Button */}
                    {previewContent?.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={handlePreviewVideoPlay}
                          className="flex items-center justify-center w-16 h-16 bg-white/90 hover:bg-white rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                          <PlayCircle size={32} className="text-blue-600 ml-1" />
                        </button>
                      </div>
                    )}
                    {/* Preview Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded">
                        {previewContent ? "Free Preview" : "Course Preview"}
                      </span>
                    </div>
                  </>
                )}
              </div>
              {previewContent?.videoUrl && !showInlineVideo && (
                <div className="p-4 bg-blue-50 border-t border-blue-100">
                  <p className="text-sm text-blue-700">
                    <strong>Free Preview:</strong> "{previewContent.title}" • No signup required
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-4 md:space-x-8 px-2 md:px-6">
                  {[
                    { id: "overview", label: "Overview", icon: Eye },
                    { id: "curriculum", label: "Curriculum", icon: BookOpen },
                    { id: "instructor", label: "Instructor", icon: Users },
                  ].map((tab) => {
                    const IconComponent = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-blue-600"
                          }`}
                      >
                        <IconComponent size={16} className="hidden md:inline" />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-2 md:p-6">
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Description</h3>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">{course.description}</div>
                    </div>

                    {/* Course Summary */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {course.contentSummary?.totalLessons || 0}
                          </div>
                          <div className="text-sm text-gray-600">Total Lessons</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {course.contentSummary?.videoLessons || 0}
                          </div>
                          <div className="text-sm text-gray-600">Video Lessons</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {course.contentSummary?.quizLessons || 0}
                          </div>
                          <div className="text-sm text-gray-600">Quizzes</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {course.contentSummary?.previewLessons || 0}
                          </div>
                          <div className="text-sm text-gray-600">Free Previews</div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            icon: Monitor,
                            title: "HD Video Content",
                            desc: "High-quality video lessons with clear audio",
                          },
                          {
                            icon: Download,
                            title: "Downloadable Resources",
                            desc: "PDFs, code files, and additional materials",
                          },
                          { icon: Infinity, title: "Lifetime Access", desc: "Learn at your own pace, access forever" },
                          { icon: Smartphone, title: "Mobile Friendly", desc: "Access on any device, anywhere" },
                          { icon: Award, title: "Certificate", desc: "Certificate of completion" },
                          { icon: MessageCircle, title: "Community", desc: "Connect with other learners" },
                        ].map((feature, index) => {
                          const IconComponent = feature.icon
                          return (
                            <div key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <IconComponent size={20} className="text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                                <p className="text-sm text-gray-600">{feature.desc}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Course Curriculum</h3>
                      <span className="text-sm text-gray-600">
                        {course.contentSummary?.totalLessons || 0} lessons • {course.duration || "N/A"}
                      </span>
                    </div>

                    {/* Preview Content */}
                    {course.previewContent && course.previewContent.length > 0 ? (
                      <div className="space-y-4">
                        <div className="text-sm text-gray-600 mb-4">
                          Preview lessons ({course.contentSummary?.previewLessons || 0} available)
                        </div>
                        {course.previewContent.map((content, index) => {
                          const IconComponent = getContentIcon(content.type)
                          const isExpanded = expandedLessons.has(content.id || index)
                          return (
                            <div
                              key={content.id || index}
                              className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                            >
                              <div className="p-4">
                                <div className="flex items-center gap-4">
                                  <div className="flex-shrink-0">
                                    <div
                                      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getContentTypeColor(content.type)}`}
                                    >
                                      <IconComponent size={16} />
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-medium text-gray-900 truncate">{content.title}</h4>
                                      <div className="flex items-center gap-2 ml-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                          Preview
                                        </span>
                                        <span className="flex items-center gap-1 text-green-600 text-xs">
                                          <Unlock size={12} />
                                          Available
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                      <span className={`px-2 py-1 rounded border ${getContentTypeColor(content.type)}`}>
                                        {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {formatDuration(content.duration)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {content.type === "video" && content.videoUrl && (
                                      <button
                                        onClick={() => handleVideoPlay(content)}
                                        className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                                      >
                                        Play
                                      </button>
                                    )}
                                    <button
                                      onClick={() => toggleLesson(content.id || index)}
                                      className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                      <ChevronDown
                                        size={16}
                                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                      />
                                    </button>
                                  </div>
                                </div>
                                {isExpanded && (
                                  <div className="mt-4 pt-4 border-t border-gray-200">
                                    {content.description && (
                                      <p className="text-sm text-gray-700 mb-3">{content.description}</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}

                        {/* Locked Content Indicator */}
                        <div className="border border-gray-200 rounded-lg bg-gray-50 p-6 text-center">
                          <Lock size={32} className="text-gray-400 mx-auto mb-3" />
                          <h4 className="font-medium text-gray-900 mb-2">
                            {(course.contentSummary?.totalLessons || 0) - (course.contentSummary?.previewLessons || 0)}{" "}
                            More Lessons
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Enroll to access the complete course curriculum with all lessons and resources.
                          </p>
                          <button
                            onClick={handleEnroll}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Curriculum Coming Soon</h4>
                        <p className="text-gray-600">The detailed curriculum will be available shortly.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "instructor" && course.instructor && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Meet Your Instructor</h3>
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        {course.instructor.avatarUrl ? (
                          <img
                            src={course.instructor.avatarUrl || "/placeholder.svg"}
                            alt={course.instructor.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-2xl font-bold">
                              {course.instructor.name?.charAt(0) || "I"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 mb-1">{course.instructor.name}</h4>
                        <p className="text-blue-600 font-medium mb-2">Expert Instructor</p>
                        <p className="text-sm text-gray-600 mb-4">{course.instructor.email}</p>
                        {course.instructor.bio && (
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {course.instructor.bio}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {course.price === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl md:text-2xl text-gray-500 line-through">
                        ৳{(course.price * 1.5).toFixed(0)}
                      </span>
                      <span className="text-blue-600">৳{course.price}</span>
                    </div>
                  )}
                </div>
                {course.price > 0 && <p className="text-sm text-green-600 font-medium">Limited time offer!</p>}
              </div>
              <button
                onClick={handleEnroll}
                disabled={isEnrolled}
                className={`w-full py-3 rounded-lg font-semibold mb-4 transition-all ${isEnrolled
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {isEnrolled ? "✓ Enrolled" : course.price === 0 ? "Enroll for Free" : "Enroll Now"}
              </button>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">{course.duration || "Self-paced"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium text-gray-900">{(course.enrollmentCount || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium text-gray-900">{course.contentSummary?.totalLessons || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium text-gray-900">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-medium text-gray-900">Included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Access</span>
                  <span className="font-medium text-gray-900">Lifetime</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">This course includes:</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Monitor size={14} className="text-blue-600" />
                    <span>HD video content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download size={14} className="text-blue-600" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone size={14} className="text-blue-600" />
                    <span>Mobile access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-blue-600" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-blue-600" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
