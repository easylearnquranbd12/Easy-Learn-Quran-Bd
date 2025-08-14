const { ObjectId } = require("mongodb")
const { getCourseCollection, getUserCollection, getEnrollmentCollection } = require("../config/db")

const getDashboardAnalytics = async (req, res) => {
    try {
        const courseCollection = getCourseCollection()
        const userCollection = getUserCollection()
        const enrollmentCollection = getEnrollmentCollection()

        // Get current date for time-based analytics
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
        const startOfYear = new Date(now.getFullYear(), 0, 1)

        // Parallel data fetching for better performance
        const [
            totalCourses,
            publishedCourses,
            draftCourses,
            totalStudents,
            totalEnrollments,
            activeEnrollments,
            recentEnrollments,
            monthlyEnrollments,
            weeklyEnrollments,
            yearlyRevenue,
            monthlyRevenue,
            topCourses,
            recentStudents,
            coursesByCategory,
            enrollmentTrends,
            revenueByMonth,
            enrollmentsByStatus,
            courseLevelDistribution,
        ] = await Promise.all([
            // Course statistics
            courseCollection.countDocuments(),
            courseCollection.countDocuments({ status: "published" }),
            courseCollection.countDocuments({ status: "draft" }),

            // Student statistics
            userCollection.countDocuments({ role: { $ne: "admin" } }),

            // Enrollment statistics
            enrollmentCollection.countDocuments(),
            enrollmentCollection.countDocuments({ status: "active" }),

            // Recent enrollments (last 10)
            enrollmentCollection
                .find()
                .sort({ enrollmentDate: -1 })
                .limit(10)
                .toArray(),

            // Monthly enrollments
            enrollmentCollection.countDocuments({
                enrollmentDate: { $gte: startOfMonth },
            }),

            // Weekly enrollments
            enrollmentCollection.countDocuments({
                enrollmentDate: { $gte: startOfWeek },
            }),

            // Revenue calculations
            enrollmentCollection
                .aggregate([
                    {
                        $match: {
                            enrollmentDate: { $gte: startOfYear },
                            status: "active",
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalRevenue: { $sum: "$amount" },
                        },
                    },
                ])
                .toArray(),

            enrollmentCollection
                .aggregate([
                    {
                        $match: {
                            enrollmentDate: { $gte: startOfMonth },
                            status: "active",
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalRevenue: { $sum: "$amount" },
                        },
                    },
                ])
                .toArray(),

            // Top performing courses
            enrollmentCollection
                .aggregate([
                    {
                        $match: { status: "active" },
                    },
                    {
                        $group: {
                            _id: "$courseId",
                            enrollmentCount: { $sum: 1 },
                            revenue: { $sum: "$amount" },
                            courseTitle: { $first: "$courseTitle" },
                            courseThumbnail: { $first: "$courseThumbnail" },
                            coursePrice: { $first: "$coursePrice" },
                        },
                    },
                    {
                        $sort: { enrollmentCount: -1 },
                    },
                    {
                        $limit: 5,
                    },
                ])
                .toArray(),

            // Recent students
            userCollection
                .find({ role: { $ne: "admin" } })
                .sort({ createdAt: -1 })
                .limit(5)
                .toArray(),

            // Courses by category
            courseCollection
                .aggregate([
                    {
                        $group: {
                            _id: "$category",
                            count: { $sum: 1 },
                            published: {
                                $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] },
                            },
                        },
                    },
                    {
                        $sort: { count: -1 },
                    },
                ])
                .toArray(),

            // Enrollment trends (last 6 months)
            enrollmentCollection
                .aggregate([
                    {
                        $match: {
                            enrollmentDate: {
                                $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1),
                            },
                        },
                    },
                    {
                        $group: {
                            _id: {
                                year: { $year: "$enrollmentDate" },
                                month: { $month: "$enrollmentDate" },
                            },
                            enrollments: { $sum: 1 },
                            revenue: { $sum: "$amount" },
                        },
                    },
                    {
                        $sort: { "_id.year": 1, "_id.month": 1 },
                    },
                ])
                .toArray(),

            // Revenue by month (last 12 months)
            enrollmentCollection
                .aggregate([
                    {
                        $match: {
                            enrollmentDate: {
                                $gte: new Date(now.getFullYear(), now.getMonth() - 11, 1),
                            },
                            status: "active",
                        },
                    },
                    {
                        $group: {
                            _id: {
                                year: { $year: "$enrollmentDate" },
                                month: { $month: "$enrollmentDate" },
                            },
                            revenue: { $sum: "$amount" },
                            enrollments: { $sum: 1 },
                        },
                    },
                    {
                        $sort: { "_id.year": 1, "_id.month": 1 },
                    },
                ])
                .toArray(),

            // Enrollments by status
            enrollmentCollection
                .aggregate([
                    {
                        $group: {
                            _id: "$status",
                            count: { $sum: 1 },
                        },
                    },
                ])
                .toArray(),

            // Course level distribution
            courseCollection
                .aggregate([
                    {
                        $group: {
                            _id: "$level",
                            count: { $sum: 1 },
                        },
                    },
                ])
                .toArray(),
        ])

        // Calculate growth percentages (mock calculation for demo)
        const studentGrowth = Math.floor(Math.random() * 20) + 5 // 5-25%
        const revenueGrowth = Math.floor(Math.random() * 30) + 10 // 10-40%
        const courseGrowth = Math.floor(Math.random() * 15) + 3 // 3-18%

        // Format enrollment trends data
        const formattedTrends = enrollmentTrends.map((trend) => ({
            month: `${trend._id.year}-${String(trend._id.month).padStart(2, "0")}`,
            enrollments: trend.enrollments,
            revenue: trend.revenue,
        }))

        // Format revenue by month
        const formattedRevenue = revenueByMonth.map((item) => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
            revenue: item.revenue,
            enrollments: item.enrollments,
        }))

        const dashboardData = {
            overview: {
                totalCourses,
                publishedCourses,
                draftCourses,
                totalStudents,
                totalEnrollments,
                activeEnrollments,
                yearlyRevenue: yearlyRevenue[0]?.totalRevenue || 0,
                monthlyRevenue: monthlyRevenue[0]?.totalRevenue || 0,
                monthlyEnrollments,
                weeklyEnrollments,
                growth: {
                    students: studentGrowth,
                    revenue: revenueGrowth,
                    courses: courseGrowth,
                },
            },
            recentEnrollments: recentEnrollments.map((enrollment) => ({
                ...enrollment,
                enrollmentDate: enrollment.enrollmentDate,
            })),
            topCourses,
            recentStudents: recentStudents.map((student) => ({
                _id: student._id,
                name: student.name,
                email: student.email,
                imgUrl: student.imgUrl,
                createdAt: student.createdAt,
                purchasedCourses: student.purchasedCourses?.length || 0,
            })),
            coursesByCategory,
            enrollmentTrends: formattedTrends,
            revenueByMonth: formattedRevenue,
            enrollmentsByStatus,
            courseLevelDistribution,
        }

        res.status(200).json({
            success: true,
            message: "Dashboard analytics retrieved successfully",
            data: dashboardData,
        })
    } catch (error) {
        console.error("Dashboard analytics error:", error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve dashboard analytics",
            error: error.message,
        })
    }
}

module.exports = {
    getDashboardAnalytics,
}
