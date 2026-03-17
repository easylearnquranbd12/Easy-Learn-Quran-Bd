import {
  FaAward,
  FaChartLine,
  FaClipboardCheck,
  FaEdit,
  FaQuestionCircle,
  FaSearch,
  FaTrophy,
} from "react-icons/fa";

const features = [
  {
    icon: <FaQuestionCircle className="text-[#d49c5b] text-2xl" />,
    title: "Smart Grammar Exercises",
    description:
      "Practice structured grammar formats including Tense, Article, Preposition, Sentence and more.",
  },
  {
    icon: <FaEdit className="text-[#d49c5b] text-2xl" />,
    title: "Step-by-Step Learning",
    description:
      "Learn English with guided layers designed to gradually improve your grammar and writing skills.",
  },
  {
    icon: <FaClipboardCheck className="text-[#d49c5b] text-2xl" />,
    title: "Instant Answer Checking",
    description:
      "Check your answers instantly and understand correct sentence structures with clear explanations.",
  },
  {
    icon: <FaSearch className="text-[#d49c5b] text-2xl" />,
    title: "Topic Based Practice",
    description:
      "Choose exercises from Vocabulary, Idioms, Tense, Articles, Verbs, Prepositions and more.",
  },
  {
    icon: <FaTrophy className="text-[#d49c5b] text-2xl" />,
    title: "Skill Improvement Tracking",
    description:
      "Track your English improvement as you complete exercises and master grammar topics.",
  },
  {
    icon: <FaAward className="text-[#d49c5b] text-2xl" />,
    title: "Structured Learning System",
    description:
      "Our layered learning method helps students master English step by step effectively.",
  },
  {
    icon: <FaChartLine className="text-[#d49c5b] text-2xl" />,
    title: "Progress Based Practice",
    description:
      "Build confidence with progressive exercises designed to strengthen vocabulary and grammar.",
  },
];

const WhyJoinQuizPlatform = () => {
  return (
    <div className="relative w-full rounded-md overflow-hidden bg-[#d49c5b]">
      <div className="max-w-[1400px] mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Learn With Our Platform?
            </h2>

            <p className="mb-8 text-lg">
              Improve your English step by step with smart exercises,
              structured grammar formats, and vocabulary building tools.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white text-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Banner */}
          <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center p-8">
            <div className="text-center max-w-md w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1f4e43] mb-6 leading-tight">
                Master English Grammar With Structured Practice
              </h1>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Popular Learning Sections
              </h3>

              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>Vocabulary Practice</span>
                </li>

                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>Idioms & Expressions</span>
                </li>

                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>Tense & Sentence Structure</span>
                </li>

                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>Articles & Prepositions</span>
                </li>

                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>Verb Forms & Grammar</span>
                </li>
              </ul>

              <button className="w-full bg-bgButton hover:bg-hoverBgButton text-white font-bold py-3 px-6 rounded-lg transition-all">
                Start Learning Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinQuizPlatform;