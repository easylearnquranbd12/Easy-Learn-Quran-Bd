import {
  FaAward,
  FaChartLine,
  FaClipboardCheck,
  FaEdit,
  FaQuestionCircle,
  FaSearch,
  FaTrophy,
} from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";

const baseFeatures = [
  {
    icon: <FaQuestionCircle className="text-[#d49c5b] text-2xl" />,
    title: "Topic-wise Quizzes",
    description:
      "Choose from hundreds of quizzes across different subjects and difficulty levels.",
  },
  {
    icon: <FaEdit className="text-[#d49c5b] text-2xl" />,
    title: "Instant Feedback",
    description:
      "Get real-time feedback with correct answers and detailed explanations.",
  },
  {
    icon: <FaClipboardCheck className="text-[#d49c5b] text-2xl" />,
    title: "Score Tracking",
    description: "Monitor your performance and see improvement over time.",
  },
  {
    icon: <FaSearch className="text-[#d49c5b] text-2xl" />,
    title: "Category Based Quizzes",
    description:
      "Select quizzes by category such as General Knowledge, English, Math, Science, and more.",
  },
  {
    icon: <FaTrophy className="text-[#d49c5b] text-2xl" />,
    title: "Leaderboard Challenges",
    description:
      "Compete with other players and climb the leaderboard rankings.",
  },
  {
    icon: <FaAward className="text-[#d49c5b] text-2xl" />,
    title: "Achievement Badges",
    description: "Earn badges for your milestones and share them with friends.",
  },
  {
    icon: <FaChartLine className="text-[#d49c5b] text-2xl" />,
    title: "Progress Reports",
    description: "Get detailed reports on your quiz attempts and strengths.",
  },
];

const WhyJoinQuizPlatform = () => {
  const { translations, loading } = useTranslation();

  const features = baseFeatures.map((item) => ({
    ...item,
    title: translations[item.title] || item.title,
    description: translations[item.description] || item.description,
  }));

  return (
    <div className="relative w-full rounded-md overflow-hidden bg-[#d49c5b]">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-2 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="text-white">
            <h2
              data-translate="Why choose Our Quiz Platform?"
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {translations["Why choose Our Quiz Platform?"] ||
                "Why choose Our Quiz Platform?"}
            </h2>
            <p
              data-translate="The ultimate place to test your knowledge, challenge friends, and improve every day."
              className="mb-8 text-lg"
            >
              {translations[
                "The ultimate place to test your knowledge, challenge friends, and improve every day."
              ] ||
                "The ultimate place to test your knowledge, challenge friends, and improve every day."}
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
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Banner */}
          <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center p-8">
            <div className="text-center max-w-md w-full">
              <h1
                className="text-4xl md:text-5xl font-bold text-[#1f4e43] mb-6 leading-tight"
                data-translate="Take your knowledge to the next level with quizzes"
              >
                {translations["Take your knowledge to the next level with quizzes"] ||
                  "Take your knowledge to the next level with quizzes"}
              </h1>
              <h3
                className="text-xl font-bold text-gray-800 mb-3"
                data-translate="Popular Quiz Categories:"
              >
                {translations["Popular Quiz Categories:"] ||
                  "Popular Quiz Categories:"}
              </h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li
                  className="flex items-center gap-2"
                  data-translate="General Knowledge"
                >
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>
                    {translations["General Knowledge"] || "General Knowledge"}
                  </span>
                </li>
                <li
                  className="flex items-center gap-2"
                  data-translate="English & Vocabulary"
                >
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>
                    {translations["English & Vocabulary"] ||
                      "English & Vocabulary"}
                  </span>
                </li>
                <li
                  className="flex items-center gap-2"
                  data-translate="Science & Math"
                >
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>{translations["Science & Math"] || "Science & Math"}</span>
                </li>
                <li
                  className="flex items-center gap-2"
                  data-translate="Current Affairs"
                >
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">
                    ✓
                  </span>
                  <span>
                    {translations["Current Affairs"] || "Current Affairs"}
                  </span>
                </li>
              </ul>
              <button
                className="w-full bg-bgButton hover:bg-hoverBgButton text-white font-bold py-3 px-6 rounded-lg transition-all"
                data-translate="Start Quiz Now"
              >
                {translations["Start Quiz Now"] || "Start Quiz Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinQuizPlatform;
