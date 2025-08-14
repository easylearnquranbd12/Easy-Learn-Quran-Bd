const LoadingSpinner = ({ size = "md", color = "blue" }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    }

    const colorClasses = {
        blue: "border-blue-600",
        green: "border-green-600",
        red: "border-red-600",
        yellow: "border-yellow-600",
        gray: "border-gray-600",
    }

    return (
        <div
            className={`${sizeClasses[size]} border-4 border-gray-200 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
        ></div>
    )
}

export default LoadingSpinner
