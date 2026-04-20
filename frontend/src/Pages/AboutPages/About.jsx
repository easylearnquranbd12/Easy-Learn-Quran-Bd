import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const About = () => {
  const axiosPublic = useAxiosPublic();

  const { data: about = [], isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await axiosPublic.get("/about/about");
      return res.data || [];
    },
  });

  return (
    <div>
      <Helmet>
        <title>Easy Learn Quran Bd | About</title>
      </Helmet>

      <div className="py-5 max-w-[1400px] mx-auto px-2">
        <TittleAnimation tittle="About" subtittle="About Us More Information" />

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            {/* Glow background */}
            <div className="absolute inset-0 rounded-2xl opacity-60"></div>

            {/* Text */}
            <p className="text-teal-800 text-sm font-semibold tracking-wide flex items-center gap-1">
              Loading
              <span className="flex">
                <span className="animate-bounce [animation-delay:0ms]">.</span>
                <span className="animate-bounce [animation-delay:150ms]">
                  .
                </span>
                <span className="animate-bounce [animation-delay:300ms]">
                  .
                </span>
              </span>
            </p>
          </div>
        ) : (
          about.map((item, index) => (
            <motion.div 
            key={item._id}
              className="prose max-w-none text-gray-700 mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item?.description || ""),
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default About;
