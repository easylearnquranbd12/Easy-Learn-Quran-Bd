"use client"

import {
    Award,
    BarChart3,
    Bell,
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    Heart,
    Play,
    RefreshCw,
    Settings,
    Target,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorMessage from "../../components/Common/ErrorMessage"
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import useAuth from "../../hooks/useAuth"

const UserDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const response = await fetch(`http://localhost:5000/api/user/dashboard/${user.email}`, {
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
        setDashboardData(result.data)
      } else {
        throw new Error(result.message || "Failed to fetch dashboard data")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError(error.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    fetchDashboardData(true)
  }

  const handleCourseView = (course) => {
    navigate(`/course-details/${course._id}`)
  }

  const handleContinueLearning = (course) => {
    navigate(`/course-player/${course._id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Loading Dashboard</h3>
          <p className="text-gray-600">Preparing your learning experience...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={() => fetchDashboardData()} className="max-w-md" />
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ErrorMessage message="No dashboard data available" onRetry={() => fetchDashboardData()} className="max-w-md" />
      </div>
    )
  }

  const { stats, enrolledCourses, recentActivity, user: userData } = dashboardData
  const progressPercentage = stats.totalCourses ? Math.round((stats.completedCourses / stats.totalCourses) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Dashboard</h1>
                <p className="text-gray-600">Welcome back, {userData?.name || user?.displayName || "Student"}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-gray-900 text-sm font-medium">{progressPercentage}%</span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Enrolled Courses",
              value: stats.totalCourses,
              icon: BookOpen,
              color: "blue",
              change: "+2 this month",
            },
            {
              label: "Completed",
              value: stats.completedCourses,
              icon: CheckCircle,
              color: "green",
              change: "+1 this week",
            },
            {
              label: "Learning Hours",
              value: `${stats.totalHours}h`,
              icon: Clock,
              color: "purple",
              change: "+5.2h this week",
            },
            {
              label: "Certificates",
              value: stats.certificates,
              icon: Award,
              color: "yellow",
              change: "New available",
            },
          ].map((stat, index) => {
            const IconComponent = stat.icon
            const colorClasses = {
              blue: "bg-blue-600",
              green: "bg-green-600",
              purple: "bg-purple-600",
              yellow: "bg-yellow-600",
            }[stat.color]

            return (
              <div
                key={index}
                className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${colorClasses} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                  >
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Target size={20} className="text-white" />
                </div>
                Learning Journey
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Overall Progress</span>
                  <span className="text-gray-900 font-bold text-xl">{progressPercentage}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="absolute -top-8 right-0 text-gray-900 text-sm font-medium bg-blue-100 px-2 py-1 rounded-lg">
                    {stats.completedCourses} of {stats.totalCourses}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:w-64">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{stats.totalHours}</div>
                <div className="text-gray-600 text-sm">Hours Learned</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{stats.certificates}</div>
                <div className="text-gray-600 text-sm">Certificates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-white" />
              </div>
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity, index) => {
                const iconMap = { BookOpen, CheckCircle, Award, Heart }
                const IconComponent = iconMap[activity.icon] || BookOpen
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <IconComponent size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 font-medium">{activity.course}</div>
                      <div className="text-gray-600 text-sm capitalize">{activity.type}</div>
                    </div>
                    <div className="text-gray-500 text-sm">{activity.date}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Continue Learning */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Play size={16} className="text-white" />
              </div>
              Continue Learning
            </h3>
            <div className="space-y-4">
              {enrolledCourses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="group flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnailUrl || "/placeholder.svg?height=48&width=48"}
                      alt={course.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Play size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium line-clamp-1">{course.title}</div>
                    <div className="text-gray-600 text-sm">{course.instructor?.name}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  {course?.status === "active" ? (
                    <button
                      onClick={() => handleContinueLearning(course)}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <Play size={16} className="text-white" />
                    </button>
                  ) : (
                    <button className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-sm" disabled>
                      Pending
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate("/user-dashboard/my-courses")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Eye size={16} />
                View All Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
