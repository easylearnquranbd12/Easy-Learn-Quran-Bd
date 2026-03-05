// import { Download, FileText } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";

// const UploadPDF = () => {
//   const [pdfs, setPdfs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch all PDFs
// const fetchPdfs = async () => {
//   setLoading(true);
//   try {
//     const res = await fetch(
//       "http://localhost:5000/pdf/user?status=accepted"
//     );
//     const data = await res.json();
//     if (res.ok) setPdfs(data);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchPdfs();
//   }, []);

//   // Download PDF
//   const handleDownload = async (pdf) => {
//     try {
//       const res = await fetch(`http://localhost:5000/pdf/download/${pdf._id}`);
//       if (!res.ok) throw new Error("Failed to download PDF");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = pdf.originalName; // original file name
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err);
//       alert("Download failed!");
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-start">
//       <Helmet>
//         <title>Download PDFs</title>
//       </Helmet>

//       <div className="w-full max-w-[1400px] mx-auto mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
//         <h1 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <FileText className="w-6 h-6 text-red-600" />
//           Download PDFs
//         </h1>

//         {loading ? (
//           <p className="text-gray-600 text-sm">Loading PDFs...</p>
//         ) : pdfs.length === 0 ? (
//           <p className="text-gray-600 text-sm">No PDFs available.</p>
//         ) : (
//           <ul className="flex flex-col gap-3">
//             {pdfs.map((pdf) => (
//               <li
//                 key={pdf._id}
//                 className="flex items-center justify-between bg-white/50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
//               >
//                 <div className="flex items-center gap-3">
//                   <FileText className="w-5 h-5 text-red-600" />
//                   <div>
//                     <p className="text-gray-700 text-sm">{pdf.originalName}</p>
//                     <p className="text-gray-500 text-xs">
//                       {new Date(pdf.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleDownload(pdf)}
//                   className="flex items-center gap-1 text-white bg-bgButton hover:bg-hoverBgButton px-3 py-1 rounded-md transition"
//                 >
//                   <Download className="w-4 h-4" /> Download
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadPDF;

// import { useQuery } from "@tanstack/react-query";
// import { Download, FileText } from "lucide-react";
// import { Helmet } from "react-helmet-async";
// import CustomLoading from "../../../components/Loading/CustomLoading";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const UploadPDF = () => {
//   const axiosPublic = useAxiosPublic();

//   // ✅ Fetch Accepted PDFs using React Query
//   const {
//     data: pdfs = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["acceptedUserPDFs"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/pdf/user?status=accepted");
//       return res.data || [];
//     },
//   });

//   // ✅ Download Function
//   const handleDownload = async (pdf) => {
//     try {
//       const res = await axiosPublic.get(`/pdf/user/download/${pdf._id}`, {
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", pdf.originalName);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err);
//       alert("Download failed!");
//     }
//   };

//   if (isLoading) {
//     return <CustomLoading />;
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center">
//       <Helmet>
//         <title>Accepted PDFs</title>
//       </Helmet>

//       <div className="w-full max-w-[1400px] mx-auto mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
//    <h1 className="text-3xl md:text-4xl font-bold text-center text-teal-700 tracking-tight">
//   Approved PDF Documents
// </h1>

// <p className="text-gray-500 my-6 text-lg leading-relaxed text-justify">
//   Here you can access all officially approved PDF documents shared by the admin. 
//   Only verified and accepted files are displayed for secure and easy download.
// </p>

//         {pdfs.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <FileText className="text-gray-300 w-16 h-16 mb-4" />
//             <h3 className="text-lg font-semibold text-gray-600">
//               No Approved PDFs Yet
//             </h3>
//             <p className="text-gray-500 mt-2">
//               Once your PDF is approved by admin, it will appear here.
//             </p>
//           </div>
//         ) : (
//           <ul className="flex flex-col gap-3">
//             {pdfs.map((pdf) => (
//               <li
//                 key={pdf._id}
//                 className="flex items-center justify-between bg-white/50 p-4 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all duration-300"
//               >
//                 <div className="flex items-center gap-3">
//                   <FileText className="w-5 h-5 text-red-600" />
//                   <div>
//                     <p className="text-gray-700 font-medium">
//                       {pdf.originalName}
//                     </p>
//                     <p className="text-gray-500 text-xs">
//                       {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleDownload(pdf)}
//                   className="flex items-center gap-1 text-white bg-bgButton hover:bg-hoverBgButton px-4 py-2 rounded-lg transition-all duration-300"
//                 >
//                   <Download className="w-4 h-4" />
//                   Download
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadPDF;
import { useQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const UploadPDF = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pdfs = [], isLoading } = useQuery({
    queryKey: ["acceptedUserPDFs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pdf/user?status=accepted");
      return res.data || [];
    },
  });

  // const handleDownload = async (pdf) => {
  //   console.log(pdf)
  //   try {
  //     const res = await axiosPublic.get(`/pdf/user/download/${pdf._id}`, {
  //       responseType: "blob",
  //     });

  //     const url = window.URL.createObjectURL(new Blob([res.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", pdf.originalName);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Download failed!");
  //   }
  // };


const handleDownload = (id) => {
  window.location.href = `http://localhost:5000/pdf/download/${id}`;
};

  if (isLoading) return <CustomLoading />;

  return (
    <div className=" min-h-screen py-20">
      <Helmet>
        <title>Official PDF Archive</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-2 md:px-6">

        {/* ===== Official Header ===== */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-700 flex items-center justify-center text-yellow-700 text-xl font-serif font-bold mb-6">
            PDF
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
            Official Approved Documents
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            The following documents have been formally reviewed and accepted.
            These files are preserved within the official archive for reference
            and scholarly access.
          </p>

          <div className="w-28 h-[2px] bg-yellow-700 mx-auto mt-8"></div>
        </div>

        {/* ===== Content ===== */}
        {pdfs.length === 0 ? (
          <div className="text-center py-20 border-t border-b border-gray-300">
            <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-serif text-gray-800">
              No Archived Documents Available
            </h3>
            <p className="text-gray-500 mt-4">
              Approved PDF documents will appear here upon confirmation.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-300">
            {pdfs.map((pdf) => (
              <div
                key={pdf._id}
                className="py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                {/* Left Side */}
                <div className="flex items-start gap-4">
                  <FileText className="w-8 h-8 text-yellow-700 mt-1" />
                  <div>
                    <h3 className="text-xl font-serif text-gray-900">
                      {pdf.originalName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Published on{" "}
                      {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(pdf)}
                  className="flex items-center justify-center gap-2 border border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-white transition-all duration-300 px-6 py-3 font-medium tracking-wide"
                >
                  <Download className="w-5 h-5" />
                  Download Official PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPDF;