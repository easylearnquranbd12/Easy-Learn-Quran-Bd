class EnrollmentApiClient {
    constructor(baseUrl = "http://localhost:5000") {
        this.baseUrl = baseUrl
    }

    async getAllEnrollments() {
        try {
            const response = await fetch(`${this.baseUrl}/api/enrollments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to fetch enrollments")
            }

            return data.data
        } catch (error) {
            console.error("Error fetching enrollments:", error)
            throw new Error(`Failed to fetch enrollments: ${error.message}`)
        }
    }

    async getEnrollmentById(enrollmentId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/enrollments/${enrollmentId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to fetch enrollment")
            }

            return data.data
        } catch (error) {
            console.error(`Error fetching enrollment ${enrollmentId}:`, error)
            throw new Error(`Failed to fetch enrollment: ${error.message}`)
        }
    }

    async updateEnrollmentStatus(enrollmentId, status) {
        try {
            const response = await fetch(`${this.baseUrl}/api/enrollments/${enrollmentId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to update enrollment status")
            }

            return data.data
        } catch (error) {
            console.error(`Error updating enrollment status ${enrollmentId}:`, error)
            throw new Error(`Failed to update enrollment status: ${error.message}`)
        }
    }

    async deleteEnrollment(enrollmentId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/enrollments/${enrollmentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to delete enrollment")
            }

            return data.data
        } catch (error) {
            console.error(`Error deleting enrollment ${enrollmentId}:`, error)
            throw new Error(`Failed to delete enrollment: ${error.message}`)
        }
    }

    async getEnrollmentsByStudent(studentId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/enrollments/student/${studentId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to fetch student enrollments")
            }

            return data.data
        } catch (error) {
            console.error(`Error fetching enrollments for student ${studentId}:`, error)
            throw new Error(`Failed to fetch student enrollments: ${error.message}`)
        }
    }

    async getEnrollmentsByCourse(courseId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/enrollments/course/${courseId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to fetch course enrollments")
            }

            return data.data
        } catch (error) {
            console.error(`Error fetching enrollments for course ${courseId}:`, error)
            throw new Error(`Failed to fetch course enrollments: ${error.message}`)
        }
    }

    async updateEnrollmentProgress(enrollmentId, progressData) {
        try {
            const response = await fetch(`${this.baseUrl}/api/enrollments/${enrollmentId}/progress`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(progressData),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to update enrollment progress")
            }

            return data.data
        } catch (error) {
            console.error(`Error updating enrollment progress ${enrollmentId}:`, error)
            throw new Error(`Failed to update enrollment progress: ${error.message}`)
        }
    }
}

export const enrollmentApiClient = new EnrollmentApiClient()
