"use client"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import CourseForm from "./course-form"
import CourseApiClient from "../api/course-api-client"

const AddCourse = ({ onClose, onCourseAdded }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const apiClient = new CourseApiClient()

    const showNotification = (message, type = "success") => {
        const notification = document.createElement("div")
        notification.className = `fixed top-4 right-4 p-4 rounded-md z-50 ${type === "success" ? "bg-green-600" : "bg-red-600"
            } text-white`
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
            onCourseAdded(createdCourse)
            onClose()
        } catch (err) {
            console.error("Error adding course:", err)
            const errorMessage = err.message || "Failed to add course. Please try again."
            setError(errorMessage)
            showNotification(errorMessage, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-100">Add New Course</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-200 p-2" disabled={isLoading}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-6 bg-red-900/30 border border-red-700 p-4 rounded-md flex items-center gap-2">
                            <AlertCircle size={20} className="text-red-400" />
                            <span className="text-red-300">{error}</span>
                        </div>
                    )}

                    <CourseForm onSubmit={handleAddCourse} onCancel={onClose} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}

export default AddCourse
