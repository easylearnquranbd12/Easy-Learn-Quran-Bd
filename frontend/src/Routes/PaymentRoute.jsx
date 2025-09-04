import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PaymentRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
   

        const res = await axios.get(`/api/enrollments/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // যদি active enrollment থাকে, সব layer access
        const activeEnrollment = res.data.data.find(
          (enrollment) => enrollment.status === "active"
        );

        setHasAccess(!!activeEnrollment);
      } catch (error) {
        console.error("Payment status fetch error:", error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (hasAccess) {
    return children; // Access granted
  }

  return <Navigate to="/payment-confirmed" replace />; // Pending / No enrollment
};

export default PaymentRoute;
