"use client";

import {
  BookOpen,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Home,
  PlayCircle,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentConfirmed = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    loadData();
    // startCountdown()
  }, [courseId]);

  const loadData = () => {
    // Load course data
    const selectedCourse = sessionStorage.getItem("selectedCourse");
    if (selectedCourse) {
      setCourse(JSON.parse(selectedCourse));
    }

    // Load transaction data
    const lastTransaction = sessionStorage.getItem("lastTransaction");
    if (lastTransaction) {
      setTransaction(JSON.parse(lastTransaction));
    }

    // If no data, redirect to courses
    // if (!selectedCourse || !lastTransaction) {
    //   navigate("/courses");
    // }
  };

  // const startCountdown = () => {
  //     const timer = setInterval(() => {
  //         setCountdown((prev) => {
  //             if (prev <= 1) {
  //                 clearInterval(timer)
  //                 navigate("/courses")
  //                 return 0
  //             }
  //             return prev - 1
  //         })
  //     }, 1000)

  //     return () => clearInterval(timer)
  // }

  const downloadReceipt = () => {
    if (!transaction || !course) return;

    const receiptData = {
      transactionId: transaction.id,
      courseTitle: course.title,
      amount: course.price,
      date: new Date(transaction.date).toLocaleDateString(),
      paymentMethod: transaction.paymentMethod,
      instructor: course.instructor.name,
    };

    const receiptText = `
COURSE ENROLLMENT RECEIPT
========================

Transaction ID: ${receiptData.transactionId}
Course: ${receiptData.courseTitle}
Instructor: ${receiptData.instructor}
Amount: ${course.price === 0 ? "Free" : `$${receiptData.amount}`}
Date: ${receiptData.date}
Payment Method: ${receiptData.paymentMethod}

Thank you for your enrollment!
    `.trim();

    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${receiptData.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareSuccess = () => {
    if (navigator.share) {
      navigator.share({
        title: `I just enrolled in ${course?.title}!`,
        text: `Check out this amazing course: ${course?.title}`,
        url: window.location.origin + `/course-details/${courseId}`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I just enrolled in ${course?.title}! Check it out: ${window.location.origin}/course-details/${courseId}`
      );
      showNotification("Link copied to clipboard!", "success");
    }
  };

  const showNotification = (message, type = "info") => {
    const notification = document.createElement("div");
    const bgColor =
      {
        success: "bg-emerald-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        warning: "bg-amber-600",
      }[type] || "bg-gray-600";

    notification.className = `fixed top-6 right-6 p-4 rounded-xl z-50 ${bgColor} text-white shadow-2xl transition-all duration-500 opacity-0 transform translate-x-full`;
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span class="font-medium">${message}</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove("opacity-0", "translate-x-full");
      notification.classList.add("opacity-100", "translate-x-0");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("opacity-100", "translate-x-0");
      notification.classList.add("opacity-0", "translate-x-full");
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 4000);
  };

  if (!course || !transaction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg font-medium">
            Loading confirmation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 rounded-md">
      {/* Success Animation Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/25">
              <CheckCircle size={48} className="text-white" />
            </div>
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-full animate-ping"></div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-4">
            🎉 Enrollment Successful!
          </h1>
          <p className="text-xl text-black mb-2">
            Welcome to{" "}
            <span className="text-blue-400 font-semibold">{course.title}</span>
          </p>
          <p className="text-gray-900">
            You're now part of a community of{" "}
            {course.enrollmentCount?.toLocaleString()} learners
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Course Details */}
          <div className="bg-blue-100 backdrop-blur-sm rounded-2xl p-8 border border-blue-700 shadow-xl hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="text-indigo-600"> Your Course</span>
            </h2>

            <div className="flex gap-4 mb-6">
              <img
                src={course.thumbnailUrl || "/placeholder.svg"}
                alt={course.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-black text-lg mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-800 text-sm mb-2">
                  by {course.instructor.name}
                </p>
                <div className="flex items-center gap-4 text-sm text-green-800">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-current" />
                    {course.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-600/10 rounded-xl border border-emerald-600/20">
                <span className="text-emerald-400 font-medium">
                  Course Access
                </span>
                <span className="text-emerald-400 font-bold">Lifetime</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-600/10 rounded-xl border border-blue-600/20">
                <span className="text-blue-400 font-medium">Certificate</span>
                <span className="text-blue-400 font-bold">Included</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-600/10 rounded-xl border border-purple-600/20">
                <span className="text-purple-400 font-medium">Support</span>
                <span className="text-purple-400 font-bold">Community</span>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-indigo-100 backdrop-blur-sm rounded-2xl p-8 border border-indigo-600 hover:shadow-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <CreditCard size={18} className="text-white" />
              </div>
              <span className="text-emerald-600">Transaction Details</span>
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Transaction ID</span>
                <span className="text-black font-mono text-sm">
                  {transaction.id}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-900">Amount Paid</span>
                <span className="text-black font-semibold">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-900">Payment Method</span>
                <span className="text-black capitalize">
                  {transaction.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-900">Date</span>
                <span className="text-black">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-900">Status</span>
                <span className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle size={16} />
                  Completed
                </span>
              </div>
            </div>

            <button
              onClick={downloadReceipt}
              className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-900 border border-indigo-700 rounded-xl text-white font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Receipt
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-green-50 backdrop-blur-sm rounded-2xl p-8 border border-green-500 shadow-xl hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            What's Next?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate(`/course-details/${courseId}`)}
              className="flex flex-col items-center gap-3 p-6 bg-blue-600/20 hover:bg-blue-600/30 rounded-xl border border-blue-600/30 transition-all duration-300 hover:scale-105"
            >
              <PlayCircle size={32} className="text-blue-700" />
              <span className="text-white font-medium">Start Learning</span>
            </button>

            <button
              onClick={() => navigate("/user-dashboard")}
              className="flex flex-col items-center gap-3 p-6 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-xl border border-emerald-600/30 transition-all duration-300 hover:scale-105"
            >
              <Users size={32} className="text-emerald-700" />
              <span className="text-white font-medium">My Dashboard</span>
            </button>

            <button
              onClick={shareSuccess}
              className="flex flex-col items-center gap-3 p-6 bg-purple-600/20 hover:bg-purple-600/30 rounded-xl border border-purple-600/30 transition-all duration-300 hover:scale-105"
            >
              <Share2 size={32} className="text-purple-700" />
              <span className="text-white font-medium">Share Success</span>
            </button>

            <button
              onClick={() => navigate("/courses")}
              className="flex flex-col items-center gap-3 p-6 bg-amber-600/20 hover:bg-amber-600/30 rounded-xl border border-amber-600/30 transition-all duration-300 hover:scale-105"
            >
              <BookOpen size={32} className="text-amber-700" />
              <span className="text-white font-medium">Browse More</span>
            </button>
          </div>
        </div>

        {/* Auto Redirect Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-400 rounded-xl border border-indigo-500">
            <Home size={18} className="text-white" />
            <span className="text-white">
              Redirecting to courses in{" "}
              <span className="text-blue-800 font-bold">{countdown}</span>{" "}
              seconds
            </span>
          </div>
          <p className="text-gray-900 text-sm mt-2">
            Click any button above to stay on this page
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmed;
