import { useQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const BlankFormat = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pdfs = [], isLoading } = useQuery({
    queryKey: ["blankPDFs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pdf/blank");
      return res.data || [];
    },
  });

  const handleDownload = (id) => {
    window.location.href = `http://localhost:5000/pdf/blank/download/${id}`;
  };

  if (isLoading) return <CustomLoading />;

  return (
    <div className="min-h-screen py-5">
      <Helmet>
        <title>Blank Document Formats</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-3 md:px-6">

        {/* ===== Header ===== */}
        <div className="text-center mb-16">

          <div className="w-20 h-20 mx-auto rounded-full border-4 border-teal-700 flex items-center justify-center text-teal-700 text-xl font-serif font-bold mb-6">
            PDF
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
            Official Blank Document Formats
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            These blank document formats are provided for applicants and contributors
            to properly prepare and submit their documents according to the official
            submission guidelines of the platform.
          </p>

          <div className="w-28 h-[2px] bg-teal-700 mx-auto mt-8"></div>
        </div>

        {/* ===== Content ===== */}
        {pdfs.length === 0 ? (
          <div className="text-center py-20 border-t border-b border-gray-300">
            <FileText className="w-14 h-14 mx-auto text-gray-300 mb-4" />

            <h3 className="text-2xl font-serif text-gray-800">
              No Blank Formats Available
            </h3>

            <p className="text-gray-500 mt-4">
              Blank document formats will appear here once they are uploaded by the administrator.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-300">
            {pdfs.map((pdf) => (
              <div
                key={pdf._id}
                className="py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                {/* Left */}
                <div className="flex items-start gap-4">
                  <FileText className="w-8 h-8 text-teal-700 mt-1" />

                  <div>
                    <h3 className="text-xl font-serif text-gray-900">
                      {pdf.originalName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Uploaded on{" "}
                      {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Download */}
                <button
                  onClick={() => handleDownload(pdf._id)}
                  className="flex items-center justify-center gap-2 border border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-300 px-6 py-3 font-medium tracking-wide rounded-sm"
                >
                  <Download className="w-5 h-5" />
                  Download Blank Format
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlankFormat;