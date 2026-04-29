import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <div className="py-16 bg-[#eaeeec] ">
      
      {/* TITLE */}
      <div className="text-center mb-14">
        <p className="text-2xl md:text-3xl font-bold uppercase tracking-wide inline-block bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
          Pricing Plans
        </p>

        <span className="block w-24 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1]"></span>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-stretch">
        
        {/* BASIC */}
        <div className="bg-white rounded-[30px] shadow-md p-8 border border-gray-100 hover:shadow-xl transition duration-500 flex flex-col">
          
          <h3 className="text-xl font-bold text-[#145c43] mb-4">
            🔹 Basic Plan
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            Start your Quran learning journey with a strong foundation.
            This plan is perfect for beginners who want to learn Qaida,
            basic Tajweed, and correct pronunciation in a simple and
            structured way.
          </p>

          {/* FEATURES */}
          <div className="space-y-3 text-sm md:text-base text-gray-700 mb-8 flex-1">
            <p>✔ Qaida & Basic Quran Reading</p>
            <p>✔ Basic Tajweed Rules</p>
            <p>✔ One-on-One Live Classes</p>
            <p>✔ Friendly & Patient Teachers</p>
            <p>✔ Flexible Class Timing</p>
          </div>

          {/* BUTTON */}
          <Link
            to="/enroll-now"
            className="w-full text-center bg-[#e6f0eb] hover:bg-[#145c43] hover:text-white text-gray-700 text-sm md:text-base px-6 py-3 rounded-full font-semibold transition duration-300"
          >
            Choose Basic Plan
          </Link>
        </div>

        {/* STANDARD */}
        <div className="relative bg-gradient-to-b from-[#145c43] via-[#1f8a63] to-[#145c43] rounded-[35px] shadow-2xl p-8 text-white scale-105 flex flex-col">
          
          {/* TOP LABEL */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#145c43] text-xs px-5 py-2 rounded-full font-bold shadow-md">
            Best Package
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-3">
            🔹 Standard Plan
          </h3>

          <p className="text-white/90 leading-relaxed mb-6">
            Take your recitation to the next level with our most popular plan.
            Designed for both kids and adults, this package ensures fluency,
            accuracy, and consistent progress.
          </p>

          {/* FEATURES */}
          <div className="space-y-3 text-sm md:text-base mb-8 flex-1">
            <p>✔ Advanced Tajweed & Fluency</p>
            <p>✔ Quran Recitation Practice</p>
            <p>✔ Hifz (Memorization) Support</p>
            <p>✔ Weekly Progress Reports</p>
            <p>✔ Free Trial Available</p>
            <p>✔ Flexible Scheduling</p>
          </div>

          {/* BUTTON */}
          <Link
            to="/enroll-now"
            className="w-full text-center bg-white text-[#145c43] text-sm md:text-base px-6 py-3 rounded-full font-bold hover:scale-105 transition duration-300"
          >
            Start Free Trial
          </Link>
        </div>

        {/* PREMIUM */}
        <div className="bg-white rounded-[30px] shadow-md p-8 border border-gray-100 hover:shadow-xl transition duration-500 flex flex-col">
          
          <h3 className="text-xl font-bold text-[#145c43] mb-4">
            🔹 Premium Plan
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            Experience the most advanced and personalized Quran learning
            program. Ideal for students who want deep understanding and
            excellence in recitation.
          </p>

          {/* FEATURES */}
          <div className="space-y-3 text-sm md:text-base text-gray-700 mb-8 flex-1">
            <p>✔ Expert-Level Tajweed Mastery</p>
            <p>✔ Advanced Recitation Training</p>
            <p>✔ Tafsir (Quran Understanding)</p>
            <p>✔ Customized Lesson Plans</p>
            <p>✔ Priority Class Scheduling</p>
            <p>✔ Dedicated Personal Mentor</p>
          </div>

          {/* BUTTON */}
          <Link
            to="/enroll-now"
            className="w-full text-center bg-[#e6f0eb] hover:bg-[#145c43] hover:text-white text-gray-700 text-sm md:text-base px-6 py-3 rounded-full font-semibold transition duration-300"
          >
            Choose Premium Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;