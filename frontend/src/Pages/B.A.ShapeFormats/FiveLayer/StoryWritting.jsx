import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PAGE_HEIGHT_MM = 220; // content area height
const MM_TO_PX = 3.78; // approx conversion
const PAGE_HEIGHT_PX = PAGE_HEIGHT_MM * MM_TO_PX;

const StoryWritting = () => {
  const axiosPublic = useAxiosPublic();
  const printRef = useRef(null);
  const measureRef = useRef(null);
  const [allPages, setAllPages] = useState([]);

  const { data: storyWritingFields = [], isLoading: fieldsLoading } = useQuery({
    queryKey: ["storyWritingFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/storyWritingField");
      return res.data?.data || [];
    },
  });

  /* ================= Fetch Data ================= */

  const { data: storyWriting = [], isLoading } = useQuery({
    queryKey: ["storyWriting"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/storyWriting");
      return res.data || [];
    },
  });

  /* ================= Dynamic Pagination ================= */

  const paginateContent = (htmlContent, title, writtingBy, createdAt) => {
    if (!measureRef.current) return [];

    const container = measureRef.current;
    container.innerHTML = htmlContent;

    const pages = [];
    let currentPage = "";

    const children = Array.from(container.childNodes);

    container.innerHTML = "";

    children.forEach((node) => {
      container.appendChild(node.cloneNode(true));

      if (container.scrollHeight > PAGE_HEIGHT_PX) {
        container.removeChild(container.lastChild);

        pages.push(currentPage);

        currentPage = node.outerHTML || node.textContent;
        container.innerHTML = node.outerHTML || node.textContent;
      } else {
        currentPage += node.outerHTML || node.textContent;
      }
    });

    if (currentPage) {
      pages.push(currentPage);
    }

    return pages.map((content, index) => ({
      title,
      content,
      writtingBy,
      createdAt,
      pageNumber: index + 1,
    }));
  };

  /* ================= Prepare Pages ================= */

  useEffect(() => {
    if (!storyWriting.length) return;

    const finalPages = [];

    storyWriting.forEach((story) => {
      const pages = paginateContent(
        story.description || "",
        story.title || "",
        story.writtingBy || "Admin",
        story.createdAt || "",
      );

      finalPages.push(...pages);
    });

    setAllPages(finalPages);
  }, [storyWriting]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading story content...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 max-w-[1400px] mx-auto">
      <section className="text-center mb-12">
        {storyWritingFields.length === 0 ? (
          <p className="text-gray-500">No story fields available.</p>
        ) : (
          <div className="space-y-8">
            {storyWritingFields.map((field) => (
              <div key={field._id} className="px-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  {field.title}
                </h2>
                <p className="text-gray-700 text-justify mt-5 leading-relaxed">
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Hidden Measuring Container */}
      <div
        ref={measureRef}
        className="absolute invisible w-[170mm] p-0 text-[15px] leading-relaxed"
        style={{ height: `${PAGE_HEIGHT_MM}mm` }}
      />

      <div
        ref={printRef}
        className="flex flex-col items-center gap-10 print:gap-0"
      >
        {allPages.map((page, index) => (
          <div
            key={index}
            className="relative bg-white shadow-xl border border-gray-300
                       w-[210mm] h-[297mm]
                       p-[20mm]
                       print:shadow-none print:border-none
                       overflow-hidden"
          >
            {/* Header */}
            {page.title && (
              <header className="text-center border-b pb-4 mb-6">
                <h1 className="text-2xl font-serif font-bold text-gray-900">
                  {page.title}
                </h1>
              </header>
            )}

            {/* Content */}
            <article
              className="text-gray-800 text-justify leading-relaxed text-[15px]
                         h-[220mm] overflow-hidden"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />

            {/* Footer */}
            <footer className="absolute bottom-6 left-6 text-xs text-gray-500">
              Written by: {page.writtingBy} <br />
              Date: {formatDate(page.createdAt)}
            </footer>

            <div className="absolute bottom-6 right-6 text-xs text-gray-500">
              Page {index + 1} of {allPages.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryWritting;
