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
    description:
      "Monitor your performance and see improvement over time.",
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
    description:
      "Earn badges for your milestones and share them with friends.",
  },
  {
    icon: <FaChartLine className="text-[#d49c5b] text-2xl" />,
    title: "Progress Reports",
    description:
      "Get detailed reports on your quiz attempts and strengths.",
  },
];

const WhyJoinQuizPlatform = () => {
  return (
    <div className="relative w-full rounded-md overflow-hidden bg-[#d49c5b]">
      {/* Floating Shapes */}
      <div className="absolute inset-0">
        <span className="absolute w-24 h-24 bg-white/20 rounded-full opacity-40 animate-float-fast top-10 left-5"></span>
        <span className="absolute w-16 h-16 bg-white/30 rounded-full opacity-40 animate-float-fast bottom-10 right-10"></span>
        <span className="absolute w-14 h-14 bg-white/25 rounded-full opacity-40 animate-float-fast top-1/2 left-1/3"></span>
      </div>

      {/* Small Floating Quiz Symbols */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-white opacity-50 text-lg animate-tiny-fast"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {i % 2 === 0 ? "?" : "+"}
          </span>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-2 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why choose <span className="text-yellow-300">Our Quiz Platform</span>?
            </h2>
            <p className="mb-8 text-lg">
              The ultimate place to test your knowledge, challenge friends, and improve every day.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white text-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg hover:shadow-2xl transition-all"
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
          <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center p-8">
            <div className="text-center max-w-md w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1f4e43] mb-6 leading-tight">
                Take your <span className="text-[#d49c5b]">knowledge</span>
                <br />
                to the next level <span className="text-yellow-500">with quizzes</span>
              </h1>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Popular Quiz Categories:
              </h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">✓</span>
                  <span>General Knowledge</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">✓</span>
                  <span>English & Vocabulary</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">✓</span>
                  <span>Science & Math</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-[#d49c5b] text-white p-1 rounded-full">✓</span>
                  <span>Current Affairs</span>
                </li>
              </ul>
              <button className="w-full bg-bgButton hover:bg-hoverBgButton text-white font-bold py-3 px-6 rounded-lg transition-all">
                Start Quiz Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-fast {
          animation: floatFast 4s ease-in-out infinite;
        }
        @keyframes tinyMoveFast {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-10px) rotate(20deg); opacity: 0.9; }
        }
        .animate-tiny-fast {
          animation: tinyMoveFast 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WhyJoinQuizPlatform;
