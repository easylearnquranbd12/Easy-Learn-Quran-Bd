import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  const data = [
    {
      question: "What are we and animation?",
      answer:
        "We provide modern UI animations that enhance user experience with smooth transitions and engaging interactions across your website.",
    },
    {
      question: "What is items accordion?",
      answer:
        "Accordion is a UI component that allows users to expand and collapse content sections, making information more organized and user-friendly.",
    },
    {
      question: "Smooth expand animations?",
      answer:
        "Yes! We use smooth height transitions and easing animations to make content expansion feel natural and visually appealing.",
    },
  ];

  return (
    <div className="py-5 bg-[#eef5f1]">
      {/* TITLE */}
      <h2 className="text-center text-xl md:text-3xl font-bold text-gray-600 tracking-[3px] mb-12">
        FAQ
      </h2>

      {/* FAQ CONTAINER */}
      <div className="max-w-7xl mx-auto  space-y-4">
        {data.map((item, i) => {
          const isOpen = open === i;

          return (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 ${
                isOpen
                  ? "bg-white border-green-600 shadow-md"
                  : "bg-[#e6f0eb] border-transparent"
              }`}
            >
              {/* QUESTION */}
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <span className="text-base md:text-lg font-semibold text-gray-800">
                  {item.question}
                </span>

                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-green-600" : "text-gray-500"
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
                  <p className="px-6 pb-4 text-[13px] text-gray-500 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
