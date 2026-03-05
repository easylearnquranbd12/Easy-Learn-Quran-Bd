

import { Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const PDFDownload = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/pdf");
      const data = await res.json();
      if (res.ok) setPdfs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

// const handleDownload = async (id, filename, isUser = false) => {
//   try {
//     const url = isUser
//       ? `http://localhost:5000/pdf/user/download/${id}`
//       : `http://localhost:5000/pdf/download/${id}`;

//     const res = await fetch(url, { credentials: "include" });
//     if (!res.ok) throw new Error("Download failed");

//     const blob = await res.blob();
//     const downloadUrl = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.download = filename || "document.pdf";
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   } catch (err) {
//     console.error(err);
//     alert("Download failed!");
//   }
// };
const handleDownload = (id) => {
  console.log(id)
  window.location.href = `http://localhost:5000/pdf/download/${id}`;
};
  return (
    <div className=" min-h-screen py-20">
      <Helmet>
        <title>Official Document Archive</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-6">

        {/* ===== Header ===== */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-700 flex items-center justify-center text-yellow-700 font-serif text-xl font-bold mb-6">
            PDF
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
            Official Document Archive
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            The following documents are preserved within the official archive.
            Each file has been formally recorded and is available for
            scholarly and institutional reference.
          </p>

          <div className="w-28 h-[2px] bg-yellow-700 mx-auto mt-8"></div>
        </div>

        {/* ===== Content ===== */}
        {loading ? (
          <div className="text-center py-20 text-gray-600">
            Loading archived documents...
          </div>
        ) : pdfs.length === 0 ? (
          <div className="text-center py-20 border-t border-b border-gray-300">
            <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-serif text-gray-800">
              No Documents Available
            </h3>
            <p className="text-gray-500 mt-4">
              Official documents will appear here once recorded.
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
                      Recorded on{" "}
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
                onClick={() => handleDownload(pdf._id, pdf.originalName, true)}
                  className="flex items-center justify-center gap-2 border border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-white transition-all duration-300 px-6 py-3 font-medium tracking-wide"
                >
                  <Download className="w-5 h-5" />
                  Download Official Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFDownload;