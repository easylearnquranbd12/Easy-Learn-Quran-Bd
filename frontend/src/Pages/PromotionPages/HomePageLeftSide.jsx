import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HomePageLeftSide = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/promotions");
        // শুধু left side এর জন্য filter
        setPromotions(data.filter((p) => p.position === "middle"));
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    fetchPromotions();
  }, []);

  return (
     <div className=" w-full">
        {promotions.map((promo) => (
          <motion.div
            key={promo._id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl shadow-lg overflow-hidden border border-gray-200 bg-white"
          >
            {/* Image clickable */}
            <a href={promo.link} target="_blank" rel="noopener noreferrer">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="w-full min-h-[280px]  object-cover cursor-pointer hover:opacity-90 transition"
              />
            </a>

            {/* নিচে text */}
            <div className="p-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {promo.title}
              </h3>
             
            </div>
          </motion.div>
        ))}
      </div>
  );
};

export default HomePageLeftSide;
