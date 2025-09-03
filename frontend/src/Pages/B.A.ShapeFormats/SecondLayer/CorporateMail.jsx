import { useEffect, useRef, useState } from "react";

const corporateMailTips = [
  {
    subject: "Use a professional email address",
    content:
      "Always use an email address that includes your name and looks professional, e.g., john.doe@company.com. Avoid nicknames or unprofessional handles."
  },
  {
    subject: "Clear and concise subject line",
    content:
      "Your subject line should clearly reflect the content of your email. This helps the recipient understand the purpose without opening the email."
  },
  {
    subject: "Use proper greetings",
    content:
      "Start your emails with a polite greeting such as 'Dear Mr. Smith' or 'Hello Jane'. Avoid informal greetings in corporate emails."
  },
  {
    subject: "Keep the email concise",
    content:
      "Corporate emails should be to the point. Avoid unnecessary information and focus on the key message."
  },
  {
    subject: "Professional tone",
    content:
      "Maintain a formal and courteous tone. Avoid slang, jokes, or overly casual language in professional emails."
  },
  {
    subject: "Check grammar and spelling",
    content:
      "Proofread your email before sending. Mistakes in grammar or spelling can create a negative impression."
  },
  {
    subject: "Use proper formatting",
    content:
      "Use paragraphs, bullet points, and headings where appropriate. This makes your email easy to read and understand."
  },
  {
    subject: "Respond promptly",
    content:
      "Try to reply to corporate emails within 24-48 hours. Timely responses show professionalism and reliability."
  },
  {
    subject: "Avoid unnecessary CC/BCC",
    content:
      "Include only relevant recipients in the CC/BCC fields to avoid clutter and respect privacy."
  },
  {
    subject: "Use a professional signature",
    content:
      "Include your full name, position, company, and contact information in your email signature."
  }
];

const CorporateMail = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, idx) => {
      if (ref) {
        if (openIndex === idx) {
          ref.style.maxHeight = ref.scrollHeight + "px";
        } else {
          ref.style.maxHeight = "0px";
        }
      }
    });
  }, [openIndex]);

  return (
    <div className="max-w-5xl mx-auto my-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Corporate Email Best Practices
      </h2>

      <div className="space-y-3">
        {corporateMailTips.map((tip, index) => (
          <div key={index} className="border rounded-md shadow-sm overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
            >
              <span className="font-medium">{tip.subject}</span>
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </button>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="px-4 py-0 bg-white border-t max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
            >
              <p className="py-3">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorporateMail;
