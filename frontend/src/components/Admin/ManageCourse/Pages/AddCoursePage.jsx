"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, AlertCircle } from "lucide-react"
import CourseApiClient from "../api-client"
import CourseForm from "../Forms/CourseForm"

const AddCoursePage = () => {
    const navigate = useNavigate()
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

    const handleAddCourse = async (newCourse) => {
        try {
            setIsLoading(true)
            setError(null)
            const createdCourse = await apiClient.createCourse(newCourse)
            showNotification("Course created successfully!")
            console.log("New Course Added:", createdCourse)
            navigate("/admin-dashboard/courses/list")
        } catch (err) {
            console.error("Error adding course:", err)
            const errorMessage = err.message || "Failed to add course. Please try again."
            setError(errorMessage)
            showNotification(errorMessage, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        navigate("/admin-dashboard/courses/list")
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/admin-dashboard/courses/list")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Courses</span>
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Course</h1>
                        <p className="text-gray-600 mt-1">Create a new course for your students</p>
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

                        <CourseForm onSubmit={handleAddCourse} onCancel={handleCancel} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCoursePage
