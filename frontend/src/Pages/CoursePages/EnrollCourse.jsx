"use client";

import axios from "axios";
import { AlertCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../hooks/useAuth";

const EnrollCourse = () => {
  // const [users] = useAuth
  const { user } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentNumbers, setPaymentNumbers] = useState({});
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    transactionId: "",
    paymentMethod: "",
    agreeToTerms: false,
    userName: "",
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
            label: `${
              item.paymentType.charAt(0).toUpperCase() +
              item.paymentType.slice(1)
            } (${item.accountType})`,
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

    if (!formData.userName.trim()) {
      setError("Please enter your full name");
      return false;
    }

    if (!formData.transactionId.trim()) {
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
  };

  return (
    <div className="min-h-screen bg-[#f0f5f3]">
      <TittleAnimation
        tittle="Complete Your Purchase"
        subtittle={"Learning Quiz Platform Advanced Quiz Access"}
      />

      <div className="max-w-5xl mx-auto md:px-4 py-8">
        <div className="space-y-8">
          {/* User Information Form */}
          <div className="bg-[#f0f1f1] backdrop-blur-sm rounded-xl p-4 md:p-6 border border-borderColor shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users size={18} className="text-white" />
              </div>
              User Information
            </h2>

            <form onSubmit={handleEnrollment} className="space-y-6">
              {/* User Name */}
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white border border-indigo-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Student Email */}
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Email Address
                </label>
                <input
                  disabled
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={user?.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white  rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

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
                          ⚠️ Please make sure you're using your{" "}
                          <strong>personal Bkash</strong> account to send the
                          payment.
                        </p>
                      )}

                      {formData.paymentMethod === "bkash_agent" && (
                        <p className="text-sm text-red-600 mb-2">
                          ⚠️ You're using an <strong>agent Bkash</strong>{" "}
                          account. Make sure to include{" "}
                          <strong>extra charge</strong> if applicable.
                        </p>
                      )}

                      {formData.paymentMethod?.startsWith("nagad") && (
                        <p className="text-sm text-orange-600 mb-2">
                          🔔 Make sure your Nagad account is active and has
                          sufficient balance before payment.
                        </p>
                      )}

                      {formData.paymentMethod?.startsWith("rocket") && (
                        <p className="text-sm text-blue-600 mb-2">
                          ℹ️ Rocket transaction charge may apply. Use your own
                          account for payment.
                        </p>
                      )}

                      {formData.paymentMethod?.startsWith("bank") && (
                        <p className="text-sm text-indigo-600 mb-2">
                          🏦 Please transfer from your bank app or nearest
                          branch using the provided account number.
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
                    Your{" "}
                    {paymentNumbers[formData.paymentMethod]?.label
                      ?.split(" ")
                      .slice(0, 1)
                      .join(" ")}{" "}
                    Number *
                  </label>
                  <input
                    type="text"
                    id="userPaymentMethod"
                    name="userPaymentMethod"
                    value={formData.userPaymentMethod}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${paymentNumbers[
                      formData.paymentMethod
                    ]?.label
                      ?.split(" ")
                      .slice(0, 1)
                      .join(" ")} number`}
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
                    Please enter the transaction ID from your payment
                    confirmation
                  </p>
                </div>
              </>

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
                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Enroll Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourse;
