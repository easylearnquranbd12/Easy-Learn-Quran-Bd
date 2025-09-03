import { useState } from "react";
import LetterWritingExercise from "./LetterWritingExercise";
import StoryWritingExercise from "./StoryWritingExercise";

const WritingExercises = () => {
  const [activeTab, setActiveTab] = useState("story"); // default Story Writing

  const tabs = {
    story: {
      title: "✍️ Story Writing",
      component: <StoryWritingExercise />,
    },
    letter: {
      title: "📩 Letter Writing",
      component: <LetterWritingExercise />,
    },
  };

  return (
    <div className="card bg-white shadow-md rounded-2xl p-6 mt-10">
      <h3 className="text-xl font-semibold text-[#bb874a] mb-1 text-center">
        📝 Writing Exercises
      </h3>
      <p className="mb-5 text-gray-600 text-center">
        Choose an exercise and start practicing
      </p>

      {/* Tabs */}
      <div className="flex justify-center space-x-3 mb-5">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === tab
                ? "bg-[#bb874a] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tabs[tab].title}
          </button>
        ))}
      </div>

      {/* Active Component */}
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
};

export default WritingExercises;
