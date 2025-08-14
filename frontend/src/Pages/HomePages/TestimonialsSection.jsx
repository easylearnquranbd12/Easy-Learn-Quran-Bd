import { useQuery } from "@tanstack/react-query";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CustomLoading from "../../components/Loading/CustomLoading";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Counter = ({ from, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = from;
          const increment = (to - from) / (duration * 60);

          const timer = setInterval(() => {
            start += increment;
            if (start >= to) {
              setCount(to);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 1000 / 60);

          controls.start({
            scale: [1, 1.1, 1],
            transition: { duration: 0.5 },
          });

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [from, to, duration, controls]);

  return (
    <motion.p
      ref={ref}
      className="text-4xl font-bold text-[#1f4e43] mb-2"
      animate={controls}
    >
      {to >= 1000
        ? Math.floor(count).toLocaleString()
        : count.toFixed(to % 1 !== 0 ? 1 : 0)}
      {suffix}
    </motion.p>
  );
};

const TestimonialsSection = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: testimonials,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["authorInfo"],
    queryFn: async () => {
      const res = await axiosPublic.get("/authorInfo");
      return res.data;
    },
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CustomLoading />;

  if (isError || !testimonials) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
          {/* You can replace this with any icon you like */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red"
            strokeWidth={2}
            width={40}
            height={40}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h2 className="text-xl text-red-500 mb-2">Unable to Load testimonials</h2>
          <p className="text-black mb-6">{error?.message || "Unknown error"}</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            {/* Replace with any reload icon you want or simple text */}
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-[#1f4e43] mb-12">
          hear it from the Mathletes
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.length === 0 && (
            <p className="col-span-3 text-center">No testimonials found.</p>
          )}

          {testimonials.map(({ _id, authorName, authorAddress, description }) => (
            <motion.div
              key={_id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl border border-[#1f4e43]"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-gray-700 italic mb-4">"{description}"</p>
              <div className="flex flex-col items-end">
                <p className="text-gray-900 font-medium">— {authorName}</p>
                <p className="text-gray-500 text-sm">{authorAddress}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl border border-[#1f4e43]"
            >
              <Counter from={0} to={95} suffix="K+" duration={1.5} />
              <p className="text-gray-700 mt-3">engaged youtube subscribers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl border border-[#1f4e43]"
            >
              <Counter from={0} to={7200} suffix="+" duration={2} />
              <p className="text-gray-700 mt-3">students mentored around the world</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl border border-[#1f4e43]"
            >
              <Counter from={0} to={11.5} suffix="M" duration={1.8} />
              <p className="text-gray-700 mt-3">views on our channel</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
