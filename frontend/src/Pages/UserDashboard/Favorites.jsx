"use client"

import { ArrowRight, Heart, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EmptyState from "../../components/Common/EmptyState"
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import useAuth from "../../hooks/useAuth"

const Favorites = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user?.email) {
            fetchFavorites()
        }
    }, [user])

    const fetchFavorites = async () => {
        try {
            setLoading(true)

            const response = await fetch(`http://localhost:5000/api/user/favorites/${user.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            if (result.success) {
                setFavorites(result.data || [])
            } else {
                throw new Error(result.message || "Failed to fetch favorites")
            }
        } catch (error) {
            console.error("Error fetching favorites:", error)
            setFavorites([])
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveFromFavorites = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/favorites/remove`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: user.email,
                    courseId: courseId,
                }),
            })

            if (response.ok) {
                setFavorites((prev) => prev.filter((course) => course._id !== courseId))
                alert("Removed from favorites")
            }
        } catch (error) {
            console.error("Error removing from favorites:", error)
            alert("Failed to remove from favorites")
        }
    }

    const handleCourseView = (course) => {
        navigate(`/course-details/${course._id}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="xl" color="red" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Loading Favorites</h3>
                    <p className="text-gray-600">Fetching your favorite courses...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorite Courses ({favorites.length})</h1>
                            <p className="text-gray-600">Your bookmarked courses for quick access</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {favorites.length === 0 ? (
                    <EmptyState
                        icon={Heart}
                        title="No favorites yet"
                        description="Add courses to your favorites to access them quickly"
                        actionText="Browse Courses"
                        onAction={() => navigate("/courses")}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((course) => (
                            <div
                                key={course._id}
                                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                            >
                                <img
                                    src={course.thumbnailUrl || "/placeholder.svg?height=200&width=350"}
                                    alt={course.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{course.instructor?.name}</p>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Star size={14} className="text-yellow-500 fill-current" />
                                            <span>{course.rating}</span>
                                        </div>
                                        <div className="text-gray-900 font-bold">{course.price === 0 ? "Free" : `৳${course.price}`}</div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleCourseView(course)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            <ArrowRight size={16} />
                                            View Course
                                        </button>
                                        <button
                                            onClick={() => handleRemoveFromFavorites(course._id)}
                                            className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                                        >
                                            <Heart size={16} className="fill-current" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorites
