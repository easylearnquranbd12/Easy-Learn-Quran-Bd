"use client"
import { FaBook, FaCalendar, FaChartLine, FaCheck, FaCreditCard, FaEye, FaTimes, FaTrash, FaUser } from "react-icons/fa"
import { MdPayment } from "react-icons/md"

const EnrollmentCard = ({
    enrollment,
    onViewDetails,
    onApprove,
    onCancel,
    onDelete,
    getStatusColor,
    getStatusIcon,
}) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatCurrency = (amount) => {
        return `৳${amount.toLocaleString()}`
    }

    const getPaymentMethodIcon = (method) => {
        switch (method.toLowerCase()) {
            case "paypal":
                return "💳"
            case "stripe":
                return "💳"
            case "bkash":
                return "📱"
            case "nagad":
                return "📱"
            default:
                return "💳"
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6  transition-shadow hover:border-borderColor hover:shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Section - Student & Course Info */}
                <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaUser className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{enrollment.studentName}</h3>
                                <p className="text-sm text-gray-600">{enrollment.studentEmail}</p>
                            </div>
                        </div>
                        <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}
                        >
                            {getStatusIcon(enrollment.status)}
                            <span className="capitalize">{enrollment.status}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <FaBook className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600">Course</p>
                                <p className="font-medium text-gray-900 truncate">{enrollment.courseTitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <MdPayment className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600">Amount</p>
                                <p className="font-medium text-gray-900">{formatCurrency(enrollment.amount)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCreditCard className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600">Payment</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <span>{getPaymentMethodIcon(enrollment.paymentMethod)}</span>
                                    <span className="capitalize">{enrollment.paymentMethod}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCreditCard className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600">Number</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <span>{enrollment.userPaymentMethod}</span>
                                    <span className="capitalize">{enrollment.userPaymentMethod}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCalendar className="h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-gray-600">Enrolled</p>
                                <p className="font-medium text-gray-900">{formatDate(enrollment.enrollmentDate)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Info */}
                    {enrollment.progress && (
                        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <FaChartLine className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Progress:</span>
                                <span className="text-sm font-medium text-gray-900">{enrollment.progress.progressPercentage}%</span>
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${enrollment.progress.progressPercentage}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-500">Lesson {enrollment.progress.currentLesson}</span>
                        </div>
                    )}
                </div>

                {/* Right Section - Actions */}
                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:w-auto">
                    <button
                        onClick={() => onViewDetails(enrollment)}
                        className="flex items-center justify-center gap-2 px-3 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary transition-colors text-sm font-medium"
                    >
                        <FaEye className="h-4 w-4" />
                        <span>View Details</span>
                    </button>

                    <div className="flex gap-2">
                        {enrollment.status === "pending" && (
                            <button
                                onClick={() => onApprove(enrollment)}
                                className="flex items-center justify-center gap-2 px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-900 transition-colors text-sm font-medium"
                            >
                                <FaCheck className="h-4 w-4" />
                                <span>Approve</span>
                            </button>
                        )}

                        {enrollment.status !== "cancelled" && (
                            <button
                                onClick={() => onCancel(enrollment)}
                                className="flex items-center justify-center gap-2 px-3 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-900 transition-colors text-sm font-medium"
                            >
                                <FaTimes className="h-4 w-4" />
                                <span>Cancel</span>
                            </button>
                        )}

                        <button
                            onClick={() => onDelete(enrollment)}
                            className="flex items-center justify-center gap-2 px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                            <FaTrash className="h-4 w-4" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Transaction ID */}
            <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-gray-900 bg-gray-300 px-2 py-1 rounded">{enrollment.transactionId}</span>
                </div>
            </div>
        </div>
    )
}

export default EnrollmentCard
