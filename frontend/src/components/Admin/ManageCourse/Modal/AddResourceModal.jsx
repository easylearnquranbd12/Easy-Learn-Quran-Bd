"use client"

import { useState } from "react"
import { X, Upload, Loader2, AlertCircle, FileText, Video, ImageIcon, Archive, Link } from "lucide-react"
import CourseApiClient from "../api-client"
import CloudinaryUploadService from "../services/cloudinary-upload-service"

const AddResourceModal = ({ course, content, onClose, onResourceAdded }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "document", // document, video, image, archive, link
        url: "",
    })
    const [selectedFile, setSelectedFile] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [errors, setErrors] = useState({})
    const [dragActive, setDragActive] = useState(false)

    const apiClient = new CourseApiClient()
    const cloudinaryService = new CloudinaryUploadService()

    const resourceTypes = [
        { value: "document", label: "Document", icon: FileText, accept: ".pdf,.doc,.docx,.txt,.rtf" },
        { value: "video", label: "Video", icon: Video, accept: ".mp4,.avi,.mov,.wmv,.flv" },
        { value: "image", label: "Image", icon: ImageIcon, accept: ".jpg,.jpeg,.png,.gif,.webp" },
        { value: "archive", label: "Archive", icon: Archive, accept: ".zip,.rar,.7z,.tar,.gz" },
        { value: "link", label: "External Link", icon: Link, accept: "" },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            })
        }
    }

    const handleFileSelect = (file) => {
        if (!file) return

        // Validate file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
            setErrors({
                ...errors,
                file: "File size must be less than 50MB",
            })
            return
        }

        // Auto-detect resource type based on file
        let detectedType = "document"
        const fileType = file.type.toLowerCase()

        if (fileType.startsWith("video/")) {
            detectedType = "video"
        } else if (fileType.startsWith("image/")) {
            detectedType = "image"
        } else if (fileType.includes("zip") || fileType.includes("rar") || fileType.includes("archive")) {
            detectedType = "archive"
        }

        setSelectedFile(file)
        setFormData({
            ...formData,
            name: formData.name || file.name,
            type: detectedType,
        })

        // Clear file error
        if (errors.file) {
            setErrors({
                ...errors,
                file: null,
            })
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        handleFileSelect(file)
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0])
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Resource name is required"
        }

        if (formData.type === "link") {
            if (!formData.url.trim()) {
                newErrors.url = "URL is required for external links"
            } else if (!/^https?:\/\/.+/.test(formData.url)) {
                newErrors.url = "Please enter a valid URL (starting with http:// or https://)"
            }
        } else {
            if (!selectedFile) {
                newErrors.file = "Please select a file to upload"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            setIsUploading(true)
            let resourceUrl = formData.url

            // Upload file to Cloudinary if not a link
            if (formData.type !== "link" && selectedFile) {
                const uploadResult = await cloudinaryService.uploadFile(
                    selectedFile,
                    {
                        folder: `courses/${course._id}/content/${content.id}/resources`,
                        resource_type: "auto",
                    },
                    (progress) => {
                        setUploadProgress(progress)
                    },
                )
                resourceUrl = uploadResult.secure_url
            }

            // Prepare resource data
            const resourceData = {
                name: formData.name,
                description: formData.description,
                type: formData.type,
                url: resourceUrl,
                size: selectedFile ? formatFileSize(selectedFile.size) : null,
                uploadedAt: new Date().toISOString(),
            }

            // Add resource to content
            const result = await apiClient.addContentResource(course._id, content.id, resourceData)

            console.log("Resource added:", resourceData)
            onResourceAdded(result.course)
        } catch (err) {
            console.error("Error adding resource:", err)
            const errorMessage = err.message || "Failed to add resource. Please try again."
            setErrors({
                submit: errorMessage,
            })
            showNotification(errorMessage, "error")
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    const selectedResourceType = resourceTypes.find((type) => type.value === formData.type)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Add Resource</h2>
                            <p className="text-gray-600 mt-1">Add a resource to "{content.title}"</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2" disabled={isUploading}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {errors.submit && (
                        <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-2">
                            <AlertCircle size={20} className="text-red-500" />
                            <span className="text-red-700">{errors.submit}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Resource Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Resource Type*</label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {resourceTypes.map((type) => {
                                    const IconComponent = type.icon
                                    return (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: type.value })}
                                            className={`p-3 border rounded-lg text-center transition-colors ${formData.type === type.value
                                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                                : "border-gray-300 hover:border-gray-400"
                                                }`}
                                            disabled={isUploading}
                                        >
                                            <IconComponent size={24} className="mx-auto mb-2" />
                                            <span className="text-sm font-medium">{type.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Resource Name */}
                        <div>
                            <label htmlFor="resource-name" className="block text-sm font-medium text-gray-700 mb-2">
                                Resource Name*
                            </label>
                            <input
                                type="text"
                                id="resource-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                                    }`}
                                placeholder="Enter resource name"
                                disabled={isUploading}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Resource Description */}
                        <div>
                            <label htmlFor="resource-description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="resource-description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="Enter resource description (optional)"
                                disabled={isUploading}
                            ></textarea>
                        </div>

                        {/* File Upload or URL Input */}
                        {formData.type === "link" ? (
                            <div>
                                <label htmlFor="resource-url" className="block text-sm font-medium text-gray-700 mb-2">
                                    External URL*
                                </label>
                                <input
                                    type="url"
                                    id="resource-url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.url ? "border-red-300 bg-red-50" : "border-gray-300"
                                        }`}
                                    placeholder="https://example.com/resource"
                                    disabled={isUploading}
                                />
                                {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload File* {selectedResourceType && `(${selectedResourceType.accept})`}
                                </label>

                                {!selectedFile ? (
                                    <div
                                        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                                            ? "border-blue-500 bg-blue-50"
                                            : errors.file
                                                ? "border-red-300 bg-red-50"
                                                : "border-gray-300 hover:border-gray-400"
                                            }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            accept={selectedResourceType?.accept}
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            disabled={isUploading}
                                        />
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-lg font-medium text-gray-900 mb-2">Drop your file here, or click to browse</p>
                                        <p className="text-sm text-gray-600">Maximum file size: 50MB</p>
                                    </div>
                                ) : (
                                    <div className="border border-gray-300 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {selectedResourceType && <ImageIcon size={24} className="text-blue-600" />}
                                                <div>
                                                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                                                    <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFile(null)
                                                    setFormData({ ...formData, name: "" })
                                                }}
                                                className="text-red-600 hover:text-red-700 p-1"
                                                disabled={isUploading}
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                            </div>
                        )}

                        {/* Upload Progress */}
                        {isUploading && uploadProgress > 0 && (
                            <div>
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                disabled={isUploading}
                            >
                                <X size={16} />
                                <span>Cancel</span>
                            </button>
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-blue-400"
                                disabled={isUploading}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={16} />
                                        <span>Add Resource</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddResourceModal
