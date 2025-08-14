"use client"

import { DollarSign, Users, Star, Tag, FolderOpen, ChevronRight, Calendar } from "lucide-react"
import { FaGraduationCap } from "react-icons/fa"

const CourseSelectionCard = ({ course, onClick, showResourceCount = true }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const getTotalResources = () => {
        if (!course.contents) return 0
        return course.contents.reduce((total, content) => total + (content.resources?.length || 0), 0)
    }

    return (
        <div
            onClick={() => onClick(course)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
        >
            <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Course Thumbnail */}
                    <div className="flex-shrink-0">
                        {course.thumbnailUrl ? (
                            <img
                                src={course.thumbnailUrl || "/placeholder.svg"}
                                alt={course.title}
                                className="w-full sm:w-24 h-24 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FaGraduationCap className="w-6 h-6 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {course.title}
                            </h3>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {course.level || "Beginner"}
                            </span>
                            {course.category && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                                    <Tag size={10} />
                                    {course.category}
                                </span>
                            )}
                            {course.status && (
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${course.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {course.status}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                            <div className="flex items-center gap-1 text-gray-600">
                                <DollarSign size={12} className="text-green-600" />
                                <span>${course.price || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                                <Users size={12} className="text-purple-600" />
                                <span>{course.enrollmentCount || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                                <FolderOpen size={12} className="text-orange-600" />
                                <span>{course.contents?.length || 0} content</span>
                            </div>
                            {showResourceCount && (
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Tag size={12} className="text-gray-500" />
                                    <span>{getTotalResources()} resources</span>
                                </div>
                            )}
                            {course.rating > 0 && (
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Star size={12} className="text-yellow-500" />
                                    <span>{course.rating.toFixed(1)}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1 text-gray-600">
                                <Calendar size={12} className="text-blue-500" />
                                <span>{formatDate(course.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Effect Indicator */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </div>
    )
}

export default CourseSelectionCard
