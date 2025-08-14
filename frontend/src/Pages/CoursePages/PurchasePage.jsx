"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, CreditCard, AlertCircle } from "lucide-react"

const PurchasePage = ({ course, onBack, onPurchaseComplete }) => {
    const [transactionId, setTransactionId] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!transactionId.trim()) {
            setError("Please enter a transaction ID")
            return
        }

        setIsSubmitting(true)
        setError("")

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            onPurchaseComplete(course._id, transactionId)
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 backdrop-blur-xl">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        <span>Back to Course</span>
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                    {/* Course Summary */}
                    <div className="p-6 border-b border-gray-800">
                        <h1 className="text-2xl font-bold text-white mb-6">Complete Your Purchase</h1>

                        <div className="flex gap-4">
                            {/* Course Image */}
                            <div className="w-24 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                {course.thumbnailUrl ? (
                                    <img
                                        src={course.thumbnailUrl || "/placeholder.svg"}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                        <span className="text-gray-600">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Course Info */}
                            <div>
                                <h2 className="font-medium text-white mb-1">{course.title}</h2>
                                <div className="text-sm text-gray-400 mb-2">
                                    {course.category} • {course.level}
                                </div>
                                <div className="text-lg font-bold text-white">${course.price}</div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Enter Transaction ID</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-400 mb-2">
                                    Transaction ID
                                </label>
                                <div className="relative">
                                    <CreditCard size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                    <input
                                        id="transactionId"
                                        type="text"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Enter your transaction ID"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                {error && (
                                    <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                                        <AlertCircle size={14} />
                                        <span>{error}</span>
                                    </div>
                                )}
                                <p className="mt-2 text-sm text-gray-500">
                                    Enter the transaction ID you received after making the payment.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-gray-800">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400">Course Price:</span>
                                    <span className="text-white font-medium">${course.price}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle size={18} className="mr-2" />
                                            Complete Enrollment
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">How to Complete Your Purchase</h3>
                    <ol className="space-y-3 text-gray-300">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm font-medium">
                                1
                            </span>
                            <span>
                                Make a payment of <strong>${course.price}</strong> to our payment account.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm font-medium">
                                2
                            </span>
                            <span>Copy the transaction ID from your payment receipt.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm font-medium">
                                3
                            </span>
                            <span>Enter the transaction ID above and click "Complete Enrollment".</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm font-medium">
                                4
                            </span>
                            <span>Once verified, you'll get immediate access to the course.</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default PurchasePage
