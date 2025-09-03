// import { useEffect, useState } from "react";
// import idiomsData from "../../../../idioms.json"; // ৫০টা ডেটা

// export default function FirstLayer() {
//   const [rows, setRows] = useState([]);

//   // Extra Sections Data (grammar, interview, travel, favourites, story)
//   const grammar = [
//     { title: "Basic Grammar — Sentences", desc: "Topic 1: Sentences — forms and usage." },
//     { title: "Tongue Twister", desc: "Practise daily for clarity and speed." },
//   ];

//   const interview = [
//     "Tell me about yourself",
//     "Your Current Responsibilities",
//     "How many years you working there",
//     "Why you want to leave your previous org?",
//     "Expected salary",
//     "What is your strength",
//     "What is your weakness",
//   ];

//   const travel = ["In Flight", "Visa Office", "Abroad Dept Shop", "Reservation", "Teacher & Student"];

//   const favourites = {
//     sports: { label: "Favourite Sports Person", placeholder: "Name & 2 lines" },
//     movies: { label: "Favourite Movies", placeholder: "List 3 movies + one line each" },
//     novels: { label: "Favourite Novels", placeholder: "List 3 novels + one line each" },
//     place: { label: "Favourite Place", placeholder: "Place name & details" },
//   };

//   const story = [
//     { label: "Blind Letter", placeholder: "Write a short blind letter" },
//     { label: "Story/Novel", placeholder: "Write 500-1000 words story or novel" },
//   ];

//   // Load idioms.json
//   useEffect(() => {
//     const converted = idiomsData.map((item) => ({
//       mainWord: item.mainWord || "",
//       banglaPronunciation: item.banglaPronunciation || "",
//       banglaMeaning: item.banglaMeaning || "",
//       synonyms: item.synonyms || [],
//       antonyms: item.antonyms || [],
//       exampleEnglish: item.exampleEnglish || "",
//       exampleBangla: item.exampleBangla || "",
//     }));
//     setRows(converted);
//   }, []);

//   const addWord = () =>
//     setRows((r) => [
//       ...r,
//       {
//         mainWord: "",
//         banglaPronunciation: "",
//         banglaMeaning: "",
//         synonyms: [],
//         antonyms: [],
//         exampleEnglish: "",
//         exampleBangla: "",
//         practiced: 0,
//       },
//     ]);

//   const update = (i, key, value) => {
//     const updated = [...rows];
//     updated[i] = { ...updated[i], [key]: value };
//     setRows(updated);
//   };

//   return (
//     <div className="py-10 space-y-10">
//       <div className="max-w-[1400px] mx-auto px-4">
//         {/* Title */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-[#bb874a]">
//             📘 Vocabulary Practice
//           </h2>
//           <button
//             onClick={addWord}
//             className="px-4 py-2 bg-[#bb874a] text-white rounded-lg shadow hover:bg-[#5e4528] transition"
//           >
//             ➕ Add Word
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
//           <table className="table w-full">
//             <thead className="bg-[#bb874a] text-white text-sm">
//               <tr>
//                 <th>#</th>
//                 <th>Main Word</th>
//                 <th>Bangla Pronunciation</th>
//                 <th>Bangla Meaning</th>
//                 <th>Synonyms</th>
//                 <th>Antonyms</th>
//                 <th>Example (English)</th>
//                 <th>Example (Bangla)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map((row, i) => (
//                 <tr
//                   key={i}
//                   className="hover:bg-gray-50 transition border-b text-sm"
//                 >
//                   <td className="font-semibold">{i + 1}</td>

//                   {/* Main Word */}
//                   <td>
//                     <input
//                       className="input input-sm input-bordered w-36"
//                       value={row.mainWord}
//                       onChange={(e) => update(i, "mainWord", e.target.value)}
//                     />
//                   </td>

//                   {/* Bangla Pronunciation */}
//                   <td>
//                     <input
//                       className="input input-sm input-bordered w-40"
//                       value={row.banglaPronunciation}
//                       onChange={(e) =>
//                         update(i, "banglaPronunciation", e.target.value)
//                       }
//                     />
//                   </td>

//                   {/* Bangla Meaning */}
//                   <td>
//                     <input
//                       className="input input-sm input-bordered w-44"
//                       value={row.banglaMeaning}
//                       onChange={(e) =>
//                         update(i, "banglaMeaning", e.target.value)
//                       }
//                     />
//                   </td>

//                   {/* Synonyms */}
//                   <td>
//                     <input
//                       className="input input-sm input-bordered w-48"
//                       value={row.synonyms.join(", ")}
//                       onChange={(e) =>
//                         update(
//                           i,
//                           "synonyms",
//                           e.target.value.split(",").map((s) => s.trim())
//                         )
//                       }
//                       placeholder="comma separated"
//                     />
//                   </td>

//                   {/* Antonyms */}
//                   <td>
//                     <input
//                       className="input input-sm input-bordered w-48"
//                       value={row.antonyms.join(", ")}
//                       onChange={(e) =>
//                         update(
//                           i,
//                           "antonyms",
//                           e.target.value.split(",").map((s) => s.trim())
//                         )
//                       }
//                       placeholder="comma separated"
//                     />
//                   </td>

//                   {/* Example English */}
//                   <td>
//                     <input
//                       className="input input-sm input-bordered w-60"
//                       value={row.exampleEnglish}
//                       onChange={(e) =>
//                         update(i, "exampleEnglish", e.target.value)
//                       }
//                     />
//                   </td>

//                   {/* Example Bangla */}
//                   <td>
//                     <input
//                       className="input input-sm input-bordered w-60"
//                       value={row.exampleBangla}
//                       onChange={(e) =>
//                         update(i, "exampleBangla", e.target.value)
//                       }
//                     />
//                   </td>
//                 </tr>
//               ))}

//               {rows.length === 0 && (
//                 <tr>
//                   <td colSpan="9" className="text-center py-6 text-gray-500">
//                     No words found. Click "➕ Add Word" to create one.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Grammar Section */}
//         <div className="card bg-white shadow-md rounded-2xl p-5 mt-10 space-y-3">
//           <h3 className="text-xl font-semibold text-[#bb874a]">📖 Grammar</h3>
//           {grammar.map((g, i) => (
//             <div key={i} className="space-y-2">
//               <label className="font-semibold">{g.title}</label>
//               <textarea
//                 className="textarea textarea-bordered w-full"
//                 defaultValue={g.desc}
//               ></textarea>
//             </div>
//           ))}
//         </div>

//         {/* Interview Section */}
//         <div className="card bg-white shadow-md rounded-2xl p-5 mt-10 space-y-2">
//           <h3 className="text-xl font-semibold text-[#bb874a]">💼 Interview Questions</h3>
//           {interview.map((q, i) => (
//             <input
//               key={i}
//               className="input input-bordered w-full"
//               defaultValue={q}
//             />
//           ))}
//         </div>

//         {/* Travel Section */}
//         <div className="card bg-white shadow-md rounded-2xl p-5 mt-10 space-y-2">
//           <h3 className="text-xl font-semibold text-[#bb874a]">✈️ Travel Topics</h3>
//           {travel.map((t, i) => (
//             <input key={i} className="input input-bordered w-full" defaultValue={t} />
//           ))}
//         </div>

//         {/* Favourites Section */}
//         <div className="card bg-white shadow-md rounded-2xl p-5 mt-10 space-y-2">
//           <h3 className="text-xl font-semibold text-[#bb874a]">⭐ Favourites</h3>
//           <input className="input input-bordered w-full" placeholder={favourites.sports.placeholder} />
//           <input className="input input-bordered w-full" placeholder={favourites.movies.placeholder} />
//           <input className="input input-bordered w-full" placeholder={favourites.novels.placeholder} />
//           <input className="input input-bordered w-full" placeholder={favourites.place.placeholder} />
//         </div>

//         {/* Story Section */}
//         <div className="card bg-white shadow-md rounded-2xl p-5 mt-10 space-y-3">
//           <h3 className="text-xl font-semibold text-[#bb874a]">✍️ Story Writing</h3>
//           {story.map((s, i) => (
//             <textarea
//               key={i}
//               className="textarea textarea-bordered w-full"
//               placeholder={s.placeholder}
//             ></textarea>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import idiomsData from "../../../../idioms.json"; // ৫০টা ডেটা

const vocabulary = {
  Elegant: [
    { q: "Exquisite", a: "অতুলনীয়, সুন্দর" },
    { q: "Graceful", a: "কোমল এবং সৌম্য" },
    { q: "Sophisticated", a: "জটিল ও পরিশীলিত" },
    { q: "Refined", a: "পরিশীলিত, উন্নত" },
    { q: "Opulent", a: "ধনী, সমৃদ্ধ" },
    { q: "Chic", a: "স্টাইলিশ ও ফ্যাশনেবল" },
    { q: "Polished", a: "পরিপাটি ও মার্জিত" },
    { q: "Stylish", a: "ফ্যাশনেবল, রুচিশীল" },
    { q: "Majestic", a: "মহিমাময়" },
    { q: "Dignified", a: "মর্যাদাশীল" },
    { q: "Sublime", a: "অত্যাশ্চর্য সুন্দর বা মহৎ" },
    { q: "Alluring", a: "আকর্ষণীয়" },
    { q: "Classy", a: "শৌখিন, উচ্চ মানের" },
    { q: "Pristine", a: "বিশুদ্ধ ও অপরিবর্তিত" },
    { q: "Finesse", a: "নিখুঁত দক্ষতা" },
    { q: "Elegant", a: "মার্জিত, রুচিশীল" },
    { q: "Sumptuous", a: "অত্যন্ত চমৎকার, বিলাসী" },
    { q: "Radiant", a: "দীপ্তিমান, উজ্জ্বল" },
    { q: "Delicate", a: "সূক্ষ্ম, কোমল" },
    { q: "Enchanted", a: "মুগ্ধকর, মোহময়" },
  ],
  Honesty: [
    { q: "Truthful", a: "সত্যবাদী" },
    { q: "Sincere", a: "খাঁটি, আন্তরিক" },
    { q: "Genuine", a: "প্রকৃত, আসল" },
    { q: "Transparent", a: "স্পষ্ট, খোলাখুলি" },
    { q: "Reliable", a: "বিশ্বস্ত" },
    { q: "Trustworthy", a: "ভরসাযোগ্য" },
    { q: "Upright", a: "সৎ, সরল" },
    { q: "Frank", a: "সরাসরি, খোলাখুলি" },
    { q: "Authentic", a: "প্রকৃত, বাস্তব" },
    { q: "Principled", a: "নৈতিক, আদর্শবান" },
    { q: "Honorable", a: "মর্যাদাশীল" },
    { q: "Open", a: "খোলা মন, স্বচ্ছ" },
    { q: "Conscientious", a: "অন্তর্মুখী, নৈতিক" },
    { q: "Decent", a: "ভদ্র, সৎ" },
    { q: "Loyal", a: "নিষ্ঠাবান" },
    { q: "Faithful", a: "বিশ্বাসযোগ্য" },
    { q: "Ethical", a: "নৈতিক, সঠিক" },
    { q: "Straightforward", a: "সরাসরি, স্পষ্ট" },
    { q: "Candid", a: "খোলাখুলি, আন্তরিক" },
    { q: "Virtuous", a: "পুণ্যবান, সৎ" },
  ],
  Positivity: [
    { q: "Optimistic", a: "আশাবাদী" },
    { q: "Cheerful", a: "আনন্দময়" },
    { q: "Hopeful", a: "আশাপ্রদ" },
    { q: "Joyful", a: "সুখী" },
    { q: "Confident", a: "আত্মবিশ্বাসী" },
    { q: "Bright", a: "উজ্জ্বল, প্রাণবন্ত" },
    { q: "Encouraging", a: "উদ্দীপক, প্রেরণাদায়ক" },
    { q: "Vibrant", a: "প্রাণবন্ত" },
    { q: "Upbeat", a: "সুখী ও উৎসাহী" },
    { q: "Energetic", a: "শক্তিশালী, উদ্যমী" },
    { q: "Passionate", a: "উৎসাহী" },
    { q: "Grateful", a: "কৃতজ্ঞ" },
    { q: "Resilient", a: "অটল, সহিষ্ণু" },
    { q: "Inspirational", a: "প্রেরণাদায়ক" },
    { q: "Positive", a: "সকারাত্মক" },
    { q: "Radiant", a: "দীপ্তিমান, উজ্জ্বল" },
    { q: "Optimism", a: "আশাবাদ" },
    { q: "Encouraged", a: "প্রাণবন্ত, উৎসাহিত" },
    { q: "Upstanding", a: "সৎ, মর্যাদাশীল" },
  ],
  Motivation: [
    { q: "Determined", a: "দৃঢ়সংকল্প, মনোবল" },
    { q: "Persistent", a: "অবিচল, ধৈর্যশীল" },
    { q: "Ambitious", a: "লক্ষ্যনিষ্ঠ ও উচ্চাকাঙ্ক্ষী" },
    { q: "Driven", a: "উদ্যমী, লক্ষ্যনিষ্ঠ" },
    { q: "Focused", a: "মনোযোগী" },
    { q: "Courageous", a: "সাহসী" },
    { q: "Proactive", a: "সক্রিয়, আগ্রাসী" },
    { q: "Goal-oriented", a: "লক্ষ্যনিষ্ঠ" },
    { q: "Resilient", a: "সহিষ্ণু" },
    { q: "Self-motivated", a: "স্বনির্ভর, উদ্যমী" },
    { q: "Disciplined", a: "শৃঙ্খলাবদ্ধ" },
    { q: "Committed", a: "প্রতিবদ্ধ" },
    { q: "Tenacious", a: "দৃঢ়সংকল্প" },
    { q: "Inspired", a: "প্রেরণাপ্রাপ্ত" },
    { q: "Passionate", a: "উৎসাহী" },
    { q: "Visionary", a: "দূরদর্শী" },
    { q: "Hardworking", a: "পরিশ্রমী" },
  ],
  Fashion_Hobby: [
    { q: "Trendy", a: "চলমান ফ্যাশন অনুসারে" },
    { q: "Chic", a: "স্টাইলিশ" },
    { q: "Stylish", a: "রুচিশীল" },
    { q: "Creative", a: "সৃজনশীল" },
    { q: "Artistic", a: "শিল্পপ্রিয়" },
    { q: "Innovative", a: "উদ্ভাবনী" },
    { q: "Colorful", a: "রঙিন" },
    { q: "Elegant", a: "মার্জিত" },
    { q: "Vibrant", a: "প্রাণবন্ত" },
    { q: "Daring", a: "সাহসী, অভিনব" },
    { q: "Casual", a: "সাধারণ, আরামদায়ক" },
    { q: "Modern", a: "আধুনিক" },
    { q: "Refined", a: "পরিশীলিত" },
    { q: "Fashionable", a: "ফ্যাশনেবল" },
    { q: "Luxurious", a: "বিলাসী" },
    { q: "Playful", a: "খেলাধুলাপ্রিয়" },
    { q: "Sporty", a: "খেলাধুলাপ্রিয়" },
    { q: "Creative-minded", a: "সৃজনশীল মানসিকতা" },
  ],
};

const grammarData = {
  Sentence: [
    {
      q: "Make a simple sentence with the word 'school'.",
      a: "I go to school every day.",
    },
    {
      q: "Turn this into a negative: 'She sings well.'",
      a: "She does not sing well.",
    },
    {
      q: "Change into a question: 'He plays cricket.'",
      a: "Does he play cricket?",
    },
    {
      q: "Make a sentence using 'because'.",
      a: "I stayed at home because it was raining.",
    },
    {
      q: "Join the sentences: 'He is poor. He is honest.'",
      a: "He is poor but honest.",
    },
  ],
  Tense: [
    { q: "Change into past tense: 'I eat rice.'", a: "I ate rice." },
    {
      q: "Change into future tense: 'She goes to market.'",
      a: "She will go to market.",
    },
    {
      q: "Use present continuous tense: 'play football'",
      a: "I am playing football.",
    },
    {
      q: "Use past continuous tense: 'read a book'",
      a: "He was reading a book.",
    },
    {
      q: "Change into present perfect: 'They finish homework.'",
      a: "They have finished homework.",
    },
  ],
  Article: [
    { q: "He is ___ honest man.", a: "an" },
    { q: "I saw ___ sun rise in the east.", a: "the" },
    { q: "She bought ___ apple.", a: "an" },
    { q: "I need ___ book from the library.", a: "a" },
    { q: "___ moon looks beautiful tonight.", a: "The" },
  ],
  Preposition: [
    { q: "The book is ___ the table.", a: "on" },
    { q: "He came ___ 9 o’clock.", a: "at" },
    { q: "They went ___ the park.", a: "to" },
    { q: "The cat is hiding ___ the chair.", a: "under" },
    { q: "He lives ___ Dhaka.", a: "in" },
  ],
};
export default function FirstLayer() {
  const [rows, setRows] = useState([]);
  const [activeTabSentence, setActiveTabSentence] = useState("Sentence");
  const [activeTab, setActiveTab] = useState(Object.keys(vocabulary)[0]);
  const [openIndex, setOpenIndex] = useState(null);
  // Grammar Section State
  const [grammarRows, setGrammarRows] = useState(
    Array.from({ length: 3 }, () => ({
      mainWord: "",
      banglaPronunciation: "",
      banglaMeaning: "",
      synonyms: [],
      antonyms: [],
      exampleEnglish: "",
      exampleBangla: "",
    }))
  );
  // Load idioms.json
  useEffect(() => {
    const converted = idiomsData.map((item) => ({
      mainWord: item.mainWord || "",
      banglaPronunciation: item.banglaPronunciation || "",
      banglaMeaning: item.banglaMeaning || "",
      synonyms: item.synonyms || [],
      antonyms: item.antonyms || [],
      exampleEnglish: item.exampleEnglish || "",
      exampleBangla: item.exampleBangla || "",
    }));
    setRows(converted);
  }, []);

  const update = (i, key, value) => {
    const updated = [...rows];
    updated[i] = { ...updated[i], [key]: value };
    setRows(updated);
  };

  const updateGrammar = (i, key, value) => {
    const updated = [...grammarRows];
    updated[i] = { ...updated[i], [key]: value };
    setGrammarRows(updated);
  };

  const submitGrammar = () => {
    console.log("Grammar Exercises Submitted:", grammarRows);
    alert("Grammar Exercises submitted! Check console for data.");
  };

  return (
    <div className="py-10 space-y-10">
      <div className="max-w-[1400px] mx-auto ">
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#bb874a]">
            Vocabulary Practice
          </h2>
        </div>

        {/* Vocabulary Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="table w-full">
            <thead className="bg-[#bb874a] text-white text-sm">
              <tr>
                <th>#</th>
                <th>Main Word</th>
                <th>Bangla Pronunciation</th>
                <th>Bangla Meaning</th>
                <th>Synonyms</th>
                <th>Antonyms</th>
                <th>Example (English)</th>
                <th>Example (Bangla)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition border-b text-sm"
                >
                  <td className="font-semibold">{i + 1}</td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-36"
                      value={row.mainWord}
                      onChange={(e) => update(i, "mainWord", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      value={row.banglaPronunciation}
                      onChange={(e) =>
                        update(i, "banglaPronunciation", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-44"
                      value={row.banglaMeaning}
                      onChange={(e) =>
                        update(i, "banglaMeaning", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-48"
                      value={row.synonyms.join(", ")}
                      onChange={(e) =>
                        update(
                          i,
                          "synonyms",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                      placeholder="comma separated"
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-48"
                      value={row.antonyms.join(", ")}
                      onChange={(e) =>
                        update(
                          i,
                          "antonyms",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                      placeholder="comma separated"
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-60"
                      value={row.exampleEnglish}
                      onChange={(e) =>
                        update(i, "exampleEnglish", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-60"
                      value={row.exampleBangla}
                      onChange={(e) =>
                        update(i, "exampleBangla", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No words found. Click "➕ Add Word" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Exercise Section */}
        <div className="card bg-white shadow-md rounded-2xl p-5 mt-10 space-y-3">
          <h3 className="text-xl font-semibold text-[#bb874a]">📖 Exercise</h3>
          <p>Learning Your Exercise</p>

          <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
            <table className="table w-full">
              <thead className="bg-black text-white text-sm">
                <tr>
                  <th>#</th>
                  <th>Main Word</th>
                  <th>Bangla Pronunciation</th>
                  <th>Bangla Meaning</th>
                  <th>Synonyms</th>
                  <th>Antonyms</th>
                  <th>Example (English)</th>
                  <th>Example (Bangla)</th>
                </tr>
              </thead>
              <tbody>
                {grammarRows.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition border-b text-sm"
                  >
                    <td className="font-semibold">{i + 1}</td>
                    <td>
                      <input
                        className="input input-sm input-bordered w-36"
                        value={row.mainWord}
                        onChange={(e) =>
                          updateGrammar(i, "mainWord", e.target.value)
                        }
                        placeholder="Main word"
                      />
                    </td>
                    <td>
                      <input
                        className="input input-sm input-bordered w-40"
                        value={row.banglaPronunciation}
                        onChange={(e) =>
                          updateGrammar(
                            i,
                            "banglaPronunciation",
                            e.target.value
                          )
                        }
                        placeholder="Bangla Pronunciation"
                      />
                    </td>
                    <td>
                      <input
                        className="input input-sm input-bordered w-44"
                        value={row.banglaMeaning}
                        onChange={(e) =>
                          updateGrammar(i, "banglaMeaning", e.target.value)
                        }
                        placeholder="Bangla Meaning"
                      />
                    </td>
                    <td>
                      <input
                        className="input input-sm input-bordered w-48"
                        value={row.synonyms.join(", ")}
                        onChange={(e) =>
                          updateGrammar(
                            i,
                            "synonyms",
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                        placeholder="Synonyms (comma separated)"
                      />
                    </td>
                    <td>
                      <input
                        className="input input-sm input-bordered w-48"
                        value={row.antonyms.join(", ")}
                        onChange={(e) =>
                          updateGrammar(
                            i,
                            "antonyms",
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                        placeholder="Antonyms (comma separated)"
                      />
                    </td>
                    <td>
                      <input
                        className="input input-sm input-bordered w-60"
                        value={row.exampleEnglish}
                        onChange={(e) =>
                          updateGrammar(i, "exampleEnglish", e.target.value)
                        }
                        placeholder="Example English"
                      />
                    </td>
                    <td>
                      <input
                        className="input input-sm input-bordered w-60"
                        value={row.exampleBangla}
                        onChange={(e) =>
                          updateGrammar(i, "exampleBangla", e.target.value)
                        }
                        placeholder="Example Bangla"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="px-4 py-2 bg-[#bb874a] text-white rounded-lg shadow hover:bg-[#5e4528] transition mt-3"
              onClick={submitGrammar}
            >
              Submit Now
            </button>
          </div>
        </div>
        {/* Grammer Section */}
        <div className="card bg-white shadow-md rounded-2xl p-5 mt-10">
          <h3 className="text-xl font-semibold text-[#bb874a]">
            📖 Grammar Section
          </h3>
          <p className="mb-5">Learn and Practice Grammar</p>

          {/* Tabs */}
          <div className="flex space-x-2 mb-5">
            {Object.keys(grammarData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTabSentence(tab)}
                className={`px-4 py-2 rounded-xl font-semibold ${
                  activeTabSentence === tab
                    ? "bg-[#bb874a] text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Questions & Answers */}
          <div className="space-y-4">
            {grammarData[activeTabSentence].map((item, index) => (
              <div
                key={index}
                tabIndex={0}
                className="collapse collapse-arrow bg-base-100 border border-base-300"
              >
                <input type="checkbox" />
                <div className="collapse-title font-semibold">{`Q${
                  index + 1
                }: ${item.q}`}</div>
                <div className="collapse-content text-sm">
                  <p>
                    <span className="font-semibold">Answer:</span> {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant section */}
        <div className="card bg-white shadow-md rounded-2xl p-5 mt-10">
          <h3 className="text-xl font-semibold text-[#bb874a]">
            📝 Vocabulary Section
          </h3>
          <p className="mb-5">Learn and Practice Words</p>

          {/* Tabs */}
          <div className="flex space-x-2 mb-5 flex-wrap">
            {Object.keys(vocabulary).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 md:px-4 py-1.5 md:py-2 rounded-xl font-semibold mb-2 ${
                  activeTab === tab
                    ? "bg-[#bb874a] text-white text-[12px] md:text-[16px]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 text-[12px] md:text-[16px]"
                }`}
              >
                {tab.replace("_", " & ")}
              </button>
            ))}
          </div>

          {/* Questions & Answers */}
          <div className="space-y-4">
            {vocabulary[activeTab].map((item, index) => (
              <div
                key={index}
                tabIndex={0}
                className="collapse collapse-arrow bg-base-100 border border-base-300"
              >
                <input type="checkbox" />
                <div className="collapse-title font-semibold">{`Q${
                  index + 1
                }: ${item.q}`}</div>
                <div className="collapse-content text-sm">
                  <p>
                    <span className="font-semibold">Meaning:</span> {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
