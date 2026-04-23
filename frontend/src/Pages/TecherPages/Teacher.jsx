import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Teacher = () => {
  const axiosPublic = useAxiosPublic();
  const [expanded, setExpanded] = useState({});

  const { data: techers = [], isLoading } = useQuery({
    queryKey: ["techers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/techers");
      return res.data;
    },
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
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
    return <div className="text-center py-10">Loading techers...</div>;
  }

  return (
    <div className="w-full py-16 px-4">
      {/* 🔥 TITLE */}
      <div className="text-center mb-12">
        <p className="text-xl font-bold text-green-800 uppercase relative inline-block">
          Our techers
          {/* Wavy Underline */}
          <span className="absolute left-0 -bottom-2 w-full">
            <svg viewBox="0 0 200 10" className="w-full h-3">
              <path
                d="M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5 T 140 5 T 160 5 T 180 5 T 200 5"
                fill="transparent"
                stroke="#065f46"
                strokeWidth="2"
              />
            </svg>
          </span>
        </p>
      </div>

      {/* 🔥 TEACHER CARDS */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {techers.map((t, index) => {
          const isExpanded = expanded[t._id];
          const shortText = t.description?.slice(0, 520);

          return (
            <motion.div
              key={t._id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300  p-6 relative"
            >
              {/* IMAGE */}
              <div className="w-24 h-24 mx-auto mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover rounded-full border-4 border-green-100"
                />
              </div>

              {/* NAME */}
              <h3 className="text-sm md:text-base mt-1 text-justify">
                <span className="text-lg font-bold text-green-700">Name :</span>{" "}
                {t.name}
              </h3>

              {/* QUALIFICATION */}
              <p className="text-sm md:text-base mt-1 text-justify">
                <span className="text-lg font-bold text-green-700">
                  Qualification:
                </span>{" "}
                {t.qualification}
              </p>

              {/* EXPERIENCE */}
              <p className="text-sm md:text-base mt-1 text-justify ">
                <span className="text-lg font-bold text-green-700">
                  Experience:
                </span>{" "}
                {t.experience}
              </p>

              {/* DESCRIPTION WITH SEE MORE */}
              <motion.div
                className="text-sm text-gray-600 mt-3 leading-relaxed text-justify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      isExpanded ? t.description : shortText,
                    ),
                  }}
                />

                {t.description?.length > 520 && (
                  <button
                    onClick={() => toggleReadMore(t._id)}
                    className="text-green-700 font-semibold mt-2 hover:underline"
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </button>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Teacher;
