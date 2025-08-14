"use client"

import {
    AlertCircle,
    Archive,
    BookOpen,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Download,
    File,
    FileText,
    ImageIcon,
    Menu,
    Pause,
    Play,
    Save,
    Settings,
    StickyNote,
    Video,
    Volume2,
    VolumeX,
    X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import useAuth from "../../hooks/useAuth"

const CoursePlayer = () => {
    const { courseId } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()

    // Course and content state
    const [course, setCourse] = useState(null)
    const [currentContent, setCurrentContent] = useState(null)
    const [currentContentIndex, setCurrentContentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Progress tracking
    const [completedLessons, setCompletedLessons] = useState([])
    const [progressPercentage, setProgressPercentage] = useState(0)
    const [enrollment, setEnrollment] = useState(null)

    // Video player state
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1)
    const videoRef = useRef(null)

    // UI state
    const [sidebarOpen, setSidebarOpen] = useState(false) // Default closed on mobile
    const [showNotes, setShowNotes] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showResources, setShowResources] = useState(false)
    const [activeTab, setActiveTab] = useState("content") // content, notes, resources

    // Notes state
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")
    const [noteTimestamp, setNoteTimestamp] = useState(0)
    const [editingNote, setEditingNote] = useState(null)

    // Resources state
    const [resources, setResources] = useState([])

    useEffect(() => {
        if (courseId && user?.email) {
            fetchCourseData()
            fetchUserNotes()
        }
    }, [courseId, user])

    // Responsive sidebar handling
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true) // Auto-open on desktop
            } else {
                setSidebarOpen(false) // Auto-close on mobile
            }
        }

        handleResize() // Initial check
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const fetchCourseData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Fetch course details with user email for enrollment check
            const courseResponse = await fetch(`http://localhost:5000/courses/courses/${courseId}?userEmail=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                    "user-email": user.email, // Alternative way to pass user email
                },
            })

            if (!courseResponse.ok) {
                if (courseResponse.status === 403) {
                    const errorData = await courseResponse.json()
                    if (errorData.code === "NOT_ENROLLED") {
                        setError("You are not enrolled in this course. Please enroll first to access the content.")
                    } else if (errorData.code === "ENROLLMENT_NOT_ACTIVE") {
                        setError(`Your enrollment is ${errorData.enrollmentStatus}. Please contact support for assistance.`)
                    } else {
                        setError(errorData.message || "Access denied")
                    }
                } else if (courseResponse.status === 401) {
                    setError("Authentication required. Please log in again.")
                } else {
                    setError("Failed to fetch course data")
                }
                return
            }

            const courseResult = await courseResponse.json()
            if (!courseResult.success) {
                throw new Error(courseResult.message || "Failed to load course")
            }

            setCourse(courseResult.data)

            // Set enrollment data from the response
            if (courseResult.data.enrollment) {
                setEnrollment(courseResult.data.enrollment)
                setCompletedLessons(courseResult.data.enrollment.progress?.completedLessons || [])
                setProgressPercentage(courseResult.data.enrollment.progress?.progressPercentage || 0)

                // Set current content based on progress
                const currentLessonIndex = courseResult.data.enrollment.progress?.currentLesson || 0
                setCurrentContentIndex(currentLessonIndex)
                setCurrentContent(courseResult.data.contents?.[currentLessonIndex] || courseResult.data.contents?.[0])
            }

            // Extract resources from course contents
            const courseResources = []
            courseResult.data.contents?.forEach((content, index) => {
                if (content.resources && Array.isArray(content.resources)) {
                    content.resources.forEach((resource, resourceIndex) => {
                        courseResources.push({
                            _id: `${content.id}-${resourceIndex}`,
                            title: resource.name || "Untitled File",
                            type: getFileExtension(resource.name),
                            size: "Unknown",
                            url: `/resources/${courseId}/${resource}`,
                            description: `Resource for ${content.title}`,
                            contentId: content.id,
                            contentTitle: content.title,
                        })
                    })
                }
            })
            setResources(courseResources)

            // Set first content if no progress
            if (!currentContent && courseResult.data.contents?.length > 0) {
                setCurrentContent(courseResult.data.contents[0])
                setCurrentContentIndex(0)
            }
        } catch (error) {
            console.error("Error fetching course data:", error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchUserNotes = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/notes/${user.email}/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setNotes(result.data || [])
                }
            }
        } catch (error) {
            console.error("Error fetching notes:", error)
        }
    }

    const getFileExtension = (filename) => {
        if (!filename) return "file"

        const name = String(filename)
        const extension = name.split(".").pop()?.toLowerCase()

        switch (extension) {
            case "pdf":
                return "pdf"
            case "zip":
            case "rar":
                return "zip"
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
                return "image"
            case "mp4":
            case "avi":
            case "mov":
                return "video"
            case "csv":
            case "xlsx":
            case "xls":
                return "spreadsheet"
            case "ipynb":
                return "notebook"
            default:
                return "file"
        }
    }

    const calculateProgress = (completed) => {
        if (!course?.contents?.length) return 0
        return Math.round((completed.length / course.contents.length) * 100)
    }

    const updateProgress = async (lessonId, isCompleted) => {
        try {
            let updatedCompleted = [...completedLessons]

            if (isCompleted && !updatedCompleted.includes(lessonId)) {
                updatedCompleted.push(lessonId)
            } else if (!isCompleted && updatedCompleted.includes(lessonId)) {
                updatedCompleted = updatedCompleted.filter((id) => id !== lessonId)
            }

            const newProgressPercentage = calculateProgress(updatedCompleted)

            const response = await fetch(`http://localhost:5000/api/user/progress/${user.email}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseId,
                    lessonId: currentContentIndex,
                    progressPercentage: newProgressPercentage,
                    completedLessons: updatedCompleted,
                }),
            })

            if (response.ok) {
                setCompletedLessons(updatedCompleted)
                setProgressPercentage(newProgressPercentage)
                console.log("Progress updated successfully")
            }
        } catch (error) {
            console.error("Error updating progress:", error)
        }
    }

    const handleMarkComplete = () => {
        if (!currentContent) return

        const contentId = currentContent.id || currentContentIndex
        const isCurrentlyCompleted = completedLessons.includes(contentId)

        updateProgress(contentId, !isCurrentlyCompleted)
    }

    const handleContentSelect = (content, index) => {
        setCurrentContent(content)
        setCurrentContentIndex(index)
        setCurrentTime(0)
        if (videoRef.current) {
            videoRef.current.currentTime = 0
        }
        // Close sidebar on mobile after selection
        if (window.innerWidth < 1024) {
            setSidebarOpen(false)
        }
    }

    const handleNextContent = () => {
        if (currentContentIndex < course.contents.length - 1) {
            const nextIndex = currentContentIndex + 1
            handleContentSelect(course.contents[nextIndex], nextIndex)
        }
    }

    const handlePreviousContent = () => {
        if (currentContentIndex > 0) {
            const prevIndex = currentContentIndex - 1
            handleContentSelect(course.contents[prevIndex], prevIndex)
        }
    }

    // Video player functions
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const pos = (e.clientX - rect.left) / rect.width
        const time = pos * duration
        if (videoRef.current) {
            videoRef.current.currentTime = time
            setCurrentTime(time)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = Number.parseFloat(e.target.value)
        setVolume(newVolume)
        if (videoRef.current) {
            videoRef.current.volume = newVolume
        }
    }

    const handlePlaybackRateChange = (rate) => {
        setPlaybackRate(rate)
        if (videoRef.current) {
            videoRef.current.playbackRate = rate
        }
        setShowSettings(false)
    }

    // Notes functions
    const handleAddNote = async () => {
        if (!newNote.trim()) return

        try {
            const noteData = {
                userEmail: user.email,
                courseId,
                contentId: currentContent.id || currentContentIndex,
                contentTitle: currentContent.title,
                note: newNote,
                timestamp: noteTimestamp,
                createdAt: new Date().toISOString(),
            }

            const response = await fetch(`http://localhost:5000/api/user/notes`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(noteData),
            })

            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setNotes([...notes, result.data])
                    setNewNote("")
                    setNoteTimestamp(0)
                }
            }
        } catch (error) {
            console.error("Error adding note:", error)
        }
    }

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/notes/${noteId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                setNotes(notes.filter((note) => note._id !== noteId))
            }
        } catch (error) {
            console.error("Error deleting note:", error)
        }
    }

    const handleResourceDownload = (resource) => {
        // Create a temporary link and trigger download
        const link = document.createElement("a")
        link.href = resource.url
        link.download = resource.title
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const getResourceIcon = (type) => {
        switch (type) {
            case "pdf":
                return FileText
            case "zip":
            case "rar":
                return Archive
            case "image":
            case "jpg":
            case "png":
            case "gif":
                return ImageIcon
            case "video":
            case "mp4":
            case "avi":
                return Video
            case "spreadsheet":
            case "csv":
            case "xlsx":
                return FileText
            case "notebook":
            case "ipynb":
                return BookOpen
            default:
                return File
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const getYouTubeVideoId = (url) => {
        if (!url) return null
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="xl" />
                    <h3 className="text-xl font-semibold text-gray-100 mb-2 mt-4">Loading Course</h3>
                    <p className="text-gray-400">Preparing your learning experience...</p>
                </div>
            </div>
        )
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="text-center bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md">
                    <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        {error?.includes("not enrolled") ? (
                            <AlertCircle className="w-8 h-8 text-red-400" />
                        ) : (
                            <X className="w-8 h-8 text-red-400" />
                        )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                        {error?.includes("not enrolled") ? "Enrollment Required" : "Access Denied"}
                    </h3>
                    <p className="text-gray-400 mb-6">{error || "Unable to load course content"}</p>
                    <div className="flex flex-col gap-3">
                        {error?.includes("not enrolled") && (
                            <button
                                onClick={() => navigate(`/course-details/${courseId}`)}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                View Course Details
                            </button>
                        )}
                        <button
                            onClick={() => navigate("/user-dashboard/my-courses")}
                            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Back to My Courses
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const currentContentId = currentContent?.id || currentContentIndex
    const isCurrentContentCompleted = completedLessons.includes(currentContentId)

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-3 sm:px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                        >
                            <Menu size={20} />
                        </button>
                        <button
                            onClick={() => navigate("/user-dashboard/my-courses")}
                            className="flex items-center gap-2 px-2 sm:px-3 py-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                        >
                            <ChevronLeft size={16} />
                            <span className="hidden sm:inline">Back</span>
                        </button>
                        <div className="min-w-0 flex-1">
                            <h1 className="font-semibold text-gray-100 truncate text-sm sm:text-base">{course.title}</h1>
                            <p className="text-xs sm:text-sm text-gray-400 truncate">{course.instructor?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg">
                            <div className="w-16 sm:w-24 bg-gray-600 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-200">{progressPercentage}%</span>
                        </div>
                        <div className="sm:hidden text-sm font-medium text-gray-200 bg-gray-700 px-2 py-1 rounded">
                            {progressPercentage}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-[calc(100vh-64px)]">
                {/* Sidebar Overlay for Mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Sidebar */}
                <div
                    className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } fixed lg:relative lg:translate-x-0 z-50 lg:z-auto w-80 sm:w-96 lg:w-80 xl:w-96 bg-gray-800 border-r border-gray-700 transition-transform duration-300 h-full flex flex-col`}
                >
                    {/* Sidebar Header */}
                    <div className="p-4 border-b border-gray-700 flex-shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-100">Course Content</h3>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-1 hover:bg-gray-700 rounded transition-colors lg:hidden"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex bg-gray-700 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab("content")}
                                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "content" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                <BookOpen size={14} className="inline mr-1" />
                                Lessons
                            </button>
                            <button
                                onClick={() => setActiveTab("notes")}
                                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "notes" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                <StickyNote size={14} className="inline mr-1" />
                                Notes
                            </button>
                            <button
                                onClick={() => setActiveTab("resources")}
                                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "resources" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                <Download size={14} className="inline mr-1" />
                                Files
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto">
                        {/* Content Tab */}
                        {activeTab === "content" && (
                            <div className="p-4">
                                <div className="text-sm text-gray-400 mb-4">
                                    {course.contents?.length || 0} lessons • {progressPercentage}% complete
                                </div>
                                <div className="space-y-2">
                                    {course.contents?.map((content, index) => {
                                        const contentId = content.id || index
                                        const isCompleted = completedLessons.includes(contentId)
                                        const isCurrent = index === currentContentIndex

                                        return (
                                            <div
                                                key={index}
                                                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${isCurrent
                                                    ? "bg-blue-600 text-white"
                                                    : isCompleted
                                                        ? "bg-green-900 text-green-100 hover:bg-green-800"
                                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                    }`}
                                                onClick={() => handleContentSelect(content, index)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="flex-shrink-0">
                                                            {isCompleted ? (
                                                                <CheckCircle size={16} className="text-green-400" />
                                                            ) : content.type === "video" ? (
                                                                <Play size={16} />
                                                            ) : (
                                                                <FileText size={16} />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="font-medium text-sm truncate">{content.title}</div>
                                                            <div className="flex items-center gap-2 text-xs opacity-75">
                                                                <span className="capitalize">{content.type}</span>
                                                                {content.duration && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <span>{content.duration}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Notes Tab */}
                        {activeTab === "notes" && (
                            <div className="p-4">
                                <div className="space-y-3 mb-4">
                                    <textarea
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        placeholder="Add a note..."
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 text-sm"
                                        rows={3}
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setNoteTimestamp(currentTime)}
                                            className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition-colors"
                                        >
                                            <Clock size={12} />
                                            {formatTime(noteTimestamp)}
                                        </button>
                                        <button
                                            onClick={handleAddNote}
                                            disabled={!newNote.trim()}
                                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 text-white rounded text-sm transition-colors"
                                        >
                                            <Save size={12} />
                                            Save
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {notes
                                        .filter((note) => note.contentId === currentContentId)
                                        .map((note) => (
                                            <div key={note._id} className="bg-gray-700 rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-blue-400">{formatTime(note.timestamp)}</span>
                                                    <button
                                                        onClick={() => handleDeleteNote(note._id)}
                                                        className="text-gray-400 hover:text-red-400 transition-colors"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-200">{note.note}</p>
                                                <div className="text-xs text-gray-400 mt-2">
                                                    {new Date(note.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    {notes.filter((note) => note.contentId === currentContentId).length === 0 && (
                                        <div className="text-center py-8">
                                            <StickyNote size={32} className="text-gray-600 mx-auto mb-2" />
                                            <p className="text-gray-500 text-sm">No notes for this lesson yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Resources Tab */}
                        {activeTab === "resources" && (
                            <div className="p-4">
                                <div className="text-sm text-gray-400 mb-4">
                                    {resources.filter((r) => r.contentId === currentContentId).length} resources for this lesson
                                </div>
                                <div className="space-y-3">
                                    {resources
                                        .filter((resource) => resource.contentId === currentContentId)
                                        .map((resource) => {
                                            const IconComponent = getResourceIcon(resource.type)
                                            return (
                                                <div
                                                    key={resource._id}
                                                    className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                                            <IconComponent size={20} className="text-white" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-gray-100 text-sm truncate">{resource.title}</h4>
                                                            <p className="text-xs text-gray-400 mt-1">{resource.description}</p>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <span className="text-xs text-gray-500">{resource.size}</span>
                                                                <button
                                                                    onClick={() => handleResourceDownload(resource)}
                                                                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                                                                >
                                                                    <Download size={12} />
                                                                    Download
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    {/* Show all course resources if no lesson-specific resources */}
                                    {resources.filter((r) => r.contentId === currentContentId).length === 0 && (
                                        <>
                                            <div className="text-xs text-gray-500 mb-2">All course resources:</div>
                                            {resources.map((resource) => {
                                                const IconComponent = getResourceIcon(resource.type)
                                                return (
                                                    <div
                                                        key={resource._id}
                                                        className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                                                <IconComponent size={20} className="text-white" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-medium text-gray-100 text-sm truncate">{resource.title}</h4>
                                                                <p className="text-xs text-gray-400 mt-1">From: {resource.contentTitle}</p>
                                                                <div className="flex items-center justify-between mt-2">
                                                                    <span className="text-xs text-gray-500">{resource.size}</span>
                                                                    <button
                                                                        onClick={() => handleResourceDownload(resource)}
                                                                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                                                                    >
                                                                        <Download size={12} />
                                                                        Download
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    )}

                                    {resources.length === 0 && (
                                        <div className="text-center py-8">
                                            <Download size={32} className="text-gray-600 mx-auto mb-2" />
                                            <p className="text-gray-500 text-sm">No resources available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Video Player */}
                    <div className="bg-black relative flex-1">
                        {currentContent?.type === "video" && currentContent?.videoUrl ? (
                            <div className="relative w-full h-full">
                                {getYouTubeVideoId(currentContent.videoUrl) ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentContent.videoUrl)}?autoplay=0&rel=0&modestbranding=1`}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-contain"
                                        onTimeUpdate={handleTimeUpdate}
                                        onLoadedMetadata={handleLoadedMetadata}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    >
                                        <source src={currentContent.videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {/* Custom Video Controls (only for non-YouTube videos) */}
                                {!getYouTubeVideoId(currentContent.videoUrl) && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4">
                                        <div className="flex items-center gap-2 sm:gap-4">
                                            <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
                                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                            </button>
                                            <div className="flex-1">
                                                <div className="w-full h-2 bg-gray-600 rounded-full cursor-pointer" onClick={handleSeek}>
                                                    <div
                                                        className="h-2 bg-blue-500 rounded-full"
                                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="text-white text-xs sm:text-sm">
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                            <button onClick={toggleMute} className="text-white hover:text-blue-400 transition-colors">
                                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                            </button>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="w-12 sm:w-20"
                                            />
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowSettings(!showSettings)}
                                                    className="text-white hover:text-blue-400 transition-colors"
                                                >
                                                    <Settings size={16} />
                                                </button>
                                                {showSettings && (
                                                    <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg p-2 min-w-32">
                                                        <div className="text-sm text-gray-300 mb-2">Speed</div>
                                                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                                            <button
                                                                key={rate}
                                                                onClick={() => handlePlaybackRateChange(rate)}
                                                                className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-700 ${playbackRate === rate ? "text-blue-400" : "text-gray-300"
                                                                    }`}
                                                            >
                                                                {rate}x
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full p-4">
                                <div className="text-center">
                                    <FileText size={48} className="text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2 line-clamp-2">
                                        {currentContent?.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm sm:text-base">
                                        {currentContent?.type === "article" ? "Article content" : "Content not available"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Info and Controls */}
                    <div className="bg-gray-800 border-t border-gray-700 p-3 sm:p-4 flex-shrink-0">
                        <div className="flex flex-col gap-4">
                            <div className="flex-1">
                                <h2 className="text-base sm:text-lg font-semibold text-gray-100 mb-1 line-clamp-2">
                                    {currentContent?.title}
                                </h2>
                                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 flex-wrap">
                                    <span className="capitalize">{currentContent?.type}</span>
                                    {currentContent?.duration && (
                                        <>
                                            <span>•</span>
                                            <span>{currentContent?.duration}</span>
                                        </>
                                    )}
                                    <span>•</span>
                                    <span>
                                        Lesson {currentContentIndex + 1} of {course.contents?.length || 0}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                <button
                                    onClick={handlePreviousContent}
                                    disabled={currentContentIndex === 0}
                                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-gray-200 rounded-lg transition-colors text-sm"
                                >
                                    <ChevronLeft size={16} />
                                    <span className="hidden sm:inline">Previous</span>
                                </button>
                                <button
                                    onClick={handleMarkComplete}
                                    className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${isCurrentContentCompleted
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                >
                                    {isCurrentContentCompleted ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <CheckCircle size={16} />
                                            <span className="hidden sm:inline">Completed</span>
                                            <span className="sm:hidden">Done</span>
                                        </span>
                                    ) : (
                                        <span className="hidden sm:inline">Mark Complete</span>
                                    )}
                                    {!isCurrentContentCompleted && <span className="sm:hidden">Complete</span>}
                                </button>
                                <button
                                    onClick={handleNextContent}
                                    disabled={currentContentIndex === course.contents?.length - 1}
                                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-gray-200 rounded-lg transition-colors text-sm"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursePlayer
