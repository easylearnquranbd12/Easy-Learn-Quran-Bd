// import { useQuery } from "@tanstack/react-query";
// import DOMPurify from "dompurify";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// import "swiper/css";
// import "swiper/css/pagination";

// const TestimonialSection = () => {
//   const axiosPublic = useAxiosPublic();
//   const [expanded, setExpanded] = useState({});

//   const { data: testimonials = [], isLoading } = useQuery({
//     queryKey: ["testimonials"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/testimonials");
//       return res.data;
//     },
//   });

//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.15,
//         duration: 0.5,
//       },
//     }),
//   };

//   const toggleReadMore = (id) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   if (isLoading) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         Loading testimonials...
//       </div>
//     );
//   }

//   return (
//     <div className="relative py-16 overflow-visible max-w-[1400px] mx-auto px-4">

//       {/* TITLE */}
//       <div className="text-center mb-16">
//         <p className="text-2xl md:text-3xl font-bold uppercase tracking-wide inline-block bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
//           Testimonials
//         </p>

//         <span className="block w-24 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1]"></span>
//       </div>

//       {/* SWIPER */}
//       <Swiper
//         modules={[Pagination, Autoplay]}
//         spaceBetween={25}
//         slidesPerView={1}
//         loop={true}
//         autoplay={{
//           delay: 3500,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//           },
//           1024: {
//             slidesPerView: 3,
//           },
//         }}
//        className="testimonialSwiper pb-36 pt-24 overflow-visible"
//       >
//         {testimonials.map((item, index) => {
//           const isExpanded = expanded[item._id];
//           const shortText = item.description?.slice(0, 220);

//           return (
//             <SwiperSlide
//               key={item._id}
//               className="overflow-visible pt-10"
//             >
//               <motion.div
//                 variants={fadeUp}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 custom={index}
//                 className="bg-white rounded-[30px] shadow-md hover:shadow-2xl transition-all duration-500 px-6 pt-24 pb-8 relative text-center group border border-[#e4f1eb] h-full overflow-visible"
//               >

//                 {/* AVATAR */}
//                 <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
//                   <div className="w-32 h-32 rounded-full p-[5px] bg-white shadow-2xl">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   </div>
//                 </div>

//                 {/* QUOTE */}
//                 <div className="absolute top-6 right-6 text-[#d9efe5] text-6xl font-bold leading-none">
//                   “
//                 </div>

//                 {/* DESCRIPTION */}
//                 <div className="text-sm text-gray-600 leading-relaxed mt-4 text-left min-h-[190px]">
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: DOMPurify.sanitize(
//                         isExpanded
//                           ? item.description
//                           : shortText + "..."
//                       ),
//                     }}
//                   />

//                   {item.description?.length > 220 && (
//                     <button
//                       onClick={() => toggleReadMore(item._id)}
//                       className="text-[#145c43] font-semibold mt-3 hover:underline transition"
//                     >
//                       {isExpanded ? "See Less" : "See More"}
//                     </button>
//                   )}
//                 </div>

//                 {/* NAME */}
//                 <div className="mt-6">
//                   <h3 className="text-xl font-bold text-gray-800">
//                     {item.name}
//                   </h3>

//                   <p className="text-sm text-[#145c43] mt-1">
//                     Student / Parent
//                   </p>
//                 </div>
//               </motion.div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// };

// export default TestimonialSection;

import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import "swiper/css";
import "swiper/css/pagination";

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
    return (
      <div className="text-center py-10 text-gray-500">
        Loading testimonials...
      </div>
    );
  }

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-12 md:py-16">
        {/* TITLE */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide inline-block bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
            Testimonials
          </p>

          <span className="block w-24 h-0.5 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1]"></span>
        </div>

        {/* SWIPER */}
        <div className="relative px-1 ">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            breakpoints={{
              // মোবাইলে 1টা কার্ড
              0: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              // ট্যাবলেটে 2টা কার্ড (optional)
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // ডেস্কটপে 3টা কার্ড
              1024: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
            className="testimonialSwiper pb-14 md:pb-16 pt-16 md:pt-20"
          >
            {testimonials.map((item, index) => {
              const isExpanded = expanded[item._id];
              const shortText = item.description?.slice(0, 180);

              return (
                <SwiperSlide key={item._id} className="h-auto">
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                    className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 px-4 pt-14 pb-5 md:pb-6 relative text-center border border-gray-100 h-full"
                  >
                    {/* AVATAR */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
                        <img
                          src={item.image || "https://via.placeholder.com/80"}
                          alt={item.name}
                          className="w-full h-full rounded-full object-cover"
                          style={{ objectPosition: "center 20%" }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80";
                          }}
                        />
                      </div>
                    </div>

                    {/* QUOTE ICON */}
                    <div className="absolute top-3 right-3 text-[#d9efe5] text-3xl md:text-4xl font-bold leading-none">
                      “
                    </div>

                    {/* DESCRIPTION */}
                    <div className="text-xs md:text-sm text-gray-600 leading-relaxed mt-3 text-left min-h-[140px] md:min-h-[160px]">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            isExpanded
                              ? item.description
                              : shortText +
                                  (item.description?.length > 180 ? "..." : ""),
                          ),
                        }}
                      />

                      {item.description?.length > 180 && (
                        <button
                          onClick={() => toggleReadMore(item._id)}
                          className="text-[#145c43] font-semibold mt-2 text-xs hover:underline transition inline-block"
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>

                    {/* NAME */}
                    <div className="mt-4 pt-2 border-t border-gray-100">
                      <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#145c43] mt-1">
                        Student / Parent
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
