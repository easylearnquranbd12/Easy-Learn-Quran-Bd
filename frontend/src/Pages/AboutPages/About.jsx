// import { motion } from "framer-motion";
// import {
//   BarChart3,
//   BookOpenCheck,
//   Brain,
//   Lightbulb,
//   Users,
// } from "lucide-react";
// import { Helmet } from "react-helmet-async";
// import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
//   }),
// };

// const About = () => {
//   return (
//     <div>
//       <Helmet>
//         <title>Nasmatics | About</title>
//       </Helmet>
//       <div className="py-5 max-w-7xl mx-auto px-2 ">
//         <TittleAnimation tittle="About" subtittle="About Us More Information" />

//         <motion.h1
//           className="text-2xl lg:text-3xl font-bold mb-8 text-justify"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={1}
//         >
//           Nasmatics — The Journey of Precision, Curiosity, and Confidence
//         </motion.h1>

//         <motion.p
//           className="mb-6 text-lg leading-relaxed text-justify"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={2}
//         >
//           Nasmatics has always been more than just numbers. It’s the silent
//           language that shapes the universe — from the spiral of a galaxy to the
//           rhythm of our heartbeat. With this belief at its core, our journey
//           began — not with crowds, but with a small group of curious minds, and
//           a dream:{" "}
//           <strong className="text-blue-600">
//             to make Nasmatics open, accessible, and empowering for every
//             student
//           </strong>
//           .
//         </motion.p>

//         <motion.p
//           className="mb-6 text-lg text-justify"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={3}
//         >
//           In the beginning, we focused on breaking the barriers that often make
//           math feel overwhelming — confusion, fear, and lack of proper guidance.
//           The response was phenomenal. It proved that when taught with clarity,
//           care, and creativity, math can become not just understandable, but
//           exciting.
//         </motion.p>

//         <motion.h2
//           className="text-2xl font-semibold mb-4 flex items-center gap-2"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={4}
//         >
//           <Users className="text-green-600" />
//           What We Offer
//         </motion.h2>

//         <motion.ul
//           className="space-y-4 mb-8"
//           initial="hidden"
//           animate="visible"
//         >
//           {[
//             {
//               icon: <Brain className="text-purple-600 mt-1" />,
//               text: (
//                 <>
//                   <strong>Experienced mentors</strong> who bring both knowledge
//                   and passion.
//                 </>
//               ),
//             },
//             {
//               icon: <BookOpenCheck className="text-indigo-600 mt-1" />,
//               text: (
//                 <>
//                   <strong>Curriculum-aligned teaching</strong> tailored to meet
//                   modern standards.
//                 </>
//               ),
//             },
//             {
//               icon: <Lightbulb className="text-yellow-500 mt-1" />,
//               text: (
//                 <>
//                   <strong>Creative problem-solving strategies</strong> for
//                   real-world challenges.
//                 </>
//               ),
//             },
//             {
//               icon: <BarChart3 className="text-cyan-600 mt-1" />,
//               text: (
//                 <>
//                   <strong>Smart assessment systems</strong> that value true
//                   understanding over memorization.
//                 </>
//               ),
//             },
//           ].map((item, index) => (
//             <motion.li
//               key={index}
//               className="flex items-start gap-3 text-justify"
//               custom={5 + index}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//             >
//               {item.icon}
//               <span>{item.text}</span>
//             </motion.li>
//           ))}
//         </motion.ul>

//         <motion.p
//           className="mb-6 text-lg text-justify"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={9}
//         >
//           But above all,{" "}
//           <strong className="text-emerald-700">
//             students remain at the center of our mission
//           </strong>
//           . Every question they ask, every fear they overcome, and every concept
//           they finally understand — these moments are the heartbeat of our
//           vision.
//         </motion.p>

//         <motion.p
//           className="mb-6 text-lg text-justify"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={10}
//         >
//           Thousands of learners have already discovered the joy of learning
//           Nasmatics with us — completely free. We’re not just teaching
//           formulas; we’re building{" "}
//           <strong>confidence, logic, and a lifelong love for learning</strong>.
//         </motion.p>

//         <motion.p
//           className="text-xl font-semibold text-blue-700 mt-10 text-justify"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={11}
//         >
//           ✨ Join us in this journey. Let Nasmatics unlock the genius within
//           you.
//         </motion.p>
//       </div>
//     </div>
//   );
// };

// export default About;


// import { useRef, useState } from "react";

// const StudyDenmarkGuide = () => {
//   const [activeSection, setActiveSection] = useState("overview");

//   // Refs for each section
//   const refs = {
//     overview: useRef(null),
//     universities: useRef(null),
//     requirements: useRef(null),
//     cost: useRef(null),
//     livingCost: useRef(null),
//     programs: useRef(null),
//     scholarships: useRef(null),
//     faqs: useRef(null),
//   };

//   // Section data
//   const universitiesData = {
//     title: "Universities in Denmark",
//     description:
//       "ডেনমার্কে বেশ কিছু বিশ্ববিদ্যালয় আন্তর্জাতিক শিক্ষার্থীদের জন্য জনপ্রিয়। এখানে কিছু শীর্ষ বিশ্ববিদ্যালয়ের তালিকা দেওয়া হলো:",
//     universities: [
//       {
//         name: "University of Copenhagen",
//         location: "Copenhagen",
//         ranking: "82",
//         programs: "Life Sciences, Health Sciences, Humanities",
//       },
//       {
//         name: "Aarhus University",
//         location: "Aarhus",
//         ranking: "143",
//         programs: "Arts, Business, Social Sciences",
//       },
//       {
//         name: "Technical University of Denmark (DTU)",
//         location: "Kongens Lyngby",
//         ranking: "121",
//         programs: "Engineering, Technology, Environmental Science",
//       },
//       {
//         name: "Aalborg University",
//         location: "Aalborg",
//         ranking: "326",
//         programs: "Engineering, IT, Architecture",
//       },
//       {
//         name: "Copenhagen Business School (CBS)",
//         location: "Copenhagen",
//         ranking: "-",
//         programs: "Business, Economics, Management",
//       },
//       {
//         name: "University of Southern Denmark (SDU)",
//         location: "Odense",
//         ranking: "336",
//         programs: "Engineering, Health Science",
//       },
//     ],
//   };

//   const overviewData = {
//     title: "Study in Denmark - Complete Guide",
//     description:
//       "ডেনমার্ক শিক্ষার্থীদের জন্য একটি উৎকৃষ্ট গন্তব্য। এখানে বিশ্বমানের শিক্ষা, নিরাপদ পরিবেশ এবং চমৎকার জীবনযাপনের সুযোগ রয়েছে।",
//     sections: [
//       {
//         title: "শিক্ষার মান",
//         content: "ডেনমার্কের বিশ্ববিদ্যালয়গুলো বিশ্ব Rankings-এ স্থান করে নিয়েছে",
//         icon: "🎓",
//       },
//       {
//         title: "নিরাপত্তা",
//         content: "ডেনমার্ক বিশ্বের সবচেয়ে নিরাপদ দেশগুলোর মধ্যে একটি",
//         icon: "🛡️",
//       },
//       {
//         title: "ক্যারিয়ার সুযোগ",
//         content: "শিক্ষা শেষে কাজের সুযোগ এবং স্থায়ী বসবাসের সম্ভাবনা",
//         icon: "💼",
//       },
//     ],
//   };

//   const requirementsData = {
//     title: "Admission Requirements",
//     description: "ডেনমার্কের বিশ্ববিদ্যালয়গুলোতে ভর্তির জন্য সাধারণ প্রয়োজনীয়তাসমূহ:",
//     requirements: [
//       {
//         category: "Academic Requirements",
//         items: [
//           "সর্বনিম্ন 60% বা 2.5 GPA SSC ও HSC/ALevel-এ",
//           "সম্পর্কিত বিষয়ে শিক্ষাগত যোগ্যতা",
//           "ইংরেজি মাধ্যমের শিক্ষার্থীদের জন্য IELTS 6.0-6.5 বা TOEFL 80-90",
//         ],
//       },
//       {
//         category: "Documents Required",
//         items: [
//           "একাডেমিক সকল সার্টিফিকেট ও ট্রান্সক্রিপ্ট",
//           "ইংরেজি ভাষার দক্ষতার সার্টিফিকেট",
//           "মোটিভেশন লেটার",
//           "সিভি/রিজিউম",
//           "পাসপোর্ট কপি",
//           "২টি রেফারেন্স লেটার",
//         ],
//       },
//       {
//         category: "Application Process",
//         items: [
//           "অনলাইনে আবেদন পূরণ",
//           "ডকুমেন্ট জমা দেওয়া",
//           "এপ্লিকেশন ফি প্রদান",
//           "ভিসার জন্য আবেদন",
//         ],
//       },
//     ],
//   };

//   const costData = {
//     title: "Study Cost in Denmark",
//     description: "ডেনমার্কে শিক্ষা খরচ সম্পর্কিত তথ্য:",
//     costs: [
//       {
//         type: "Tuition Fees (EU/EEA Students)",
//         amount: "Free for most programs",
//         details: [
//           "Bachelor's Programs: Free",
//           "Master's Programs: Free",
//           "Only administration fee applicable",
//         ],
//       },
//       {
//         type: "Tuition Fees (Non-EU Students)",
//         amount: "€6,000 - €16,000 per year",
//         details: [
//           "Bachelor's Programs: €6,000 - €15,000/year",
//           "Master's Programs: €8,000 - €16,000/year",
//         ],
//       },
//       {
//         type: "Additional Costs",
//         amount: "€500 - €1,000 per year",
//         details: [
//           "Books & Materials: €300-600/year",
//           "Student Union Fee: €100-300/year",
//           "Health Insurance: €100-200/year",
//         ],
//       },
//     ],
//   };

//   // Smooth scroll handler
//   const handleSectionScroll = (section) => {
//     setActiveSection(section);
//     refs[section].current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   // Tabs
//   const tabs = [
//     { id: "overview", label: "Overview" },
//     { id: "universities", label: "Universities" },
//     { id: "requirements", label: "Requirements" },
//     { id: "cost", label: "Cost" },
//     { id: "livingCost", label: "Living Cost" },
//     { id: "programs", label: "Programs" },
//     { id: "scholarships", label: "Scholarships" },
//     { id: "faqs", label: "FAQs" },
//   ];

//   return (
//     <div className="min-h-screen bg-base-200 ">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
//             Study in Denmark with Scholarships
//           </h1>
//           <p className="text-xl text-gray-600">A Complete Student Guide - 2025</p>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="bg-white rounded-lg shadow-lg mb-8 sticky top-20 z-50 w-full">
//           <div className="flex flex-wrap justify-center p-4 border-b ">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => handleSectionScroll(tab.id)}
//                 className={`px-6 py-2 m-1 rounded-lg font-semibold transition-all duration-300 max-w-[1400px] mx-auto ${
//                   activeSection === tab.id
//                     ? "bg-primary text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* All Sections */}
//         <div className="space-y-16">
//           {/* Overview */}
//           <div ref={refs.overview} className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-3xl font-bold text-gray-800">{overviewData.title}</h2>
//             <p className="text-lg text-gray-600">{overviewData.description}</p>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
//               {overviewData.sections.map((section, index) => (
//                 <div
//                   key={index}
//                   className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl"
//                 >
//                   <div className="card-body">
//                     <div className="text-4xl mb-2">{section.icon}</div>
//                     <h3 className="card-title">{section.title}</h3>
//                     <p>{section.content}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Universities */}
//           <div ref={refs.universities} className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-3xl font-bold text-gray-800">{universitiesData.title}</h2>
//             <p className="text-lg text-gray-600">{universitiesData.description}</p>
//             <div className="overflow-x-auto mt-4">
//               <table className="table table-zebra w-full">
//                 <thead>
//                   <tr className="bg-primary text-white">
//                     <th>University</th>
//                     <th>Location</th>
//                     <th>QS World Ranking 2025</th>
//                     <th>Popular Programs</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {universitiesData.universities.map((uni, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="font-semibold">{uni.name}</td>
//                       <td>{uni.location}</td>
//                       <td>
//                         <span className="badge badge-primary">{uni.ranking}</span>
//                       </td>
//                       <td className="text-sm">{uni.programs}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Requirements */}
//           <div ref={refs.requirements} className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-3xl font-bold text-gray-800">{requirementsData.title}</h2>
//             <p className="text-lg text-gray-600">{requirementsData.description}</p>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
//               {requirementsData.requirements.map((req, index) => (
//                 <div key={index} className="card bg-base-100 shadow-lg">
//                   <div className="card-body">
//                     <h3 className="card-title text-primary">{req.category}</h3>
//                     <ul className="space-y-2">
//                       {req.items.map((item, itemIndex) => (
//                         <li key={itemIndex} className="flex items-start gap-2">
//                           <span className="text-success">✓</span>
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>
                  
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Cost */}
//           <div ref={refs.cost} className="bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-3xl font-bold text-gray-800">{costData.title}</h2>
//             <p className="text-lg text-gray-600">{costData.description}</p>
//             <div className="grid gap-6 mt-4">
//               {costData.costs.map((cost, index) => (
//                 <div key={index} className="card bg-base-100 shadow-lg">
//                   <div className="card-body">
//                     <div className="flex justify-between items-start">
//                       <h3 className="card-title text-lg">{cost.type}</h3>
//                       <span className="badge badge-primary badge-lg">{cost.amount}</span>
//                     </div>
//                     <ul className="space-y-1 mt-2">
//                       {cost.details.map((detail, detailIndex) => (
//                         <li key={detailIndex} className="text-sm text-gray-600">
//                           • {detail}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Free Consultation Banner */}
//         <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg p-6 text-center">
//           <h3 className="text-2xl font-bold text-white mb-2">Free Consultation</h3>
//           <p className="text-white opacity-90 mb-4">
//             Get personalized guidance for your study journey in Denmark
//           </p>
//           <button className="btn btn-accent btn-lg">Book Now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudyDenmarkGuide;


import { useRef, useState } from "react";

// Reusable Components
const OverviewCard = ({ icon, title, content }) => (
  <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl hover:scale-105 transition-transform">
    <div className="card-body">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p>{content}</p>
    </div>
  </div>
);

const UniversityTable = ({ universities }) => (
  <div className="overflow-x-auto mt-4">
    <table className="table table-zebra w-full">
      <thead>
        <tr className="bg-primary text-white text-center">
          <th>University</th>
          <th>Location</th>
          <th>QS World Ranking 2025</th>
          <th>Popular Programs</th>
        </tr>
      </thead>
      <tbody>
        {universities.map((uni, index) => (
          <tr key={index} className="hover:bg-gray-50 text-center">
            <td className="font-semibold">{uni.name}</td>
            <td>{uni.location}</td>
            <td>
              <span className="badge badge-primary">{uni.ranking}</span>
            </td>
            <td className="text-sm">{uni.programs}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RequirementCard = ({ category, items }) => (
  <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
    <div className="card-body">
      <h3 className="card-title text-primary">{category}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CostCard = ({ type, amount, details }) => (
  <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
    <div className="card-body">
      <div className="flex justify-between items-start">
        <h3 className="card-title text-lg">{type}</h3>
        <span className="badge badge-primary badge-lg">{amount}</span>
      </div>
      <ul className="space-y-1 mt-2">
        {details.map((detail, index) => (
          <li key={index} className="text-sm text-gray-600">
            • {detail}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const StudyDenmarkGuide = () => {
  const [activeSection, setActiveSection] = useState("overview");

  // Refs
  const refs = {
    overview: useRef(null),
    universities: useRef(null),
    requirements: useRef(null),
    cost: useRef(null),
    livingCost: useRef(null),
    programs: useRef(null),
    scholarships: useRef(null),
    faqs: useRef(null),
  };

  // Section Data
  const overviewData = {
    title: "Study in Denmark - Complete Guide",
    description:
      "ডেনমার্ক শিক্ষার্থীদের জন্য একটি উৎকৃষ্ট গন্তব্য। এখানে বিশ্বমানের শিক্ষা, নিরাপদ পরিবেশ এবং চমৎকার জীবনযাপনের সুযোগ রয়েছে।",
    sections: [
      {
        title: "শিক্ষার মান",
        content: "ডেনমার্কের বিশ্ববিদ্যালয়গুলো বিশ্ব Rankings-এ স্থান করে নিয়েছে",
        icon: "🎓",
      },
      {
        title: "নিরাপত্তা",
        content: "ডেনমার্ক বিশ্বের সবচেয়ে নিরাপদ দেশগুলোর মধ্যে একটি",
        icon: "🛡️",
      },
      {
        title: "ক্যারিয়ার সুযোগ",
        content: "শিক্ষা শেষে কাজের সুযোগ এবং স্থায়ী বসবাসের সম্ভাবনা",
        icon: "💼",
      },
    ],
  };

  const universitiesData = {
    title: "Universities in Denmark",
    description:
      "ডেনমার্কে বেশ কিছু বিশ্ববিদ্যালয় আন্তর্জাতিক শিক্ষার্থীদের জন্য জনপ্রিয়। এখানে কিছু শীর্ষ বিশ্ববিদ্যালয়ের তালিকা দেওয়া হলো:",
    universities: [
      {
        name: "University of Copenhagen",
        location: "Copenhagen",
        ranking: "82",
        programs: "Life Sciences, Health Sciences, Humanities",
      },
      {
        name: "Aarhus University",
        location: "Aarhus",
        ranking: "143",
        programs: "Arts, Business, Social Sciences",
      },
      {
        name: "Technical University of Denmark (DTU)",
        location: "Kongens Lyngby",
        ranking: "121",
        programs: "Engineering, Technology, Environmental Science",
      },
      {
        name: "Aalborg University",
        location: "Aalborg",
        ranking: "326",
        programs: "Engineering, IT, Architecture",
      },
      {
        name: "Copenhagen Business School (CBS)",
        location: "Copenhagen",
        ranking: "-",
        programs: "Business, Economics, Management",
      },
      {
        name: "University of Southern Denmark (SDU)",
        location: "Odense",
        ranking: "336",
        programs: "Engineering, Health Science",
      },
    ],
  };

  const requirementsData = {
    title: "Admission Requirements",
    description: "ডেনমার্কের বিশ্ববিদ্যালয়গুলোতে ভর্তির জন্য সাধারণ প্রয়োজনীয়তাসমূহ:",
    requirements: [
      {
        category: "Academic Requirements",
        items: [
          "সর্বনিম্ন 60% বা 2.5 GPA SSC ও HSC/ALevel-এ",
          "সম্পর্কিত বিষয়ে শিক্ষাগত যোগ্যতা",
          "ইংরেজি মাধ্যমের শিক্ষার্থীদের জন্য IELTS 6.0-6.5 বা TOEFL 80-90",
        ],
      },
      {
        category: "Documents Required",
        items: [
          "একাডেমিক সকল সার্টিফিকেট ও ট্রান্সক্রিপ্ট",
          "ইংরেজি ভাষার দক্ষতার সার্টিফিকেট",
          "মোটিভেশন লেটার",
          "সিভি/রিজিউম",
          "পাসপোর্ট কপি",
          "২টি রেফারেন্স লেটার",
        ],
      },
      {
        category: "Application Process",
        items: [
          "অনলাইনে আবেদন পূরণ",
          "ডকুমেন্ট জমা দেওয়া",
          "এপ্লিকেশন ফি প্রদান",
          "ভিসার জন্য আবেদন",
        ],
      },
    ],
  };

  const costData = {
    title: "Study Cost in Denmark",
    description: "ডেনমার্কে শিক্ষা খরচ সম্পর্কিত তথ্য:",
    costs: [
      {
        type: "Tuition Fees (EU/EEA Students)",
        amount: "Free for most programs",
        details: [
          "Bachelor's Programs: Free",
          "Master's Programs: Free",
          "Only administration fee applicable",
        ],
      },
      {
        type: "Tuition Fees (Non-EU Students)",
        amount: "€6,000 - €16,000 per year",
        details: [
          "Bachelor's Programs: €6,000 - €15,000/year",
          "Master's Programs: €8,000 - €16,000/year",
        ],
      },
      {
        type: "Additional Costs",
        amount: "€500 - €1,000 per year",
        details: [
          "Books & Materials: €300-600/year",
          "Student Union Fee: €100-300/year",
          "Health Insurance: €100-200/year",
        ],
      },
    ],
  };

  // Smooth scroll
  const handleSectionScroll = (section) => {
    setActiveSection(section);
    refs[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "universities", label: "Universities" },
    { id: "requirements", label: "Requirements" },
    { id: "cost", label: "Cost" },
    { id: "livingCost", label: "Living Cost" },
    { id: "programs", label: "Programs" },
    { id: "scholarships", label: "Scholarships" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Study in Denmark with Scholarships
          </h1>
          <p className="text-xl text-gray-600">
            A Complete Student Guide - 2025
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8 sticky top-20 z-50 w-full">
          <div className="flex flex-wrap justify-center p-4 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleSectionScroll(tab.id)}
                className={`px-6 py-2 m-1 rounded-lg font-semibold transition-all duration-300 ${
                  activeSection === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {/* Overview */}
          <div ref={refs.overview} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {overviewData.title}
            </h2>
            <p className="text-lg text-gray-600">{overviewData.description}</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {overviewData.sections.map((s, i) => (
                <OverviewCard key={i} {...s} />
              ))}
            </div>
          </div>

          {/* Universities */}
          <div
            ref={refs.universities}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-3xl font-bold text-gray-800">
              {universitiesData.title}
            </h2>
            <p className="text-lg text-gray-600">
              {universitiesData.description}
            </p>
            <UniversityTable universities={universitiesData.universities} />
          </div>

          {/* Requirements */}
          <div
            ref={refs.requirements}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-3xl font-bold text-gray-800">
              {requirementsData.title}
            </h2>
            <p className="text-lg text-gray-600">
              {requirementsData.description}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {requirementsData.requirements.map((req, i) => (
                <RequirementCard key={i} {...req} />
              ))}
            </div>
          </div>

          {/* Cost */}
          <div ref={refs.cost} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {costData.title}
            </h2>
            <p className="text-lg text-gray-600">{costData.description}</p>
            <div className="grid gap-6 mt-4">
              {costData.costs.map((c, i) => (
                <CostCard key={i} {...c} />
              ))}
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Free Consultation
          </h3>
          <p className="text-white opacity-90 mb-4">
            Get personalized guidance for your study journey in Denmark
          </p>
          <button className="btn btn-accent btn-lg">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default StudyDenmarkGuide;
