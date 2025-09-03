import { useState } from "react";

const professionalQAs = [
  {
    question: "Can you tell me about yourself?",
    answer:
      "I am a dedicated professional with experience in software development, focusing on building scalable web applications and providing efficient solutions."
  },
  {
    question: "Why do you want to work with us?",
    answer:
      "I admire your company's innovative approach and commitment to quality. I believe my skills align well with your goals and culture."
  },
  {
    question: "What are your strengths?",
    answer:
      "My strengths include problem-solving, adaptability, and strong communication skills that help me collaborate effectively in a team."
  },
  {
    question: "What are your weaknesses?",
    answer:
      "I sometimes focus too much on details, but I am learning to balance thoroughness with efficiency."
  },
  {
    question: "Describe a challenging situation and how you overcame it.",
    answer:
      "In my previous project, we faced a tight deadline. I organized tasks, prioritized critical issues, and coordinated with teammates to deliver on time."
  },
  {
    question: "Where do you see yourself in 5 years?",
    answer:
      "I see myself growing into a leadership role, contributing to impactful projects, and continuously learning new technologies."
  },
  {
    question: "Why should we hire you?",
    answer:
      "I bring a combination of technical expertise, dedication, and a collaborative mindset that can add value to your team immediately."
  },
  {
    question: "How do you handle stress and pressure?",
    answer:
      "I stay organized, break tasks into manageable steps, and maintain a calm mindset to make clear decisions under pressure."
  },
  {
    question: "Can you work in a team environment?",
    answer:
      "Absolutely. I enjoy collaborating with team members, sharing knowledge, and achieving common goals effectively."
  },
  {
    question: "Do you have any questions for us?",
    answer:
      "Yes, I would like to know more about the team culture and opportunities for professional growth within the company."
  }
];

const ProfessionalInterviewQustion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Professional Interview Questions
      </h2>

      <div className="space-y-3">
        {professionalQAs.map((qa, index) => (
          <div
            key={index}
            className="border rounded-md shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
            >
              <span className="font-medium">{qa.question}</span>
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 bg-white border-t">{qa.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalInterviewQustion;
