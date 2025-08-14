import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import CustomLoading from "../../components/Loading/CustomLoading";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const MeetTheTeacher = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: imageandtext,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["activeimageandtext"],
    queryFn: async () => {
      const res = await axiosPublic.get("/imageandtext?status=active");
      return res.data?.[0]; // one active
    },
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <CustomLoading />;
  }

  if (isError || !imageandtext) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
          <AlertCircle size={40} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl text-red-500 mb-2">
            Unable to Load Teacher Info
          </h2>
          <p className="text-black mb-6">Please try again later.</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="mb-20 py-12">
      <TittleAnimation
        tittle="Meet The Teacher"
        subtittle=" Meet Our Expert Teacher"
      />

      <div className="transition-all duration-300 max-w-7xl mx-auto px-4">
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    {/* Image section */}
  <motion.div
  className="w-full h-full md:w-1/2 flex justify-center items-center"
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  custom={0}
>
  <img
    src={
      imageandtext.image ||
      "https://i.ibb.co/YtLt9kv/default-profile.png"
    }
    alt={imageandtext.name}
    className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-md"
  />
</motion.div>


    {/* Text section */}
    <motion.div
      className="w-full md:w-1/2 flex flex-col justify-center space-y-4 text-center md:text-left"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-[#3B6B53]">
        {imageandtext.tittle}
      </h3>
      <p className="text-gray-700 text-base text-justify leading-relaxed">
        {imageandtext.description}
      </p>
    </motion.div>
  </div>
</div>

    </section>
  );
};

export default MeetTheTeacher;
