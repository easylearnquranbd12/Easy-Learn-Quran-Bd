import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { FaBookOpen } from "react-icons/fa";
import { HiOutlineBriefcase } from "react-icons/hi";
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

const Instructors = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: instructor,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["activeInstructor"],
    queryFn: async () => {
      const res = await axiosPublic.get("/instructors?status=active");
      return res.data?.[0]; // assume only one active
    },
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <CustomLoading />;
  }

  if (isError || !instructor) {
    return (
      <div className="min-h-[50vh]  flex items-center justify-center p-4">
        <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
          <AlertCircle size={40} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl text-red-500 mb-2">
            Unable to Load instructor
          </h2>
          <p className="text-black mb-6">{isError}</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="mb-20 py-12 ">
      <TittleAnimation
        tittle="Our Instructors"
        subtittle="🌟 Meet Our Expert Instructor"
      />

      <div className="bg-white backdrop-blur-md border border-[#3B6B53] rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 lg:max-w-5xl mx-auto  ">
        <div className="flex flex-col items-center text-center">
          <motion.img
            src={
              instructor.image || "https://i.ibb.co/YtLt9kv/default-profile.png"
            }
            alt={instructor.name}
            className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="space-y-2"
          >
            <h3 className="text-2xl font-bold text-[#3B6B53] mb-1">
              {instructor.name}
            </h3>
            <p className="text-base md:text-lg text-gray-700 mb-1 ">
              {instructor.subject}
            </p>

            <div className="text-yellow-500 text-lg md:text-2xl mb-2">
              {"★".repeat(instructor.rating)}
              {"☆".repeat(5 - instructor.rating)}
            </div>

            <p className="text-gray-700 text-base mb-4 text-justify">
              {instructor.description}
            </p>

            <div className="bg-white/40 backdrop-blur-sm rounded-lg px-2 py-2 w-full space-y-2 text-left text-gray-800">
              <p className="flex items-center gap-2 text-[#3B6B53] font-semibold text-base">
                <FaBookOpen className="text-lg" />
                Courses:{" "}
                <span className="text-gray-800 text-base">
                  {instructor.totalCourses || "N/A"}
                </span>
              </p>
              <p className="flex items-center gap-2 text-[#3B6B53] font-semibold text-base">
                <HiOutlineBriefcase className="text-lg" />
                Experience:{" "}
                <span className="text-gray-800 text-base">
                  {instructor.experience || "N/A"}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { AlertCircle, RefreshCw } from "lucide-react";
// import { FaBookOpen } from "react-icons/fa";
// import { HiOutlineBriefcase } from "react-icons/hi";
// import CustomLoading from "../../components/Loading/CustomLoading";
// import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (custom = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" },
//   }),
// };

// const Instructors = () => {
//   const axiosPublic = useAxiosPublic();

//   const {
//     data: instructor,
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["activeInstructor"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/instructors?status=active");
//       return res.data?.[0]; // assume only one active
//     },
//     refetchOnWindowFocus: true,
//   });

//   if (isLoading) {
//     return <CustomLoading />;
//   }

//   if (isError || !instructor) {
//     return (
//       <div className="min-h-[50vh]  flex items-center justify-center p-4">
//         <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
//           <AlertCircle size={40} className="text-red-600 mx-auto mb-4" />
//           <h2 className="text-xl text-red-500 mb-2">
//             Unable to Load instructor
//           </h2>
//           <p className="text-black mb-6">{isError}</p>
//           <button
//             onClick={refetch}
//             className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
//           >
//             <RefreshCw size={16} />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="mb-20 py-12 ">
//       <TittleAnimation
//         tittle="Our Instructors"
//         subtittle="🌟 Meet Our Expert Instructor"
//       />

//       <div className="bg-white backdrop-blur-md border border-[#3B6B53] rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 lg:max-w-5xl mx-auto  ">
//         <div className="flex flex-col items-center text-center">
//           <motion.img
//             src={
//               instructor.image || "https://i.ibb.co/YtLt9kv/default-profile.png"
//             }
//             alt={instructor.name}
//             className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md mb-4"
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             custom={0}
//           />

//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             custom={1}
//             className="space-y-2"
//           >
//             <h3 className="text-2xl font-bold text-[#3B6B53] mb-1">
//               {instructor.name}
//             </h3>
//             <p className="text-base md:text-lg text-gray-700 mb-1 ">
//               {instructor.subject}
//             </p>

//             <div className="text-yellow-500 text-lg md:text-2xl mb-2">
//               {"★".repeat(instructor.rating)}
//               {"☆".repeat(5 - instructor.rating)}
//             </div>

//             <p className="text-gray-700 text-base mb-4 text-justify">
//               {instructor.description}
//             </p>

//             <div className="bg-white/40 backdrop-blur-sm rounded-lg px-2 py-2 w-full space-y-2 text-left text-gray-800">
//               <p className="flex items-center gap-2 text-[#3B6B53] font-semibold text-base">
//                 <FaBookOpen className="text-lg" />
//                 Courses:{" "}
//                 <span className="text-gray-800 text-base">
//                   {instructor.totalCourses || "N/A"}
//                 </span>
//               </p>
//               <p className="flex items-center gap-2 text-[#3B6B53] font-semibold text-base">
//                 <HiOutlineBriefcase className="text-lg" />
//                 Experience:{" "}
//                 <span className="text-gray-800 text-base">
//                   {instructor.experience || "N/A"}
//                 </span>
//               </p>
//               {/* <p className="flex items-center gap-2 text-[#3B6B53] font-semibold text-base">
//                 <HiOutlineMail className="text-lg" />
//                 Email:{" "}
//                 <span className="text-orange-600">{instructor.email}</span>
//               </p> */}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Instructors;
