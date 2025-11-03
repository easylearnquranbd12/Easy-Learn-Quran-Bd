import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const StoryWritting = () => {
  const axiosPublic = useAxiosPublic();
  const printRef = useRef();
  const [allPages, setAllPages] = useState([]);

  // ✅ Fetch story fields
  const { data: storyWritingFields = [], isLoading: fieldsLoading } = useQuery({
    queryKey: ["storyWritingFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/storyWritingField");
      return res.data?.data || [];
    },
  });

  // ✅ Fetch story writings
  const { data: storyWriting = [], isLoading: storiesLoading } = useQuery({
    queryKey: ["storyWriting"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/storyWriting");
      return res.data || [];
    },
  });

  const isLoading = fieldsLoading || storiesLoading;

  // ✅ Print handler (Download as PDF)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Story_Writing_A4",
  });

  // ✅ Split long HTML text into multiple A4-sized chunks
  const splitIntoPages = (htmlString, chunkSize = 3500) => {
    const text = htmlString.replace(/<[^>]+>/g, ""); // strip HTML
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // ✅ Prepare all pages
  useEffect(() => {
    if (!fieldsLoading && !storiesLoading) {
      const pages = [];

      // Story Fields
      storyWritingFields.forEach((field) => {
        pages.push({
          type: "field",
          title: field.title,
          content: field.description,
          writtingBy: field.writtingBy || "0",
          createdAt: field.createdAt || "",
        });
      });

      // Story Writings
      storyWriting.forEach((story) => {
        const chunks = splitIntoPages(story.description);
        chunks.forEach((chunk, idx) => {
          pages.push({
            type: "story",
            title: 0, // name suppressed
            content: chunk,
            writtingBy: story.writtingBy || "0",
            createdAt: story.createdAt || "",
            pageNumber: idx + 1,
            total: chunks.length,
          });
        });
      });

      setAllPages(pages);
    }
  }, [storyWritingFields, storyWriting, fieldsLoading, storiesLoading]);

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 ">
      {/* Download PDF */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          📄 Download as PDF
        </button>
      </div>

      {/* Printable Pages */}
      <div
        ref={printRef}
        className="flex flex-col items-center gap-8 print:gap-0"
      >
        {allPages.map((page, index) => (
          <div
            key={index}
            className="bg-white shadow-lg border border-gray-300 rounded-lg w-[125mm] md:w-[320mm] h-[397mm] md:h-[300mm] p-[12mm] md:p-[25mm] overflow-hidden print:shadow-none print:border-none relative"
          >
            {/* Header */}
            {page.type === "field" && (
              <header className="text-center border-b pb-3 mb-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900">
                  {page.title}
                </h1>
              </header>
            )}

            {/* Page Content */}
            <article className="text-gray-800 text-justify leading-relaxed text-[15px] whitespace-pre-line h-[320mm] overflow-hidden">
              {page.content}
            </article>

            {/* Footer */}
            <footer className="absolute bottom-5 left-5 text-left text-xs text-gray-500">
              Written by: {page.writtingBy} | Date:{" "}
              {page.createdAt ? new Date(page.createdAt).toLocaleDateString() : ""}
            </footer>

            <div className="absolute bottom-5 right-5 text-xs text-gray-500 text-right">
              Page {index + 1} of {allPages.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryWritting;
