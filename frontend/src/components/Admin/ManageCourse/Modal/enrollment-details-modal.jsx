"use client"
import { FaBook, FaCalendar, FaChartLine, FaCheckCircle, FaClock, FaCreditCard, FaTimes, FaUser } from "react-icons/fa"
import { MdEmail, MdPayment, MdSchool } from "react-icons/md"

const EnrollmentDetailsModal = ({ enrollment, onClose, getStatusColor, getStatusIcon }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatCurrency = (amount) => {
        return `৳${amount.toLocaleString()}`
    }

    const getPaymentMethodDisplay = (method) => {
        const methods = {
            paypal: { name: "PayPal", icon: "💳", color: "text-blue-600" },
            stripe: { name: "Stripe", icon: "💳", color: "text-purple-600" },
            bkash: { name: "bKash", icon: "📱", color: "text-pink-600" },
            nagad: { name: "Nagad", icon: "📱", color: "text-orange-600" },
        }
        return methods[method.toLowerCase()] || { name: method, icon: "💳", color: "text-gray-600" }
    }

    const paymentMethod = getPaymentMethodDisplay(enrollment.paymentMethod)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Enrollment Details</h2>
                        <p className="text-gray-600 mt-1">Complete enrollment information and progress</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <FaTimes className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Status Banner */}
                    <div
                        className={`p-4 rounded-lg border-l-4 ${enrollment.status === "active"
                            ? "bg-green-50 border-green-400"
                            : enrollment.status === "pending"
                                ? "bg-yellow-50 border-yellow-400"
                                : "bg-red-50 border-red-400"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${getStatusColor(enrollment.status)}`}>
                                {getStatusIcon(enrollment.status)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Enrollment Status: <span className="capitalize">{enrollment.status}</span>
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {enrollment.status === "active" && "Student has full access to the course"}
                                    {enrollment.status === "pending" && "Waiting for payment verification"}
                                    {enrollment.status === "cancelled" && "Enrollment has been cancelled"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Student Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaUser className="h-5 w-5 text-blue-600" />
                                    Student Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaUser className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{enrollment.studentName}</p>
                                            <p className="text-sm text-gray-600">Student Name</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <MdEmail className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{enrollment.studentEmail}</p>
                                            <p className="text-sm text-gray-600">Email Address</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <MdSchool className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">ID: {enrollment.studentId}</p>
                                            <p className="text-sm text-gray-600">Student ID</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Information */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaBook className="h-5 w-5 text-green-600" />
                                    Course Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={enrollment.courseThumbnail || "/placeholder.svg"}
                                                alt={enrollment.courseTitle}
                                                className="w-16 h-16 rounded-lg object-cover"
                                                onError={(e) => {
                                                    e.target.src = "/api/placeholder/64/64"
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 mb-1">{enrollment.courseTitle}</h4>
                                                <p className="text-sm text-gray-600 mb-2">Slug: {enrollment.courseSlug}</p>
                                                <p className="text-lg font-semibold text-green-600">{formatCurrency(enrollment.coursePrice)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <FaBook className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">ID: {enrollment.courseId}</p>
                                            <p className="text-sm text-gray-600">Course ID</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MdPayment className="h-5 w-5 text-purple-600" />
                            Payment Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCreditCard className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm text-gray-600">Amount Paid</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(enrollment.amount)}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">{paymentMethod.icon}</span>
                                    <span className="text-sm text-gray-600">Payment Method</span>
                                </div>
                                <p className={`text-lg font-semibold ${paymentMethod.color}`}>{paymentMethod.name}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCalendar className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm text-gray-600">Enrollment Date</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{formatDate(enrollment.enrollmentDate)}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-gray-600">Transaction ID</span>
                                </div>
                                <p className="text-sm font-mono font-medium text-gray-900 bg-white px-2 py-1 rounded border">
                                    {enrollment.transactionId}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Information */}
                    {enrollment.progress && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FaChartLine className="h-5 w-5 text-orange-600" />
                                Learning Progress
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaChartLine className="h-4 w-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Overall Progress</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                                style={{ width: `${enrollment.progress.progressPercentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-lg font-bold text-gray-900">{enrollment.progress.progressPercentage}%</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCheckCircle className="h-4 w-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Completed Lessons</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">{enrollment.progress.completedLessons.length}</p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaClock className="h-4 w-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Current Lesson</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">Lesson {enrollment.progress.currentLesson}</p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCalendar className="h-4 w-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">Last Accessed</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{formatDate(enrollment.progress.lastAccessed)}</p>
                                </div>
                            </div>

                            {/* Completed Lessons List */}
                            {enrollment.progress.completedLessons.length > 0 && (
                                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Completed Lessons:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {enrollment.progress.completedLessons.map((lessonId, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                                            >
                                                Lesson {lessonId}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Timestamps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <FaCalendar className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-600">Created At</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{formatDate(enrollment.createdAt)}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <FaClock className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-600">Last Updated</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{formatDate(enrollment.updatedAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-white bg-primary border border-gray-300 rounded-lg font-semibold hover:bg-hoverPrimary transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EnrollmentDetailsModal
