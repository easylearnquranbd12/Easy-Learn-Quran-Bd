"use client"

import { useEffect, useState } from "react"
import { FaCheckCircle, FaClock, FaCreditCard, FaDownload, FaSearch, FaUsers } from "react-icons/fa"
import { MdCancel, MdPending } from "react-icons/md"
import BreadcrumbNavigation from "../../../../layout/BreadCrumbNavigation"
import CustomLoading from "../../../Loading/CustomLoading"
import EnrollmentCard from "../Cards/EnrollmentCard"
import { enrollmentApiClient } from "../enrollment-api-client"
import ConfirmationModal from "../Modal/confirmation-modal"
import EnrollmentDetailsModal from "../Modal/enrollment-details-modal"

const EnrollmentManagementPage = () => {
    const [enrollments, setEnrollments] = useState([])
    const [filteredEnrollments, setFilteredEnrollments] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
    const [selectedEnrollment, setSelectedEnrollment] = useState(null)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmAction, setConfirmAction] = useState(null)
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        active: 0,
        cancelled: 0,
        totalRevenue: 0,
    })

    useEffect(() => {
        fetchEnrollments()
    }, [])

    useEffect(() => {
        filterEnrollments()
    }, [enrollments, searchTerm, statusFilter, paymentMethodFilter])

    const fetchEnrollments = async () => {
        try {
            setLoading(true)
            const data = await enrollmentApiClient.getAllEnrollments()
            setEnrollments(data)
            calculateStats(data)
        } catch (error) {
            console.error("Error fetching enrollments:", error)
        } finally {
            setLoading(false)
        }
    }

    const calculateStats = (enrollmentData) => {
        const stats = {
            total: enrollmentData.length,
            pending: enrollmentData.filter((e) => e.status === "pending").length,
            active: enrollmentData.filter((e) => e.status === "active").length,
            cancelled: enrollmentData.filter((e) => e.status === "cancelled").length,
            totalRevenue: enrollmentData.filter((e) => e.status === "active").reduce((sum, e) => sum + e.amount, 0),
        }
        setStats(stats)
    }

    const filterEnrollments = () => {
        let filtered = enrollments

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (enrollment) =>
                    enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    enrollment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    enrollment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter((enrollment) => enrollment.status === statusFilter)
        }

        // Payment method filter
        if (paymentMethodFilter !== "all") {
            filtered = filtered.filter((enrollment) => enrollment.paymentMethod === paymentMethodFilter)
        }

        setFilteredEnrollments(filtered)
    }

    const handleApproveEnrollment = async (enrollmentId) => {
        try {
            await enrollmentApiClient.updateEnrollmentStatus(enrollmentId, "active")
            await fetchEnrollments()
            setShowConfirmModal(false)
        } catch (error) {
            console.error("Error approving enrollment:", error)
        }
    }

    const handleCancelEnrollment = async (enrollmentId) => {
        try {
            await enrollmentApiClient.updateEnrollmentStatus(enrollmentId, "cancelled")
            await fetchEnrollments()
            setShowConfirmModal(false)
        } catch (error) {
            console.error("Error cancelling enrollment:", error)
        }
    }

    const handleDeleteEnrollment = async (enrollmentId) => {
        try {
            await enrollmentApiClient.deleteEnrollment(enrollmentId)
            await fetchEnrollments()
            setShowConfirmModal(false)
        } catch (error) {
            console.error("Error deleting enrollment:", error)
        }
    }

    const openConfirmModal = (action, enrollment) => {
        setConfirmAction({ action, enrollment })
        setShowConfirmModal(true)
    }

    const handleConfirmAction = () => {
        if (!confirmAction) return

        const { action, enrollment } = confirmAction
        switch (action) {
            case "approve":
                handleApproveEnrollment(enrollment._id)
                break
            case "cancel":
                handleCancelEnrollment(enrollment._id)
                break
            case "delete":
                handleDeleteEnrollment(enrollment._id)
                break
            default:
                break
        }
    }

    const exportEnrollments = () => {
        const csvContent = [
            ["Student Name", "Email", "Course", "Amount", "Status", "Payment Method", "Transaction ID", "Date"].join(","),
            ...filteredEnrollments.map((enrollment) =>
                [
                    enrollment.studentName,
                    enrollment.studentEmail,
                    enrollment.courseTitle,
                    enrollment.amount,
                    enrollment.status,
                    enrollment.paymentMethod,
                    enrollment.transactionId,
                    new Date(enrollment.enrollmentDate).toLocaleDateString(),
                ].join(","),
            ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `enrollments-${new Date().toISOString().split("T")[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "text-green-600 bg-green-100"
            case "pending":
                return "text-yellow-600 bg-yellow-100"
            case "cancelled":
                return "text-red-600 bg-red-100"
            default:
                return "text-gray-600 bg-gray-100"
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "active":
                return <FaCheckCircle />
            case "pending":
                return <FaClock />
            case "cancelled":
                return <MdCancel />
            default:
                return <FaClock />
        }
    }

    // if (loading) {
    //     return (
    //         <div className="min-h-screen bg-gray-50 p-4">
    //             <div className="max-w-7xl mx-auto">
    //                 <BreadcrumbNavigation
    //                     items={[
    //                         { label: "Dashboard", path: "/admin-dashboard" },
    //                         { label: "Enrollment Management", path: "/admin-dashboard/enrollments" },
    //                     ]}
    //                 />
    //                 <div className="flex items-center justify-center h-64">
    //                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }


    if(loading){
        return <CustomLoading/>
    }

    return (
        <div className="min-h-screen bg-green-50 p-2 md:p-4">
            <div className="max-w-7xl mx-auto ">
                {/* Breadcrumb */}
                <BreadcrumbNavigation
                    items={[
                        { label: "Dashboard", path: "/admin-dashboard" },
                        { label: "Enrollment Management", path: "/admin-dashboard/enrollments" },
                    ]}
                />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Enrollment Management</h1>
                    <p className="text-gray-600">Manage course enrollments, payments, and student access</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-borderColor hover:shadow-2xl">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <FaUsers className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-borderColor hover:shadow-2xl">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                <MdPending className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-borderColor hover:shadow-2xl">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <FaCheckCircle className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-borderColor hover:shadow-2xl">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-red-100 text-red-600">
                                <MdCancel className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-borderColor hover:shadow-2xl">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                <FaCreditCard className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">৳{stats.totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200 hover:border-borderColor hover:shadow-2xl">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search by student, course, or transaction ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            {/* Payment Method Filter */}
                            <select
                                value={paymentMethodFilter}
                                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Payment Methods</option>
                                <option value="paypal">PayPal</option>
                                <option value="stripe">Stripe</option>
                                <option value="bkash">bKash</option>
                                <option value="nagad">Nagad</option>
                            </select>
                        </div>

                        {/* Export Button */}
                        <button
                            onClick={exportEnrollments}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <FaDownload className="h-4 w-4" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Enrollments List */}
                <div className="space-y-4">
                    {filteredEnrollments.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200 ">
                            <FaUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No enrollments found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        filteredEnrollments.map((enrollment) => (
                            <EnrollmentCard
                                key={enrollment._id}
                                enrollment={enrollment}
                                onViewDetails={(enrollment) => {
                                    setSelectedEnrollment(enrollment)
                                    setShowDetailsModal(true)
                                }}
                                onApprove={(enrollment) => openConfirmModal("approve", enrollment)}
                                onCancel={(enrollment) => openConfirmModal("cancel", enrollment)}
                                onDelete={(enrollment) => openConfirmModal("delete", enrollment)}
                                getStatusColor={getStatusColor}
                                getStatusIcon={getStatusIcon}
                            />
                        ))
                    )}
                </div>

                {/* Pagination could be added here */}
                {filteredEnrollments.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <p className="text-gray-600">
                            Showing {filteredEnrollments.length} of {enrollments.length} enrollments
                        </p>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showDetailsModal && selectedEnrollment && (
                <EnrollmentDetailsModal
                    enrollment={selectedEnrollment}
                    onClose={() => {
                        setShowDetailsModal(false)
                        setSelectedEnrollment(null)
                    }}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                />
            )}

            {showConfirmModal && confirmAction && (
                <ConfirmationModal
                    isOpen={showConfirmModal}
                    onClose={() => {
                        setShowConfirmModal(false)
                        setConfirmAction(null)
                    }}
                    onConfirm={handleConfirmAction}
                    title={`${confirmAction.action.charAt(0).toUpperCase() + confirmAction.action.slice(1)} Enrollment`}
                    message={`Are you sure you want to ${confirmAction.action} this enrollment for ${confirmAction.enrollment.studentName}?`}
                    confirmText={confirmAction.action.charAt(0).toUpperCase() + confirmAction.action.slice(1)}
                    confirmButtonClass={
                        confirmAction.action === "delete"
                            ? "bg-red-600 hover:bg-red-700"
                            : confirmAction.action === "approve"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-yellow-600 hover:bg-yellow-700"
                    }
                />
            )}
        </div>
    )
}

export default EnrollmentManagementPage
