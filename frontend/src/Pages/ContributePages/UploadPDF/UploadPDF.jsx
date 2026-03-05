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

  // Download PDF
  const handleDownload = async (pdf) => {
    try {
      const res = await axiosPublic.get(`/pdf/user/download/${pdf._id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", pdf.originalName || "document.pdf");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Download failed. Please try again.");
    }
  };

  if (isLoading) return <CustomLoading />;

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>Official Approved Documents</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-3 md:px-6">

        {/* ===== Header ===== */}
        <div className="text-center mb-16">

          <div className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-700 flex items-center justify-center text-yellow-700 text-xl font-serif font-bold mb-6">
            PDF
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
            Official Approved Documents
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            The following documents have been formally reviewed and approved.
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
              Approved PDF documents will appear here once they are verified
              and accepted by the administration.
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