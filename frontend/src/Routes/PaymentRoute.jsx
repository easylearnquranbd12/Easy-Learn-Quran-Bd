// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAuth from "../hooks/useAuth";

// const fetchPayments = async () => {
//   const res = await axios.get("http://localhost:5000/payment/admin");
//   return res.data;
// };

// const PaymentRoute = ({ children }) => {
//   const { user } = useAuth();

//   const {
//     data: payments = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["allPayments"],
//     queryFn: fetchPayments,
//     refetchOnWindowFocus: true, // window focus এলে auto refetch
//     staleTime: 1000 * 60 * 2, // 2 মিনিট cache
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh] text-gray-500 text-lg">
//         Checking your payment access...
//       </div>
//     );
//   }

//   if (isError) {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "Failed to verify payment status.",
//     });
//     return <Navigate to="/ba-shape-format-payment-confirmed" replace />;
//   }

//   // current user এর payment খুঁজে বের করো
//   const userPayment = payments.find(
//     (p) => p.userEmail === user?.email && p.status === "accepted"
//   );

//   if (!userPayment) {
//     Swal.fire({
//       icon: "info",
//       title: "Payment Required",
//       text: "You don't have any active payment yet.",
//     });
//     return <Navigate to="/ba-shape-format-payment-confirmed" replace />;
//   }

//   // মেয়াদ যাচাই করো
//   const expireDate = new Date(userPayment.expireAt);
//   const today = new Date();

//   if (today > expireDate) {
//     Swal.fire({
//       icon: "warning",
//       title: "Access Expired",
//       text: "Your payment access period has expired. Please renew your payment.",
//     });
//     return <Navigate to="/ba-shape-format-payment-confirmed" replace />;
//   }

//   // যদি সব ঠিক থাকে
//   return children;
// };

// export default PaymentRoute;




import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const fetchPayments = async () => {
  const res = await axios.get("http://localhost:5000/payment/admin");
  return res.data;
};

const PaymentRoute = ({ children }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: payments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allPayments"],
    queryFn: fetchPayments,
    refetchInterval: 5000, // 🕒 প্রতি 5 সেকেন্ডে backend এ ping (live update)
    refetchOnWindowFocus: true,
  });

  // optional: tab change করলে update check
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allPayments"]);
    }, 15000); // প্রতি 15 সেকেন্ডে refresh করবে
    return () => clearInterval(interval);
  }, [queryClient]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 text-lg">
        Checking your payment access...
      </div>
    );

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to verify payment status.",
    });
    return <Navigate to="/ba-shape-format-payment-confirmed" replace />;
  }

  const userPayment = payments.find(
    (p) => p.userEmail === user?.email && p.status === "accepted"
  );

  if (!userPayment) {
    return <Navigate to="/ba-shape-format-payment-confirmed" replace />;
  }

  // মেয়াদ যাচাই
  const expireDate = new Date(userPayment.expireAt);
  const today = new Date();

  if (today > expireDate) {
    Swal.fire({
      icon: "warning",
      title: "Access Expired",
      text: "Your payment period has expired.",
    });
    return <Navigate to="/ba-shape-format-payment-confirmed" replace />;
  }

  return children;
};

export default PaymentRoute;
