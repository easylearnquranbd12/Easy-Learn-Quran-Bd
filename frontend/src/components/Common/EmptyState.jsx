"use client"

const EmptyState = ({ icon: Icon, title, description, actionText, onAction, className = "" }) => {
    return (
        <div className={`text-center py-16 bg-white rounded-xl border border-gray-200 ${className}`}>
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
            {actionText && onAction && (
                <button
                    onClick={onAction}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                    {actionText}
                </button>
            )}
        </div>
    )
}

export default EmptyState
