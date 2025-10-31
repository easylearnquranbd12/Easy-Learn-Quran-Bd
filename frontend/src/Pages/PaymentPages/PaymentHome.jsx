import { useState } from "react";
import { Link } from "react-router-dom";

const PaymentHome = () => {
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setPaymentDone(false);

    // simulate API call delay
    setTimeout(() => {
      setLoading(false);
      setPaymentDone(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center transition-transform hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          💳 Payment Home
        </h1>
        <p className="text-gray-600 mb-6">
          Complete your secure payment easily and safely.
        </p>

        {/* Payment status message */}
        {paymentDone && (
          <div className="text-green-600 font-semibold mb-4 animate-fadeIn">
            ✅ Payment Successful!
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/payment-confirmed"
            onClick={handlePayment}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-lg shadow-md transition-all 
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Proceed to Payment"
            )}
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentHome;
