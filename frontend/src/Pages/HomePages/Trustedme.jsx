// // src/components/WhyJoinMathVerse.jsx

// import { FaBook, FaEdit, FaSearch, FaUserTie } from "react-icons/fa";

// const features = [
//   {
//     icon: <FaEdit className="text-green-600 text-2xl" />,
//     title: "ধাপে ধাপে বিশ্লেষণভিত্তিক পড়াশোনা",
//   },
//   {
//     icon: <FaBook className="text-green-600 text-2xl" />,
//     title: "নতুন কারিকুলামে আধুনিক কনটেন্ট",
//   },
//   {
//     icon: <FaUserTie className="text-green-600 text-2xl" />,
//     title: "অভিজ্ঞ শিক্ষকের গাইডেন্স",
//   },
//   {
//     icon: <FaSearch className="text-green-600 text-2xl" />,
//     title: "একাডেমিক ও অলিম্পিয়াড প্রস্তুতি",
//   },
// ];

// const WhyJoinMathVerse = () => {
//   return (
//     <section className="bg-[#1f4e43] py-16 px-4 text-white">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//         {/* Left */}
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold mb-8">
//             কেন <span className="text-white">MathVerse</span> - এ যুক্ত হবেন?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {features.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white text-gray-800 rounded-xl p-5 flex items-center gap-4 shadow hover:shadow-lg transition"
//               >
//                 <div className="bg-gray-100 p-3 rounded-full">{item.icon}</div>
//                 <p className="font-medium">{item.title}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Banner */}
//     <div
//       className="min-h-screen flex items-center justify-center"
//       style={{
//         backgroundImage: `
//           radial-gradient(#e0f2f1 1px, transparent 0)`,
//         backgroundSize: '10px 10px',
//         backgroundColor: '#ffffff',
//       }}
//     >
//       <div className=" text-[#1f4e43] rounded-2xl p-10 text-center  ">
//         <h1 className="text-3xl md:text-4xl font-bold leading-tight">
//           WE ARE <br /> HERE <span className="text-green-700">TO</span>{" "}
//           <span className="text-green-800">BUZ</span> <br /> YOUR POTENTIAL
//         </h1>
//       </div>
//     </div>
//       </div>
//     </section>
//   );
// };

// export default WhyJoinMathVerse;

// src/components/WhyJoinMathVerse.jsx

// import {
//     FaAward,
//     FaBook,
//     FaChartLine,
//     FaEdit,
//     FaSearch,
//     FaUserTie,
// } from "react-icons/fa";

// const features = [
//   {
//     icon: <FaEdit className="text-green-600 text-2xl" />,
//     title: "Step-by-step analytical learning",
//     description:
//       "Understand complex concepts easily through our structured learning approach",
//   },
//   {
//     icon: <FaBook className="text-green-600 text-2xl" />,
//     title: "Complete coverage of new curriculum",
//     description:
//       "Updated notes and video lectures for Physics, Chemistry and Mathematics",
//   },
//   {
//     icon: <FaUserTie className="text-green-600 text-2xl" />,
//     title: "Mentorship from experienced teachers",
//     description: "Exam strategies and concept clarity under expert guidance",
//   },
//   {
//     icon: <FaSearch className="text-green-600 text-2xl" />,
//     title: "Academic & Olympiad preparation",
//     description:
//       "Special materials for board exams and competitive examinations",
//   },
//   {
//     icon: <FaAward className="text-green-600 text-2xl" />,
//     title: "Proven track record of success",
//     description: "Our students' achievements are proof of our credibility",
//   },
//   {
//     icon: <FaChartLine className="text-green-600 text-2xl" />,
//     title: "Result-oriented approach",
//     description: "Special tips and shortcut methods to score higher in exams",
//   },
// ];

// const WhyJoinMathVerse = () => {
//   return (
//     <section className="bg-[#1f4e43] py-16 px-4 text-white w-full">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
//         {/* Left */}
//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Why choose <span className="text-yellow-300">MathVerse</span>{" "}
//             courses?
//           </h2>
//           <p className="mb-8 text-lg">
//             Join us to master Physics, Chemistry and Mathematics
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {features.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white text-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg hover:shadow-xl transition-all"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="bg-gray-100 p-2 rounded-full">
//                     {item.icon}
//                   </div>
//                   <h3 className="font-bold text-lg">{item.title}</h3>
//                 </div>
//                 <p className="text-gray-600 text-sm">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Banner */}

//         <div
//           style={{
//             backgroundImage: `
//            radial-gradient(#e0f2f1 1px, transparent 0)`,
//             backgroundSize: "10px 10px",
//             backgroundColor: "#ffffff",
//           }}
//           className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-blue-50"
//         >
//           <div className="absolute inset-0 flex items-center justify-center p-8">
//             <div className="text-center">
//               <h1 className="text-4xl md:text-5xl font-bold text-[#1f4e43] mb-6 leading-tight">
//                 Take your <span className="text-green-600">success</span>
//                 <br />
//                 to the next level{" "}
//                 <span className="text-yellow-500">with us</span>
//               </h1>
//               <div className=" ">
//                 <h3 className="text-xl font-bold text-gray-800 mb-3">
//                   Our Courses:
//                 </h3>
//                 <ul className="space-y-2 text-gray-700">
//                   <li className="flex items-center gap-2">
//                     <span className="bg-green-500 text-white p-1 rounded-full">
//                       ✓
//                     </span>
//                     <span>Complete Physics Course</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <span className="bg-green-500 text-white p-1 rounded-full">
//                       ✓
//                     </span>
//                     <span>Master Chemistry Concepts</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <span className="bg-green-500 text-white p-1 rounded-full">
//                       ✓
//                     </span>
//                     <span>Mathematics Full Syllabus</span>
//                   </li>
//                 </ul>
//                 <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all">
//                   View Courses
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyJoinMathVerse;

import {
  FaAward,
  FaBook,
  FaChartLine,
  FaEdit,
  FaSearch,
  FaUserTie,
} from "react-icons/fa";

const features = [
  {
    icon: <FaEdit className="text-green-600 text-2xl" />,
    title: "Step-by-step analytical learning",
    description: "Understand complex concepts easily through our structured learning approach",
  },
  {
    icon: <FaBook className="text-green-600 text-2xl" />,
    title: "Complete coverage of new curriculum",
    description: "Updated notes and video lectures for Physics, Chemistry and Mathematics",
  },
  {
    icon: <FaUserTie className="text-green-600 text-2xl" />,
    title: "Mentorship from experienced teachers",
    description: "Exam strategies and concept clarity under expert guidance",
  },
  {
    icon: <FaSearch className="text-green-600 text-2xl" />,
    title: "Academic & Olympiad preparation",
    description: "Special materials for board exams and competitive examinations",
  },
  {
    icon: <FaAward className="text-green-600 text-2xl" />,
    title: "Proven track record of success",
    description: "Our students' achievements are proof of our credibility",
  },
  {
    icon: <FaChartLine className="text-green-600 text-2xl" />,
    title: "Result-oriented approach",
    description: "Special tips and shortcut methods to score higher in exams",
  },
];

const WhyJoinMathVerse = () => {
  return (
    <div className="w-full bg-[#1f4e43] rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Section */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why choose <span className="text-yellow-300">Mathematics</span> courses?
            </h2>
            <p className="mb-8 text-lg">
              Join us to master Physics, Chemistry and Mathematics
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white text-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg hover:shadow-2xl transition-all "
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Banner */}
          <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(#e0f2f1 1px, transparent 0),
                  linear-gradient(to bottom right, #f0fdf4, #ecfdf5)`,
                backgroundSize: "10px 10px, 100% 100%",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center max-w-md w-full">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#1f4e43] mb-6 leading-tight">
                    Take your <span className="text-green-600">success</span>
                    <br />
                    to the next level <span className="text-yellow-500">with us</span>
                  </h1>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Our Courses:
                    </h3>
                    <ul className="space-y-2 text-gray-700 mb-4">
                      <li className="flex items-center gap-2">
                        <span className="bg-green-500 text-white p-1 rounded-full">✓</span>
                        <span>Complete Physics Course</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="bg-green-500 text-white p-1 rounded-full">✓</span>
                        <span>Master Chemistry Concepts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="bg-green-500 text-white p-1 rounded-full">✓</span>
                        <span>Mathematics Full Syllabus</span>
                      </li>
                    </ul>
                    <button className="w-full bg-[#1f4e43] hover:bg-[#519182] text-white font-bold py-3 px-6 rounded-lg transition-all">
                      View Courses
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyJoinMathVerse;