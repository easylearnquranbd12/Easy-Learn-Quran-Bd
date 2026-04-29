import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Course = () => {
  const axiosPublic = useAxiosPublic();

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { data: techers = [], isLoading } = useQuery({
    queryKey: ["techers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/techers");
      return res.data;
    },
  });

  // RESET SEE MORE WHEN MODAL CHANGES
  useEffect(() => {
    setShowFullDescription(false);
  }, [selectedTeacher]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.4,
      },
    }),
  };

  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-500">
        Loading teachers...
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-4 bg-[#f8faf9]">
      
      {/* TITLE */}
      <div className="text-center mb-14">
        <p className="text-2xl md:text-3xl font-bold uppercase tracking-wide inline-block bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
          Teachers 
        </p>

        <span className="block w-24 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1]"></span>

        <p className="text-sm text-gray-500 mt-4">
          Meet our experienced Quran teachers
        </p>
      </div>

      {/* TEACHERS */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {techers.map((t, index) => (
          <motion.div
            key={t._id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={index}
            className="group bg-white rounded-[30px] border border-[#e4f1eb] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* CONTENT */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {t.name || "Teacher Name"}
              </h2>

              <p className="text-[#145c43] font-medium text-sm mb-5">
                {t.qualification || "Hafiz/Hafiza"}
              </p>

              <button
                onClick={() => setSelectedTeacher(t)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#145c43] text-white font-medium hover:scale-105 transition duration-300"
              >
                Experience
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
     {/* MODAL */}
<AnimatePresence>
  {selectedTeacher && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white w-full max-w-3xl rounded-[35px] overflow-hidden shadow-2xl max-h-[70vh] overflow-y-auto custom-scroll"
      >
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedTeacher(null)}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-red-100 text-gray-700 hover:text-red-600 shadow transition"
        >
          ✕
        </button>

        {/* TOP SECTION */}
        <div className="relative bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] pt-14 pb-20 flex justify-center">
          
          {/* IMAGE */}
          <img
            src={selectedTeacher.image}
            alt={selectedTeacher.name}
            className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-white object-cover shadow-2xl"
          />
        </div>

        {/* CONTENT */}
        <div className="px-6 md:px-10 pb-10 -mt-14 relative z-10">
          
          <div className="bg-white rounded-[30px] shadow-xl p-6 md:p-8">
            
            {/* NAME */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              {selectedTeacher.name}
            </h2>

            {/* QUALIFICATION */}
            <p className="text-center text-[#145c43] font-semibold mb-6">
              {selectedTeacher.qualification}
            </p>

            {/* DESCRIPTION */}
            <div className="mt-4">
              <motion.div
                className={`prose max-w-none text-gray-700 leading-relaxed text-sm md:text-base overflow-hidden transition-all duration-500 ${
                  showFullDescription
                    ? "max-h-[1000px]"
                    : "max-h-[140px]"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    selectedTeacher.description ||
                      "Experienced Quran teacher with strong knowledge of Tajweed, Quran recitation, and Islamic studies."
                  ),
                }}
              />

              {/* SEE MORE BUTTON */}
              <button
                onClick={() =>
                  setShowFullDescription(!showFullDescription)
                }
                className="mt-4 text-[#145c43] font-semibold hover:underline transition"
              >
                {showFullDescription
                  ? "See Less"
                  : "See More"}
              </button>
            </div>

            {/* EXTRA INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              
              <div className="bg-[#f4fbf7] rounded-2xl p-4 border border-[#dff3e9]">
                <h4 className="font-semibold text-[#145c43] mb-1">
                  Experience
                </h4>

                <p className="text-gray-600 text-sm">
                  {selectedTeacher.experience || "5+ Years"}
                </p>
              </div>

              <div className="bg-[#f4fbf7] rounded-2xl p-4 border border-[#dff3e9]">
                <h4 className="font-semibold text-[#145c43] mb-1">
                  Speciality
                </h4>

                <p className="text-gray-600 text-sm">
                  {selectedTeacher.speciality ||
                    "Quran & Tajweed"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Course;