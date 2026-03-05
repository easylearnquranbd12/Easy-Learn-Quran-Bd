
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-gray-900 min-h-screen">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[90] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 bg-[#edf7f4]">
        {/* ✅ Top Navbar */}
        <nav className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b border-gray-300 z-[100] shadow-xl flex justify-between items-center px-2 md:px-4">
          <div className="flex items-center gap-1">
            <button
              className="lg:hidden text-indigo-800 transition-colors hover:bg-indigo-100 rounded-md px-1 py-2 cursor-pointer"
              onClick={handleSidebarToggle}
              aria-label="Toggle sidebar"
            >
              <FaBars className="w-6 h-6 text-[#1f4e43]" />
            </button>
            <p className="text-xs md:text-base  text-gray-800">
              Admin Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">{user?.displayName}</span>
            <button
              onClick={logout}
              className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition"
            >
              LogOut
            </button>
          </div>
        </nav>

        {/* ✅ Page Content Area */}
        <div className="flex-grow pt-20 pb-16 px-4 sm:px-6">
          <Outlet />
        </div>

        {/* ✅ Fixed Footer */}
        <footer className="fixed bottom-0 left-0 lg:left-64 right-0 bg-indigo-100 border-t border-indigo-700 py-3 text-center text-gray-800 text-sm shadow-inner">
          <p>
            © {new Date().getFullYear()} Admin Dashboard — Built with ❤️ by Mozammel Hosen
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
