"use client"

import { PlusCircle } from "lucide-react"
import { useState } from "react"
import AddContent from "./AddContent"
import CourseDetails from "./CourseDetails"
import CourseList from "./CourseList"
import EditCourse from "./EditCourse"

const ManageCourse = () => {
    const [currentView, setCurrentView] = useState("list")
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [courses, setCourses] = useState([])

    const handleViewDetails = (course) => {
        setSelectedCourse(course)
        setCurrentView("details")
    }

    const handleEditCourse = (course) => {
        setSelectedCourse(course)
        setCurrentView("edit")
    }

    const handleAddContent = (course) => {
        setSelectedCourse(course)
        setCurrentView("addContent")
    }

    const handleCourseAdded = (newCourse) => {
        setCourses((prev) => [...prev, newCourse])
    }

    const handleCourseUpdated = (updatedCourse) => {
        setCourses((prev) => prev.map((course) => (course._id === updatedCourse._id ? updatedCourse : course)))
        if (selectedCourse && selectedCourse._id === updatedCourse._id) {
            setSelectedCourse(updatedCourse)
        }
    }

    const handleContentAdded = (updatedCourse) => {
        setCourses((prev) => prev.map((course) => (course._id === updatedCourse._id ? updatedCourse : course)))
        if (selectedCourse && selectedCourse._id === updatedCourse._id) {
            setSelectedCourse(updatedCourse)
        }
    }

    const handleBackToList = () => {
        setCurrentView("list")
        setSelectedCourse(null)
    }

    return (
        <div className="min-h-screen bg-gray-950 p-4">
            {currentView === "list" && (
                <div>
                    <div className="max-w-6xl mx-auto mb-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-gray-100">Course Management System</h1>
                            <button
                                onClick={() => setCurrentView("add")}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                <PlusCircle size={18} />
                                <span>Add New Course</span>
                            </button>
                        </div>
                    </div>
                    <CourseList
                        onEditCourse={handleEditCourse}
                        onViewDetails={handleViewDetails}
                        onAddContent={handleAddContent}
                    />
                </div>
            )}

            {currentView === "add" && <AddCourse onClose={handleBackToList} onCourseAdded={handleCourseAdded} />}

            {currentView === "edit" && selectedCourse && (
                <EditCourse course={selectedCourse} onClose={handleBackToList} onCourseUpdated={handleCourseUpdated} />
            )}

            {currentView === "addContent" && selectedCourse && (
                <AddContent course={selectedCourse} onClose={handleBackToList} onContentAdded={handleContentAdded} />
            )}

            {currentView === "details" && selectedCourse && (
                <CourseDetails
                    course={selectedCourse}
                    onBack={handleBackToList}
                    onEdit={handleEditCourse}
                    onAddContent={handleAddContent}
                    onCourseUpdated={handleCourseUpdated}
                />
            )}
        </div>
    )
}

export default ManageCourse
