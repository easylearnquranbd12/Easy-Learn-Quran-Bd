// import { AlertCircle, CheckCircle2, FileText, Trash2, Upload } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";

// const AdminPdfUpload = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [pdfs, setPdfs] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);

//   // Load PDF history
//   const fetchPdfs = async () => {
//     setLoadingHistory(true);
//     try {
//       const res = await fetch("http://localhost:5000/pdf");
//       const data = await res.json();
//       if (res.ok) setPdfs(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   useEffect(() => {
//     fetchPdfs();
//   }, []);

//   // File select handler
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (selected && selected.type === "application/pdf") {
//       setFile(selected);
//       setMessage({ type: "", text: "" });
//     } else {
//       setFile(null);
//       setMessage({ type: "error", text: "Please select a valid PDF file." });
//     }
//   };

//   // const handleUpload = async () => {
//   //   if (!file) {
//   //     setMessage({ type: "error", text: "Please choose a PDF file first." });
//   //     return;
//   //   }
//   //   setUploading(true);
//   //   setMessage({ type: "", text: "" });

//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("pdf", file);

//   //     const res = await fetch("http://localhost:5000/pdf/upload", {
//   //       method: "POST",
//   //       body: formData,
//   //     });
//   //     const data = await res.json();

//   //     if (res.ok) {
//   //       setMessage({ type: "success", text: data.message });
//   //       setFile(null);
//   //       fetchPdfs(); // Refresh history
//   //     } else {
//   //       setMessage({ type: "error", text: data.message || "Upload failed" });
//   //     }
//   //   } catch (error) {
//   //     setMessage({ type: "error", text: "Server error, please try again." });
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // };

//   const handleUpload = async () => {
//   if (!file) {
//     Swal.fire({
//       icon: "warning",
//       title: "No File Selected",
//       text: "Please choose a PDF file first.",
//       confirmButtonColor: "#0d9488",
//     });
//     return;
//   }

//   setUploading(true);

//   try {
//     const formData = new FormData();
//     formData.append("pdf", file);

//     const res = await fetch("http://localhost:5000/pdf/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (res.ok) {
//       Swal.fire({
//         icon: "success",
//         title: "Upload Successful 🎉",
//         text: data.message || "PDF uploaded successfully!",
//         confirmButtonColor: "#0d9488",
//       });

//       setFile(null);
//       fetchPdfs();
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Upload Failed",
//         text: data.message || "Something went wrong!",
//         confirmButtonColor: "#dc2626",
//       });
//     }
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Server Error",
//       text: "Please try again later.",
//       confirmButtonColor: "#dc2626",
//     });
//   } finally {
//     setUploading(false);
//   }
// };

//   // Delete handler
//   const handleDelete = (id, name) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `Do you want to delete "${name}"?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await fetch(`http://localhost:5000/pdf/${id}`, {
//             method: "DELETE",
//           });
//           const data = await res.json();
//           if (res.ok) {
//             Swal.fire("Deleted!", data.message, "success");
//             fetchPdfs(); // Refresh history
//           } else {
//             Swal.fire("Error", data.message || "Delete failed", "error");
//           }
//         } catch (err) {
//           Swal.fire("Error", "Server error", "error");
//         }
//       }
//     });
//   };

//   return (
//     <div >
//       <Helmet>
//         <title>Admin | PDF Upload</title>
//       </Helmet>

//       {/* Upload Box */}
//       <div className="w-full max-w-[1400px] mx-auto mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
//         <div className="flex items-center justify-center mb-4">
//           <FileText className="text-teal-600 w-7 h-7 mr-2" />
//           <h1 className="text-xl font-bold text-gray-800">Upload PDF File</h1>
//         </div>

//         <label
//           htmlFor="pdf-upload"
//           className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-teal-500 transition-all bg-white/50"
//         >
//           {file ? (
//             <>
//               <FileText className="text-teal-500 w-10 h-10 mb-2" />
//               <p className="text-gray-700 text-sm">{file.name}</p>
//               <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
//             </>
//           ) : (
//             <>
//               <Upload className="text-gray-500 w-10 h-10 mb-2" />
//               <p className="text-gray-600 text-sm">Drag & Drop or Click to Select PDF</p>
//             </>
//           )}
//           <input
//             id="pdf-upload"
//             type="file"
//             accept="application/pdf"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>

//         {message.text && (
//           <div
//             className={`flex items-center gap-2 mt-4 text-sm p-2 rounded-md ${
//               message.type === "success" ? "bg-green-100 text-green-700" : "bg-teal-100 text-teal-700"
//             }`}
//           >
//             {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
//             <span>{message.text}</span>
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className={`mt-6 w-full py-2 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
//             uploading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
//           }`}
//         >
//           {uploading ? (
//             <>
//               <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
//               </svg>
//               Uploading...
//             </>
//           ) : (
//             <>
//               <Upload className="w-5 h-5" /> Upload
//             </>
//           )}
//         </button>
//       </div>

//       {/* PDF History */}
//       <div className="w-full max-w-[1400px] mx-auto mt-8 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
//         <h2 className="text-lg font-bold text-gray-800 mb-4">Uploaded PDFs</h2>

//         {loadingHistory ? (
//           <p className="text-gray-600 text-sm">Loading...</p>
//         ) : pdfs.length === 0 ? (
//           <p className="text-gray-600 text-sm">No PDFs uploaded yet.</p>
//         ) : (
//           <ul className="flex flex-col gap-3">
//             {pdfs.map((pdf) => (
//               <li
//                 key={pdf._id}
//                 className="flex items-center justify-between bg-white/50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
//               >
//                 <div className="flex items-center gap-3">
//                   <FileText className="w-5 h-5 text-teal-600" />
//                   <div>
//                     <p className="text-gray-700 text-sm">{pdf.originalName}</p>
//                     <p className="text-gray-500 text-xs">{new Date(pdf.createdAt).toLocaleString()}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleDelete(pdf._id, pdf.originalName)}
//                   className="text-red-600 hover:text-teal-800"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPdfUpload;



// import { AlertCircle, CheckCircle2, FileText, Lock, Trash2, Unlock, Upload } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";

// const AdminPdfUpload = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [pdfs, setPdfs] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [pdfType, setPdfType] = useState("free"); // "free" or "paid"
//   const [price, setPrice] = useState("");

//   // Load PDF history
//   const fetchPdfs = async () => {
//     setLoadingHistory(true);
//     try {
//       const res = await fetch("http://localhost:5000/pdf");
//       const data = await res.json();
//       if (res.ok) setPdfs(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   useEffect(() => {
//     fetchPdfs();
//   }, []);

//   // File select handler
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (selected && selected.type === "application/pdf") {
//       setFile(selected);
//       setMessage({ type: "", text: "" });
//     } else {
//       setFile(null);
//       setMessage({ type: "error", text: "Please select a valid PDF file." });
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       Swal.fire({
//         icon: "warning",
//         title: "No File Selected",
//         text: "Please choose a PDF file first.",
//         confirmButtonColor: "#0d9488",
//       });
//       return;
//     }

//     if (pdfType === "paid" && !price) {
//       Swal.fire({
//         icon: "warning",
//         title: "Price Required",
//         text: "Please set a price for the paid PDF.",
//         confirmButtonColor: "#0d9488",
//       });
//       return;
//     }

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("pdf", file);
//       formData.append("type", pdfType);
//       if (pdfType === "paid") {
//         formData.append("price", price);
//       }

//       const res = await fetch("http://localhost:5000/pdf/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Upload Successful 🎉",
//           text: data.message || "PDF uploaded successfully!",
//           confirmButtonColor: "#0d9488",
//         });

//         setFile(null);
//         setPrice("");
//         setPdfType("free");
//         fetchPdfs();
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Upload Failed",
//           text: data.message || "Something went wrong!",
//           confirmButtonColor: "#dc2626",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Server Error",
//         text: "Please try again later.",
//         confirmButtonColor: "#dc2626",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Delete handler
//   const handleDelete = (id, name) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `Do you want to delete "${name}"?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await fetch(`http://localhost:5000/pdf/${id}`, {
//             method: "DELETE",
//           });
//           const data = await res.json();
//           if (res.ok) {
//             Swal.fire("Deleted!", data.message, "success");
//             fetchPdfs();
//           } else {
//             Swal.fire("Error", data.message || "Delete failed", "error");
//           }
//         } catch (err) {
//           Swal.fire("Error", "Server error", "error");
//         }
//       }
//     });
//   };

//   // Toggle PDF free/paid status
//   const handleToggleType = async (id, currentType, currentPrice) => {
//     const newType = currentType === "free" ? "paid" : "free";
//     let newPrice = currentPrice;

//     if (newType === "paid") {
//       const { value } = await Swal.fire({
//         title: "Set Price",
//         input: "number",
//         inputLabel: "Enter price (in BDT)",
//         inputValue: currentPrice || "",
//         showCancelButton: true,
//         confirmButtonColor: "#0d9488",
//         inputValidator: (value) => {
//           if (!value) {
//             return "Price is required!";
//           }
//           if (value <= 0) {
//             return "Price must be greater than 0!";
//           }
//         },
//       });

//       if (value) {
//         newPrice = value;
//       } else {
//         return; // User cancelled
//       }
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/pdf/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           type: newType,
//           price: newPrice,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Updated!",
//           text: `PDF is now ${newType === "free" ? "Free" : "Paid (৳" + newPrice + ")"}`,
//           confirmButtonColor: "#0d9488",
//         });
//         fetchPdfs();
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Update Failed",
//           text: data.message || "Something went wrong!",
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Server Error",
//         text: "Please try again later.",
//       });
//     }
//   };

//   return (
//     <div>
//       <Helmet>
//         <title>Admin | PDF Upload</title>
//       </Helmet>

//       {/* Upload Box */}
//       <div className="w-full max-w-[1400px] mx-auto mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
//         <div className="flex items-center justify-center mb-4">
//           <FileText className="text-teal-600 w-7 h-7 mr-2" />
//           <h1 className="text-xl font-bold text-gray-800">Upload PDF File</h1>
//         </div>

//         <label
//           htmlFor="pdf-upload"
//           className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-teal-500 transition-all bg-white/50"
//         >
//           {file ? (
//             <>
//               <FileText className="text-teal-500 w-10 h-10 mb-2" />
//               <p className="text-gray-700 text-sm">{file.name}</p>
//               <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
//             </>
//           ) : (
//             <>
//               <Upload className="text-gray-500 w-10 h-10 mb-2" />
//               <p className="text-gray-600 text-sm">Drag & Drop or Click to Select PDF</p>
//             </>
//           )}
//           <input
//             id="pdf-upload"
//             type="file"
//             accept="application/pdf"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>

//         {/* PDF Type Selection */}
//         <div className="mt-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">PDF Type</label>
//           <div className="flex gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="pdfType"
//                 value="free"
//                 checked={pdfType === "free"}
//                 onChange={(e) => setPdfType(e.target.value)}
//                 className="text-teal-600"
//               />
//               <span className="flex items-center gap-1">
//                 <Unlock className="w-4 h-4 text-green-600" /> Free
//               </span>
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="pdfType"
//                 value="paid"
//                 checked={pdfType === "paid"}
//                 onChange={(e) => setPdfType(e.target.value)}
//                 className="text-teal-600"
//               />
//               <span className="flex items-center gap-1">
//                 <Lock className="w-4 h-4 text-orange-600" /> Paid
//               </span>
//             </label>
//           </div>
//         </div>

//         {/* Price Input for Paid PDFs */}
//         {pdfType === "paid" && (
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Price (BDT)</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Enter price"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//               min="0"
//               step="1"
//             />
//           </div>
//         )}

//         {message.text && (
//           <div
//             className={`flex items-center gap-2 mt-4 text-sm p-2 rounded-md ${
//               message.type === "success" ? "bg-green-100 text-green-700" : "bg-teal-100 text-teal-700"
//             }`}
//           >
//             {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
//             <span>{message.text}</span>
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className={`mt-6 w-full py-2 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
//             uploading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
//           }`}
//         >
//           {uploading ? (
//             <>
//               <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
//               </svg>
//               Uploading...
//             </>
//           ) : (
//             <>
//               <Upload className="w-5 h-5" /> Upload {pdfType === "paid" ? "Paid" : "Free"} PDF
//             </>
//           )}
//         </button>
//       </div>

//       {/* PDF History */}
//       <div className="w-full max-w-[1400px] mx-auto mt-8 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
//         <h2 className="text-lg font-bold text-gray-800 mb-4">Uploaded PDFs</h2>

//         {loadingHistory ? (
//           <p className="text-gray-600 text-sm">Loading...</p>
//         ) : pdfs.length === 0 ? (
//           <p className="text-gray-600 text-sm">No PDFs uploaded yet.</p>
//         ) : (
//           <ul className="flex flex-col gap-3">
//             {pdfs.map((pdf) => (
//               <li
//                 key={pdf._id}
//                 className="flex items-center justify-between bg-white/50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
//               >
//                 <div className="flex items-center gap-3">
//                   {pdf.type === "free" ? (
//                     <Unlock className="w-5 h-5 text-green-600" />
//                   ) : (
//                     <Lock className="w-5 h-5 text-orange-600" />
//                   )}
//                   <div>
//                     <p className="text-gray-700 text-sm font-medium">{pdf.originalName}</p>
//                     <div className="flex items-center gap-2 text-xs">
//                       <span className="text-gray-500">{new Date(pdf.createdAt).toLocaleString()}</span>
//                       <span className={`px-2 py-0.5 rounded-full ${
//                         pdf.type === "free" 
//                           ? "bg-green-100 text-green-700" 
//                           : "bg-orange-100 text-orange-700"
//                       }`}>
//                         {pdf.type === "free" ? "Free" : `Paid (৳${pdf.price})`}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handleToggleType(pdf._id, pdf.type, pdf.price)}
//                     className={`text-sm px-3 py-1 rounded-lg transition-all ${
//                       pdf.type === "free"
//                         ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
//                         : "bg-green-100 text-green-700 hover:bg-green-200"
//                     }`}
//                   >
//                     {pdf.type === "free" ? "Make Paid" : "Make Free"}
//                   </button>
//                   <button
//                     onClick={() => handleDelete(pdf._id, pdf.originalName)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPdfUpload;






import { AlertCircle, CheckCircle2, CreditCard, FileText, Landmark, Lock, Smartphone, Trash2, Unlock, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AdminPdfUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [pdfs, setPdfs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [pdfType, setPdfType] = useState("free");
  const [price, setPrice] = useState("");
  
  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState({
    bkash: { enabled: false, number: "", type: "Personal" },
    nagad: { enabled: false, number: "", type: "Personal" },
    rocket: { enabled: false, number: "", type: "Personal" },
    bank: { 
      enabled: false, 
      accountName: "", 
      accountNumber: "", 
      bankName: "", 
      branchName: "", 
      routingNumber: "" 
    }
  });

  // Load PDF history
  const fetchPdfs = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch("http://localhost:5000/pdf");
      const data = await res.json();
      if (res.ok) setPdfs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Load payment methods on mount
  const fetchPaymentMethods = async () => {
    try {
      const res = await fetch("http://localhost:5000/pdf/payment-methods");
      const data = await res.json();
      if (res.ok && data) {
        setPaymentMethods(data);
      }
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    }
  };

  useEffect(() => {
    fetchPdfs();
    fetchPaymentMethods();
  }, []);

  // File select handler
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setMessage({ type: "", text: "" });
    } else {
      setFile(null);
      setMessage({ type: "error", text: "Please select a valid PDF file." });
    }
  };

  // Handle payment method changes
  const handlePaymentMethodChange = (method, field, value) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: {
        ...prev[method],
        [field]: value
      }
    }));
  };

  // Save payment methods
  const savePaymentMethods = async () => {
    try {
      const res = await fetch("http://localhost:5000/pdf/payment-methods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentMethods),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Payment methods updated successfully.",
          confirmButtonColor: "#0d9488",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save payment methods.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "No File Selected",
        text: "Please choose a PDF file first.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    if (pdfType === "paid" && !price) {
      Swal.fire({
        icon: "warning",
        title: "Price Required",
        text: "Please set a price for the paid PDF.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("type", pdfType);
      if (pdfType === "paid") {
        formData.append("price", price);
      }

      const res = await fetch("http://localhost:5000/pdf/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Upload Successful 🎉",
          text: data.message || "PDF uploaded successfully!",
          confirmButtonColor: "#0d9488",
        });

        setFile(null);
        setPrice("");
        setPdfType("free");
        fetchPdfs();
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: data.message || "Something went wrong!",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setUploading(false);
    }
  };

  // Delete handler
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/pdf/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire("Deleted!", data.message, "success");
            fetchPdfs();
          } else {
            Swal.fire("Error", data.message || "Delete failed", "error");
          }
        } catch (err) {
          Swal.fire("Error", "Server error", "error");
        }
      }
    });
  };

  // Toggle PDF free/paid status
  const handleToggleType = async (id, currentType, currentPrice) => {
    const newType = currentType === "free" ? "paid" : "free";
    let newPrice = currentPrice;

    if (newType === "paid") {
      const { value } = await Swal.fire({
        title: "Set Price",
        input: "number",
        inputLabel: "Enter price (in BDT)",
        inputValue: currentPrice || "",
        showCancelButton: true,
        confirmButtonColor: "#0d9488",
        inputValidator: (value) => {
          if (!value) {
            return "Price is required!";
          }
          if (value <= 0) {
            return "Price must be greater than 0!";
          }
        },
      });

      if (value) {
        newPrice = value;
      } else {
        return;
      }
    }

    try {
      const res = await fetch(`http://localhost:5000/pdf/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: newType,
          price: newPrice,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `PDF is now ${newType === "free" ? "Free" : "Paid (৳" + newPrice + ")"}`,
          confirmButtonColor: "#0d9488",
        });
        fetchPdfs();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: data.message || "Something went wrong!",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Admin | PDF Upload & Payment Settings</title>
      </Helmet>

      {/* Payment Methods Section */}
      <div className="w-full max-w-[1400px] mx-auto mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="text-teal-600 w-7 h-7" />
            <h2 className="text-xl font-bold text-gray-800">Payment Methods Configuration</h2>
          </div>
          <button
            onClick={savePaymentMethods}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Save Payment Methods
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* bKash */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="text-pink-600" />
                <h3 className="font-semibold">bKash</h3>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={paymentMethods.bkash.enabled}
                  onChange={(e) => handlePaymentMethodChange("bkash", "enabled", e.target.checked)}
                  className="text-teal-600"
                />
                <span className="text-sm">Enable</span>
              </label>
            </div>
            {paymentMethods.bkash.enabled && (
              <>
                <input
                  type="text"
                  placeholder="bKash Number"
                  value={paymentMethods.bkash.number}
                  onChange={(e) => handlePaymentMethodChange("bkash", "number", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <select
                  value={paymentMethods.bkash.type}
                  onChange={(e) => handlePaymentMethodChange("bkash", "type", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Personal">Personal</option>
                  <option value="Merchant">Merchant</option>
                  <option value="Agent">Agent</option>
                </select>
              </>
            )}
          </div>

          {/* Nagad */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="text-orange-600" />
                <h3 className="font-semibold">Nagad</h3>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={paymentMethods.nagad.enabled}
                  onChange={(e) => handlePaymentMethodChange("nagad", "enabled", e.target.checked)}
                  className="text-teal-600"
                />
                <span className="text-sm">Enable</span>
              </label>
            </div>
            {paymentMethods.nagad.enabled && (
              <>
                <input
                  type="text"
                  placeholder="Nagad Number"
                  value={paymentMethods.nagad.number}
                  onChange={(e) => handlePaymentMethodChange("nagad", "number", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <select
                  value={paymentMethods.nagad.type}
                  onChange={(e) => handlePaymentMethodChange("nagad", "type", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Personal">Personal</option>
                  <option value="Merchant">Merchant</option>
                </select>
              </>
            )}
          </div>

          {/* Rocket */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="text-red-600" />
                <h3 className="font-semibold">Rocket</h3>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={paymentMethods.rocket.enabled}
                  onChange={(e) => handlePaymentMethodChange("rocket", "enabled", e.target.checked)}
                  className="text-teal-600"
                />
                <span className="text-sm">Enable</span>
              </label>
            </div>
            {paymentMethods.rocket.enabled && (
              <>
                <input
                  type="text"
                  placeholder="Rocket Number"
                  value={paymentMethods.rocket.number}
                  onChange={(e) => handlePaymentMethodChange("rocket", "number", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <select
                  value={paymentMethods.rocket.type}
                  onChange={(e) => handlePaymentMethodChange("rocket", "type", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Personal">Personal</option>
                  <option value="Merchant">Merchant</option>
                </select>
              </>
            )}
          </div>

          {/* Bank Account */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="text-blue-600" />
                <h3 className="font-semibold">Bank Account</h3>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={paymentMethods.bank.enabled}
                  onChange={(e) => handlePaymentMethodChange("bank", "enabled", e.target.checked)}
                  className="text-teal-600"
                />
                <span className="text-sm">Enable</span>
              </label>
            </div>
            {paymentMethods.bank.enabled && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Account Holder Name"
                  value={paymentMethods.bank.accountName}
                  onChange={(e) => handlePaymentMethodChange("bank", "accountName", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={paymentMethods.bank.accountNumber}
                  onChange={(e) => handlePaymentMethodChange("bank", "accountNumber", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={paymentMethods.bank.bankName}
                  onChange={(e) => handlePaymentMethodChange("bank", "bankName", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Branch Name"
                  value={paymentMethods.bank.branchName}
                  onChange={(e) => handlePaymentMethodChange("bank", "branchName", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Routing Number"
                  value={paymentMethods.bank.routingNumber}
                  onChange={(e) => handlePaymentMethodChange("bank", "routingNumber", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Box */}
      <div className="w-full max-w-[1400px] mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-center mb-4">
          <FileText className="text-teal-600 w-7 h-7 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Upload PDF File</h1>
        </div>

        <label
          htmlFor="pdf-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-teal-500 transition-all bg-white/50"
        >
          {file ? (
            <>
              <FileText className="text-teal-500 w-10 h-10 mb-2" />
              <p className="text-gray-700 text-sm">{file.name}</p>
              <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
            </>
          ) : (
            <>
              <Upload className="text-gray-500 w-10 h-10 mb-2" />
              <p className="text-gray-600 text-sm">Drag & Drop or Click to Select PDF</p>
            </>
          )}
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* PDF Type Selection */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">PDF Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="pdfType"
                value="free"
                checked={pdfType === "free"}
                onChange={(e) => setPdfType(e.target.value)}
                className="text-teal-600"
              />
              <span className="flex items-center gap-1">
                <Unlock className="w-4 h-4 text-green-600" /> Free
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="pdfType"
                value="paid"
                checked={pdfType === "paid"}
                onChange={(e) => setPdfType(e.target.value)}
                className="text-teal-600"
              />
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-orange-600" /> Paid
              </span>
            </label>
          </div>
        </div>

        {/* Price Input for Paid PDFs */}
        {pdfType === "paid" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (BDT)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              min="0"
              step="1"
            />
          </div>
        )}

        {message.text && (
          <div
            className={`flex items-center gap-2 mt-4 text-sm p-2 rounded-md ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-teal-100 text-teal-700"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-6 w-full py-2 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {uploading ? (
            <>
              <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" /> Upload {pdfType === "paid" ? "Paid" : "Free"} PDF
            </>
          )}
        </button>
      </div>

      {/* PDF History */}
      <div className="w-full max-w-[1400px] mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Uploaded PDFs</h2>

        {loadingHistory ? (
          <p className="text-gray-600 text-sm">Loading...</p>
        ) : pdfs.length === 0 ? (
          <p className="text-gray-600 text-sm">No PDFs uploaded yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {pdfs.map((pdf) => (
              <li
                key={pdf._id}
                className="flex items-center justify-between bg-white/50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  {pdf.type === "free" ? (
                    <Unlock className="w-5 h-5 text-green-600" />
                  ) : (
                    <Lock className="w-5 h-5 text-orange-600" />
                  )}
                  <div>
                    <p className="text-gray-700 text-sm font-medium">{pdf.originalName}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500">{new Date(pdf.createdAt).toLocaleString()}</span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        pdf.type === "free" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {pdf.type === "free" ? "Free" : `Paid (৳${pdf.price})`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleType(pdf._id, pdf.type, pdf.price)}
                    className={`text-sm px-3 py-1 rounded-lg transition-all ${
                      pdf.type === "free"
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {pdf.type === "free" ? "Make Paid" : "Make Free"}
                  </button>
                  <button
                    onClick={() => handleDelete(pdf._id, pdf.originalName)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPdfUpload;