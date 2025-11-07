// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const StoryWritting = () => {
//   const axiosPublic = useAxiosPublic();
//   const printRef = useRef();
//   const [allPages, setAllPages] = useState([]);

//   // ✅ Fetch story fields
//   const { data: storyWritingFields = [], isLoading: fieldsLoading } = useQuery({
//     queryKey: ["storyWritingFields"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/five-layer/storyWritingField");
//       return res.data?.data || [];
//     },
//   });

//   // ✅ Fetch story writings
//   const { data: storyWriting = [], isLoading: storiesLoading } = useQuery({
//     queryKey: ["storyWriting"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/five-layer/storyWriting");
//       return res.data || [];
//     },
//   });

//   const isLoading = fieldsLoading || storiesLoading;

//   // ✅ Print handler (Download as PDF)
//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     documentTitle: "Story_Writing_A4",
//   });

//   // ✅ Split long HTML text into multiple A4-sized chunks
//   const splitIntoPages = (htmlString, chunkSize = 3500) => {
//     const text = htmlString.replace(/<[^>]+>/g, ""); // strip HTML
//     const chunks = [];
//     for (let i = 0; i < text.length; i += chunkSize) {
//       chunks.push(text.slice(i, i + chunkSize));
//     }
//     return chunks;
//   };

//   // ✅ Prepare all pages
//   useEffect(() => {
//     if (!fieldsLoading && !storiesLoading) {
//       const pages = [];

//       // Story Fields
//       storyWritingFields.forEach((field) => {
//         pages.push({
//           type: "field",
//           title: field.title,
//           content: field.description,
//           writtingBy: field.writtingBy || "0",
//           createdAt: field.createdAt || "",
//         });
//       });

//       // Story Writings
//       storyWriting.forEach((story) => {
//         const chunks = splitIntoPages(story.description);
//         chunks.forEach((chunk, idx) => {
//           pages.push({
//             type: "story",
//             title: 0, // name suppressed
//             content: chunk,
//             writtingBy: story.writtingBy || "0",
//             createdAt: story.createdAt || "",
//             pageNumber: idx + 1,
//             total: chunks.length,
//           });
//         });
//       });

//       setAllPages(pages);
//     }
//   }, [storyWritingFields, storyWriting, fieldsLoading, storiesLoading]);

//   if (isLoading) {
//     return (
//       <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 ">

//       {/* Printable Pages */}
//       <div
//         ref={printRef}
//         className="flex flex-col items-center gap-8 print:gap-0"
//       >
//         {allPages.map((page, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-lg border border-gray-300 rounded-lg w-[125mm] md:w-[320mm] h-[397mm] md:h-[300mm] p-[12mm] md:p-[25mm] overflow-hidden print:shadow-none print:border-none relative"
//           >
//             {/* Header */}
//             {page.type === "field" && (
//               <header className="text-center border-b pb-3 mb-4">
//                 <h1 className="text-3xl font-serif font-bold text-gray-900">
//                   {page.title}
//                 </h1>
//               </header>
//             )}

//             {/* Page Content */}
//             <article className="text-gray-800 text-justify leading-relaxed text-[15px] whitespace-pre-line h-[320mm] overflow-hidden">
//               {page.content}
//             </article>

//             {/* Footer */}
//             <footer className="absolute bottom-5 left-5 text-left text-xs text-gray-500">
//               Written by: {page.writtingBy} | Date:{" "}
//               {page.createdAt ? new Date(page.createdAt).toLocaleDateString() : ""}
//             </footer>

//             <div className="absolute bottom-5 right-5 text-xs text-gray-500 text-right">
//               Page {index + 1} of {allPages.length}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StoryWritting;

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
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

  // ✅ Split long text into multiple A4 pages
  const splitIntoPages = (htmlString, chunkSize = 3500) => {
    const text = htmlString.replace(/<[^>]+>/g, ""); // strip HTML tags
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // ✅ Prepare pages
  useEffect(() => {
    if (!fieldsLoading && !storiesLoading) {
      const pages = [];

      // Story Fields (admin content)
      storyWritingFields.forEach((field) => {
        pages.push({
          type: "field",
          title: field.title,
          content: field.description,
          writtingBy: field.writtingBy || "Admin",
          createdAt: field.createdAt || "",
        });
      });

      // Story Writings
      storyWriting.forEach((story) => {
        const chunks = splitIntoPages(story.description);
        chunks.forEach((chunk, idx) => {
          pages.push({
            type: "story",
            title: story.title || "",
            content: chunk,
            writtingBy: story.writtingBy || "Admin",
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
console.log(storyWriting)
  return (
    <div className="min-h-screen py-10 max-w-[1400px] mx-auto">
      <section className="text-center">
        {storyWritingFields.length === 0 ? (
          <p className="text-gray-500">No song fields found.</p>
        ) : (
          <div className="space-y-6">
            {storyWritingFields.map((field) => (
              <div key={field._id} className="p-4">
                <h3 className="font-semibold text-3xl">{field.title}</h3>
                <p className="text-gray-600 text-sm lg:text-base text-justify py-5">
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div
        ref={printRef}
        className="flex flex-col items-center gap-8 print:gap-0"
      >
        {allPages.map((page, index) => (
          <div
            key={index}
            className="bg-white shadow-lg border border-gray-300 rounded-lg w-[125mm] md:w-[320mm] h-[397mm] md:h-[300mm] p-[12mm] md:p-[25mm] overflow-hidden   relative"
          >
            {/* Header */}
            {/* Header: show only if name is not empty */}
            {page.name && page.name.trim() !== "" && (
              <header className="text-center border-b pb-3 mb-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900">
                  {page.name}
                </h1>
              </header>
            )}

            {/* Page Content */}
            <article
              className="text-gray-800 text-justify leading-relaxed text-[15px] whitespace-pre-line h-[220mm] overflow-hidden"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />

            {/* Footer */}
            <footer className="absolute bottom-5 left-5 text-left text-xs text-gray-500">
              Written by: {page.writtingBy} | Date:{" "}
              {page.createdAt
                ? new Date(page.createdAt).toLocaleDateString()
                : ""}
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
