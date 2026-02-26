import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    question: "১. কেন Betheshape থেকে English শেখা উচিত?",
    answer:
      "Betheshape একটি structured এবং step-by-step English learning platform। এখানে Grammar, Vocabulary, Reading এবং Quiz ভিত্তিক practice এর মাধ্যমে আপনি ধীরে ধীরে নিজের দক্ষতা উন্নত করতে পারবেন। এলোমেলো শেখার পরিবর্তে এখানে সঠিক guideline অনুসরণ করে শেখানো হয়, যাতে আপনি আত্মবিশ্বাসের সাথে ইংরেজি ব্যবহার করতে পারেন।",
  },
  {
    question: "২. Package কিনলে কী extra সুবিধা পাবো?",
    answer:
      "Basic Package কিনলে আপনি Unlimited Quiz Access, Advanced Grammar Lesson, Mock Test এবং বিস্তারিত Performance Analysis পাবেন। এতে আপনি নিজের দুর্বল জায়গাগুলো চিহ্নিত করে দ্রুত উন্নতি করতে পারবেন। এছাড়া নিয়মিত নতুন কনটেন্টও যোগ করা হয়।",
  },
  {
    question: "৩. Free plan আর Basic plan এর পার্থক্য কী?",
    answer:
      "Free plan মূলত নতুনদের জন্য একটি শুরু করার সুযোগ। এখানে সীমিত quiz এবং basic lesson থাকে। কিন্তু Basic plan এ আপনি সম্পূর্ণ course access, unlimited practice এবং full dashboard সুবিধা পাবেন যা আপনার শেখাকে আরও দ্রুত এবং কার্যকর করবে।",
  },
  {
    question: "৪. প্রতিদিন practice করলে কতদিনে improvement দেখা যাবে?",
    answer:
      "আপনি যদি প্রতিদিন অন্তত ২০-৩০ মিনিট সময় দিয়ে lesson ও quiz practice করেন, তাহলে ৩০-৬০ দিনের মধ্যে উল্লেখযোগ্য উন্নতি দেখতে পারবেন। নিয়মিত practice এবং ধারাবাহিকতা এখানে সবচেয়ে গুরুত্বপূর্ণ।",
  },
  {
    question: "৫. Quiz গুলো কি exam preparation এ সাহায্য করবে?",
    answer:
      "হ্যাঁ, আমাদের quiz ও mock test গুলো এমনভাবে তৈরি করা হয়েছে যাতে চাকরি, বিশ্ববিদ্যালয় ভর্তি এবং অন্যান্য প্রতিযোগিতামূলক পরীক্ষার English অংশের জন্য প্রস্তুতি নিতে সুবিধা হয়।",
  },
  {
    question: "৬. Mobile দিয়ে কি ব্যবহার করা যাবে?",
    answer:
      "অবশ্যই। Betheshape সম্পূর্ণ responsive প্ল্যাটফর্ম। আপনি মোবাইল, ট্যাবলেট বা কম্পিউটার — যেকোনো ডিভাইস থেকেই সহজে ব্যবহার করতে পারবেন।",
  },
  {
    question: "৭. Payment করার পর কত দ্রুত access পাবো?",
    answer:
      "Payment সম্পন্ন হওয়ার সাথে সাথেই আপনার অ্যাকাউন্টে Basic plan এর সব সুবিধা স্বয়ংক্রিয়ভাবে চালু হয়ে যাবে। কোনো অতিরিক্ত অপেক্ষা করতে হবে না।",
  },
  {
    question: "৮. Progress কি track করা যায়?",
    answer:
      "হ্যাঁ, আপনার জন্য একটি dashboard থাকবে যেখানে আপনি আপনার quiz score, lesson completion এবং overall performance বিশ্লেষণ দেখতে পারবেন। এতে আপনি বুঝতে পারবেন কোন জায়গায় আরও উন্নতি দরকার।",
  },
  {
    question: "৯. যদি কোনো সমস্যায় পড়ি তাহলে কী করবো?",
    answer:
      "আপনি যেকোনো ধরনের টেকনিক্যাল সমস্যা, পেমেন্ট সংক্রান্ত প্রশ্ন বা শেখার বিষয়ে সাহায্যের জন্য আমাদের support টিমের সাথে যোগাযোগ করতে পারেন। আমাদের Email: support@betheshape.com — আমরা যত দ্রুত সম্ভব আপনার সমস্যার সমাধান করার চেষ্টা করবো।",
  },
  {
    question: "১০. কেন এখনই শুরু করা উচিত?",
    answer:
      "ইংরেজি দক্ষতা আপনার ক্যারিয়ার ও আত্মবিশ্বাস দুটোই বাড়ায়। সময় নষ্ট না করে আজ থেকেই শুরু করলে আপনি অন্যদের চেয়ে এগিয়ে থাকতে পারবেন। Betheshape আপনাকে সঠিক দিকনির্দেশনা দিয়ে আপনার লক্ষ্যে পৌঁছাতে সাহায্য করবে।",
  },
];

const BetheshapeFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-teal-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-700 mb-12">
          কেন Betheshape Package কিনবেন?
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-teal-100"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-gray-800">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-teal-600 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BetheshapeFAQ;