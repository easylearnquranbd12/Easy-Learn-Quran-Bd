import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Teacher = () => {
  const axiosPublic = useAxiosPublic();

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
        delay: i * 0.12,
        duration: 0.4,
      },
    }),
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading teachers...</div>;
  }

  return (
    <div className="w-full py-20 px-4 bg-gray-50">
      {/* 🔥 TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">
          TEACHERS SECTION
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Premium professors for industrial-knocking
        </p>
      </div>

      {/* 🔥 CARDS */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {techers.map((t, index) => (
          <motion.div
            key={t._id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center"
          >
            {/* IMAGE */}
            <div className="w-20 h-20 mx-auto mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* NAME */}
            <h3 className="text-lg font-semibold text-gray-800">
              {t.name || "Name Name"}
            </h3>

            {/* ROLE / TITLE */}
            <p className="text-sm text-gray-500 mt-1">
              {t.qualification || "Hafiz/Hafiza"}
            </p>

            {/* BUTTON */}
            <button className="mt-4 px-4 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition">
              Experience
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Teacher;