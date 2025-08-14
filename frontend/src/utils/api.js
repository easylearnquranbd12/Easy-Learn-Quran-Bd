const API_BASE_URL = "http://localhost:5000/api"

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    "Content-Type": "application/json",
})

export const apiClient = {
    // User Dashboard APIs
    getUserDashboard: async (userEmail) => {
        const response = await fetch(`${API_BASE_URL}/user/dashboard/${userEmail}`, {
            headers: getAuthHeaders(),
        })
        return response.json()
    },

    getEnrolledCourses: async (userEmail) => {
        const response = await fetch(`${API_BASE_URL}/user/enrolled-courses/${userEmail}`, {
            headers: getAuthHeaders(),
        })
        return response.json()
    },

    getFavorites: async (userEmail) => {
        const response = await fetch(`${API_BASE_URL}/user/favorites/${userEmail}`, {
            headers: getAuthHeaders(),
        })
        return response.json()
    },

    getAchievements: async (userEmail) => {
        const response = await fetch(`${API_BASE_URL}/user/achievements/${userEmail}`, {
            headers: getAuthHeaders(),
        })
        return response.json()
    },

    toggleFavorite: async (userEmail, courseId) => {
        const response = await fetch(`${API_BASE_URL}/user/favorites/toggle`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ userEmail, courseId }),
        })
        return response.json()
    },

    removeFavorite: async (userEmail, courseId) => {
        const response = await fetch(`${API_BASE_URL}/user/favorites/remove`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ userEmail, courseId }),
        })
        return response.json()
    },

    updateCourseProgress: async (userEmail, courseId, progress) => {
        const response = await fetch(`${API_BASE_URL}/user/course-progress`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ userEmail, courseId, progress }),
        })
        return response.json()
    },

    // Course APIs
    getCourseDetails: async (courseId) => {
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
            headers: getAuthHeaders(),
        })
        return response.json()
    },

    enrollCourse: async (userEmail, courseId) => {
        const response = await fetch(`${API_BASE_URL}/courses/enroll`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ userEmail, courseId }),
        })
        return response.json()
    },
}

export default apiClient
