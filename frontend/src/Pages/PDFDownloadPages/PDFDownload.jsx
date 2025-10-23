import { Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const PDFDownload = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all PDFs
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

  // Download PDF
  const handleDownload = async (pdf) => {
    try {
      const res = await fetch(`http://localhost:5000/pdf/download/${pdf._id}`);
      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = pdf.originalName; // original file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Download failed!");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-start">
      <Helmet>
        <title>Download PDFs</title>
      </Helmet>

      <div className="w-full max-w-lg mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-red-600" />
          Download PDFs
        </h1>

        {loading ? (
          <p className="text-gray-600 text-sm">Loading PDFs...</p>
        ) : pdfs.length === 0 ? (
          <p className="text-gray-600 text-sm">No PDFs available.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {pdfs.map((pdf) => (
              <li
                key={pdf._id}
                className="flex items-center justify-between bg-white/50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-gray-700 text-sm">{pdf.originalName}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(pdf.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(pdf)}
                  className="flex items-center gap-1 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PDFDownload;
