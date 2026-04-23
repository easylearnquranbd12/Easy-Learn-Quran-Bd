import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TestimonialSection = () => {
  const axiosPublic = useAxiosPublic();
  const [expanded, setExpanded] = useState({});

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get("/testimonials");
      return res.data;
    },
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

  return (
    <div className="relative py-16 overflow-hidden max-w-[1400px] mx-auto">

      {/* 🔥 TITLE */}
      <div className="text-center mb-14">
        <p className="text-xl font-bold text-green-800 uppercase relative inline-block">
          Testimonials
          <span className="absolute left-0 -bottom-2 w-full">
            <svg viewBox="0 0 200 10" className="w-full h-3">
              <path
                d="M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5 T 140 5 T 160 5 T 180 5 T 200 5"
                fill="transparent"
                stroke="#111827"
                strokeWidth="2"
              />
            </svg>
          </span>
        </p>
      </div>

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">

        {testimonials.map((item, index) => {
          const isExpanded = expanded[item._id];
          const shortText = item.description?.slice(0, 220);

          return (
            <motion.div
              key={item._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 px-6 pt-12 pb-6 relative text-center group"
            >

              {/* 🔥 AVATAR */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <img
                  src={item.image}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover group-hover:scale-110 transition"
                />
              </div>

              {/* 🔥 DESCRIPTION */}
              <div className="text-sm text-gray-600 leading-relaxed mt-2 text-justify">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      isExpanded ? item.description : shortText
                    ),
                  }}
                />

                {item.description?.length > 220 && (
                  <button
                    onClick={() => toggleReadMore(item._id)}
                    className="text-teal-600 font-semibold mt-2 hover:underline"
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </button>
                )}
              </div>

              {/* 🔥 NAME */}
              <p className="mt-4 text-xs md:text-sm font-semibold text-gray-600">
                {item.name}
              </p>

              {/* 🔥 QUOTE ICON */}
              <div className="absolute top-4 right-4 text-gray-200 text-4xl">
                “
              </div>

            </motion.div>
          );
        })}

      </div>

      {/* 🔥 DOTS (STATIC UI) */}
      <div className="flex justify-center gap-2 mt-10">
        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
      </div>

    </div>
  );
};

export default TestimonialSection;