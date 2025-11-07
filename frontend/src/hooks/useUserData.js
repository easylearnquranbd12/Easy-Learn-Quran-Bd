"use client"

import { useEffect, useState } from "react"
import useAuth from "./useAuth"

const useUserData = () => {
    const { user } = useAuth()
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUserData = async () => {
        if (!user?.email) return

        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`https://learning-quiz-platfrom-paid-project-ten.vercel.app/api/user/dashboard/${user.email}`, {
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
                throw new Error(result.message || "Failed to fetch user data")
            }
        } catch (error) {
            console.error("Error fetching user data:", error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateCourseProgress = async (courseId, progress) => {
        try {
            const response = await fetch(`https://learning-quiz-platfrom-paid-project-ten.vercel.app/api/user/course-progress`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: user.email,
                    courseId,
                    progress,
                }),
            })

            if (response.ok) {
                // Refresh dashboard data
                fetchUserData()
            }
        } catch (error) {
            console.error("Error updating course progress:", error)
        }
    }

    const toggleFavorite = async (courseId) => {
        try {
            const response = await fetch(`https://learning-quiz-platfrom-paid-project-ten.vercel.app/api/user/favorites/toggle`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: user.email,
                    courseId,
                }),
            })

            if (response.ok) {
                const result = await response.json()
                return result.isFavorite
            }
        } catch (error) {
            console.error("Error toggling favorite:", error)
        }
        return false
    }

    useEffect(() => {
        fetchUserData()
    }, [user])

    return {
        dashboardData,
        loading,
        error,
        refetch: fetchUserData,
        updateCourseProgress,
        toggleFavorite,
    }
}

export default useUserData
