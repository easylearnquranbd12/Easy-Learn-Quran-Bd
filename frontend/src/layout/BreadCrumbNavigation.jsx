"use client"

import { ChevronRight, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BreadcrumbNavigation = ({ items }) => {
    const navigate = useNavigate()

    return (
        <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-6">
            <button
                onClick={() => navigate("/admin-dashboard")}
                className="flex items-center hover:text-gray-900 transition-colors"
            >
                <Home size={16} />
            </button>

            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <ChevronRight size={16} className="mx-1 text-gray-400" />
                    {item.href && index < items.length - 1 ? (
                        <button onClick={() => navigate(item.href)} className="hover:text-gray-900 transition-colors">
                            {item.label}
                        </button>
                    ) : (
                        <span className={index === items.length - 1 ? "text-gray-900 font-medium" : ""}>{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    )
}

export default BreadcrumbNavigation
