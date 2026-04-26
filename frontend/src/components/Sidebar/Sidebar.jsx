"use client";

import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaChartLine, FaHome, FaKey, FaUsers } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiLogout, HiX } from "react-icons/hi";
import { MdDashboard, MdPayment, MdSchool } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Sidebar = ({ isSidebarOpen, handleSidebarToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, photoURL, displayName, user } = useAuth();
  const { role } = useRole();
  const [openDropdown, setOpenDropdown] = useState(null);

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const allMenuItems = role === "admin" ? adminMenuItems : userMenuItems;
    const activeMenu = allMenuItems.find((item) =>
      item.subItems?.some((sub) => isActive(sub.path)),
    );
    if (activeMenu) {
      setOpenDropdown(activeMenu.label);
    }
  }, [location.pathname, role]);

  const MenuItem = ({ item, onClick, level = 0 }) => {
    const isMenuActive = isActive(item.path);
    const isDropdownOpen = openDropdown === item.label;
    const indentClass = level === 1 ? "ml-4" : "";

    return (
      <li className="group w-full flex-shrink-0">
        <div
          className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer select-none w-full ${
            isMenuActive
              ? "bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          } ${indentClass}`}
          onClick={() => {
            if (item.subItems) {
              toggleDropdown(item.label);
            } else {
              onClick(item.path);
            }
          }}
        >
          {isMenuActive && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
          )}
          <div
            className={`flex-shrink-0 ${
              isMenuActive ? "text-white" : item.color
            }`}
          >
            <item.icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{item.label}</div>
            {item.description && (
              <div
                className={`text-xs truncate ${
                  isMenuActive
                    ? "text-blue-100"
                    : "text-gray-500 group-hover:text-gray-600"
                }`}
              >
                {item.description}
              </div>
            )}
          </div>
          {item.subItems && (
            <div className="flex-shrink-0 text-gray-500 group-hover:text-gray-700 transition-transform duration-200">
              {isDropdownOpen ? (
                <FiChevronUp className="w-5 h-5" />
              ) : (
                <FiChevronDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
        {item.subItems && isDropdownOpen && (
          <ul className="mt-1 space-y-1 w-full">
            {item.subItems.map((sub) => {
              const isSubActive = isActive(sub.path);
              return (
                <div
                  className={isSubActive ? "w-[90%]" : "w-full"}
                  key={sub.path}
                >
                  <MenuItem item={sub} onClick={onClick} level={level + 1} />
                </div>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  const adminMenuItems = [
    {
      path: "/admin-dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      description: "Overview & Analytics",
      color: "text-blue-600",
    },

    {
      path: "/admin-dashboard/manage-users/all-users",
      icon: FaUsers,
      label: "All Users",
      description: "Register All User",
      color: "text-green-600",
    },
    {
      path: "/admin-dashboard/manage-all-enroll",
      icon: FaUsers,
      label: "All Enroll",
      description: "Manage All Enroll",
      color: "text-green-600",
    },
    {
      path: "/admin-dashboard/manage-all-features",
      icon: FaUsers,
      label: "Add Features",
      description: "Manage All Features",
      color: "text-green-600",
    },
    {
      path: "/admin-dashboard/manage-all-achievements",
      icon: FaUsers,
      label: "Add Achievements",
      description: "Manage All Achievements",
      color: "text-green-600",
    },
    {
      path: "/admin-dashboard/add-techer",
      icon: FaUsers,
      label: "Add Techer",
      description: "Manage All Techer",
      color: "text-green-600",
    },
     {
      path: "/admin-dashboard/manage-all-courses",
      icon: FaUsers,
      label: "Add Courses",
      description: "Manage All Courses",
      color: "text-green-600",
    },
    {
      path: "/admin-dashboard/add-testimonial",
      icon: FaUsers,
      label: "Add Testimonial",
      description: "Manage All Testimonial",
      color: "text-green-600",
    },
    {
      path: "/admin-dashboard/manage-about-page",
      icon: FaUsers,
      label: "About Page",
      description: "Manage About Page",
      color: "text-green-600",
    },

    {
      path: "/admin-dashboard/create-a-home-text",
      icon: BiEdit,
      label: "Create a Banner",
      description: "Manage banner",
      color: "text-indigo-600",
    },
    {
      path: "/admin-dashboard/footer-facebook-url-change",
      icon: MdPayment,
      label: "Footer Social URL",
      description: "Footer Social URL Change",
      color: "text-indigo-400",
    },
    {
      path: "/admin-dashboard/create-a-new-blog",
      icon: BiEdit,
      label: "Create Blog",
      description: "Create New Blog",
      color: "text-indigo-600",
    },
  ];

  const userMenuItems = [
    {
      path: "/user-dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      description: "Your Overview",
      color: "text-blue-600",
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    handleSidebarToggle();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300"
          onClick={handleSidebarToggle}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 bg-white backdrop-blur-xl border-r border-gray-200 min-h-screen shadow-lg w-64 h-full overflow-y-auto transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out lg:translate-x-0 z-[1000]`}
      >
        <div className="sticky top-0 z-10 bg-white backdrop-blur-xl border-b border-gray-200">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Link
                  to={
                    role === "admin"
                      ? "/admin-dashboard/my-profile"
                      : role === "moderator"
                        ? "/moderator-dashboard/my-profile"
                        : "/user-dashboard/my-profile"
                  }
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] rounded-xl flex items-center justify-center shadow-md overflow-hidden cursor-pointer">
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-gray-900 font-bold text-lg leading-tight">
                  {role === "admin"
                    ? "Control Panel"
                    : role === "moderator"
                      ? "Moderator Panel"
                      : "Learning Panel"}
                </h1>
                <p className="text-gray-600 text-xs font-medium">
                  {user.displayName}
                </p>
              </div>
            </div>
            <button
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={handleSidebarToggle}
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {role === "admin" ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Administration
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {adminMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          ) : role === "moderator" ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Moderator Panel
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {moderatorMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MdSchool className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Learning
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {userMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaHome className="w-4 h-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Home
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
            </div>
            <ul className="space-y-2">
              <MenuItem
                item={{
                  path: "/",
                  icon: FaHome,
                  label: "Go to Home",
                  description: "Visit main website",
                  color: "text-blue-600",
                }}
                onClick={handleMenuClick}
              />
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <CgProfile className="w-4 h-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Account
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
            </div>
            <ul className="space-y-2">
              {user && role && (
                <>
                  <MenuItem
                    item={{
                      path:
                        role === "admin"
                          ? "/admin-dashboard/my-profile"
                          : role === "moderator"
                            ? "/moderator-dashboard/my-profile"
                            : "/user-dashboard/my-profile",
                      icon: CgProfile,
                      label:
                        role === "admin"
                          ? "Admin Profile"
                          : role === "moderator"
                            ? "Moderator Profile"
                            : "My Profile",
                      description: "Personal Settings",
                      color:
                        role === "admin"
                          ? "text-yellow-600"
                          : role === "moderator"
                            ? "text-green-600"
                            : "text-purple-600",
                    }}
                    onClick={handleMenuClick}
                  />
                  <MenuItem
                    item={{
                      path:
                        role === "admin"
                          ? "/admin-dashboard/change-password"
                          : role === "moderator"
                            ? "/moderator-dashboard/change-password"
                            : "/user-dashboard/change-password",
                      icon: FaKey,
                      label: "Change Password",
                      description: "Update your password",
                      color:
                        role === "admin"
                          ? "text-yellow-600"
                          : role === "moderator"
                            ? "text-green-600"
                            : "text-purple-600",
                    }}
                    onClick={handleMenuClick}
                  />
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={logout}
              className="group flex items-center gap-3 p-3 w-full text-left rounded-lg transition-all duration-300 text-red-600 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200"
            >
              <HiLogout className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex-1">
                <div className="font-medium text-sm">Sign Out</div>
                <div className="text-xs text-gray-500 group-hover:text-red-600">
                  End your session
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
