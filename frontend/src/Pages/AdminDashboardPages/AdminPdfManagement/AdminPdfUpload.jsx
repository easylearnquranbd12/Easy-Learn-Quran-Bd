import { AlertCircle, CheckCircle2, FileText, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AdminPdfUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [pdfs, setPdfs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

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
  // const handleUpload = async () => {
  //   if (!file) {
  //     setMessage({ type: "error", text: "Please choose a PDF file first." });
  //     return;
  //   }
  //   setUploading(true);
  //   setMessage({ type: "", text: "" });

  //   try {
  //     const formData = new FormData();
  //     formData.append("pdf", file);

  //     const res = await fetch("http://localhost:5000/pdf/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await res.json();

  //     if (res.ok) {
  //       setMessage({ type: "success", text: data.message });
  //       setFile(null);
  //       fetchPdfs(); // Refresh history
  //     } else {
  //       setMessage({ type: "error", text: data.message || "Upload failed" });
  //     }
  //   } catch (error) {
  //     setMessage({ type: "error", text: "Server error, please try again." });
  //   } finally {
  //     setUploading(false);
  //   }
  // };

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

  setUploading(true);

  try {
    const formData = new FormData();
    formData.append("pdf", file);

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

  return (
    <div >
      <Helmet>
        <title>Admin | PDF Upload</title>
      </Helmet>

      {/* Upload Box */}
      <div className="w-full max-w-[1400px] mx-auto mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-6">
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
              <Upload className="w-5 h-5" /> Upload
            </>
          )}
        </button>
      </div>

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
                  <FileText className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-gray-700 text-sm">{pdf.originalName}</p>
                    <p className="text-gray-500 text-xs">{new Date(pdf.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(pdf._id, pdf.originalName)}
                  className="text-red-600 hover:text-teal-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPdfUpload;
