"use client";

import {
    Activity,
    BarChart3,
    BookOpen,
    Calendar,
    DollarSign,
    Eye,
    GraduationCap,
    PieChartIcon as PieIcon,
    RefreshCw,
    TrendingUp,
    UserCheck,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart as RechartsPieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        "http://localhost:5000/api/dashboard/analytics"
      );
      const result = await response.json();

      if (result.success) {
        setDashboardData(result.data);
        setError(null);
      } else {
        setError(result.message || "Failed to fetch dashboard data");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // const formatCurrency = (amount) => {
  //   return `৳${Number(amount).toLocaleString()}`;
  // };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Colors for charts
  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#84CC16",
    "#F97316",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Error Loading Dashboard
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const {
    overview,
    recentEnrollments,
    topCourses,
    recentStudents,
    coursesByCategory,
    revenueByMonth,
    enrollmentsByStatus,
    courseLevelDistribution,
  } = dashboardData;

  return (
    <div className="min-h-screen bg-green-50 px-3 rounded-lg ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Complete overview of your course platform
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-white p-6 rounded-xl   border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {overview.totalStudents.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +{overview.growth.students}% this month
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Courses */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {overview.totalCourses}
                </p>
                <div className="flex items-center mt-2 gap-4">
                  <span className="text-sm text-green-600">
                    {overview.publishedCourses} published
                  </span>
                  <span className="text-sm text-orange-600">
                    {overview.draftCourses} draft
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(overview.monthlyRevenue)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +{overview.growth.revenue}% vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Total Enrollments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Enrollments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {overview.totalEnrollments.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-blue-600">
                    {overview.activeEnrollments} active
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <GraduationCap size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend (Last 12 Months)
              </h3>
              <BarChart3 size={20} className="text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value), "Revenue"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Courses by Category Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Courses by Category
              </h3>
              <PieIcon size={20} className="text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={coursesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ _id, percent }) =>
                      `${_id || "Other"} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {coursesByCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enrollment Status Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Enrollment Status
              </h3>
              <Activity size={20} className="text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Level Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Course Difficulty Levels
              </h3>
              <BarChart3 size={20} className="text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={courseLevelDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ _id, percent }) =>
                      `${_id} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {courseLevelDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-white px-1 md:p-5  rounded-xl shadow-sm border border-gray-100 mb-8 hover:border-primary hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Performing Courses
            </h3>
            <Eye size={20} className="text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-1 md:px-4 font-medium text-gray-600">
                    Course
                  </th>
                  <th className="text-left py-3 px-1 md:px-4 font-medium text-gray-600">
                    Enrollments
                  </th>
                  <th className="text-left py-3 px-1 md:px-4 font-medium text-gray-600">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-1 md:px-4 font-medium text-gray-600">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {topCourses.map((course, index) => (
                  <tr
                    key={course._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            course.courseThumbnail ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={course.courseTitle}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {course.courseTitle}
                          </p>
                          <p className="text-sm text-gray-500">
                            Rank #{index + 1}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">
                        {course.enrollmentCount}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-green-600">
                        {formatCurrency(course.revenue)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600">
                        {formatCurrency(course.coursePrice)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Enrollments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Enrollments
              </h3>
              <Calendar size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentEnrollments.slice(0, 5).map((enrollment) => (
                <div
                  key={enrollment._id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={
                        enrollment.courseThumbnail ||
                        "/placeholder.svg?height=40&width=40"
                      }
                      alt={enrollment.courseTitle}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {enrollment.studentName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {enrollment.courseTitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(enrollment.amount)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(enrollment.enrollmentDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6 ">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Students
              </h3>
              <UserCheck size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div
                  key={student._id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={
                        student.imgUrl || "/placeholder.svg?height=40&width=40"
                      }
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {student.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {student.purchasedCourses} courses
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(student.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
// "use client";

// import {
//   Activity,
//   BarChart3,
//   BookOpen,
//   Calendar,
//   DollarSign,
//   Eye,
//   GraduationCap,
//   PieChartIcon as PieIcon,
//   RefreshCw,
//   TrendingUp,
//   UserCheck,
//   Users,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Line,
//   LineChart,
//   Pie,
//   PieChart as RechartsPieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const AdminDashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchDashboardData = async () => {
//     try {
//       setRefreshing(true);
//       const response = await fetch(
//         "http://localhost:5000/api/dashboard/analytics"
//       );
//       const result = await response.json();

//       if (result.success) {
//         setDashboardData(result.data);
//         setError(null);
//       } else {
//         setError(result.message || "Failed to fetch dashboard data");
//       }
//     } catch (err) {
//       setError("Network error occurred");
//       console.error("Dashboard fetch error:", err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // Colors for charts
//   const COLORS = [
//     "#3B82F6",
//     "#10B981",
//     "#F59E0B",
//     "#EF4444",
//     "#8B5CF6",
//     "#06B6D4",
//     "#84CC16",
//     "#F97316",
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
//                   <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
//                   <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-20"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">
//             ⚠️ Error Loading Dashboard
//           </div>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchDashboardData}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const {
//     overview,
//     recentEnrollments,
//     topCourses,
//     recentStudents,
//     coursesByCategory,
//     revenueByMonth,
//     enrollmentsByStatus,
//     courseLevelDistribution,
//   } = dashboardData;

//   return (
//     <div className="min-h-screen bg-green-50 px-3 rounded-lg ">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Admin Dashboard
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Complete overview of your course platform
//             </p>
//           </div>
//           <button
//             onClick={fetchDashboardData}
//             disabled={refreshing}
//             className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//           >
//             <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
//             Refresh
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Total Students */}
//           <div className="bg-white p-6 rounded-xl   border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Total Students
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {overview.totalStudents.toLocaleString()}
//                 </p>
//                 <div className="flex items-center mt-2">
//                   <TrendingUp size={16} className="text-green-500 mr-1" />
//                   <span className="text-sm text-green-600">
//                     +{overview.growth.students}% this month
//                   </span>
//                 </div>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <Users size={24} className="text-blue-600" />
//               </div>
//             </div>
//           </div>

//           {/* Total Courses */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Total Courses
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {overview.totalCourses}
//                 </p>
//                 <div className="flex items-center mt-2 gap-4">
//                   <span className="text-sm text-green-600">
//                     {overview.publishedCourses} published
//                   </span>
//                   <span className="text-sm text-orange-600">
//                     {overview.draftCourses} draft
//                   </span>
//                 </div>
//               </div>
//               <div className="p-3 bg-green-100 rounded-lg">
//                 <BookOpen size={24} className="text-green-600" />
//               </div>
//             </div>
//           </div>

//           {/* Monthly Revenue */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Monthly Revenue
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(overview.monthlyRevenue)}
//                 </p>
//                 <div className="flex items-center mt-2">
//                   <TrendingUp size={16} className="text-green-500 mr-1" />
//                   <span className="text-sm text-green-600">
//                     +{overview.growth.revenue}% vs last month
//                   </span>
//                 </div>
//               </div>
//               <div className="p-3 bg-yellow-100 rounded-lg">
//                 <DollarSign size={24} className="text-yellow-600" />
//               </div>
//             </div>
//           </div>

//           {/* Total Enrollments */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Total Enrollments
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {overview.totalEnrollments.toLocaleString()}
//                 </p>
//                 <div className="flex items-center mt-2">
//                   <span className="text-sm text-blue-600">
//                     {overview.activeEnrollments} active
//                   </span>
//                 </div>
//               </div>
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <GraduationCap size={24} className="text-purple-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Revenue Trend Chart */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Revenue Trend (Last 12 Months)
//               </h3>
//               <BarChart3 size={20} className="text-gray-400" />
//             </div>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={revenueByMonth}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis tickFormatter={(value) => `$${value}`} />
//                   <Tooltip
//                     formatter={(value) => [formatCurrency(value), "Revenue"]}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="revenue"
//                     stroke="#3B82F6"
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Courses by Category Pie Chart */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Courses by Category
//               </h3>
//               <PieIcon size={20} className="text-gray-400" />
//             </div>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <RechartsPieChart>
//                   <Pie
//                     data={coursesByCategory}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ _id, percent }) =>
//                       `${_id || "Other"} ${(percent * 100).toFixed(0)}%`
//                     }
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="count"
//                   >
//                     {coursesByCategory.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </RechartsPieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Additional Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Enrollment Status Distribution */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Enrollment Status
//               </h3>
//               <Activity size={20} className="text-gray-400" />
//             </div>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={enrollmentsByStatus}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="_id" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#10B981" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Course Level Distribution */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Course Difficulty Levels
//               </h3>
//               <BarChart3 size={20} className="text-gray-400" />
//             </div>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <RechartsPieChart>
//                   <Pie
//                     data={courseLevelDistribution}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ _id, percent }) =>
//                       `${_id} ${(percent * 100).toFixed(0)}%`
//                     }
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="count"
//                   >
//                     {courseLevelDistribution.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </RechartsPieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Top Performing Courses */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 hover:border-primary hover:shadow-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">
//               Top Performing Courses
//             </h3>
//             <Eye size={20} className="text-gray-400" />
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">
//                     Course
//                   </th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">
//                     Enrollments
//                   </th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">
//                     Revenue
//                   </th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">
//                     Price
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {topCourses.map((course, index) => (
//                   <tr
//                     key={course._id}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="py-4 px-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={
//                             course.courseThumbnail ||
//                             "/placeholder.svg?height=40&width=40"
//                           }
//                           alt={course.courseTitle}
//                           className="w-10 h-10 rounded-lg object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {course.courseTitle}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             Rank #{index + 1}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-4">
//                       <span className="font-medium text-gray-900">
//                         {course.enrollmentCount}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4">
//                       <span className="font-medium text-green-600">
//                         {formatCurrency(course.revenue)}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4">
//                       <span className="text-gray-600">
//                         {formatCurrency(course.coursePrice)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Recent Enrollments */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Recent Enrollments
//               </h3>
//               <Calendar size={20} className="text-gray-400" />
//             </div>
//             <div className="space-y-4">
//               {recentEnrollments.slice(0, 5).map((enrollment) => (
//                 <div
//                   key={enrollment._id}
//                   className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
//                 >
//                   <div className="flex-shrink-0">
//                     <img
//                       src={
//                         enrollment.courseThumbnail ||
//                         "/placeholder.svg?height=40&width=40"
//                       }
//                       alt={enrollment.courseTitle}
//                       className="w-10 h-10 rounded-lg object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 truncate">
//                       {enrollment.studentName}
//                     </p>
//                     <p className="text-sm text-gray-500 truncate">
//                       {enrollment.courseTitle}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-medium text-gray-900">
//                       {formatCurrency(enrollment.amount)}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {formatDate(enrollment.enrollmentDate)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recent Students */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-2xl">
//             <div className="flex items-center justify-between mb-6 ">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Recent Students
//               </h3>
//               <UserCheck size={20} className="text-gray-400" />
//             </div>
//             <div className="space-y-4">
//               {recentStudents.map((student) => (
//                 <div
//                   key={student._id}
//                   className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
//                 >
//                   <div className="flex-shrink-0">
//                     <img
//                       src={
//                         student.imgUrl || "/placeholder.svg?height=40&width=40"
//                       }
//                       alt={student.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 truncate">
//                       {student.name}
//                     </p>
//                     <p className="text-sm text-gray-500 truncate">
//                       {student.email}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-medium text-gray-900">
//                       {student.purchasedCourses} courses
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {formatDate(student.createdAt)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;
