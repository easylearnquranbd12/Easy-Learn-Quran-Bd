"use client"

import { BookOpen, CheckCircle, Star, Trophy, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/Common/LoadingSpinner"

const Achievements = () => {
    const [achievements, setAchievements] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({ email: "test@example.com" }) // Mock user data

    useEffect(() => {
        fetchAchievements()
    }, [])

    const fetchAchievements = async () => {
        try {
            setLoading(true)

            const response = await fetch(`http://localhost:5000/api/user/achievements/${user.email}`, {
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
                setAchievements(result.data || [])
            } else {
                throw new Error(result.message || "Failed to fetch achievements")
            }
        } catch (error) {
            console.error("Error fetching achievements:", error)
            // Fallback to empty array if API fails
            setAchievements([])
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="xl" color="yellow" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Loading Achievements</h3>
                    <p className="text-gray-600">Fetching your accomplishments...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Achievements</h1>
                        <p className="text-gray-600">Celebrate your learning milestones and accomplishments</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement) => {
                        const iconMap = { Trophy, BookOpen, Zap, Star }
                        const IconComponent = iconMap[achievement.icon] || Trophy
                        return (
                            <div
                                key={achievement.id}
                                className={`group relative bg-white rounded-xl p-8 border transition-all duration-200 hover:shadow-md ${achievement.earned
                                    ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div className="text-center">
                                    <div
                                        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-200 group-hover:scale-110 ${achievement.earned ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg" : "bg-gray-100"
                                            }`}
                                    >
                                        <IconComponent size={32} className={achievement.earned ? "text-white" : "text-gray-400"} />
                                    </div>
                                    <h3 className={`font-bold text-lg mb-3 ${achievement.earned ? "text-yellow-700" : "text-gray-400"}`}>
                                        {achievement.title}
                                    </h3>
                                    {achievement.earned && achievement.date && (
                                        <p className="text-gray-600 text-sm mb-2">
                                            Earned on {new Date(achievement.date).toLocaleDateString()}
                                        </p>
                                    )}
                                    {!achievement.earned && (
                                        <p className="text-gray-500 text-sm">Keep learning to unlock this achievement!</p>
                                    )}
                                </div>
                                {achievement.earned && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle size={16} className="text-white" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Achievements
