

// import { Download, FileText } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";

// const PDFDownload = () => {
//   const [pdfs, setPdfs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchPdfs = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/pdf");
//       const data = await res.json();
//       if (res.ok) setPdfs(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPdfs();
//   }, []);

// // const handleDownload = async (id, filename, isUser = false) => {
// //   try {
// //     const url = isUser
// //       ? `http://localhost:5000/pdf/user/download/${id}`
// //       : `http://localhost:5000/pdf/download/${id}`;

// //     const res = await fetch(url, { credentials: "include" });
// //     if (!res.ok) throw new Error("Download failed");

// //     const blob = await res.blob();
// //     const downloadUrl = window.URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = downloadUrl;
// //     link.download = filename || "document.pdf";
// //     document.body.appendChild(link);
// //     link.click();
// //     link.remove();
// //   } catch (err) {
// //     console.error(err);
// //     alert("Download failed!");
// //   }
// // };
// const handleDownload = (id) => {
//   console.log(id)
//   window.location.href = `http://localhost:5000/pdf/download/${id}`;
// };
//   return (
//     <div className=" min-h-screen py-10">
//       <Helmet>
//         <title>Official Document Archive</title>
//       </Helmet>

//       <div className="max-w-5xl mx-auto px-6">

//         {/* ===== Header ===== */}
//         <div className="text-center mb-16">
//           <div className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-700 flex items-center justify-center text-yellow-700 font-serif text-xl font-bold mb-6">
//             PDF
//           </div>

//           <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
//             Official Document Archive
//           </h1>

//           <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
//             The following documents are preserved within the official archive.
//             Each file has been formally recorded and is available for
//             scholarly and institutional reference.
//           </p>

//           <div className="w-28 h-[2px] bg-yellow-700 mx-auto mt-8"></div>
//         </div>

//         {/* ===== Content ===== */}
//         {loading ? (
//           <div className="text-center py-20 text-gray-600">
//             Loading archived documents...
//           </div>
//         ) : pdfs.length === 0 ? (
//           <div className="text-center py-20 border-t border-b border-gray-300">
//             <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />
//             <h3 className="text-2xl font-serif text-gray-800">
//               No Documents Available
//             </h3>
//             <p className="text-gray-500 mt-4">
//               Official documents will appear here once recorded.
//             </p>
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-300">
//             {pdfs.map((pdf) => (
//               <div
//                 key={pdf._id}
//                 className="py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
//               >
//                 {/* Left Side */}
//                 <div className="flex items-start gap-4">
//                   <FileText className="w-8 h-8 text-yellow-700 mt-1" />
//                   <div>
//                     <h3 className="text-xl font-serif text-gray-900">
//                       {pdf.originalName}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Recorded on{" "}
//                       {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "long",
//                         year: "numeric",
//                       })}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Download Button */}
//                 <button
//                 onClick={() => handleDownload(pdf._id, pdf.originalName, true)}
//                   className="flex items-center justify-center gap-2 border border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-white transition-all duration-300 px-6 py-3 font-medium tracking-wide"
//                 >
//                   <Download className="w-5 h-5" />
//                   Download Official Copy
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDFDownload;




// import { CheckCircle, Download, FileText, Lock, ShoppingCart, Unlock } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";
// const PDFDownload = () => {
//   const { user } = useAuth(); // Get user from auth hook
//   const [freePdfs, setFreePdfs] = useState([]);
//   const [paidPdfs, setPaidPdfs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("free"); // "free" or "paid"
//   const [purchasedPdfs, setPurchasedPdfs] = useState([]);
// const navigate = useNavigate();

//   const fetchFreePdfs = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/pdf/free");
//       const data = await res.json();
//       console.log(data)
//       if (res.ok) setFreePdfs(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPaidPdfs = async () => {
//     setLoading(true);
//     try {
//       // If user is logged in, pass userId to check purchased status
//       const url = user?.email 
//         ? `http://localhost:5000/pdf/paid?email=${user.email}` 
//         : "http://localhost:5000/pdf/paid";
      
//       const res = await fetch(url);
//       const data = await res.json();
//       if (res.ok) {
//         setPaidPdfs(data);
        
//         // If user is logged in, track purchased PDFs
//         if (user?.email) {
//           const purchased = data.filter(pdf => pdf.isPurchased).map(pdf => pdf._id);
//           setPurchasedPdfs(purchased);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFreePdfs();
//   }, []);

//   useEffect(() => {
//     if (activeTab === "paid") {
//       fetchPaidPdfs();
//     }
//   }, [activeTab, user?.email]);

//   const handleDownload = async (id, filename, type, price) => {
//     // For free PDFs, direct download
//     if (type === "free") {
//       window.location.href = `http://localhost:5000/pdf/download/${id}`;
//       return;
//     }

//     // For paid PDFs, check if user is logged in
//     if (!user?.email) {
//       Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//         text: "Please login to purchase or download paid PDFs.",
//         confirmButtonColor: "#0d9488",
//         showCancelButton: true,
//         cancelButtonText: "Cancel",
//         confirmButtonText: "Go to Login"
//       }).then((result) => {
//         if (result.isConfirmed) {
//           window.location.href = "/login";
//         }
//       });
//       return;
//     }

//     // Check if already purchased
//     if (purchasedPdfs.includes(id)) {
//       window.location.href = `http://localhost:5000/pdf/download/${id}?email=${user.email}`;
//       return;
//     }

//  const result = await Swal.fire({
//   title: `Purchase Document`,
//   html: `
//     <div class="text-left">
//       <p class="mb-4"><strong>Document:</strong> ${filename}</p>
//       <p class="mb-4"><strong>Price:</strong> ৳${price}</p>
//       <p class="mb-4"><strong>User:</strong> ${user.email}</p>
//     </div>
//   `,
//   icon: "info",
//   showCancelButton: true,
//   confirmButtonColor: "#0d9488",
//   confirmButtonText: "Proceed to Payment",
// });



//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="min-h-screen py-10 bg-gray-50">
//       <Helmet>
//         <title>Official Document Archive</title>
//       </Helmet>

//       <div className="max-w-5xl mx-auto px-6">
//         {/* ===== Header ===== */}
//         <div className="text-center mb-12">
//           <div className="w-20 h-20 mx-auto rounded-full border-4 border-teal-700 flex items-center justify-center text-teal-700 font-serif text-xl font-bold mb-6">
//             PDF
//           </div>

//           <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
//             Official Document Archive
//           </h1>

//           <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
//             Access official documents, forms, and resources. Free documents are available for immediate download,
//             while premium documents require purchase.
//           </p>

//           {user?.email && (
//             <p className="mt-4 text-sm text-teal-600">
//               Logged in as: {user.email}
//             </p>
//           )}

//           <div className="w-28 h-[2px] bg-teal-700 mx-auto mt-8"></div>
//         </div>

//         {/* ===== Tab Navigation ===== */}
//         <div className="flex justify-center mb-10 border-b border-gray-300">
//           <button
//             onClick={() => handleTabChange("free")}
//             className={`flex items-center gap-2 px-8 py-3 font-medium transition-all ${
//               activeTab === "free"
//                 ? "text-teal-700 border-b-2 border-teal-700"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <Unlock className="w-5 h-5" />
//             Free Documents ({freePdfs.length})
//           </button>
//           <button
//             onClick={() => handleTabChange("paid")}
//             className={`flex items-center gap-2 px-8 py-3 font-medium transition-all ${
//               activeTab === "paid"
//                 ? "text-teal-700 border-b-2 border-teal-700"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <Lock className="w-5 h-5" />
//             Premium Documents ({paidPdfs.length})
//           </button>
//         </div>

//         {/* ===== Content ===== */}
//         {loading ? (
//           <div className="text-center py-20 text-gray-600">
//             Loading archived documents...
//           </div>
//         ) : activeTab === "free" ? (
//           // Free PDFs Section
//           freePdfs.length === 0 ? (
//             <div className="text-center py-20 border border-gray-300 rounded-lg bg-white">
//               <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />
//               <h3 className="text-2xl font-serif text-gray-800">
//                 No Free Documents Available
//               </h3>
//               <p className="text-gray-500 mt-4">
//                 Free documents will appear here once uploaded.
//               </p>
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
//               {freePdfs.map((pdf) => (
//                 <div
//                   key={pdf._id}
//                   className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
//                 >
//                   {/* Left Side */}
//                   <div className="flex items-start gap-4">
//                     <FileText className="w-8 h-8 text-teal-600 mt-1" />
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {pdf.originalName}
//                       </h3>
//                       <div className="flex items-center gap-3 mt-1">
//                         <p className="text-sm text-gray-500">
//                           Added on{" "}
//                           {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
//                             day: "2-digit",
//                             month: "long",
//                             year: "numeric",
//                           })}
//                         </p>
//                         <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
//                           Free
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Download Button */}
//                   <button
//                     onClick={() => handleDownload(pdf._id, pdf.originalName, "free")}
//                     className="flex items-center justify-center gap-2 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 px-6 py-2 rounded-lg font-medium"
//                   >
//                     <Download className="w-4 h-4" />
//                     Download Free
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )
//         ) : (
//           // Paid PDFs Section
//           paidPdfs.length === 0 ? (
//             <div className="text-center py-20 border border-gray-300 rounded-lg bg-white">
//               <Lock className="w-14 h-14 mx-auto text-gray-300 mb-4" />
//               <h3 className="text-2xl font-serif text-gray-800">
//                 No Premium Documents Available
//               </h3>
//               <p className="text-gray-500 mt-4">
//                 Premium documents will appear here once uploaded.
//               </p>
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
//               {paidPdfs.map((pdf) => {
//                 const isPurchased = purchasedPdfs.includes(pdf._id);
                
//                 return (
//                   <div
//                     key={pdf._id}
//                     className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
//                   >
//                     {/* Left Side */}
//                     <div className="flex items-start gap-4">
//                       <FileText className="w-8 h-8 text-teal-600 mt-1" />
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">
//                           {pdf.originalName}
//                         </h3>
//                         <div className="flex items-center gap-3 mt-1 flex-wrap">
//                           <p className="text-sm text-gray-500">
//                             Added on{" "}
//                             {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
//                               day: "2-digit",
//                               month: "long",
//                               year: "numeric",
//                             })}
//                           </p>
//                           <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
//                             ৳{pdf.price}
//                           </span>
//                           {isPurchased && (
//                             <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
//                               <CheckCircle className="w-3 h-3" /> Purchased
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action Button */}
//                     {isPurchased ? (
//                       <button
//                         onClick={() => handleDownload(pdf._id, pdf.originalName, "paid", pdf.price)}
//                         className="flex items-center justify-center gap-2 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 px-6 py-2 rounded-lg font-medium"
//                       >
//                         <Download className="w-4 h-4" />
//                         Download Again
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleDownload(pdf._id, pdf.originalName, "paid", pdf.price)}
//                         className="flex items-center justify-center gap-2 bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 px-6 py-2 rounded-lg font-medium"
//                       >
//                         <ShoppingCart className="w-4 h-4" />
//                         Purchase (৳{pdf.price})
//                       </button>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )
//         )}

//         {/* Login Notice for Paid Tab */}
//         {!user?.email && activeTab === "paid" && (
//           <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
//             <p className="text-blue-700">
//               Please <button 
//                 onClick={() => window.location.href = "/login"} 
//                 className="underline font-semibold hover:text-blue-800"
//               >
//                 login
//               </button> to purchase and access premium documents.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDFDownload;





import { CheckCircle, Download, FileText, Lock, ShoppingCart, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const PDFDownload = () => {
  const { user } = useAuth();
  const [freePdfs, setFreePdfs] = useState([]);
  const [paidPdfs, setPaidPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("free");
  const [purchasedPdfs, setPurchasedPdfs] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const navigate = useNavigate();

  // Fetch payment methods
  const fetchPaymentMethods = async () => {
    try {
      const res = await fetch("http://localhost:5000/pdf/payment-methods");
      const data = await res.json();
      if (res.ok) {
        setPaymentMethods(data);
      }
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    }
  };

  const fetchFreePdfs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/pdf/free");
      const data = await res.json();
      if (res.ok) setFreePdfs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaidPdfs = async () => {
    setLoading(true);
    try {
      const url = user?.email 
        ? `http://localhost:5000/pdf/paid?email=${user.email}` 
        : "http://localhost:5000/pdf/paid";
      
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setPaidPdfs(data);
        
        if (user?.email) {
          const purchased = data.filter(pdf => pdf.isPurchased).map(pdf => pdf._id);
          setPurchasedPdfs(purchased);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreePdfs();
    fetchPaymentMethods(); // Fetch payment methods on mount
  }, []);

  useEffect(() => {
    if (activeTab === "paid") {
      fetchPaidPdfs();
    }
  }, [activeTab, user?.email]);

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: "Payment information copied to clipboard",
      timer: 1500,
      showConfirmButton: false
    });
  };

 // Show payment methods modal
const showPaymentMethods = async (pdf) => {
  if (!paymentMethods) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Payment methods not configured yet. Please contact admin.",
    });
    return;
  }

  const enabledMethods = [];
  const methodOptions = [];
  
  if (paymentMethods.bkash?.enabled) {
    enabledMethods.push('bkash');
    methodOptions.push(`<option value="bkash">bKash (${paymentMethods.bkash.number})</option>`);
  }
  if (paymentMethods.nagad?.enabled) {
    enabledMethods.push('nagad');
    methodOptions.push(`<option value="nagad">Nagad (${paymentMethods.nagad.number})</option>`);
  }
  if (paymentMethods.rocket?.enabled) {
    enabledMethods.push('rocket');
    methodOptions.push(`<option value="rocket">Rocket (${paymentMethods.rocket.number})</option>`);
  }
  if (paymentMethods.bank?.enabled) {
    enabledMethods.push('bank');
    methodOptions.push(`<option value="bank">Bank Transfer</option>`);
  }

  if (enabledMethods.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No Payment Methods",
      text: "No payment methods are available at the moment. Please contact admin.",
    });
    return;
  }

  setSelectedPdf(pdf);

  const result = await Swal.fire({
    title: `Pay ৳${pdf.price}`,
    html: `
      <div class="text-left space-y-4">
        <p class="text-gray-600 mb-4">Please complete your payment for:<br/><strong>${pdf.originalName}</strong></p>
        
        <!-- Payment Method Dropdown -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
          <select id="payment-method" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Select a method</option>
            ${methodOptions.join('')}
          </select>
        </div>

        <!-- Bank Details (Hidden by default) -->
        <div id="bank-details" class="hidden p-4 bg-blue-50 rounded-lg">
          <h4 class="font-bold text-blue-600 mb-2">Bank Transfer Details</h4>
          <div class="space-y-1 text-sm">
            <p><span class="font-semibold">Account Name:</span> ${paymentMethods.bank?.accountName || ''}</p>
            <p><span class="font-semibold">Account Number:</span> ${paymentMethods.bank?.accountNumber || ''}</p>
            <p><span class="font-semibold">Bank Name:</span> ${paymentMethods.bank?.bankName || ''}</p>
            <p><span class="font-semibold">Branch:</span> ${paymentMethods.bank?.branchName || ''}</p>
            <p><span class="font-semibold">Routing Number:</span> ${paymentMethods.bank?.routingNumber || ''}</p>
          </div>
          <button type="button" onclick="copyBankDetails()" class="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy All Details
          </button>
        </div>

        <!-- Sender Information -->
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Mobile Number (Used for payment)</label>
            <input type="text" id="sender-number" placeholder="e.g., 017xxxxxxxx" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Transaction ID (TrxID)</label>
            <input type="text" id="trx-id" placeholder="Enter your transaction ID" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Screenshot (Optional)</label>
            <input type="file" id="payment-screenshot" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <p class="text-xs text-gray-500 mt-1">Upload screenshot for verification (optional but recommended)</p>
          </div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Submit Payment",
    confirmButtonColor: "#0d9488",
    cancelButtonText: "Cancel",
    width: '500px',
    didOpen: () => {
      // Handle payment method change
      const methodSelect = document.getElementById('payment-method');
      const bankDetails = document.getElementById('bank-details');
      
      methodSelect.addEventListener('change', function() {
        if (this.value === 'bank') {
          bankDetails.classList.remove('hidden');
        } else {
          bankDetails.classList.add('hidden');
        }
      });

      // Copy bank details function
      window.copyBankDetails = () => {
        const bank = paymentMethods.bank;
        const details = `
Account Name: ${bank.accountName}
Account Number: ${bank.accountNumber}
Bank Name: ${bank.bankName}
Branch: ${bank.branchName}
Routing Number: ${bank.routingNumber}
        `.trim();
        copyToClipboard(details);
      };
    },
    preConfirm: () => {
      const method = document.getElementById('payment-method').value;
      const senderNumber = document.getElementById('sender-number').value;
      const trxId = document.getElementById('trx-id').value;
      const screenshot = document.getElementById('payment-screenshot').files[0];

      // Validation
      if (!method) {
        Swal.showValidationMessage('Please select a payment method');
        return false;
      }
      if (!senderNumber) {
        Swal.showValidationMessage('Please enter your mobile number');
        return false;
      }
      if (!trxId) {
        Swal.showValidationMessage('Please enter transaction ID');
        return false;
      }
      
      // Validate Bangladeshi mobile number format (optional)
      const mobileRegex = /^(01[3-9]\d{8})$/;
      if (!mobileRegex.test(senderNumber)) {
        Swal.showValidationMessage('Please enter a valid Bangladeshi mobile number (e.g., 017xxxxxxxx)');
        return false;
      }

      return {
        method,
        senderNumber,
        trxId,
        screenshot: screenshot || null
      };
    }
  });

  if (result.isConfirmed) {
    // Show processing
    Swal.fire({
      title: "Processing Payment",
      html: "Please wait while we verify your payment...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Prepare form data
    const formData = new FormData();
    formData.append('pdfId', pdf._id);
    formData.append('userEmail', user.email);
    formData.append('userName', user.displayName || user.name || 'User');
    formData.append('amount', pdf.price);
    formData.append('paymentMethod', result.value.method);
    formData.append('senderNumber', result.value.senderNumber);
    formData.append('transactionId', result.value.trxId);
    
    // Get the receiver number based on method
    let receiverNumber = '';
    if (result.value.method === 'bkash') receiverNumber = paymentMethods.bkash.number;
    else if (result.value.method === 'nagad') receiverNumber = paymentMethods.nagad.number;
    else if (result.value.method === 'rocket') receiverNumber = paymentMethods.rocket.number;
    
    formData.append('receiverNumber', receiverNumber);
    
    if (result.value.screenshot) {
      formData.append('screenshot', result.value.screenshot);
    }

    try {
      const paymentRes = await fetch("http://localhost:5000/pdf/purchase", {
        method: "POST",
        body: formData
      });

      if (paymentRes.ok) {
        Swal.fire({
          icon: "success",
          title: "Payment Submitted!",
          html: `
            <div class="text-left">
              <p class="mb-2">Your payment has been submitted successfully.</p>
              <p class="mb-2"><strong>Transaction ID:</strong> ${result.value.trxId}</p>
              <p class="mb-2"><strong>Amount:</strong> ৳${pdf.price}</p>
              <p class="text-sm text-gray-600">Your document will be available for download after verification.</p>
            </div>
          `,
          confirmButtonColor: "#0d9488",
        }).then(() => {
          // Refresh paid PDFs to check if payment is verified
          fetchPaidPdfs();
        });
      } else {
        const error = await paymentRes.json();
        throw new Error(error.message || "Payment submission failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message || "Please try again later.",
        confirmButtonColor: "#dc2626",
      });
    }
  }
};

  const handleDownload = async (id, filename, type, price) => {
    if (type === "free") {
      window.location.href = `http://localhost:5000/pdf/download/${id}`;
      return;
    }

    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to purchase or download paid PDFs.",
        confirmButtonColor: "#0d9488",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (purchasedPdfs.includes(id)) {
      window.location.href = `http://localhost:5000/pdf/download/${id}?email=${user.email}`;
      return;
    }

    // Find the selected PDF
    const selectedPdf = paidPdfs.find(p => p._id === id);
    if (selectedPdf) {
      showPaymentMethods(selectedPdf);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <Helmet>
        <title>Official Document Archive</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header section remains the same */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-teal-700 flex items-center justify-center text-teal-700 font-serif text-xl font-bold mb-6">
            PDF
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
            Official Document Archive
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            Access official documents, forms, and resources. Free documents are available for immediate download,
            while premium documents require purchase.
          </p>

          {user?.email && (
            <p className="mt-4 text-sm text-teal-600">
              Logged in as: {user.email}
            </p>
          )}

          <div className="w-28 h-[2px] bg-teal-700 mx-auto mt-8"></div>
        </div>

          {/* ===== Tab Navigation ===== */}
        <div className="flex justify-center mb-10 border-b border-gray-300">
          <button
            onClick={() => handleTabChange("free")}
            className={`flex items-center gap-2 px-8 py-3 font-medium transition-all ${
              activeTab === "free"
                ? "text-teal-700 border-b-2 border-teal-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Unlock className="w-5 h-5" />
            Free Documents ({freePdfs.length})
          </button>
          <button
            onClick={() => handleTabChange("paid")}
            className={`flex items-center gap-2 px-8 py-3 font-medium transition-all ${
              activeTab === "paid"
                ? "text-teal-700 border-b-2 border-teal-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Lock className="w-5 h-5" />
            Premium Documents ({paidPdfs.length})
          </button>
        </div>

        {/* ===== Content ===== */}
        {loading ? (
          <div className="text-center py-20 text-gray-600">
            Loading archived documents...
          </div>
        ) : activeTab === "free" ? (
          // Free PDFs Section
          freePdfs.length === 0 ? (
            <div className="text-center py-20 border border-gray-300 rounded-lg bg-white">
              <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-serif text-gray-800">
                No Free Documents Available
              </h3>
              <p className="text-gray-500 mt-4">
                Free documents will appear here once uploaded.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {freePdfs.map((pdf) => (
                <div
                  key={pdf._id}
                  className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
                >
                  {/* Left Side */}
                  <div className="flex items-start gap-4">
                    <FileText className="w-8 h-8 text-teal-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {pdf.originalName}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-gray-500">
                          Added on{" "}
                          {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          Free
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(pdf._id, pdf.originalName, "free")}
                    className="flex items-center justify-center gap-2 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 px-6 py-2 rounded-lg font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download Free
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          // Paid PDFs Section
          paidPdfs.length === 0 ? (
            <div className="text-center py-20 border border-gray-300 rounded-lg bg-white">
              <Lock className="w-14 h-14 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-serif text-gray-800">
                No Premium Documents Available
              </h3>
              <p className="text-gray-500 mt-4">
                Premium documents will appear here once uploaded.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {paidPdfs.map((pdf) => {
                const isPurchased = purchasedPdfs.includes(pdf._id);
                
                return (
                  <div
                    key={pdf._id}
                    className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
                  >
                    {/* Left Side */}
                    <div className="flex items-start gap-4">
                      <FileText className="w-8 h-8 text-teal-600 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {pdf.originalName}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <p className="text-sm text-gray-500">
                            Added on{" "}
                            {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                            ৳{pdf.price}
                          </span>
                          {isPurchased && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Purchased
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {isPurchased ? (
                      <button
                        onClick={() => handleDownload(pdf._id, pdf.originalName, "paid", pdf.price)}
                        className="flex items-center justify-center gap-2 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 px-6 py-2 rounded-lg font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download Again
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDownload(pdf._id, pdf.originalName, "paid", pdf.price)}
                        className="flex items-center justify-center gap-2 bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 px-6 py-2 rounded-lg font-medium"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Purchase (৳{pdf.price})
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* Login Notice for Paid Tab */}
        {!user?.email && activeTab === "paid" && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-blue-700">
              Please <button 
                onClick={() => window.location.href = "/login"} 
                className="underline font-semibold hover:text-blue-800"
              >
                login
              </button> to purchase and access premium documents.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFDownload;