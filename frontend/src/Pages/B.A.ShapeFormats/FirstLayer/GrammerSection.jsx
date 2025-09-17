"use client";

import { useState } from "react";

const SentenceExercise = () => {
  const [grammarRows, setGrammarRows] = useState([
    {
      mainWord: "Assertive Sentence",
      banglaPronunciation: "বর্ণনামূলক বাক্য",
      banglaMeaning: "Makes a statement or expresses an opinion",
      synonyms: ["Declarative", "Statement"],
      antonyms: ["Interrogative", "Exclamatory"],
      exampleEnglish: "She is a good student.",
      exampleBangla: "সে একজন ভালো ছাত্রী।",
    },
    {
      mainWord: "Interrogative Sentence",
      banglaPronunciation: "প্রশ্নবোধক বাক্য",
      banglaMeaning: "Asks a question",
      synonyms: ["Question", "Inquiry"],
      antonyms: ["Statement"],
      exampleEnglish: "Are you coming today?",
      exampleBangla: "তুমি কি আজ আসছো?",
    },
    {
      mainWord: "Imperative Sentence",
      banglaPronunciation: "আদেশমূলক বাক্য",
      banglaMeaning: "Gives a command, request, or instruction",
      synonyms: ["Order", "Command", "Request"],
      antonyms: ["Question", "Statement"],
      exampleEnglish: "Please open the door.",
      exampleBangla: "দয়া করে দরজা খোলো।",
    },
    {
      mainWord: "Exclamatory Sentence",
      banglaPronunciation: "আবেগসূচক বাক্য",
      banglaMeaning: "Expresses strong feeling or emotion",
      synonyms: ["Emotional", "Expression"],
      antonyms: ["Neutral Statement"],
      exampleEnglish: "What a beautiful place!",
      exampleBangla: "কী সুন্দর জায়গা!",
    },
    {
      mainWord: "Simple Sentence",
      banglaPronunciation: "সরল বাক্য",
      banglaMeaning: "Contains a single independent clause",
      synonyms: ["Single clause", "Independent"],
      antonyms: ["Complex", "Compound"],
      exampleEnglish: "I like mangoes.",
      exampleBangla: "আমি আম পছন্দ করি।",
    },
    {
      mainWord: "Compound Sentence",
      banglaPronunciation: "যৌগিক বাক্য",
      banglaMeaning: "Contains two or more independent clauses joined by a conjunction",
      synonyms: ["Combined", "Multiple clauses"],
      antonyms: ["Simple Sentence"],
      exampleEnglish: "I was tired, but I finished my work.",
      exampleBangla: "আমি ক্লান্ত ছিলাম, কিন্তু আমি কাজ শেষ করলাম।",
    },
    {
      mainWord: "Complex Sentence",
      banglaPronunciation: "জটিল বাক্য",
      banglaMeaning: "Contains an independent clause and one or more dependent clauses",
      synonyms: ["Dependent + Independent", "Subordinate"],
      antonyms: ["Simple", "Compound"],
      exampleEnglish: "I stayed home because it was raining.",
      exampleBangla: "বৃষ্টি হচ্ছিল বলে আমি বাসায় ছিলাম।",
    },
    {
      mainWord: "Affirmative Sentence",
      banglaPronunciation: "হ্যাঁসূচক বাক্য",
      banglaMeaning: "Expresses a positive statement",
      synonyms: ["Positive", "Confirming"],
      antonyms: ["Negative"],
      exampleEnglish: "He can solve the problem.",
      exampleBangla: "সে সমস্যার সমাধান করতে পারে।",
    },
    {
      mainWord: "Negative Sentence",
      banglaPronunciation: "না-সূচক বাক্য",
      banglaMeaning: "Expresses negation or denial",
      synonyms: ["Denial", "Refusal"],
      antonyms: ["Affirmative"],
      exampleEnglish: "I do not like coffee.",
      exampleBangla: "আমি কফি পছন্দ করি না।",
    },
    {
      mainWord: "Optative Sentence",
      banglaPronunciation: "ইচ্ছা/প্রার্থনামূলক বাক্য",
      banglaMeaning: "Expresses a wish or prayer",
      synonyms: ["Wish", "Prayer"],
      antonyms: ["Statement"],
      exampleEnglish: "May you live long!",
      exampleBangla: "তুমি দীর্ঘজীবী হও!",
    },
  ]);

  const updateGrammar = (index, field, value) => {
    const updatedRows = [...grammarRows];
    updatedRows[index][field] = value;
    setGrammarRows(updatedRows);
  };

  const submitGrammar = () => {
    console.log("Submitted Data:", grammarRows);
    alert("Grammar data submitted! Check console.");
  };

  return (
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
                  />
                </td>
                <td>
                  <input
                    className="input input-sm input-bordered w-44"
                    value={row.banglaMeaning}
                    onChange={(e) =>
                      updateGrammar(i, "banglaMeaning", e.target.value)
                    }
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
                  />
                </td>
                <td>
                  <input
                    className="input input-sm input-bordered w-60"
                    value={row.exampleEnglish}
                    onChange={(e) =>
                      updateGrammar(i, "exampleEnglish", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    className="input input-sm input-bordered w-60"
                    value={row.exampleBangla}
                    onChange={(e) =>
                      updateGrammar(i, "exampleBangla", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      </div>
    </div>
  );
};

export default SentenceExercise;
