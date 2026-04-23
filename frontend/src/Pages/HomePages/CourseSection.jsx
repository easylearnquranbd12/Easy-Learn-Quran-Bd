import { BookMarked, BookOpen, FileText, GraduationCap } from "lucide-react";

const courses = [
  {
    icon: <FileText size={28} />,
    title: "Noorani Qaida",
    desc: "Learn basics of Quran reading with proper pronunciation and rules.",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Quran Reading",
    desc: "Improve your recitation with fluency and accuracy step by step.",
  },
  {
    icon: <BookMarked size={28} />,
    title: "Tajweed Course",
    desc: "Learn Tajweed rules to recite Quran correctly and beautifully.",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Hifz Program",
    desc: "Memorize the Quran with proper guidance and revision system.",
  },
];

const CourseSection = () => {
  return (
    <div className="w-full py-6 md:px-2">

      {/* 🔥 TITLE */}
      <div className="text-center mb-10">
        <p className="text-xl font-bold text-green-800 uppercase relative inline-block">
          Course Section

          {/* Wavy Underline */}
          <span className="absolute left-0 -bottom-2 w-full">
            <svg viewBox="0 0 200 10" className="w-full h-3">
              <path
                d="M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5 T 140 5 T 160 5 T 180 5 T 200 5"
                fill="transparent"
                stroke="#065f46"
                strokeWidth="2"
              />
            </svg>
          </span>
        </p>
      </div>

      {/* 🔥 CARDS */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {courses.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center hover:-translate-y-1 duration-300"
          >
            {/* ICON BOX */}
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-2">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CourseSection;