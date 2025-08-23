// import { useState } from "react";

// // First Layer: Landing / Home skeleton mapped from client PDF
// // Tech: React + Tailwind CSS + DaisyUI classes
// // Notes: Pure front-end scaffold. Wire up real data and routes later.

// const sections = [
//   {
//     id: "words",
//     title: "Words & Meanings",
//     blurb:
//       "Curated word lists with meanings, synonyms, antonyms, and daily practice.",
//     cta: "Explore Words",
//   },
//   {
//     id: "exercises",
//     title: "Exercises & Examples",
//     blurb:
//       "Structured practice: Definition → Structure → Exercise with example sentences.",
//     cta: "Start Practice",
//   },
//   {
//     id: "grammar",
//     title: "Basic Grammar",
//     blurb: "Topics: Sentences, parts, and usage. Minimal theory, more practice.",
//     cta: "View Topics",
//   },
//   {
//     id: "tongue",
//     title: "Tongue Twisters",
//     blurb: "Fun drills to sharpen pronunciation and fluency.",
//     cta: "Try Now",
//   },
//   {
//     id: "interview",
//     title: "Job Interview Kit",
//     blurb:
//       "Top questions: strengths, weaknesses, salary, responsibilities, and more.",
//     cta: "Open Kit",
//   },
//   {
//     id: "travel",
//     title: "In-Context English",
//     blurb:
//       "Abroad dept shop, visa office, in-flight, reservation, teacher-student.",
//     cta: "See Dialogues",
//   },
//   {
//     id: "culture",
//     title: "Culture & Food",
//     blurb: "Local foods (Panta Bhaat, Pora Morich), Pohela Boishakh, and customs.",
//     cta: "Explore",
//   },
//   {
//     id: "sportsMovies",
//     title: "Sports & Movies",
//     blurb: "Favourite sports, players, and movie picks with one-line reviews.",
//     cta: "Browse",
//   },
//   {
//     id: "places",
//     title: "Places You Loved",
//     blurb: "Write two lines about places you visited (e.g., Cox’s Bazar).",
//     cta: "Write Now",
//   },
//   {
//     id: "values",
//     title: "Honesty & Positive Moves",
//     blurb:
//       "Be honest, avoid greed; reflect on family, income sources, and choices.",
//     cta: "Reflect",
//   },
//   {
//     id: "skillsGoals",
//     title: "Skills & Goal Setting",
//     blurb: "Choose a skill and write your goal—two focused lines.",
//     cta: "Set Goal",
//   },
//   {
//     id: "novels",
//     title: "Novels You Admire",
//     blurb:
//       "Pick favourites (e.g., Seshher Kobita) and write one-line summaries.",
//     cta: "Add Novels",
//   },
//   {
//     id: "mcq",
//     title: "Auto-Generated MCQ (30)",
//     blurb: "AI-generated quizzes from your words, sentences, and notes.",
//     cta: "Generate",
//   },
//   {
//     id: "contributor",
//     title: "Contributor Panel",
//     blurb: "Gift to site, idea submissions, demo formats, and open letters.",
//     cta: "Contribute",
//   },
//   {
//     id: "openLetter",
//     title: "Open Letter — ‘To Thaami…’",
//     blurb: "Write a short, blind letter—share vibes of the 1990s.",
//     cta: "Write Letter",
//   },
//   {
//     id: "story",
//     title: "Short Story / Novel (500–1000w)",
//     blurb: "Craft an original piece or read our given novel (An Imperfect Guy).",
//     cta: "Start Writing",
//   },
//   {
//     id: "summary",
//     title: "Summary & Download",
//     blurb: "Auto-build PDF summary of your words, sentences, and ideas.",
//     cta: "Get PDF",
//   },
// ];

// function SectionCard({ s, onNavigate }) {
//   return (
//     <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
//       <div className="card-body">
//         <h3 className="card-title text-lg md:text-xl">{s.title}</h3>
//         <p className="text-sm opacity-80">{s.blurb}</p>
//         <div className="card-actions justify-end mt-2">
//           <button className="btn btn-primary btn-sm" onClick={() => onNavigate(s.id)}>
//             {s.cta}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function QuickLink({ label, id, onNavigate }) {
//   return (
//     <button
//       className="badge badge-lg hover:badge-primary cursor-pointer"
//       onClick={() => onNavigate(id)}
//     >
//       {label}
//     </button>
//   );
// }

// export default function FirstLayerQuizLanding() {
//   const [query, setQuery] = useState("");

//   const filtered = sections.filter(
//     (s) => s.title.toLowerCase().includes(query.toLowerCase())
//   );

//   const onNavigate = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Navbar */}
//       <div className="navbar bg-base-100/70 backdrop-blur sticky top-0 z-30 shadow-sm">
//         <div className="navbar-start">
//           <a className="btn btn-ghost text-xl md:text-2xl tracking-tight">
//             <span className="font-bold">Quiz</span>
//             <span className="opacity-70">Craft</span>
//           </a>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <li><a onClick={() => onNavigate("words")}>Words</a></li>
//             <li><a onClick={() => onNavigate("exercises")}>Exercises</a></li>
//             <li><a onClick={() => onNavigate("mcq")}>MCQ</a></li>
//             <li><a onClick={() => onNavigate("summary")}>Summary</a></li>
//           </ul>
//         </div>
//         <div className="navbar-end gap-2">
//           <div className="form-control">
//             <input
//               type="text"
//               placeholder="Search sections…"
//               className="input input-bordered w-36 md:w-64"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>
//           <button className="btn btn-outline">Login</button>
//         </div>
//       </div>

//       {/* Hero */}
//       <section className="relative">
//         <div className="hero min-h-[56vh] bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
//           <div className="hero-content flex-col lg:flex-row-reverse">
//             <div className="mockup-window border bg-base-300 w-full max-w-xl">
//               <div className="p-6 space-y-3">
//                 <div className="skeleton h-6 w-2/3" />
//                 <div className="skeleton h-3 w-full" />
//                 <div className="skeleton h-3 w-5/6" />
//                 <div className="skeleton h-3 w-1/2" />
//               </div>
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//                 Words Book — English Lesson
//               </h1>
//               <p className="py-6 max-w-xl opacity-80">
//                 A crisp practice-first platform for vocabulary, grammar, interview prep,
//                 real-life conversations, and AI-generated quizzes.
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 <button className="btn btn-primary" onClick={() => onNavigate("mcq")}>Generate MCQ</button>
//                 <button className="btn btn-outline" onClick={() => onNavigate("exercises")}>Start Exercises</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links Bar */}
//         <div className="w-full max-w-[1400px] mx-auto -mt-8 px-4">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body flex flex-wrap gap-2">
//               {[
//                 ["Words", "words"],
//                 ["Exercises", "exercises"],
//                 ["Grammar", "grammar"],
//                 ["Twisters", "tongue"],
//                 ["Interview", "interview"],
//                 ["Travel", "travel"],
//                 ["Culture", "culture"],
//                 ["Sports & Movies", "sportsMovies"],
//                 ["Places", "places"],
//                 ["Values", "values"],
//                 ["Skills & Goals", "skillsGoals"],
//                 ["Novels", "novels"],
//                 ["MCQ", "mcq"],
//                 ["Contribute", "contributor"],
//                 ["Open Letter", "openLetter"],
//                 ["Story", "story"],
//                 ["Summary", "summary"],
//               ].map(([label, id]) => (
//                 <QuickLink key={id} label={label} id={id} onNavigate={onNavigate} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section Grid (Filtered) */}
//       <section className="max-w-[1400px] mx-auto px-4 py-10">
//         <h2 className="text-2xl md:text-3xl font-semibold mb-6">Explore Modules</h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((s) => (
//             <SectionCard key={s.id} s={s} onNavigate={onNavigate} />
//           ))}
//         </div>
//       </section>

//       {/* Deep Sections (anchors) */}
//       <main className="max-w-[1400px] mx-auto px-4 pb-24 space-y-12">
//         {/* Words & Meanings */}
//         <section id="words" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <div className="flex items-center justify-between">
//                 <h3 className="card-title">Words & Meanings</h3>
//                 <button className="btn btn-sm">Import CSV</button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Word</th>
//                       <th>Meaning</th>
//                       <th>Synonyms</th>
//                       <th>Antonyms</th>
//                       <th>Practice ×15</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[
//                       { w: "Annoy", m: "Rag kora", s: "Disturb", a: "Poised" },
//                       { w: "Flatter", m: "Over-praise", s: "Praise", a: "Rebuke" },
//                       { w: "Reckless", m: "Udbheed", s: "Careless", a: "Careful" },
//                     ].map((row, i) => (
//                       <tr key={i}>
//                         <th>{i + 1}</th>
//                         <td>{row.w}</td>
//                         <td>{row.m}</td>
//                         <td>{row.s}</td>
//                         <td>{row.a}</td>
//                         <td>
//                           <progress className="progress w-40" value={0} max={15}></progress>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="divider">Examples</div>
//               <ul className="list-disc pl-6 text-sm">
//                 <li>Don’t annoy me — আমায় রাগিও না</li>
//                 <li>Why do you disturb everyone here? — কেনো তুমি সবাইকে বিরক্ত করছ?</li>
//                 <li>MS Dhoni is very poised on the ground — ধোনি মাঠে শান্ত থাকে</li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* Exercises & Structure */}
//         <section id="exercises" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Definition → Structure → Exercise</h3>
//               <div className="grid md:grid-cols-3 gap-4">
//                 {["Definition", "Structure", "Exercise"].map((t) => (
//                   <div key={t} className="collapse collapse-arrow bg-base-200">
//                     <input type="checkbox" />
//                     <div className="collapse-title text-lg font-medium">{t}</div>
//                     <div className="collapse-content">
//                       <p className="text-sm opacity-80">Add content for {t}.</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="form-control mt-4">
//                 <label className="label">
//                   <span className="label-text">Write two example sentences</span>
//                 </label>
//                 <textarea className="textarea textarea-bordered" placeholder="Type here" />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Grammar & Tongue Twister */}
//         <section id="grammar" className="scroll-mt-24">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Basic Grammar — Sentences</h3>
//                 <p className="opacity-80 text-sm">Topic 1: Sentences — forms and usage.</p>
//                 <button className="btn btn-primary btn-sm mt-2">Start</button>
//               </div>
//             </div>
//             <div id="tongue" className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Tongue Twister</h3>
//                 <p className="opacity-80 text-sm">Practise daily for clarity and speed.</p>
//                 <div className="join">
//                   <input className="input input-bordered join-item" placeholder="Add a twister…" />
//                   <button className="btn btn-secondary join-item">Add</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Interview Kit */}
//         <section id="interview" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Job Interview — 5 Common Questions</h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {[
//                   "Tell me about yourself",
//                   "Current responsibilities",
//                   "Years of experience",
//                   "Why leave previous org?",
//                   "Expected salary",
//                 ].map((q) => (
//                   <div key={q} className="form-control">
//                     <label className="label"><span className="label-text">{q}</span></label>
//                     <input className="input input-bordered" placeholder="Your answer" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Travel Dialogues */}
//         <section id="travel" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">In-Context Conversations</h3>
//               <div className="tabs tabs-boxed w-fit">
//                 {[
//                   "In Flight",
//                   "Visa Office",
//                   "Abroad Dept Shop",
//                   "Reservation",
//                   "Teacher & Student",
//                 ].map((t) => (
//                   <a key={t} className="tab tab-active">{t}</a>
//                 ))}
//               </div>
//               <div className="mt-4 prose">
//                 <p><b>Task:</b> Write a 5-line dialogue for the selected context.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Culture & Food */}
//         <section id="culture" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Culture & Festive</h3>
//               <p className="opacity-80">Pohela Boishakh and more.</p>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="form-control">
//                   <label className="label"><span className="label-text">Mention one cultural festival</span></label>
//                   <input className="input input-bordered" placeholder="e.g., Pohela Boishakh" />
//                 </div>
//                 <div className="form-control">
//                   <label className="label"><span className="label-text">Local Food + 2 lines</span></label>
//                   <textarea className="textarea textarea-bordered" placeholder="Panta Bhaat & Pora Morich…" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Sports & Movies */}
//         <section id="sportsMovies" className="scroll-mt-24">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Sports & Favourite Player</h3>
//                 <div className="grid gap-3 md:grid-cols-2">
//                   <input className="input input-bordered" placeholder="Favourite sport" />
//                   <input className="input input-bordered" placeholder="Favourite player" />
//                 </div>
//               </div>
//             </div>
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Your Top 3 Movies</h3>
//                 <div className="space-y-2">
//                   {[1, 2, 3].map((i) => (
//                     <input key={i} className="input input-bordered w-full" placeholder={`Movie ${i} + one line`} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Places */}
//         <section id="places" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">One Beautiful Place</h3>
//               <div className="grid md:grid-cols-3 gap-3">
//                 <input className="input input-bordered" placeholder="Place name (e.g., Cox’s Bazar)" />
//                 <input className="input input-bordered" placeholder="Location details" />
//                 <input className="input input-bordered" placeholder="Two lines why you liked it" />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Values & Goals */}
//         <section id="values" className="scroll-mt-24">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Honesty & Positive Move</h3>
//                 <textarea className="textarea textarea-bordered" placeholder="Your best honest move + positive outcome" />
//                 <p className="text-xs opacity-60">Ask your father about income sources and budgeting; avoid dishonest pleasures.</p>
//               </div>
//             </div>
//             <div id="skillsGoals" className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Skill & Goal Set</h3>
//                 <div className="grid md:grid-cols-2 gap-2">
//                   <input className="input input-bordered" placeholder="Skill" />
//                   <input className="input input-bordered" placeholder="Goal (2 lines)" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Novels */}
//         <section id="novels" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Novels You Like</h3>
//               <div className="space-y-2">
//                 {[1, 2, 3].map((i) => (
//                   <input key={i} className="input input-bordered w-full" placeholder={`Novel ${i} + one line`} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Auto MCQ */}
//         <section id="mcq" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <div className="flex items-center justify-between">
//                 <h3 className="card-title">Auto-Generated MCQ — 30 Questions</h3>
//                 <button className="btn btn-primary">Generate from Notes</button>
//               </div>
//               <div className="alert">
//                 <span>Connect your notes to generate questions (future backend).</span>
//               </div>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {[...Array(4)].map((_, i) => (
//                   <div key={i} className="mockup-browser border bg-base-300">
//                     <div className="mockup-browser-toolbar">
//                       <div className="input">Question preview #{i + 1}</div>
//                     </div>
//                     <div className="px-4 py-6 space-y-2">
//                       <div className="skeleton h-4 w-5/6"></div>
//                       <div className="skeleton h-3 w-2/3"></div>
//                       <div className="skeleton h-3 w-1/2"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Contributor & Open Letter */}
//         <section id="contributor" className="scroll-mt-24">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Contributor Panel</h3>
//                 <div className="form-control">
//                   <label className="label"><span className="label-text">Submit an idea</span></label>
//                   <textarea className="textarea textarea-bordered" placeholder="Your idea here" />
//                 </div>
//                 <button className="btn btn-outline mt-2">Send Gift / Tip</button>
//               </div>
//             </div>
//             <div id="openLetter" className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h3 className="card-title">Open Letter — “To Thaami…”</h3>
//                 <textarea className="textarea textarea-bordered h-32" placeholder="Write your short blind letter" />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Story */}
//         <section id="story" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Story / Novel (500–1000 words)</h3>
//               <textarea className="textarea textarea-bordered h-48" placeholder="Write your story here…" />
//               <div className="flex gap-2">
//                 <button className="btn btn-primary">Save Draft</button>
//                 <button className="btn btn-outline">Read “An Imperfect Guy”</button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Summary & PDF */}
//         <section id="summary" className="scroll-mt-24">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h3 className="card-title">Summary & PDF Download</h3>
//               <p className="opacity-80 text-sm">Build a one-click summary PDF of words, sentences, and ideas.</p>
//               <div className="flex flex-wrap gap-2">
//                 <button className="btn btn-secondary">Preview Summary</button>
//                 <button className="btn btn-primary">Download PDF</button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="footer footer-center p-10 bg-base-300 text-base-content">
//         <aside>
//           <p className="font-bold">QuizCraft</p>
//           <p>© {new Date().getFullYear()} — First-layer UI scaffold. React · Tailwind · DaisyUI</p>
//         </aside>
//         <nav>
//           <div className="grid grid-flow-col gap-4">
//             <a onClick={() => onNavigate("words")} className="link link-hover">Words</a>
//             <a onClick={() => onNavigate("mcq")} className="link link-hover">MCQ</a>
//             <a onClick={() => onNavigate("summary")} className="link link-hover">Summary</a>
//           </div>
//         </nav>
//       </footer>
//     </div>
//   );
// }

// import { useState } from "react";

// // ---------------------
// // Shared Components
// // ---------------------
// const Container = ({ children, className = "" }) => (
//   <div className={`max-w-[1400px] mx-auto px-4 ${className}`}>{children}</div>
// );

// const Section = ({ title, actions, children }) => (
//   <div className="card bg-base-100 shadow-xl mb-8">
//     <div className="card-body">
//       <div className="flex items-center justify-between gap-3 flex-wrap">
//         <h2 className="card-title text-xl md:text-2xl">{title}</h2>
//         {actions}
//       </div>
//       {children}
//     </div>
//   </div>
// );

// const Pill = ({ children }) => (
//   <span className="badge badge-lg leading-none whitespace-nowrap">{children}</span>
// );

// // ---------------------
// // Mock Data
// // ---------------------
// const seedWords = [
//   { word: "Annoy", meaning: "Rag kora", synonyms: ["Disturb"], antonyms: ["Poised"], practiced: 0 },
//   { word: "Flatter", meaning: "Over-praise", synonyms: ["Praise"], antonyms: ["Rebuke"], practiced: 0 },
//   { word: "Reckless", meaning: "Udbheed / Careless", synonyms: ["Careless"], antonyms: ["Careful"], practiced: 0 },
// ];

// const travelTabs = ["In Flight", "Visa Office", "Abroad Dept Shop", "Reservation", "Teacher & Student"];

// // ---------------------
// // Main Component
// // ---------------------
// export default function FirstLayer() {
//   const [rows, setRows] = useState(seedWords);
//   const [tab, setTab] = useState(travelTabs[0]);
//   const [mcqs, setMcqs] = useState([]);

//   // Functions for Words
//   const addWord = () => setRows((r) => [...r, { word: "", meaning: "", synonyms: [], antonyms: [], practiced: 0 }]);
//   const update = (i, key, value) => setRows((r) => {
//     const c = [...r];
//     c[i] = { ...c[i], [key]: value };
//     return c;
//   });
//   const incPractice = (i) => setRows((r) => {
//     const c = [...r];
//     c[i] = { ...c[i], practiced: Math.min(15, c[i].practiced + 1) };
//     return c;
//   });

//   // MCQ Generator
//   const shuffle = (arr) => {
//     const a = [...arr];
//     for (let i = a.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
//   };
//   const generateMCQ = () => {
//     const q = [];
//     const words = [...rows];
//     if (words.length < 4) {
//       alert("Add at least 4 words to generate MCQs.");
//       return;
//     }
//     for (let i = 0; i < Math.min(30, words.length); i++) {
//       const correct = words[i % words.length];
//       const distractors = shuffle(words.filter(w => w.word !== correct.word)).slice(0, 3);
//       const options = shuffle([correct.meaning, ...distractors.map(d => d.meaning)]);
//       q.push({
//         id: i + 1,
//         stem: `What is the meaning of "${correct.word}"?`,
//         options,
//         answer: correct.meaning,
//       });
//     }
//     setMcqs(q);
//   };

//   return (
//     <div className="py-10 space-y-8">
//       {/* Words */}
//       <Container>
//         <Section title="Words & Meanings" actions={<button className="btn btn-sm" onClick={addWord}>Add Row</button>}>
//           <div className="overflow-x-auto">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Word</th>
//                   <th>Meaning</th>
//                   <th>Synonyms</th>
//                   <th>Antonyms</th>
//                   <th>Practice ×15</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, i) => (
//                   <tr key={i}>
//                     <th>{i + 1}</th>
//                     <td><input className="input input-bordered input-sm w-40" value={row.word} onChange={(e) => update(i, 'word', e.target.value)} /></td>
//                     <td><input className="input input-bordered input-sm w-48" value={row.meaning} onChange={(e) => update(i, 'meaning', e.target.value)} /></td>
//                     <td><input className="input input-bordered input-sm w-48" value={row.synonyms.join(", ")} onChange={(e) => update(i, 'synonyms', e.target.value.split(',').map(s => s.trim()))} /></td>
//                     <td><input className="input input-bordered input-sm w-48" value={row.antonyms.join(", ")} onChange={(e) => update(i, 'antonyms', e.target.value.split(',').map(s => s.trim()))} /></td>
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

//       {/* Exercises */}
//       <Container>
//         <Section title="Definition → Structure → Exercise">
//           <div className="grid md:grid-cols-3 gap-4">
//             {["Definition", "Structure", "Exercise"].map((t) => (
//               <div key={t} className="collapse collapse-arrow bg-base-200">
//                 <input type="checkbox" />
//                 <div className="collapse-title text-lg font-medium">{t}</div>
//                 <div className="collapse-content">
//                   <p className="text-sm opacity-80">Add content for {t}.</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Section>
//       </Container>

//       {/* Grammar / Twister */}
//       <Container>
//         <div className="grid md:grid-cols-2 gap-6">
//           <Section title="Basic Grammar — Sentences">
//             <p className="opacity-80 text-sm">Topic 1: Sentences — forms and usage.</p>
//           </Section>
//           <Section title="Tongue Twister">
//             <p className="opacity-80 text-sm">Practise daily for clarity and speed.</p>
//             <input className="input input-bordered mt-2" placeholder="Add a twister…" />
//           </Section>
//         </div>
//       </Container>

//       {/* Interview */}
//       <Container>
//         <Section title="Job Interview — Common Questions">
//           {["Tell me about yourself", "Current responsibilities", "Years of experience", "Why leave previous org?", "Expected salary"].map(q => (
//             <input key={q} className="input input-bordered mb-2" placeholder={q} />
//           ))}
//         </Section>
//       </Container>

//       {/* Travel */}
//       <Container>
//         <Section title="In-Context Conversations">
//           <div className="tabs tabs-boxed w-fit mb-4">
//             {travelTabs.map((t) => (
//               <button key={t} className={`tab ${tab === t ? "tab-active" : ""}`} onClick={() => setTab(t)}>{t}</button>
//             ))}
//           </div>
//           <textarea className="textarea textarea-bordered w-full" placeholder={`Dialogue for ${tab}…`} />
//         </Section>
//       </Container>

//       {/* Culture */}
//       <Container>
//         <Section title="Culture & Food">
//           <input className="input input-bordered mb-2" placeholder="Cultural Festival" />
//           <textarea className="textarea textarea-bordered" placeholder="Local Food + 2 lines" />
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
import { useState } from "react";

// ================= PDF থেকে ডেটা =================
const data = {
  words: [
    { word: "Annoy", meaning: "Rag Kora", synonyms: ["Disturb"], antonyms: ["Poised"], practiced: 0 },
    { word: "Flatter", meaning: "Over-praise", synonyms: ["Praise"], antonyms: ["Rebuke"], practiced: 0 },
    { word: "Reckless", meaning: "Careless", synonyms: ["Careless"], antonyms: ["Careful"], practiced: 0 },
  ],
  exercises: ["Definition", "Structure", "Exercise"],
  exampleSentences: [
    "Don't annoy me - Amk raghio na",
    "Why you make everyone disturb here - Keno tmi ekhane shby ke biroktho korcho",
    "MS Dhoni is very poised when he is in the ground - Dhoini Maate kv shanto thake",
  ],
  grammar: [
    { title: "Basic Grammar — Sentences", desc: "Topic 1: Sentences — forms and usage." },
    { title: "Tongue Twister", desc: "Practise daily for clarity and speed.", input: "Add a twister…" },
  ],
  interview: [
    "Tell me about yourself",
    "Your Current Responsibilities",
    "How many years you working there",
    "Why you want to leave your previous org?",
    "Expected salary",
    "What is your strength",
    "What is your weakness"
  ],
  travel: ["In Flight", "Visa Office", "Abroad Dept Shop", "Reservation", "Teacher & Student"],
  culture: [
    { label: "Cultural Festival", placeholder: "Pohela Boishakh" },
    { label: "Local Food", placeholder: "Panta Bhaat & Pora Morich" }
  ],
  favourites: {
    sports: { label: "Favourite Sports Person", placeholder: "Name & 2 lines" },
    movies: { label: "Favourite Movies", placeholder: "List 3 movies + one line each" },
    novels: { label: "Favourite Novels", placeholder: "List 3 novels + one line each" },
    place: { label: "Favourite Place", placeholder: "Place name & details" }
  },
  honesty: [
    { label: "Best Honest Move", placeholder: "Describe your honest move" },
    { label: "Positive Move", placeholder: "Describe your positive action" },
    { label: "Skill & Goal", placeholder: "Write two lines about your goal" }
  ],
  story: [
    { label: "Blind Letter", placeholder: "Write a short blind letter" },
    { label: "Story/Novel", placeholder: "Write 500-1000 words story or novel" }
  ]
};

// ================= Shared Components =================
const Container = ({ children }) => <div className="max-w-[1400px] mx-auto px-4">{children}</div>;

const Section = ({ title, actions, children }) => (
  <div className="card bg-base-100 shadow-xl mb-8">
    <div className="card-body">
      <div className="flex justify-between flex-wrap gap-3">
        <h2 className="card-title text-xl md:text-2xl">{title}</h2>
        {actions}
      </div>
      {children}
    </div>
  </div>
);

// ================= Main Component =================
export default function FirstLayer() {
  const [rows, setRows] = useState(data.words);
  const [tab, setTab] = useState(data.travel[0]);
  const [mcqs, setMcqs] = useState([]);

  const addWord = () => setRows((r) => [...r, { word: "", meaning: "", synonyms: [], antonyms: [], practiced: 0 }]);

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

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const generateMCQ = () => {
    if (rows.length < 4) {
      alert("Add at least 4 words to generate MCQs.");
      return;
    }
    const q = [];
    for (let i = 0; i < Math.min(30, rows.length); i++) {
      const correct = rows[i % rows.length];
      const distractors = shuffle(rows.filter((w) => w.word !== correct.word)).slice(0, 3);
      const options = shuffle([correct.meaning, ...distractors.map((d) => d.meaning)]);
      q.push({ id: i + 1, stem: `What is the meaning of "${correct.word}"?`, options, answer: correct.meaning });
    }
    setMcqs(q);
  };

  return (
    <div className="py-10 space-y-8">
      {/* Words */}
      <Container>
        <Section title="Words & Meanings" actions={<button className="btn btn-sm" onClick={addWord}>Add Row</button>}>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th><th>Word</th><th>Meaning</th><th>Synonyms</th><th>Antonyms</th><th>Practice ×15</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td><input className="input input-bordered input-sm w-40" value={row.word} onChange={(e) => update(i, "word", e.target.value)} /></td>
                    <td><input className="input input-bordered input-sm w-48" value={row.meaning} onChange={(e) => update(i, "meaning", e.target.value)} /></td>
                    <td><input className="input input-bordered input-sm w-48" value={row.synonyms.join(", ")} onChange={(e) => update(i, "synonyms", e.target.value.split(",").map(s => s.trim()))} /></td>
                    <td><input className="input input-bordered input-sm w-48" value={row.antonyms.join(", ")} onChange={(e) => update(i, "antonyms", e.target.value.split(",").map(s => s.trim()))} /></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress className="progress w-40" value={row.practiced} max={15}></progress>
                        <button className="btn btn-xs" onClick={() => incPractice(i)}>+1</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </Container>

      {/* Exercises */}
      <Container>
        <Section title="Definition → Structure → Exercise">
          <div className="grid md:grid-cols-3 gap-4">
            {data.exercises.map((t) => (
              <div key={t} className="collapse collapse-arrow bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-medium">{t}</div>
                <div className="collapse-content">
                  <p className="text-sm opacity-80">Add content for {t}.</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Container>

      {/* Example Sentences */}
      <Container>
        <Section title="Example of Sentences">
          {data.exampleSentences.map((s, idx) => (
            <p key={idx} className="mb-1">{s}</p>
          ))}
        </Section>
      </Container>

      {/* Grammar */}
      <Container>
        <div className="grid md:grid-cols-2 gap-6">
          {data.grammar.map((g, idx) => (
            <Section key={idx} title={g.title}>
              <p className="opacity-80 text-sm">{g.desc}</p>
              {g.input && <input className="input input-bordered mt-2" placeholder={g.input} />}
            </Section>
          ))}
        </div>
      </Container>

      {/* Interview */}
      <Container>
        <Section title="Job Interview — Common Questions">
          {data.interview.map((q) => (
            <input key={q} className="input input-bordered mb-2 w-full" placeholder={q} />
          ))}
        </Section>
      </Container>

      {/* Travel */}
      <Container>
        <Section title="In-Context Conversations">
          <div className="tabs tabs-boxed w-fit mb-4">
            {data.travel.map((t) => (
              <button key={t} className={`tab ${tab === t ? "tab-active" : ""}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <textarea className="textarea textarea-bordered w-full" placeholder={`Dialogue for ${tab}…`} />
        </Section>
      </Container>

      {/* Culture */}
      <Container>
        <Section title="Culture & Food">
          {data.culture.map((c, idx) => (
            <input key={idx} className="input input-bordered mb-2 w-full" placeholder={c.placeholder} />
          ))}
        </Section>
      </Container>

      {/* Favourites */}
      <Container>
        <Section title="Favourites — Sports, Movies, Novels, Place">
          {Object.values(data.favourites).map((f, idx) => (
            <input key={idx} className="input input-bordered mb-2 w-full" placeholder={f.placeholder} />
          ))}
        </Section>
      </Container>

      {/* Honesty & Skills */}
      <Container>
        <Section title="Honesty, Positivity & Skills">
          {data.honesty.map((h, idx) => (
            <input key={idx} className="input input-bordered mb-2 w-full" placeholder={h.placeholder} />
          ))}
        </Section>
      </Container>

      {/* Story Section */}
      <Container>
        <Section title="Story & Novel Writing">
          {data.story.map((s, idx) => (
            <textarea key={idx} className="textarea textarea-bordered mb-2 w-full" placeholder={s.placeholder} />
          ))}
        </Section>
      </Container>

      {/* MCQ */}
      <Container>
        <Section title="Auto-Generated MCQ" actions={<button className="btn btn-primary" onClick={generateMCQ}>Generate</button>}>
          {mcqs.length === 0 ? <p>No MCQs generated yet.</p> :
            mcqs.slice(0, 4).map(q => (
              <div key={q.id} className="border p-4 rounded mb-2">
                <p className="font-medium">{q.stem}</p>
                {q.options.map((op, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input type="radio" name={`q-${q.id}`} className="radio radio-sm" />
                    {op}
                  </label>
                ))}
              </div>
            ))
          }
        </Section>
      </Container>
    </div>
  );
}
