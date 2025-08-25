// import { useState } from "react";

// // ================= PDF থেকে ৫০টা Idioms =================
// const data = {
//   words: [
//     { word: "Break the ice", meaning: "অচলাবস্থা ভাঙা, আলাপ শুরু করা", synonyms: ["start conversation"], antonyms: ["keep silence"], practiced: 0 },
//     { word: "Hit the nail on the head", meaning: "সঠিকভাবে বলা বা করা", synonyms: ["exactly right"], antonyms: ["wrong"], practiced: 0 },
//     { word: "Under the weather", meaning: "অসুস্থ বা খারাপ লাগা", synonyms: ["sick"], antonyms: ["healthy"], practiced: 0 },
//     { word: "Piece of cake", meaning: "খুব সহজ কাজ", synonyms: ["easy"], antonyms: ["difficult"], practiced: 0 },
//     { word: "Once in a blue moon", meaning: "খুবই বিরল ঘটনা", synonyms: ["rare"], antonyms: ["frequent"], practiced: 0 },
//     { word: "Let the cat out of the bag", meaning: "গোপন ফাঁস করা", synonyms: ["reveal secret"], antonyms: ["keep secret"], practiced: 0 },
//     { word: "Burn the midnight oil", meaning: "গভীর রাতে পরিশ্রম করা", synonyms: ["work late"], antonyms: ["rest"], practiced: 0 },
//     { word: "Hit the sack", meaning: "ঘুমাতে যাওয়া", synonyms: ["go to bed"], antonyms: ["wake up"], practiced: 0 },
//     { word: "A blessing in disguise", meaning: "অপ্রত্যাশিত ভালো কিছু", synonyms: ["hidden benefit"], antonyms: ["misfortune"], practiced: 0 },
//     { word: "Actions speak louder than words", meaning: "কথার চেয়ে কাজ শক্তিশালী", synonyms: ["deeds matter"], antonyms: ["empty talk"], practiced: 0 },
//     { word: "Bite the bullet", meaning: "কষ্ট সহ্য করা", synonyms: ["endure"], antonyms: ["avoid"], practiced: 0 },
//     { word: "Call it a day", meaning: "কাজ শেষ করা", synonyms: ["stop working"], antonyms: ["continue"], practiced: 0 },
//     { word: "Cut corners", meaning: "সহজ পথে কাজ করা", synonyms: ["cheat"], antonyms: ["do properly"], practiced: 0 },
//     { word: "Devil’s advocate", meaning: "বিপরীত মত দেওয়া", synonyms: ["opposer"], antonyms: ["supporter"], practiced: 0 },
//     { word: "Don’t cry over spilt milk", meaning: "অতীত নিয়ে দুঃখ করা", synonyms: ["don’t regret"], antonyms: ["keep regretting"], practiced: 0 },
//     { word: "Every cloud has a silver lining", meaning: "খারাপ সময়েও ভালো দিক আছে", synonyms: ["hope"], antonyms: ["hopelessness"], practiced: 0 },
//     { word: "Give someone the cold shoulder", meaning: "উপেক্ষা করা", synonyms: ["ignore"], antonyms: ["welcome"], practiced: 0 },
//     { word: "Go the extra mile", meaning: "অতিরিক্ত চেষ্টা করা", synonyms: ["try harder"], antonyms: ["give up"], practiced: 0 },
//     { word: "In hot water", meaning: "সমস্যায় পড়া", synonyms: ["in trouble"], antonyms: ["safe"], practiced: 0 },
//     { word: "Jump on the bandwagon", meaning: "জনপ্রিয় কিছুর সাথে যোগ দেওয়া", synonyms: ["follow trend"], antonyms: ["ignore trend"], practiced: 0 },
//     { word: "Kill two birds with one stone", meaning: "একসাথে দুই কাজ করা", synonyms: ["multi-task"], antonyms: ["waste effort"], practiced: 0 },
//     { word: "Leave no stone unturned", meaning: "কোনো চেষ্টা বাদ না দেওয়া", synonyms: ["try everything"], antonyms: ["ignore"], practiced: 0 },
//     { word: "Miss the boat", meaning: "সুযোগ হারানো", synonyms: ["lose chance"], antonyms: ["grab opportunity"], practiced: 0 },
//     { word: "On thin ice", meaning: "ঝুঁকিপূর্ণ অবস্থায়", synonyms: ["dangerous"], antonyms: ["safe"], practiced: 0 },
//     { word: "Out of the blue", meaning: "হঠাৎ করে", synonyms: ["suddenly"], antonyms: ["expected"], practiced: 0 },
//     { word: "Pull someone’s leg", meaning: "মজা করা", synonyms: ["joke"], antonyms: ["serious"], practiced: 0 },
//     { word: "Read between the lines", meaning: "গভীর অর্থ বোঝা", synonyms: ["hidden meaning"], antonyms: ["surface meaning"], practiced: 0 },
//     { word: "Rome wasn’t built in a day", meaning: "বড় কিছু হঠাৎ হয় না", synonyms: ["takes time"], antonyms: ["instant"], practiced: 0 },
//     { word: "Sit on the fence", meaning: "দ্বিধায় থাকা", synonyms: ["undecided"], antonyms: ["decisive"], practiced: 0 },
//     { word: "Smell a rat", meaning: "সন্দেহ হওয়া", synonyms: ["suspect"], antonyms: ["trust"], practiced: 0 },
//     { word: "Speak of the devil", meaning: "কাউকে নিয়ে বলা আর সে হাজির হওয়া", synonyms: ["talk of"], antonyms: ["ignore"], practiced: 0 },
//     { word: "Steal someone’s thunder", meaning: "কাউকে ম্লান করা", synonyms: ["take credit"], antonyms: ["support"], practiced: 0 },
//     { word: "Take it with a grain of salt", meaning: "পুরোপুরি বিশ্বাস না করা", synonyms: ["doubt"], antonyms: ["believe fully"], practiced: 0 },
//     { word: "The ball is in your court", meaning: "এখন সিদ্ধান্ত তোমার", synonyms: ["your choice"], antonyms: ["someone else’s choice"], practiced: 0 },
//     { word: "Throw in the towel", meaning: "হার মানা", synonyms: ["surrender"], antonyms: ["fight"], practiced: 0 },
//     { word: "Time flies", meaning: "সময় দ্রুত চলে যায়", synonyms: ["fast time"], antonyms: ["slow time"], practiced: 0 },
//     { word: "To cost an arm and a leg", meaning: "খুব ব্যয়বহুল", synonyms: ["expensive"], antonyms: ["cheap"], practiced: 0 },
//     { word: "Under one’s nose", meaning: "চোখের সামনেই", synonyms: ["obvious"], antonyms: ["hidden"], practiced: 0 },
//     { word: "When pigs fly", meaning: "অসম্ভব কিছু", synonyms: ["never"], antonyms: ["possible"], practiced: 0 },
//     { word: "You can’t judge a book by its cover", meaning: "বাহ্যিক দেখে বিচার করা যায় না", synonyms: ["don’t judge by looks"], antonyms: ["judge by appearance"], practiced: 0 },
//     { word: "A hot potato", meaning: "কঠিন বিষয়", synonyms: ["difficult issue"], antonyms: ["easy issue"], practiced: 0 },
//     { word: "Add insult to injury", meaning: "অপমানের উপর অপমান", synonyms: ["make worse"], antonyms: ["make better"], practiced: 0 },
//     { word: "At the drop of a hat", meaning: "তাৎক্ষণিক", synonyms: ["immediately"], antonyms: ["delayed"], practiced: 0 },
//     { word: "Back to the drawing board", meaning: "নতুন করে শুরু করা", synonyms: ["restart"], antonyms: ["continue"], practiced: 0 },
//     { word: "Ballpark figure", meaning: "আনুমানিক সংখ্যা", synonyms: ["estimate"], antonyms: ["exact number"], practiced: 0 },
//     { word: "Beat around the bush", meaning: "মূল কথা এড়িয়ে যাওয়া", synonyms: ["avoid point"], antonyms: ["be direct"], practiced: 0 },
//     { word: "Best of both worlds", meaning: "দুই দিকেই ভালো", synonyms: ["advantages"], antonyms: ["disadvantages"], practiced: 0 },
//     { word: "Burn bridges", meaning: "সম্পর্ক ছিন্ন করা", synonyms: ["cut ties"], antonyms: ["build ties"], practiced: 0 },
//     { word: "By the skin of your teeth", meaning: "অল্পের জন্য বেঁচে যাওয়া", synonyms: ["narrow escape"], antonyms: ["fail badly"], practiced: 0 },
//   ],
//   exercises: ["Definition", "Structure", "Exercise"],
//   exampleSentences: [
//     "Don’t annoy me - আমাকে রাগিও না",
//     "Why you make everyone disturb here - কেন তুমি সবাইকে বিরক্ত করছো",
//     "MS Dhoni is very poised when he is in the ground - ধোনি মাঠে সবসময় শান্ত থাকে",
//   ],
//   grammar: [
//     { title: "Basic Grammar — Sentences", desc: "Topic 1: Sentences — forms and usage." },
//     { title: "Tongue Twister", desc: "Practise daily for clarity and speed.", input: "Add a twister…" },
//   ],
//   interview: ["Tell me about yourself", "Your Current Responsibilities", "How many years you working there", "Why you want to leave your previous org?", "Expected salary", "What is your strength", "What is your weakness"],
//   travel: ["In Flight", "Visa Office", "Abroad Dept Shop", "Reservation", "Teacher & Student"],
//   culture: [{ label: "Cultural Festival", placeholder: "Pohela Boishakh" }, { label: "Local Food", placeholder: "Panta Bhaat & Pora Morich" }],
//   favourites: {
//     sports: { label: "Favourite Sports Person", placeholder: "Name & 2 lines" },
//     movies: { label: "Favourite Movies", placeholder: "List 3 movies + one line each" },
//     novels: { label: "Favourite Novels", placeholder: "List 3 novels + one line each" },
//     place: { label: "Favourite Place", placeholder: "Place name & details" },
//   },
//   honesty: [
//     { label: "Best Honest Move", placeholder: "Describe your honest move" },
//     { label: "Positive Move", placeholder: "Describe your positive action" },
//     { label: "Skill & Goal", placeholder: "Write two lines about your goal" },
//   ],
//   story: [
//     { label: "Blind Letter", placeholder: "Write a short blind letter" },
//     { label: "Story/Novel", placeholder: "Write 500-1000 words story or novel" },
//   ],
// };

// // ================= Shared Components =================
// const Container = ({ children }) => <div className="max-w-[1400px] mx-auto px-4">{children}</div>;
// const Section = ({ title, actions, children }) => (
//   <div className="card bg-base-100 shadow-xl mb-8">
//     <div className="card-body">
//       <div className="flex justify-between flex-wrap gap-3">
//         <h2 className="card-title text-xl md:text-2xl">{title}</h2>
//         {actions}
//       </div>
//       {children}
//     </div>
//   </div>
// );

// // ================= Main Component =================
// export default function FirstLayer() {
//   const [rows, setRows] = useState(data.words);
//   const [tab, setTab] = useState(data.travel[0]);
//   const [mcqs, setMcqs] = useState([]);

//   const addWord = () => setRows((r) => [...r, { word: "", meaning: "", synonyms: [], antonyms: [], practiced: 0 }]);
//   const update = (i, key, value) => { const updated = [...rows]; updated[i] = { ...updated[i], [key]: value }; setRows(updated); };
//   const incPractice = (i) => { const updated = [...rows]; updated[i].practiced = Math.min(15, updated[i].practiced + 1); setRows(updated); };
//   const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
//   const generateMCQ = () => {
//     if (rows.length < 4) { alert("Add at least 4 words to generate MCQs."); return; }
//     const q = [];
//     for (let i = 0; i < Math.min(30, rows.length); i++) {
//       const correct = rows[i % rows.length];
//       const distractors = shuffle(rows.filter((w) => w.word !== correct.word)).slice(0, 3);
//       const options = shuffle([correct.meaning, ...distractors.map((d) => d.meaning)]);
//       q.push({ id: i + 1, stem: `What is the meaning of "${correct.word}"?`, options, answer: correct.meaning });
//     }
//     setMcqs(q);
//   };

//   return (
//     <div className="py-10 space-y-8">
//       {/* Words */}
//       <Container>
//         <Section title="Idioms & Meanings" actions={<button className="btn btn-sm" onClick={addWord}>Add Row</button>}>
//           <div className="overflow-x-auto">
//             <table className="table">
//               <thead>
//                 <tr><th>#</th><th>Idiom</th><th>Meaning</th><th>Synonyms</th><th>Antonyms</th><th>Practice ×15</th></tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, i) => (
//                   <tr key={i}>
//                     <th>{i + 1}</th>
//                     <td><input className="input input-bordered input-sm w-40" value={row.word} onChange={(e) => update(i, "word", e.target.value)} /></td>
//                     <td><input className="input input-bordered input-sm w-48" value={row.meaning} onChange={(e) => update(i, "meaning", e.target.value)} /></td>
//                     <td><input className="input input-bordered input-sm w-48" value={row.synonyms.join(", ")} onChange={(e) => update(i, "synonyms", e.target.value.split(",").map(s => s.trim()))} /></td>
//                     <td><input className="input input-bordered input-sm w-48" value={row.antonyms.join(", ")} onChange={(e) => update(i, "antonyms", e.target.value.split(",").map(s => s.trim()))} /></td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <progress className="progress w-40" value={row.practiced} max={15}></progress>
//                         <button className="btn btn-xs" onClick={() => incPractice(i)}>+1</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Section>
//       </Container>

//       {/* MCQ */}
//       <Container>
//         <Section title="Auto-Generated MCQ" actions={<button className="btn btn-primary" onClick={generateMCQ}>Generate</button>}>
//           {mcqs.length === 0 ? <p>No MCQs generated yet.</p> :
//             mcqs.slice(0, 4).map(q => (
//               <div key={q.id} className="border p-4 rounded mb-2">
//                 <p className="font-medium">{q.stem}</p>
//                 {q.options.map((op, idx) => (
//                   <label key={idx} className="flex items-center gap-2">
//                     <input type="radio" name={`q-${q.id}`} className="radio radio-sm" />
//                     {op}
//                   </label>
//                 ))}
//               </div>
//             ))
//           }
//         </Section>
//       </Container>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import idiomsData from "../../../../idioms.json"; // ৫০টা ডেটা

const data = {
  words: [],
  exercises: ["Definition", "Structure", "Exercise"],
  exampleSentences: [
    "Don’t annoy me - আমাকে রাগিও না",
    "Why you make everyone disturb here - কেন তুমি সবাইকে বিরক্ত করছো",
    "MS Dhoni is very poised when he is in the ground - ধোনি মাঠে সবসময় শান্ত থাকে",
  ],
  grammar: [
    {
      title: "Basic Grammar — Sentences",
      desc: "Topic 1: Sentences — forms and usage.",
    },
    {
      title: "Tongue Twister",
      desc: "Practise daily for clarity and speed.",
      input: "Add a twister…",
    },
  ],
  interview: [
    "Tell me about yourself",
    "Your Current Responsibilities",
    "How many years you working there",
    "Why you want to leave your previous org?",
    "Expected salary",
    "What is your strength",
    "What is your weakness",
  ],
  travel: [
    "In Flight",
    "Visa Office",
    "Abroad Dept Shop",
    "Reservation",
    "Teacher & Student",
  ],
  culture: [
    { label: "Cultural Festival", placeholder: "Pohela Boishakh" },
    { label: "Local Food", placeholder: "Panta Bhaat & Pora Morich" },
  ],
  favourites: {
    sports: { label: "Favourite Sports Person", placeholder: "Name & 2 lines" },
    movies: {
      label: "Favourite Movies",
      placeholder: "List 3 movies + one line each",
    },
    novels: {
      label: "Favourite Novels",
      placeholder: "List 3 novels + one line each",
    },
    place: { label: "Favourite Place", placeholder: "Place name & details" },
  },
  honesty: [
    { label: "Best Honest Move", placeholder: "Describe your honest move" },
    { label: "Positive Move", placeholder: "Describe your positive action" },
    { label: "Skill & Goal", placeholder: "Write two lines about your goal" },
  ],
  story: [
    { label: "Blind Letter", placeholder: "Write a short blind letter" },
    {
      label: "Story/Novel",
      placeholder: "Write 500-1000 words story or novel",
    },
  ],
};

// ================= Main Component =================
export default function FirstLayer() {
  const [rows, setRows] = useState([]);

  // Load JSON dynamically into rows
  useEffect(() => {
    const converted = idiomsData.map((item) => ({
      word: item.idiom,
      meaning: item.banglaMeaning,
      synonyms: [],
      antonyms: [],
      practiced: 0,
      
    }));
    setRows(converted);
  }, []);

  const addWord = () =>
    setRows((r) => [
      ...r,
      { word: "", meaning: "", synonyms: [], antonyms: [], practiced: 0 },
    ]);
  const update = (i, key, value) => {
    const updated = [...rows];
    updated[i] = { ...updated[i], [key]: value };
    setRows(updated);
  };
  const incPractice = (i) => {
    const updated = [...rows];
    updated[i].practiced = Math.min(15, updated[i].practiced + 1);
    setRows(updated);
  };

  return (
    <div className="py-10 space-y-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Idioms & Meanings</h2>
        <button className="btn btn-sm mb-2" onClick={addWord}>
          Add Row
        </button>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Idiom</th>
                <th>Meaning</th>
                <th>Synonyms</th>
                <th>Antonyms</th>
                <th>Practice ×15</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <input
                      className="input input-bordered input-sm w-40"
                      value={row.word}
                      onChange={(e) => update(i, "word", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input input-bordered input-sm w-48"
                      value={row.meaning}
                      onChange={(e) => update(i, "meaning", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input input-bordered input-sm w-48"
                      value={row.synonyms.join(", ")}
                      onChange={(e) =>
                        update(
                          i,
                          "synonyms",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-bordered input-sm w-48"
                      value={row.antonyms.join(", ")}
                      onChange={(e) =>
                        update(
                          i,
                          "antonyms",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <progress
                        className="progress w-40"
                        value={row.practiced}
                        max={15}
                      ></progress>
                      <button
                        className="btn btn-xs"
                        onClick={() => incPractice(i)}
                      >
                        +1
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
