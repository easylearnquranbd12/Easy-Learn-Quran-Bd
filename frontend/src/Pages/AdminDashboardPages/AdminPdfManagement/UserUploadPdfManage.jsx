import { Download, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const UserUploadPdfManage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [pdfs, setPdfs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load PDF history
  const fetchPdfs = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch("http://localhost:5000/pdf/user");
      const data = await res.json();
      if (res.ok) setPdfs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
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

  // Upload handler
  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Please choose a PDF file first." });
      return;
    }
    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await fetch("http://localhost:5000/pdf/user/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setFile(null);
        fetchPdfs(); // Refresh history
      } else {
        setMessage({ type: "error", text: data.message || "Upload failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error, please try again." });
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
          const res = await fetch(`http://localhost:5000/pdf/user/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire("Deleted!", data.message, "success");
            fetchPdfs(); // Refresh history
          } else {
            Swal.fire("Error", data.message || "Delete failed", "error");
          }
        } catch (err) {
          Swal.fire("Error", "Server error", "error");
        }
      }
    });
  };

  // Update status (accept/reject) - admin action
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/pdf/user/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Updated!", data.message, "success");
        fetchPdfs();
      } else {
        Swal.fire("Error", data.message || "Failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  // Download PDF
  const handleDownload = async (pdf) => {
    try {
      const res = await fetch(`http://localhost:5000/pdf/user/download/${pdf._id}`);
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
    < >
      <Helmet>
        <title>User PDF Management | PDF Upload</title>
      </Helmet>

      {/* PDF History */}
      <div className="w-full max-w-[1400px] mx-auto mt-8 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
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
                  <FileText className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-gray-700 text-sm">{pdf.originalName}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(pdf.createdAt).toLocaleString()}
                    </p>
                    <p className="text-xs mt-1">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          pdf.status === "pending"
                            ? "text-yellow-600"
                            : pdf.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {pdf.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Admin can Accept/Reject */}
                  {pdf.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(pdf._id, "accepted")}
                        className="px-2 py-1 text-green-700 border border-green-700 rounded hover:bg-green-100 text-xs"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(pdf._id, "rejected")}
                        className="px-2 py-1 text-red-700 border border-red-700 rounded hover:bg-red-100 text-xs"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDownload(pdf)}
                        className="flex items-center gap-1 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </>
                  )}

                  {/* Delete */}
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
    </>
  );
};

export default UserUploadPdfManage;
