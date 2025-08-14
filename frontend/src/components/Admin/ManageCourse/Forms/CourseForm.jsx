"use client"

import { useState } from "react"
import { Save, X, Upload, Loader2, Tag, Plus, AlertCircle, Eye, FileText } from "lucide-react"

const CourseForm = ({
    course,
    onSubmit,
    onCancel,
    isEditing = false,
    isLoading = false,
    showPublishOptions = true,
}) => {
    const [formData, setFormData] = useState({
        title: course?.title || "",
        slug: course?.slug || "",
        description: course?.description || "",
        price: course?.price || "",
        duration: course?.duration || "",
        level: course?.level || "Beginner",
        category: course?.category || "",
        thumbnailUrl: course?.thumbnailUrl || "",
        status: course?.status || "draft",
        instructor: course?.instructor || {
            name: "",
            email: "",
            bio: "",
            avatarUrl: "",
        },
        tags: course?.tags || [],
    })

    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnailUrl || "")
    const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false)
    const [errors, setErrors] = useState({})
    const [newTag, setNewTag] = useState("")

    // ImgBB API configuration
    const IMGBB_API_KEY = "a616b7cb4177b6d22010843ec1f12500" // Replace with your actual ImgBB API key

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name.includes(".")) {
            // Handle nested objects like instructor.name
            const [parent, child] = name.split(".")
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value,
                },
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            })
        }
    }

    const uploadToImgBB = async (file) => {
        const formData = new FormData()
        formData.append("image", file)

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to upload image to ImgBB")
            }

            const data = await response.json()

            if (data.success) {
                return data.data.url
            } else {
                throw new Error("ImgBB upload failed")
            }
        } catch (error) {
            console.error("ImgBB upload error:", error)
            throw new Error("Failed to upload image. Please try again.")
        }
    }

    const handleThumbnailChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            setErrors({
                ...errors,
                thumbnailUrl: "File size must be less than 2MB",
            })
            return
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setErrors({
                ...errors,
                thumbnailUrl: "Please select a valid image file",
            })
            return
        }

        // Clear any existing errors
        if (errors.thumbnailUrl) {
            setErrors({
                ...errors,
                thumbnailUrl: null,
            })
        }

        // Show preview immediately
        const reader = new FileReader()
        reader.onload = () => {
            setThumbnailPreview(reader.result)
        }
        reader.readAsDataURL(file)
        setThumbnailFile(file)

        // Upload to ImgBB
        try {
            setIsUploadingThumbnail(true)
            const uploadedUrl = await uploadToImgBB(file)

            // Update form data with the uploaded URL
            setFormData({
                ...formData,
                thumbnailUrl: uploadedUrl,
            })

            // Update preview with the uploaded URL
            setThumbnailPreview(uploadedUrl)

            console.log("Image uploaded successfully:", uploadedUrl)
        } catch (error) {
            console.error("Upload error:", error)
            setErrors({
                ...errors,
                thumbnailUrl: error.message,
            })

            // Reset file and preview on error
            setThumbnailFile(null)
            setThumbnailPreview(course?.thumbnailUrl || "")
        } finally {
            setIsUploadingThumbnail(false)
        }
    }

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag.trim()],
            })
            setNewTag("")
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove),
        })
    }

    const generateSlug = () => {
        if (formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, "")
                .replace(/\s+/g, "-")

            setFormData({
                ...formData,
                slug,
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Slug is required"
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required"
        }

        if (!formData.price) {
            newErrors.price = "Price is required"
        } else if (isNaN(formData.price) || Number(formData.price) < 0) {
            newErrors.price = "Price must be a valid number"
        }

        if (!formData.duration.trim()) {
            newErrors.duration = "Duration is required"
        }

        if (!formData.category.trim()) {
            newErrors.category = "Category is required"
        }

        if (!formData.instructor.name.trim()) {
            newErrors["instructor.name"] = "Instructor name is required"
        }

        if (!formData.instructor.email.trim()) {
            newErrors["instructor.email"] = "Instructor email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.instructor.email)) {
            newErrors["instructor.email"] = "Invalid email format"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e, saveAsDraft = false) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        // Check if thumbnail is still uploading
        if (isUploadingThumbnail) {
            setErrors({
                submit: "Please wait for the thumbnail to finish uploading.",
            })
            return
        }

        try {
            const finalFormData = {
                ...formData,
                price: Number(formData.price),
                status: saveAsDraft ? "draft" : formData.status,
                ...(isEditing && {
                    _id: course._id,
                    contents: course.contents,
                    enrollmentCount: course.enrollmentCount,
                    rating: course.rating,
                    reviewCount: course.reviewCount,
                    createdAt: course.createdAt,
                }),
            }

            console.log("Course Form Data:", finalFormData)
            await onSubmit(finalFormData, saveAsDraft)
        } catch (error) {
            console.error("Error submitting form:", error)
            setErrors({
                submit: error.message || "Failed to save course. Please try again.",
            })
        }
    }

    const removeThumbnail = () => {
        setThumbnailPreview("")
        setThumbnailFile(null)
        setFormData({
            ...formData,
            thumbnailUrl: "",
        })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            {errors.submit && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-500" />
                    <span className="text-red-700">{errors.submit}</span>
                </div>
            )}

            {/* Course Status Section */}
            {showPublishOptions && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-blue-900 mb-3">Publication Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="status"
                                    value="draft"
                                    checked={formData.status === "draft"}
                                    onChange={handleChange}
                                    className="text-blue-600"
                                />
                                <FileText size={16} className="text-gray-600" />
                                <span className="text-sm font-medium">Draft</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="status"
                                    value="published"
                                    checked={formData.status === "published"}
                                    onChange={handleChange}
                                    className="text-blue-600"
                                />
                                <Eye size={16} className="text-gray-600" />
                                <span className="text-sm font-medium">Published</span>
                            </label>
                        </div>
                        <p className="text-xs text-blue-600">
                            {formData.status === "published"
                                ? "Course is visible to students and available for enrollment"
                                : "Course is hidden from students and not available for enrollment"}
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title*
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={generateSlug}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                        placeholder="Enter course title"
                        disabled={isLoading}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug*
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className={`flex-1 px-4 py-3 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.slug ? "border-red-300 bg-red-50" : "border-gray-300"
                                }`}
                            placeholder="course-url-slug"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={generateSlug}
                            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-lg border border-l-0 border-gray-300 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            Generate
                        </button>
                    </div>
                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                    <p className="mt-1 text-xs text-gray-500">This will be used in the course URL</p>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)*
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.price ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                        placeholder="99.99"
                        disabled={isLoading}
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>

                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                        Duration*
                    </label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.duration ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                        placeholder="e.g. 8 weeks"
                        disabled={isLoading}
                    />
                    {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                </div>

                <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level*
                    </label>
                    <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        disabled={isLoading}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category*
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.category ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                        placeholder="e.g. Web Development"
                        disabled={isLoading}
                    />
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description*
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.description ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                        placeholder="Enter course description"
                        disabled={isLoading}
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {formData.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2 text-sm"
                            >
                                <Tag size={12} />
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
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
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Add a tag"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg flex items-center disabled:opacity-50 transition-colors"
                            disabled={isLoading}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Press Enter or click the plus button to add a tag</p>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Instructor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="instructor.name" className="block text-sm font-medium text-gray-700 mb-2">
                            Instructor Name*
                        </label>
                        <input
                            type="text"
                            id="instructor.name"
                            name="instructor.name"
                            value={formData.instructor.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors["instructor.name"] ? "border-red-300 bg-red-50" : "border-gray-300"
                                }`}
                            placeholder="Enter instructor name"
                            disabled={isLoading}
                        />
                        {errors["instructor.name"] && <p className="mt-1 text-sm text-red-600">{errors["instructor.name"]}</p>}
                    </div>

                    <div>
                        <label htmlFor="instructor.email" className="block text-sm font-medium text-gray-700 mb-2">
                            Instructor Email*
                        </label>
                        <input
                            type="email"
                            id="instructor.email"
                            name="instructor.email"
                            value={formData.instructor.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors["instructor.email"] ? "border-red-300 bg-red-50" : "border-gray-300"
                                }`}
                            placeholder="Enter instructor email"
                            disabled={isLoading}
                        />
                        {errors["instructor.email"] && <p className="mt-1 text-sm text-red-600">{errors["instructor.email"]}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="instructor.bio" className="block text-sm font-medium text-gray-700 mb-2">
                            Instructor Bio
                        </label>
                        <textarea
                            id="instructor.bio"
                            name="instructor.bio"
                            value={formData.instructor.bio}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Enter instructor bio"
                            disabled={isLoading}
                        ></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="instructor.avatarUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            Instructor Avatar URL
                        </label>
                        <input
                            type="text"
                            id="instructor.avatarUrl"
                            name="instructor.avatarUrl"
                            value={formData.instructor.avatarUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="https://example.com/avatar.jpg"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Course Thumbnail</label>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="thumbnail"
                                className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isLoading || isUploadingThumbnail
                                    ? "opacity-50 cursor-not-allowed border-gray-300 bg-gray-50"
                                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {isUploadingThumbnail ? (
                                        <>
                                            <Loader2 className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
                                            <p className="mb-2 text-sm text-blue-600">Uploading to ImgBB...</p>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                                            <p className="text-xs text-blue-500 mt-1">Will be uploaded to ImgBB automatically</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleThumbnailChange}
                                    disabled={isLoading || isUploadingThumbnail}
                                />
                            </label>
                        </div>
                        {errors.thumbnailUrl && <p className="mt-2 text-sm text-red-600">{errors.thumbnailUrl}</p>}
                    </div>

                    {(thumbnailPreview || formData.thumbnailUrl) && (
                        <div className="relative">
                            <img
                                src={thumbnailPreview || formData.thumbnailUrl || "/placeholder.svg"}
                                alt="Thumbnail preview"
                                className="w-40 h-40 object-cover rounded-lg border border-gray-300"
                            />
                            {isUploadingThumbnail && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={removeThumbnail}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors disabled:opacity-50"
                                disabled={isLoading || isUploadingThumbnail}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>
                {formData.thumbnailUrl && <p className="mt-2 text-xs text-green-600">✓ Image uploaded successfully to ImgBB</p>}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={isLoading || isUploadingThumbnail}
                >
                    <X size={16} />
                    <span>Cancel</span>
                </button>

                {showPublishOptions && (
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        disabled={isLoading || isUploadingThumbnail}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <FileText size={16} />
                                <span>Save as Draft</span>
                            </>
                        )}
                    </button>
                )}

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-blue-400"
                    disabled={isLoading || isUploadingThumbnail}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            <span>{isEditing ? "Update Course" : "Save Course"}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

export default CourseForm
