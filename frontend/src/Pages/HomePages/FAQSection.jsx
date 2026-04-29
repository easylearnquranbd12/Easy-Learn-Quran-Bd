import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const FAQSection = () => {
  const axiosPublic = useAxiosPublic();

  const [open, setOpen] = useState(null);

  // ✅ GET FAQ
  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/faqs");
      return res.data;
    },
  });

  return (
    <div className="py-10 md:py-16 bg-[#eef5f1]">
      
      {/* TITLE */}
      <div className="text-center mb-12 ">
        <h2 className="text-sm md:text-base font-semibold tracking-[4px] text-[#145c43] uppercase mb-3">
          Frequently Asked Questions
        </h2>

        <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
          Everything You Need <br className="hidden md:block" />
          To Know
        </h1>

        <div className="w-24 h-1 bg-gradient-to-r from-[#0f3d2e] to-[#145c43] mx-auto mt-5 rounded-full" />
      </div>

      {/* FAQ CONTAINER */}
      <div className="max-w-7xl mx-auto px-0 md:px-6 space-y-5">

        {isLoading ? (
          <div className="text-center py-10 text-gray-500">
            Loading FAQ...
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No FAQ Found.
          </div>
        ) : (
          faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={item._id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#145c43] shadow-xl"
                    : "bg-[#e6f0eb] border-transparent"
                }`}
              >
                {/* QUESTION */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center px-2 md:px-7 py-3 text-left"
                >
                  <div className="flex items-start gap-4">

                    {/* NUMBER */}
                    <div
                      className={`min-w-[38px] h-[38px] rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-r from-[#0f3d2e] to-[#145c43] text-white"
                          : "bg-white text-[#145c43]"
                      }`}
                    >
                      {i + 1}
                    </div>

                    {/* QUESTION TEXT */}
                    <span className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
                      {item.name}
                    </span>
                  </div>

                  {/* ICON */}
                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 text-[#145c43]"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-7 pb-6 text-sm md:text-[15px] text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          item.description
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FAQSection;