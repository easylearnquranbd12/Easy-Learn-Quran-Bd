"use client"

import { useState, useEffect } from "react"
import { Save, X, Loader2, Youtube, Check, AlertCircle } from "lucide-react"

const ContentForm = ({ onSubmit, onCancel, isLoading = false }) => {
    const [formData, setFormData] = useState({
        title: "",
        type: "video",
        duration: "",
        videoUrl: "",
        videoThumbnail: "",
        description: "",
        isPreview: false,
        content: "",
        questions: "",
        passingScore: "",
        instructions: "",
        resources: [],
    })

    const [errors, setErrors] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [videoId, setVideoId] = useState("")
    const [newResource, setNewResource] = useState("")

    // Extract YouTube video ID from URL
    useEffect(() => {
        if (formData.videoUrl) {
            const extractedId = extractYoutubeId(formData.videoUrl)
            setVideoId(extractedId || "")

            if (extractedId) {
                // Set the video thumbnail
                const thumbnailUrl = `https://img.youtube.com/vi/${extractedId}/maxresdefault.jpg`
                setFormData((prev) => ({
                    ...prev,
                    videoThumbnail: thumbnailUrl,
                }))

                // Try to fetch video duration
                fetchVideoDuration(extractedId)
            }
        }
    }, [formData.videoUrl])

    const extractYoutubeId = (url) => {
        if (!url) return null

        // Match YouTube URL patterns
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)

        return match && match[2].length === 11 ? match[2] : null
    }

    const fetchVideoDuration = async (videoId) => {
        // In a real implementation, you would use the YouTube API to get the duration
        // For this demo, we'll simulate fetching the duration
        setIsProcessing(true)

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // For demo purposes, set a random duration
            const minutes = Math.floor(Math.random() * 30) + 5
            setFormData((prev) => ({
                ...prev,
                duration: `${minutes} min`,
            }))

            console.log(`Video duration fetched for ID ${videoId}: ${minutes} min`)
        } catch (error) {
            console.error("Error fetching video duration:", error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            })
        }
    }

    const handleAddResource = () => {
        if (newResource.trim() && !formData.resources.includes(newResource.trim())) {
            setFormData({
                ...formData,
                resources: [...formData.resources, newResource.trim()],
            })
            setNewResource("")
        }
    }

    const handleRemoveResource = (resourceToRemove) => {
        setFormData({
            ...formData,
            resources: formData.resources.filter((resource) => resource !== resourceToRemove),
        })
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        }

        if (formData.type === "video") {
            if (!formData.videoUrl.trim()) {
                newErrors.videoUrl = "Video URL is required for video content"
            } else if (!extractYoutubeId(formData.videoUrl)) {
                newErrors.videoUrl = "Please enter a valid YouTube URL"
            }
        }

        if (!formData.duration.trim()) {
            newErrors.duration = "Duration is required"
        }

        if (formData.type === "article" && !formData.content.trim()) {
            newErrors.content = "Content is required for article type"
        }

        if (formData.type === "quiz") {
            if (!formData.questions.trim()) {
                newErrors.questions = "Number of questions is required for quiz"
            } else if (isNaN(formData.questions) || Number(formData.questions) <= 0) {
                newErrors.questions = "Number of questions must be a positive number"
            }

            if (!formData.passingScore.trim()) {
                newErrors.passingScore = "Passing score is required for quiz"
            } else if (
                isNaN(formData.passingScore) ||
                Number(formData.passingScore) < 0 ||
                Number(formData.passingScore) > 100
            ) {
                newErrors.passingScore = "Passing score must be between 0 and 100"
            }
        }

        if ((formData.type === "exercise" || formData.type === "project") && !formData.instructions.trim()) {
            newErrors.instructions = "Instructions are required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            // Prepare the content data based on type
            const contentData = {
                title: formData.title,
                type: formData.type,
                duration: formData.duration,
                description: formData.description,
                isPreview: formData.isPreview,
            }

            // Add type-specific fields
            if (formData.type === "video") {
                contentData.videoUrl = formData.videoUrl
                contentData.videoThumbnail = formData.videoThumbnail
            } else if (formData.type === "article") {
                contentData.content = formData.content
            } else if (formData.type === "quiz") {
                contentData.questions = Number.parseInt(formData.questions) || 0
                contentData.passingScore = Number.parseInt(formData.passingScore) || 0
            } else if (formData.type === "exercise" || formData.type === "project") {
                contentData.instructions = formData.instructions
                contentData.resources = formData.resources
            }

            console.log("Content Form Data:", contentData)
            await onSubmit(contentData)
        } catch (error) {
            console.error("Error submitting content:", error)
            setErrors({
                submit: error.message || "Failed to add content. Please try again.",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-500" />
                    <span className="text-red-700">{errors.submit}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label htmlFor="content-title" className="block text-sm font-medium text-gray-700 mb-2">
                        Content Title*
                    </label>
                    <input
                        type="text"
                        id="content-title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                        placeholder="Enter content title"
                        disabled={isLoading}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="content-type" className="block text-sm font-medium text-gray-700 mb-2">
                        Content Type*
                    </label>
                    <select
                        id="content-type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        disabled={isLoading}
                    >
                        <option value="video">YouTube Video</option>
                        <option value="article">Article</option>
                        <option value="quiz">Quiz</option>
                        <option value="exercise">Exercise</option>
                        <option value="project">Project</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="content-duration" className="block text-sm font-medium text-gray-700 mb-2">
                        Duration*
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="content-duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.duration ? "border-red-300 bg-red-50" : "border-gray-300"
                                } ${isProcessing ? "bg-gray-50" : ""}`}
                            placeholder="e.g. 45 min"
                            disabled={isLoading || (isProcessing && formData.type === "video")}
                        />
                        {isProcessing && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Loader2 size={16} className="animate-spin text-blue-500" />
                            </div>
                        )}
                    </div>
                    {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                    {formData.type === "video" && videoId && (
                        <p className="mt-1 text-xs text-gray-500">
                            {isProcessing ? "Fetching duration..." : "Duration auto-detected from video"}
                        </p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="content-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="content-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter content description"
                        disabled={isLoading}
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is-preview"
                            name="isPreview"
                            checked={formData.isPreview}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            disabled={isLoading}
                        />
                        <label htmlFor="is-preview" className="ml-2 block text-sm text-gray-700">
                            Make this content available as a preview
                        </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Preview content is accessible to non-enrolled students</p>
                </div>

                {/* Video specific fields */}
                {formData.type === "video" && (
                    <div className="md:col-span-2">
                        <label htmlFor="video-url" className="block text-sm font-medium text-gray-700 mb-2">
                            YouTube Video URL*
                        </label>
                        <div className="flex">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    id="video-url"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.videoUrl ? "border-red-300 bg-red-50" : "border-gray-300"
                                        }`}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    disabled={isLoading}
                                />
                                {errors.videoUrl && <p className="mt-1 text-sm text-red-600">{errors.videoUrl}</p>}
                            </div>
                            <div className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg flex items-center">
                                <Youtube size={20} className="text-red-600" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Article specific fields */}
                {formData.type === "article" && (
                    <div className="md:col-span-2">
                        <label htmlFor="article-content" className="block text-sm font-medium text-gray-700 mb-2">
                            Article Content*
                        </label>
                        <textarea
                            id="article-content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="8"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.content ? "border-red-300 bg-red-50" : "border-gray-300"
                                }`}
                            placeholder="Enter article content"
                            disabled={isLoading}
                        ></textarea>
                        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                    </div>
                )}

                {/* Quiz specific fields */}
                {formData.type === "quiz" && (
                    <>
                        <div>
                            <label htmlFor="quiz-questions" className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Questions*
                            </label>
                            <input
                                type="number"
                                id="quiz-questions"
                                name="questions"
                                value={formData.questions}
                                onChange={handleChange}
                                min="1"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.questions ? "border-red-300 bg-red-50" : "border-gray-300"
                                    }`}
                                placeholder="e.g. 10"
                                disabled={isLoading}
                            />
                            {errors.questions && <p className="mt-1 text-sm text-red-600">{errors.questions}</p>}
                        </div>
                        <div>
                            <label htmlFor="quiz-passing-score" className="block text-sm font-medium text-gray-700 mb-2">
                                Passing Score (%)*
                            </label>
                            <input
                                type="number"
                                id="quiz-passing-score"
                                name="passingScore"
                                value={formData.passingScore}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.passingScore ? "border-red-300 bg-red-50" : "border-gray-300"
                                    }`}
                                placeholder="e.g. 70"
                                disabled={isLoading}
                            />
                            {errors.passingScore && <p className="mt-1 text-sm text-red-600">{errors.passingScore}</p>}
                        </div>
                    </>
                )}

                {/* Exercise and Project specific fields */}
                {(formData.type === "exercise" || formData.type === "project") && (
                    <>
                        <div className="md:col-span-2">
                            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                                Instructions*
                            </label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                rows="4"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.instructions ? "border-red-300 bg-red-50" : "border-gray-300"
                                    }`}
                                placeholder="Enter detailed instructions"
                                disabled={isLoading}
                            ></textarea>
                            {errors.instructions && <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Resources</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.resources.map((resource, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2 text-sm"
                                    >
                                        {resource}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveResource(resource)}
                                            className="text-blue-600 hover:text-blue-800"
                                            disabled={isLoading}
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={newResource}
                                    onChange={(e) => setNewResource(e.target.value)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Add a resource (e.g. starter-files.zip)"
                                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddResource())}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddResource}
                                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg flex items-center disabled:opacity-50 transition-colors"
                                    disabled={isLoading}
                                >
                                    <Check size={16} />
                                </button>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Add files or links that students will need</p>
                        </div>
                    </>
                )}
            </div>

            {formData.type === "video" && videoId && (
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Video Preview</label>
                    <div className="relative aspect-video w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={formData.videoThumbnail || "/placeholder.svg"}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback to standard quality thumbnail if maxresdefault is not available
                                e.target.src = `https://img.youtube.com/vi/${videoId}/0.jpg`
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full">
                                <Youtube size={32} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                >
                    <X size={16} />
                    <span>Cancel</span>
                </button>
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:bg-green-400"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            <span>Add Content</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

export default ContentForm
