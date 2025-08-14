import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import CustomLoading from "../../components/Loading/CustomLoading";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const HometextCreateui = () => {
  const axiosPublic = useAxiosPublic();

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["activeBanner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner?status=active");
      return res.data;
    },
    refetchOnWindowFocus: true,
  });

  if(isLoading){
    return <CustomLoading/>
  }
  const activeBanner = banners[0]; // 👈 take the first active banner

  return (
    <div>
      <Helmet>
        <title>Nasmatics | Home</title>
      </Helmet>
      <div className="flex items-center justify-center mt-10 max-w-7xl mx-auto ">
        <div className="w-full">
          <div className="flex items-center flex-col-reverse lg:flex-row gap-6">
            {/* Text Section */}
            <div className="w-full md:px-2 text-center">
              <motion.h1
                className="text-2xl md:text-4xl font-bold text-[#3B6B53] text-justify"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                {activeBanner?.title || "The best teachers, the best guidance."}
              </motion.h1>

              <motion.p
                className="py-4 text-base lg:text-lg text-justify"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                {activeBanner?.description ||
                  `A world painted in the rhythm of numbers, nature governed by the
                  laws of forces and energy, and the mysterious dance of atoms and
                  molecules — our sole path to great knowledge. May your journey
                  shine bright with the light of the Science Trinity.`}
              </motion.p>

              <Link
                to="/courses"
                className="btn bg-[#3B6B53] text-white px-6 py-4 rounded-md text-base hover:bg-inherit hover:text-[#3B6B53] transition-colors duration-300"
              >
                JOIN NASMATICS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HometextCreateui;
