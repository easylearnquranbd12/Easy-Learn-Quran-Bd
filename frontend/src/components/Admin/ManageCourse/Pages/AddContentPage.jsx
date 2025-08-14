"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, AlertCircle } from "lucide-react"
import CourseApiClient from "../api-client"
import ContentForm from "../ContentForm"

const AddContentPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const course = location.state?.course
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const apiClient = new CourseApiClient()

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

    const handleAddContent = async (newContent) => {
        if (!course) {
            setError("No course selected. Please select a course first.")
            return
        }

        try {
            setIsLoading(true)
            setError(null)
            const result = await apiClient.addContent(course._id, newContent)
            showNotification("Content added successfully!")
            console.log("Content Added to Course:", result)
            navigate(`/admin-dashboard/courses/details/${course._id}`, { state: { course: result.course } })
        } catch (err) {
            console.error("Error adding content:", err)
            const errorMessage = err.message || "Failed to add content. Please try again."
            setError(errorMessage)
            showNotification(errorMessage, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        if (course) {
            navigate(`/admin-dashboard/courses/details/${course._id}`, { state: { course } })
        } else {
            navigate("/admin-dashboard/courses/list")
        }
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center">
                            <AlertCircle size={48} className="text-yellow-500 mx-auto mb-4" />
                            <p className="text-lg text-yellow-700 mb-2">No Course Selected</p>
                            <p className="text-gray-600 mb-4">Please select a course to add content to.</p>
                            <button
                                onClick={() => navigate("/admin-dashboard/courses/list")}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Select Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Course</span>
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add Content</h1>
                        <p className="text-gray-600 mt-1">Add new content to "{course.title}"</p>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-2">
                                <AlertCircle size={20} className="text-red-500" />
                                <span className="text-red-700">{error}</span>
                            </div>
                        )}

                        <ContentForm onSubmit={handleAddContent} onCancel={handleCancel} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddContentPage
