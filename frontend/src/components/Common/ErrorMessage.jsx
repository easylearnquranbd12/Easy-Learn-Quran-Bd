"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

const ErrorMessage = ({ message, onRetry, className = "" }) => {
    return (
        <div className={`text-center p-8 bg-white rounded-xl border border-gray-200 ${className}`}>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mx-auto"
                >
                    <RefreshCw size={16} />
                    Try Again
                </button>
            )}
        </div>
    )
}

export default ErrorMessage
