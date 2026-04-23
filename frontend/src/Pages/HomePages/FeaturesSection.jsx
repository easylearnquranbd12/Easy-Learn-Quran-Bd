import { BarChart, BookOpen, Clock, Users } from "lucide-react";

const features = [
  {
    icon: <BookOpen size={28} />,
    title: "One-on-One Classes",
    desc: "Clean, modern cards in soft shadows and soft shadows",
  },
  {
    icon: <Users size={28} />,
    title: "Qualified Male & Female Teachers",
    desc: "Qualified Male & Female T & expert teachers",
  },
  {
    icon: <Clock size={28} />,
    title: "Flexible Timings",
    desc: "Natural light and cleanliness and of cinematic grading.",
  },
  {
    icon: <BarChart size={28} />,
    title: "Progress Tracking",
    desc: "Progress modern claims and progress force tracking.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="w-full py-10 md:px-2 ">
      {/* TITLE */}
      <div className="text-center mb-10">
        <p className="text-xl font-bold text-green-800 uppercase relative inline-block">
          Features Section
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

      {/* CARDS */}
      <div className="max-w-[1400px] mx-auto   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center"
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

export default FeaturesSection;
