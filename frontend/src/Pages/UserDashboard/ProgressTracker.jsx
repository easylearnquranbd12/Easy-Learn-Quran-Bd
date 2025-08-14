"use client"

import {
    AlertCircle,
    ArrowUp,
    Award,
    BarChart3,
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    Crown,
    Edit3,
    Flame,
    Gift,
    Medal,
    Play,
    Settings,
    Star,
    Target,
    TrendingUp,
    Trophy,
    Zap,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ProgressTracker = ({ userEmail }) => {
    const navigate = useNavigate()
    const [progressData, setProgressData] = useState(null)
    const [weeklyGoal, setWeeklyGoal] = useState(300) // minutes
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedTimeframe, setSelectedTimeframe] = useState("week")
    const [showGoalEditor, setShowGoalEditor] = useState(false)

    useEffect(() => {
        if (userEmail) {
            fetchProgressData()
        }
    }, [userEmail])

    const fetchProgressData = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`http://localhost:5000/api/user/dashboard/${userEmail}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            if (result.success) {
                setProgressData(result.data)
            } else {
                throw new Error(result.message || "Failed to fetch progress data")
            }
        } catch (error) {
            console.error("Error fetching progress data:", error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateWeeklyGoal = async (newGoal) => {
        try {
            setWeeklyGoal(newGoal)
            setShowGoalEditor(false)
            // You can implement the API call here
        } catch (error) {
            console.error("Error updating weekly goal:", error)
        }
    }

    const calculateWeeklyProgress = () => {
        // This would calculate based on actual learning time this week
        const simulatedWeeklyMinutes = Math.floor(Math.random() * weeklyGoal)
        return Math.min(simulatedWeeklyMinutes, weeklyGoal)
    }

    const getAchievementIcon = (iconName) => {
        const icons = { Trophy, BookOpen, Zap, Star, Award, CheckCircle, Medal, Crown, Gift }
        return icons[iconName] || Trophy
    }

    const getStreakData = () => {
        return {
            current: 7,
            longest: 15,
            thisWeek: 5,
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                        <div
                            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin mx-auto"
                            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                        ></div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Loading Progress</h3>
                    <p className="text-purple-200">Analyzing your learning journey...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Failed to load progress</h2>
                    <p className="text-purple-200 mb-6">{error}</p>
                    <button
                        onClick={fetchProgressData}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    const { stats, achievements, recentActivity, enrolledCourses } = progressData
    const weeklyProgress = calculateWeeklyProgress()
    const weeklyGoalProgress = (weeklyProgress / weeklyGoal) * 100
    const overallProgress = stats.totalCourses > 0 ? (stats.completedCourses / stats.totalCourses) * 100 : 0
    const streakData = getStreakData()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Enhanced Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <BarChart3 size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Progress Tracker</h1>
                            <p className="text-purple-200">Monitor your learning journey and achievements</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={selectedTimeframe}
                            onChange={(e) => setSelectedTimeframe(e.target.value)}
                            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400"
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                            <option value="all">All Time</option>
                        </select>
                        <button className="p-2 text-purple-200 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Enhanced Overall Progress Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Target size={20} className="text-white" />
                        </div>
                        Learning Progress Overview
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Course Completion */}
                        <div className="group bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                        <BookOpen size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-purple-200 text-sm font-medium">Courses</div>
                                        <div className="text-white text-xl font-bold">
                                            {stats.completedCourses}/{stats.totalCourses}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-green-400 text-sm flex items-center gap-1">
                                    <ArrowUp size={14} />
                                    <span>+2</span>
                                </div>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${overallProgress}%` }}
                                ></div>
                            </div>
                            <span className="text-purple-300 text-sm">{Math.round(overallProgress)}% complete</span>
                        </div>

                        {/* Study Time */}
                        <div className="group bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <Clock size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-purple-200 text-sm font-medium">Study Time</div>
                                        <div className="text-white text-xl font-bold">{stats.totalHours}h</div>
                                    </div>
                                </div>
                                <div className="text-green-400 text-sm flex items-center gap-1">
                                    <ArrowUp size={14} />
                                    <span>+5.2h</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp size={14} className="text-green-400" />
                                <span className="text-green-400 text-sm">This week</span>
                            </div>
                            <span className="text-purple-300 text-sm">Total time invested</span>
                        </div>

                        {/* Learning Streak */}
                        <div className="group bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                        <Flame size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-purple-200 text-sm font-medium">Current Streak</div>
                                        <div className="text-white text-xl font-bold">{streakData.current} days</div>
                                    </div>
                                </div>
                                <div className="text-orange-400 text-sm">🔥</div>
                            </div>
                            <div className="text-purple-300 text-sm">Best: {streakData.longest} days</div>
                        </div>

                        {/* Certificates */}
                        <div className="group bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                                        <Award size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-purple-200 text-sm font-medium">Certificates</div>
                                        <div className="text-white text-xl font-bold">{stats.certificates}</div>
                                    </div>
                                </div>
                                <div className="text-green-400 text-sm flex items-center gap-1">
                                    <CheckCircle size={14} />
                                    <span>Earned</span>
                                </div>
                            </div>
                            <span className="text-purple-300 text-sm">Completion certificates</span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Weekly Goal Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <Target size={20} className="text-white" />
                            </div>
                            Weekly Learning Goal
                        </h3>
                        <button
                            onClick={() => setShowGoalEditor(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                        >
                            <Edit3 size={16} />
                            Edit Goal
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-purple-200 font-medium text-lg">Study Time Goal</span>
                                <span className="text-white text-lg font-bold">
                                    {Math.floor(weeklyProgress / 60)}h {weeklyProgress % 60}m / {Math.floor(weeklyGoal / 60)}h{" "}
                                    {weeklyGoal % 60}m
                                </span>
                            </div>

                            <div className="relative">
                                <div className="w-full bg-white/20 rounded-full h-6">
                                    <div
                                        className={`bg-gradient-to-r h-6 rounded-full transition-all duration-1000 relative overflow-hidden ${weeklyGoalProgress >= 100
                                            ? "from-green-500 to-emerald-500"
                                            : weeklyGoalProgress >= 75
                                                ? "from-blue-500 to-cyan-500"
                                                : weeklyGoalProgress >= 50
                                                    ? "from-yellow-500 to-orange-500"
                                                    : "from-purple-500 to-pink-500"
                                            }`}
                                        style={{ width: `${Math.min(weeklyGoalProgress, 100)}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="absolute -top-8 right-0 text-white text-sm font-medium bg-purple-600 px-3 py-1 rounded-lg">
                                    {Math.round(weeklyGoalProgress)}%
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-purple-300">
                                    {weeklyGoalProgress >= 100
                                        ? "🎉 Goal achieved! Keep it up!"
                                        : `${Math.round(weeklyGoalProgress)}% complete`}
                                </span>
                                {weeklyGoalProgress >= 100 && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-sm">
                                        <Trophy size={14} />
                                        <span>Achieved</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6">
                            <h4 className="text-white font-semibold mb-4">This Week</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-purple-200 text-sm">Days Active</span>
                                    <span className="text-white font-bold">{streakData.thisWeek}/7</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-purple-200 text-sm">Avg. Daily</span>
                                    <span className="text-white font-bold">{Math.round(weeklyProgress / 7)}min</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-purple-200 text-sm">Lessons</span>
                                    <span className="text-white font-bold">12</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Achievements Grid */}
                {achievements && achievements.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                                <Trophy size={20} className="text-white" />
                            </div>
                            Achievements & Milestones
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {achievements.slice(0, 9).map((achievement) => {
                                const IconComponent = getAchievementIcon(achievement.icon)
                                return (
                                    <div
                                        key={achievement.id}
                                        className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 ${achievement.earned
                                            ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 hover:border-yellow-400/50"
                                            : "bg-white/10 border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div
                                                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${achievement.earned
                                                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25"
                                                    : "bg-white/10"
                                                    }`}
                                            >
                                                <IconComponent size={24} className={achievement.earned ? "text-white" : "text-gray-400"} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-bold text-lg ${achievement.earned ? "text-yellow-300" : "text-gray-400"}`}>
                                                    {achievement.title}
                                                </h4>
                                                {achievement.earned && achievement.date && (
                                                    <p className="text-purple-200 text-sm">{new Date(achievement.date).toLocaleDateString()}</p>
                                                )}
                                            </div>
                                        </div>
                                        {achievement.earned && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                <CheckCircle size={16} className="text-white" />
                                            </div>
                                        )}
                                        {!achievement.earned && <p className="text-gray-500 text-sm">Keep learning to unlock!</p>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Enhanced Recent Activity */}
                {recentActivity && recentActivity.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <Calendar size={20} className="text-white" />
                            </div>
                            Recent Learning Activity
                        </h3>

                        <div className="space-y-4">
                            {recentActivity.slice(0, 10).map((activity, index) => {
                                const iconMap = { BookOpen, CheckCircle, Award, Star, Play }
                                const IconComponent = iconMap[activity.icon] || BookOpen

                                return (
                                    <div
                                        key={activity.id}
                                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                            <IconComponent size={20} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium">{activity.course}</div>
                                            <div className="text-purple-200 text-sm capitalize">{activity.type}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-purple-300 text-sm">{activity.date}</div>
                                            {activity.points && <div className="text-yellow-400 text-xs">+{activity.points} XP</div>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Goal Editor Modal */}
                {showGoalEditor && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md w-full">
                            <h3 className="text-xl font-bold text-white mb-6">Set Weekly Goal</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-purple-200 text-sm mb-2">Study time per week (minutes)</label>
                                    <input
                                        type="number"
                                        value={weeklyGoal}
                                        onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400"
                                        min="30"
                                        max="2520"
                                    />
                                </div>
                                <div className="text-purple-300 text-sm">That's about {Math.round(weeklyGoal / 7)} minutes per day</div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => updateWeeklyGoal(weeklyGoal)}
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200"
                                    >
                                        Save Goal
                                    </button>
                                    <button
                                        onClick={() => setShowGoalEditor(false)}
                                        className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProgressTracker
