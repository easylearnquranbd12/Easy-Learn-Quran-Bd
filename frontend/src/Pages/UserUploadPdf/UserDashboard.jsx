import { FaBookOpen, FaClock, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="mt-16 px-3">

      {/* 🔥 CONTAINER */}
      <div className="max-w-[1200px] mx-auto">

        {/* 🔥 HEADER */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border">
          <h2 className="text-2xl md:text-3xl font-bold text-[#145c43]">
            📊 My Dashboard
          </h2>

          <p className="text-gray-600 mt-2">
            Welcome <span className="font-semibold">{user?.email}</span>
          </p>
        </div>

        {/* 🔥 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-md text-center border hover:shadow-lg transition">
            <FaBookOpen className="text-3xl text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Courses</h3>
            <p className="text-gray-500">0 Enrolled</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border hover:shadow-lg transition">
            <FaUserGraduate className="text-3xl text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Progress</h3>
            <p className="text-gray-500">0% Completed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border hover:shadow-lg transition">
            <FaClock className="text-3xl text-teal-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Study Time</h3>
            <p className="text-gray-500">0 Hours</p>
          </div>

        </div>

        {/* 🔥 QUICK ACTION */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border">

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Start Your Learning Journey
          </h3>

          <Link
            to="/enroll-now"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white rounded-lg font-semibold hover:scale-105 transition"
          >
            📚 Enroll Now
          </Link>

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;