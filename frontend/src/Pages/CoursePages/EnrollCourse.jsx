"use client";

import axios from "axios";
import {
    AlertCircle,
    Award,
    BookOpen,
    CheckCircle,
    Clock,
    Download,
    Lock,
    Shield,
    Smartphone,
    Star,
    Users,
    Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CourseApiClient from "../../components/Admin/ManageCourse/api-client";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../hooks/useAuth";

const EnrollCourse = () => {
  // const [users] = useAuth
  const { user } = useAuth();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const apiClient = new CourseApiClient();
 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const [paymentNumbers, setPaymentNumbers] = useState({});
    const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    transactionId: "",
    paymentMethod: "",
    agreeToTerms: false,
    studentName: "",
    userPaymentMethod: "",
  });


 useEffect(() => {
  axios
    .get("http://localhost:5000/paymentMethod")
    .then((res) => {
      const methods = {};
      res.data.forEach((item) => {
        const key = `${item.paymentType}_${item.accountType}`;
        methods[key] = {
          label: `${item.paymentType.charAt(0).toUpperCase() + item.paymentType.slice(1)} (${item.accountType})`,
          adminNumber: item.number,
        };
      });
      setPaymentNumbers(methods);
    })
    .catch((err) => {
      console.error("Failed to fetch payment methods:", err);
    });
}, []);



 
const handleCopy = () => {
  if (!formData.paymentMethod) return;
  const number = paymentNumbers[formData.paymentMethod]?.adminNumber;
  if (number) {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
};


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    loadCourseData();
  }, [courseId]);

  const loadCourseData = () => {
    const selectedCourse = sessionStorage.getItem("selectedCourse");
    if (selectedCourse) {
      setCourse(JSON.parse(selectedCourse));
    } else {
      const allCourses = sessionStorage.getItem("allCourses");
      if (allCourses) {
        const courses = JSON.parse(allCourses);
        const foundCourse = courses.find((c) => c._id === courseId);
        if (foundCourse) {
          setCourse(foundCourse);
          sessionStorage.setItem("selectedCourse", JSON.stringify(foundCourse));
        } else {
          navigate("/courses");
        }
      } else {
        navigate("/courses");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return false;
    }

    if (!formData.studentName.trim()) {
      setError("Please enter your full name");
      return false;
    }

    if (course.price > 0 && !formData.transactionId.trim()) {
      setError("Please enter a valid transaction ID");
      return false;
    }

    return true;
  };

  const handleEnrollment = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare enrollment data
      const enrollmentData = {
        courseId: course._id,
        studentData: {
          id: Date.now().toString(), // In real app, this would be the authenticated user ID
          name: formData.studentName,
          email: user?.email,
        },
        transactionData: {
          transactionId: formData.transactionId || `FREE_${Date.now()}`,
          paymentMethod: formData.paymentMethod,
          amount: course.price,
          userPaymentMethod: formData.userPaymentMethod,
          currency: "USD",
          date: new Date().toISOString(),
        },
      };

      console.log("=== ENROLLMENT DATA ===");
      console.log("Course ID:", enrollmentData.courseId);
      console.log("Course Title:", course.title);
      console.log("Student Data:", enrollmentData.studentData);
      console.log("Transaction Data:", enrollmentData.transactionData);
      console.log("Enrollment Timestamp:", new Date().toISOString());
      console.log("========================");

      // Send enrollment data to server
      const result = await apiClient.enrollInCourse(enrollmentData);

      console.log("=== SERVER RESPONSE ===");
      console.log("Enrollment Result:", result);
      console.log("Updated Course:", result.course);
      console.log("=======================");

      // Create transaction record for local storage
      const transaction = {
        id:
          result.enrollment.transactionId ||
          enrollmentData.transactionData.transactionId,
        courseId: course._id,
        courseTitle: course.title,
        amount: course.price,
        transactionId: enrollmentData.transactionData.transactionId,
        paymentMethod: formData.paymentMethod,
        date: new Date().toISOString(),
        status: "completed",
        studentName: formData.studentName,
        studentEmail: user?.email,
      };

      // Save transaction to session storage
      const transactions = JSON.parse(
        sessionStorage.getItem("courseTransactions") || "[]"
      );
      transactions.push(transaction);
      sessionStorage.setItem(
        "courseTransactions",
        JSON.stringify(transactions)
      );
      sessionStorage.setItem("lastTransaction", JSON.stringify(transaction));

      // Add to enrolled courses
      const enrolledCourses = JSON.parse(
        sessionStorage.getItem("enrolledCourses") || "[]"
      );
      if (!enrolledCourses.includes(course._id)) {
        enrolledCourses.push(course._id);
        sessionStorage.setItem(
          "enrolledCourses",
          JSON.stringify(enrolledCourses)
        );
      }

      // Update course data with new enrollment count
      if (result.course) {
        sessionStorage.setItem("selectedCourse", JSON.stringify(result.course));
      }

      showNotification("Enrollment successful! Redirecting...", "success");

      // Navigate to confirmation page after a short delay
      setTimeout(() => {
        navigate(`/payment-confirmed/${course._id}`);
      }, 1500);
    } catch (error) {
      console.error("Enrollment Error:", error);
      setError(error.message || "Enrollment failed. Please try again.");
      showNotification("Enrollment failed. Please try again.", "error");
    } finally {
      setLoading(false);
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

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg font-medium">
            Loading enrollment details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TittleAnimation
        tittle="Complete Your Enrollment"
        subtittle={`Join thousands of students learning ${course.title}`}
      />

      <div className="max-w-7xl mx-auto md:px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enrollment Form */}
          <div className="space-y-8">
            {/* Course Summary */}
            <div className="bg-green-50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-borderColor shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen size={18} className="text-white" />
                </div>
                Course Summary
              </h2>

              <div className="flex gap-4">
                <img
                  src={course.thumbnailUrl || "/placeholder.svg"}
                  alt={course.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-lg mb-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 md:gap-4 text-sm text-green-900 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {course.enrollmentCount} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-current" />
                      {course.rating}
                    </span>
                  </div>
                  <p className="text-black text-sm">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Student Information Form */}
            <div className="bg-green-50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-borderColor shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Users size={18} className="text-white" />
                </div>
                Student Information
              </h2>

              <form onSubmit={handleEnrollment} className="space-y-6">
                {/* Student Name */}
                <div>
                  <label
                    htmlFor="studentName"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Student Email */}
                <div>
                  <label
                    htmlFor="studentEmail"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Email Address 
                  </label>
                  <input
                    disabled
                    type="email"
                    id="studentEmail"
                    name="studentEmail"
                    value={user?.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white  rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
    {course.price > 0 ? (
        <>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Payment Method *
            </label>
         <select
  name="paymentMethod"
  value={formData.paymentMethod || ""}
  onChange={handleInputChange}
  className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black"
  required
>
  <option value="" disabled>
    Select Payment Method
  </option>
  {Object.entries(paymentNumbers).map(([key, val]) => (
    <option key={key} value={key}>
      {val.label}
    </option>
  ))}
</select>

          </div>

        

<div>
  {formData.paymentMethod ? (
    <>
      <label className="block text-sm font-medium text-black mb-2">
       {paymentNumbers[formData.paymentMethod]?.label} Number *
      </label>

      {/* Conditionally show custom message if bkash */}

{formData.paymentMethod === "bkash_personal" && (
  <p className="text-sm text-red-600 mb-2">
    ⚠️ Please make sure you're using your <strong>personal Bkash</strong> account to send the payment.
  </p>
)}

{formData.paymentMethod === "bkash_agent" && (
  <p className="text-sm text-red-600 mb-2">
    ⚠️ You're using an <strong>agent Bkash</strong> account. Make sure to include <strong>extra charge</strong> if applicable.
  </p>
)}

{formData.paymentMethod?.startsWith("nagad") && (
  <p className="text-sm text-orange-600 mb-2">
    🔔 Make sure your Nagad account is active and has sufficient balance before payment.
  </p>
)}

{formData.paymentMethod?.startsWith("rocket") && (
  <p className="text-sm text-blue-600 mb-2">
    ℹ️ Rocket transaction charge may apply. Use your own account for payment.
  </p>
)}

{formData.paymentMethod?.startsWith("bank") && (
  <p className="text-sm text-indigo-600 mb-2">
    🏦 Please transfer from your bank app or nearest branch using the provided account number.
  </p>
)}



      <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3">
        <span className="text-primary font-medium tracking-wide">
          {paymentNumbers[formData.paymentMethod]?.adminNumber}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="ml-4 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md transition-all"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </>
  ) : (
    <div className="bg-white border border-dashed border-red-400 text-red-500 text-sm px-4 py-3 rounded-lg">
      Please select your payment method
    </div>
  )}
</div>






          {/* User Number Input */}
         <div>
  <label
    htmlFor="userPaymentMethod"
    className="block text-sm font-medium text-black mb-2"
  >
    Your {paymentNumbers[formData.paymentMethod]?.label?.split(" ").slice(0, 1).join(" ")} Number *
  </label>
  <input
    type="text"
    id="userPaymentMethod"
    name="userPaymentMethod"
    value={formData.userPaymentMethod}
    onChange={handleInputChange}
    placeholder={`Enter your ${paymentNumbers[formData.paymentMethod]?.label?.split(" ").slice(0, 1).join(" ")} number`}
    className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
    required
  />
</div>


          {/* Transaction ID */}
          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-black mb-2"
            >
              Transaction ID *
            </label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              placeholder="Enter your transaction ID"
              className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <p className="text-black text-sm mt-2">
              Please enter the transaction ID from your payment confirmation
            </p>
          </div>
        </>
      ) 
               : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Free Course!
                    </h3>
                    <p className="text-black">
                      No payment required. Fill in your details to enroll
                      instantly.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-600/10 border border-red-600/20 rounded-xl">
                    <AlertCircle
                      size={20}
                      className="text-red-400 flex-shrink-0"
                    />
                    <span className="text-red-400">{error}</span>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-black">
                    I agree to the <button type="button"></button>{" "}
                    <Link
                      className="text-primary hover:text-hoverPrimary underline"
                      to={"/terms-and-conditions"}
                    >
                      Terms of Service{" "}
                    </Link>
                    and{" "}
                    <Link
                      className="text-primary hover:text-hoverPrimary underline"
                      to={"/privacy-policy"}
                    >
                      Privacy Policy{" "}
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl ${
                    loading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                      Processing Enrollment...
                    </div>
                  ) : course.price === 0 ? (
                    "Enroll for Free"
                  ) : (
                    `Complete Enrollment - ৳ ${course.price}`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <div className="bg-green-50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-borderColor shadow-lg hover:shadow-2xl transition-shadow duration-300 sticky top-24">
              <h2 className="text-xl font-bold text-indigo-600 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-black">Course Price</span>
                  <span className="text-primary font-semibold">
                    {course.price === 0 ? "Free" : `৳ ${course.price}`}
                  </span>
                </div>

                {course.price > 0 && (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-black">Processing Fee</span>
                      <span className="text-primary">৳ 0.00</span>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-black">
                          Total
                        </span>
                        <span className="text-2xl md:text-3xl font-bold text-primary">
                          ৳ {course.price}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <h3 className="text-sm font-semibold text-black mb-4">
                  Security & Guarantees
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: "SSL Encrypted Payment" },
                    { icon: Lock, text: "Secure Transaction" },
                    { icon: CheckCircle, text: "30-Day Money Back" },
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent size={16} className="text-emerald-700" />
                        <span className="text-black text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What's Included */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <h3 className="text-sm font-semibold text-black mb-4">
                  What's Included
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: BookOpen,
                      text: `${course.contents?.length || 0} Video Lessons`,
                    },
                    { icon: Download, text: "Downloadable Resources" },
                    { icon: Award, text: "Certificate of Completion" },
                    { icon: Smartphone, text: "Mobile & Desktop Access" },
                    { icon: Zap, text: "Lifetime Access" },
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent size={16} className="text-blue-700" />
                        <span className="text-black text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourse;
// "use client";

// import {
//   AlertCircle,
//   Award,
//   BookOpen,
//   CheckCircle,
//   Clock,
//   Download,
//   Lock,
//   Shield,
//   Smartphone,
//   Star,
//   Users,
//   Zap,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import CourseApiClient from "../../components/Admin/ManageCourse/api-client";
// import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
// import useAuth from "../../hooks/useAuth";

// const EnrollCourse = () => {
//   // const [users] = useAuth
//   const { user } = useAuth();
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const apiClient = new CourseApiClient();
//  const [copied, setCopied] = useState(false);
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     transactionId: "",
//     paymentMethod: "",
//     agreeToTerms: false,
//     studentName: "",
//     userPaymentMethod: "",
//   });


//   const paymentNumbers = {
//     bkash: { label: "Bkash", adminNumber: "017XXXXXXXX" },
//     nagad: { label: "Nagad", adminNumber: "018XXXXXXXX" },
//   };

 

//   const handleCopy = () => {
//     const number = paymentNumbers[formData.paymentMethod]?.adminNumber;
//     navigator.clipboard.writeText(number);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   useEffect(() => {
//     loadCourseData();
//   }, [courseId]);

//   const loadCourseData = () => {
//     const selectedCourse = sessionStorage.getItem("selectedCourse");
//     if (selectedCourse) {
//       setCourse(JSON.parse(selectedCourse));
//     } else {
//       const allCourses = sessionStorage.getItem("allCourses");
//       if (allCourses) {
//         const courses = JSON.parse(allCourses);
//         const foundCourse = courses.find((c) => c._id === courseId);
//         if (foundCourse) {
//           setCourse(foundCourse);
//           sessionStorage.setItem("selectedCourse", JSON.stringify(foundCourse));
//         } else {
//           navigate("/courses");
//         }
//       } else {
//         navigate("/courses");
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     // Clear error when user starts typing
//     if (error) setError("");
//   };

//   const validateForm = () => {
//     if (!formData.agreeToTerms) {
//       setError("Please agree to the terms and conditions");
//       return false;
//     }

//     if (!formData.studentName.trim()) {
//       setError("Please enter your full name");
//       return false;
//     }

//     if (course.price > 0 && !formData.transactionId.trim()) {
//       setError("Please enter a valid transaction ID");
//       return false;
//     }

//     return true;
//   };

//   const handleEnrollment = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       // Prepare enrollment data
//       const enrollmentData = {
//         courseId: course._id,
//         studentData: {
//           id: Date.now().toString(), // In real app, this would be the authenticated user ID
//           name: formData.studentName,
//           email: user?.email,
//         },
//         transactionData: {
//           transactionId: formData.transactionId || `FREE_${Date.now()}`,
//           paymentMethod: formData.paymentMethod,
//           amount: course.price,
//           userPaymentMethod: formData.userPaymentMethod,
//           currency: "USD",
//           date: new Date().toISOString(),
//         },
//       };

//       console.log("=== ENROLLMENT DATA ===");
//       console.log("Course ID:", enrollmentData.courseId);
//       console.log("Course Title:", course.title);
//       console.log("Student Data:", enrollmentData.studentData);
//       console.log("Transaction Data:", enrollmentData.transactionData);
//       console.log("Enrollment Timestamp:", new Date().toISOString());
//       console.log("========================");

//       // Send enrollment data to server
//       const result = await apiClient.enrollInCourse(enrollmentData);

//       console.log("=== SERVER RESPONSE ===");
//       console.log("Enrollment Result:", result);
//       console.log("Updated Course:", result.course);
//       console.log("=======================");

//       // Create transaction record for local storage
//       const transaction = {
//         id:
//           result.enrollment.transactionId ||
//           enrollmentData.transactionData.transactionId,
//         courseId: course._id,
//         courseTitle: course.title,
//         amount: course.price,
//         transactionId: enrollmentData.transactionData.transactionId,
//         paymentMethod: formData.paymentMethod,
//         date: new Date().toISOString(),
//         status: "completed",
//         studentName: formData.studentName,
//         studentEmail: user?.email,
//       };

//       // Save transaction to session storage
//       const transactions = JSON.parse(
//         sessionStorage.getItem("courseTransactions") || "[]"
//       );
//       transactions.push(transaction);
//       sessionStorage.setItem(
//         "courseTransactions",
//         JSON.stringify(transactions)
//       );
//       sessionStorage.setItem("lastTransaction", JSON.stringify(transaction));

//       // Add to enrolled courses
//       const enrolledCourses = JSON.parse(
//         sessionStorage.getItem("enrolledCourses") || "[]"
//       );
//       if (!enrolledCourses.includes(course._id)) {
//         enrolledCourses.push(course._id);
//         sessionStorage.setItem(
//           "enrolledCourses",
//           JSON.stringify(enrolledCourses)
//         );
//       }

//       // Update course data with new enrollment count
//       if (result.course) {
//         sessionStorage.setItem("selectedCourse", JSON.stringify(result.course));
//       }

//       showNotification("Enrollment successful! Redirecting...", "success");

//       // Navigate to confirmation page after a short delay
//       setTimeout(() => {
//         navigate(`/payment-confirmed/${course._id}`);
//       }, 1500);
//     } catch (error) {
//       console.error("Enrollment Error:", error);
//       setError(error.message || "Enrollment failed. Please try again.");
//       showNotification("Enrollment failed. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showNotification = (message, type = "info") => {
//     const notification = document.createElement("div");
//     const bgColor =
//       {
//         success: "bg-emerald-600",
//         error: "bg-red-600",
//         info: "bg-blue-600",
//         warning: "bg-amber-600",
//       }[type] || "bg-gray-600";

//     notification.className = `fixed top-6 right-6 p-4 rounded-xl z-50 ${bgColor} text-white shadow-2xl transition-all duration-500 opacity-0 transform translate-x-full`;
//     notification.innerHTML = `
//       <div class="flex items-center gap-3">
//         <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//         <span class="font-medium">${message}</span>
//       </div>
//     `;
//     document.body.appendChild(notification);

//     setTimeout(() => {
//       notification.classList.remove("opacity-0", "translate-x-full");
//       notification.classList.add("opacity-100", "translate-x-0");
//     }, 100);

//     setTimeout(() => {
//       notification.classList.remove("opacity-100", "translate-x-0");
//       notification.classList.add("opacity-0", "translate-x-full");
//       setTimeout(() => {
//         if (document.body.contains(notification)) {
//           document.body.removeChild(notification);
//         }
//       }, 500);
//     }, 4000);
//   };

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-6"></div>
//           <p className="text-gray-400 text-lg font-medium">
//             Loading enrollment details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <TittleAnimation
//         tittle="Complete Your Enrollment"
//         subtittle={`Join thousands of students learning ${course.title}`}
//       />

//       <div className="max-w-7xl mx-auto md:px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Enrollment Form */}
//           <div className="space-y-8">
//             {/* Course Summary */}
//             <div className="bg-green-50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-borderColor shadow-lg hover:shadow-2xl transition-shadow duration-300">
//               <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-3">
//                 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                   <BookOpen size={18} className="text-white" />
//                 </div>
//                 Course Summary
//               </h2>

//               <div className="flex gap-4">
//                 <img
//                   src={course.thumbnailUrl || "/placeholder.svg"}
//                   alt={course.title}
//                   className="w-20 h-20 rounded-xl object-cover"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-black text-lg mb-2">
//                     {course.title}
//                   </h3>
//                   <div className="flex items-center gap-2 md:gap-4 text-sm text-green-900 mb-2">
//                     <span className="flex items-center gap-1">
//                       <Clock size={14} />
//                       {course.duration}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Users size={14} />
//                       {course.enrollmentCount} students
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Star size={14} className="text-amber-400 fill-current" />
//                       {course.rating}
//                     </span>
//                   </div>
//                   <p className="text-black text-sm">{course.instructor.name}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Student Information Form */}
//             <div className="bg-green-50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-borderColor shadow-lg hover:shadow-2xl transition-shadow duration-300">
//               <h2 className="text-xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
//                 <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
//                   <Users size={18} className="text-white" />
//                 </div>
//                 Student Information
//               </h2>

//               <form onSubmit={handleEnrollment} className="space-y-6">
//                 {/* Student Name */}
//                 <div>
//                   <label
//                     htmlFor="studentName"
//                     className="block text-sm font-medium text-black mb-2"
//                   >
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="studentName"
//                     name="studentName"
//                     value={formData.studentName}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
//                     required
//                   />
//                 </div>

//                 {/* Student Email */}
//                 <div>
//                   <label
//                     htmlFor="studentEmail"
//                     className="block text-sm font-medium text-black mb-2"
//                   >
//                     Email Address 
//                   </label>
//                   <input
//                     disabled
//                     type="email"
//                     id="studentEmail"
//                     name="studentEmail"
//                     value={user?.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter your email address"
//                     className="w-full px-4 py-3 bg-white  rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 {course.price > 0 ? (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-black mb-2">
//                         Payment Method *
//                       </label>
//                       <select
//                         name="paymentMethod"
//                         value={formData.paymentMethod || ""}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       >
//                         <option value="" disabled>
//                           Your Payment Method
//                         </option>
//                         <option value="bkash">Bkash</option>
//                         <option value="nagad">Nagad</option>
//                       </select>
//                     </div>

//                     {/* Admin Bkash/Nagad Number Display with Copy Button */}
//                     <div>
//                       <label className="block text-sm font-medium text-black mb-2">
//                         {paymentNumbers[formData.paymentMethod]?.label ||
//                           "Payment"}{" "}
//                         Number (Admin) *
//                       </label>

//                       {formData.paymentMethod ? (
//                         <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3">
//                           <span className="text-primary font-medium tracking-wide">
//                             {paymentNumbers[formData.paymentMethod].adminNumber}
//                           </span>
//                           <button
//                             type="button"
//                             onClick={handleCopy}
//                             className="ml-4 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md transition-all"
//                           >
//                             {copied ? "Copied!" : "Copy"}
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="bg-white border border-dashed border-red-400 text-red-500 text-sm px-4 py-3 rounded-lg">
//                           Please select your payment method
//                         </div>
//                       )}
//                     </div>

//                     {/* User Bkash/Nagad Number Input */}
//                     <div>
//                       <label
//                         htmlFor="userPaymentMethod"
//                         className="block text-sm font-medium text-black mb-2"
//                       >
//                         Your {paymentNumbers[formData.paymentMethod]?.label}{" "}
//                         Number *
//                       </label>
//                       <input
//                         type="text"
//                         id="userPaymentMethod"
//                         name="userPaymentMethod"
//                         value={formData.userPaymentMethod}
//                         onChange={handleInputChange}
//                         placeholder={`Enter your ${
//                           paymentNumbers[formData.paymentMethod]?.label
//                         } number`}
//                         className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
//                         required
//                       />
//                     </div>

//                     {/* Transaction ID */}
//                     <div>
//                       <label
//                         htmlFor="transactionId"
//                         className="block text-sm font-medium text-black mb-2"
//                       >
//                         Transaction ID *
//                       </label>
//                       <input
//                         type="text"
//                         id="transactionId"
//                         name="transactionId"
//                         value={formData.transactionId}
//                         onChange={handleInputChange}
//                         placeholder="Enter your transaction ID"
//                         className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                       <p className="text-black text-sm mt-2">
//                         Please enter the transaction ID from your payment
//                         confirmation
//                       </p>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <CheckCircle size={32} className="text-emerald-400" />
//                     </div>
//                     <h3 className="text-xl font-bold text-white mb-2">
//                       Free Course!
//                     </h3>
//                     <p className="text-black">
//                       No payment required. Fill in your details to enroll
//                       instantly.
//                     </p>
//                   </div>
//                 )}

//                 {/* Error Message */}
//                 {error && (
//                   <div className="flex items-center gap-3 p-4 bg-red-600/10 border border-red-600/20 rounded-xl">
//                     <AlertCircle
//                       size={20}
//                       className="text-red-400 flex-shrink-0"
//                     />
//                     <span className="text-red-400">{error}</span>
//                   </div>
//                 )}

//                 {/* Terms and Conditions */}
//                 <div className="flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     id="agreeToTerms"
//                     name="agreeToTerms"
//                     checked={formData.agreeToTerms}
//                     onChange={handleInputChange}
//                     className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
//                     required
//                   />
//                   <label htmlFor="agreeToTerms" className="text-sm text-black">
//                     I agree to the <button type="button"></button>{" "}
//                     <Link
//                       className="text-primary hover:text-hoverPrimary underline"
//                       to={"/terms-and-conditions"}
//                     >
//                       Terms of Service{" "}
//                     </Link>
//                     and{" "}
//                     <Link
//                       className="text-primary hover:text-hoverPrimary underline"
//                       to={"/privacy-policy"}
//                     >
//                       Privacy Policy{" "}
//                     </Link>
//                   </label>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl ${
//                     loading
//                       ? "bg-gray-600 text-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
//                   }`}
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center gap-3">
//                       <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
//                       Processing Enrollment...
//                     </div>
//                   ) : course.price === 0 ? (
//                     "Enroll for Free"
//                   ) : (
//                     `Complete Enrollment - $${course.price}`
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="space-y-6">
//             {/* Price Breakdown */}
//             <div className="bg-green-50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-borderColor shadow-lg hover:shadow-2xl transition-shadow duration-300 sticky top-24">
//               <h2 className="text-xl font-bold text-indigo-600 mb-6">
//                 Order Summary
//               </h2>

//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-black">Course Price</span>
//                   <span className="text-primary font-semibold">
//                     {course.price === 0 ? "Free" : `৳ ${course.price}`}
//                   </span>
//                 </div>

//                 {course.price > 0 && (
//                   <>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-black">Processing Fee</span>
//                       <span className="text-primary">৳ 0.00</span>
//                     </div>
//                     <div className="border-t border-gray-300 pt-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-lg font-semibold text-black">
//                           Total
//                         </span>
//                         <span className="text-2xl md:text-3xl font-bold text-primary">
//                           ৳ {course.price}
//                         </span>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Security Features */}
//               <div className="mt-6 pt-6 border-t border-gray-300">
//                 <h3 className="text-sm font-semibold text-black mb-4">
//                   Security & Guarantees
//                 </h3>
//                 <div className="space-y-3">
//                   {[
//                     { icon: Shield, text: "SSL Encrypted Payment" },
//                     { icon: Lock, text: "Secure Transaction" },
//                     { icon: CheckCircle, text: "30-Day Money Back" },
//                   ].map((item, index) => {
//                     const IconComponent = item.icon;
//                     return (
//                       <div key={index} className="flex items-center gap-3">
//                         <IconComponent size={16} className="text-emerald-700" />
//                         <span className="text-black text-sm">{item.text}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* What's Included */}
//               <div className="mt-6 pt-6 border-t border-gray-300">
//                 <h3 className="text-sm font-semibold text-black mb-4">
//                   What's Included
//                 </h3>
//                 <div className="space-y-3">
//                   {[
//                     {
//                       icon: BookOpen,
//                       text: `${course.contents?.length || 0} Video Lessons`,
//                     },
//                     { icon: Download, text: "Downloadable Resources" },
//                     { icon: Award, text: "Certificate of Completion" },
//                     { icon: Smartphone, text: "Mobile & Desktop Access" },
//                     { icon: Zap, text: "Lifetime Access" },
//                   ].map((item, index) => {
//                     const IconComponent = item.icon;
//                     return (
//                       <div key={index} className="flex items-center gap-3">
//                         <IconComponent size={16} className="text-blue-700" />
//                         <span className="text-black text-sm">{item.text}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnrollCourse;
