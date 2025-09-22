import { useEffect, useState } from "react";
import idiomsData from "../../../../idioms.json"; // ৫০টা ডেটা
import Sentence from "./Sentence";


const FirstLayer = () => {
  const [rows, setRows] = useState([]);

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
        <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3 ">
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
          </div>

          {/* Center Button */}
          <div className="flex justify-center mt-5">
            <button
              className="px-6 py-2 bg-[#bb874a] text-white rounded-lg shadow hover:bg-[#5e4528] transition"
              onClick={submitGrammar}
            >
              Submit Now
            </button>
          </div>
        </div>
        {/* Sentence Section  */}
        {/* <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3 ">
          <h3 className="text-xl font-semibold text-[#bb874a]">📖 Sentence</h3>
          <p>Learning Your Sentence</p>

          {isLoading && <p>Loading sentences...</p>}
          {isError && <p className="text-red-500">Error loading sentences.</p>}

          {!isError && !isLoading && (
            <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
              <table className="table w-full">
                <thead className="bg-black text-white text-sm">
                  <tr>
                    <th>#</th>
                    <th>Sentence</th>
                    <th>Defination</th>
                    <th>How Many Types</th>
                    <th>Stricture</th>
                    <th>Example</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {sentenceRows.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition border-b text-sm"
                    >
                      <td className="font-semibold">{i + 1}</td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-96"
                          value={row.sentence || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-96"
                          value={row.definition || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-96"
                          value={row.types || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-96"
                          value={row.structure || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-96"
                          value={row.example || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered max-w-96"
                          value={row.remark || ""}
                        />
                      </td>
                    </tr>
                  ))}
                  {sentenceRows.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-6 text-gray-500"
                      >
                        No sentences found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div> */}

<Sentence/>
{/* Sentence Section */}
{/* <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3 ">
  <h3 className="text-xl font-semibold text-[#bb874a]">📖 Sentence</h3>
  <p>Learning Your Sentence</p>

  <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
    <table className="table w-full">
      <thead className="bg-black text-white text-sm">
        <tr>
          <th>#</th>
          <th>Sentence</th>
          <th>Definition</th>
          <th>How Many Types</th>
          <th>Structure</th>
          <th>Example</th>
          <th>Remark</th>
        </tr>
      </thead>
      <tbody>
        {/* যদি কোন sentenceRows না থাকে */}
        {/* {sentenceRows.length === 0 && (
          <tr>
            <td colSpan="7" className="text-center py-6 text-gray-500">
              {isLoading
                ? "Loading sentences..."
                : isError
                ? "Error loading sentences."
                : "No sentences found."}
            </td>
          </tr>
        )} */}

        {/* Normal sentenceRows */}
        {/* {sentenceRows.length > 0 &&
          sentenceRows.map((row, i) => (
            <tr
              key={row._id || i}
              className="hover:bg-gray-50 transition border-b text-sm"
            >
              <td className="font-semibold">{i + 1}</td>
              <td>
                <input
                  readOnly
                  className="input input-sm input-bordered w-96"
                  value={row.sentence || ""}
                />
              </td>
              <td>
                <input
                  readOnly
                  className="input input-sm input-bordered w-96"
                  value={row.definition || ""}
                />
              </td>
              <td>
                <input
                  readOnly
                  className="input input-sm input-bordered w-96"
                  value={row.types || ""}
                />
              </td>
              <td>
                <input
                  readOnly
                  className="input input-sm input-bordered w-96"
                  value={row.structure || ""}
                />
              </td>
              <td>
                <input
                  readOnly
                  className="input input-sm input-bordered w-96"
                  value={row.example || ""}
                />
              </td>
              <td>
                <input
                  readOnly
                  className="input input-sm input-bordered max-w-96"
                  value={row.remark || ""}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div> */}
{/* </div>  */}



        {/*         
          <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3">
          <h3 className="text-xl font-semibold text-[#bb874a]">📖 Sentence</h3>
          <p>Learning Your Sentence</p>

          {isLoading && <p>Loading sentences...</p>}
          {isError && <p className="text-red-500">Error loading sentences.</p>}

          {!isLoading && !isError && (
            <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
              <table className="table w-full">
                <thead className="bg-black text-white text-sm">
                  <tr>
                    <th>#</th>
                    <th>Sentence</th>
                    <th>Definition</th>
                    <th>How Many Types</th>
                    <th>Structure</th>
                    <th>Example</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {sentenceRows.map((row, i) => (
                    <tr
                      key={row._id || i}
                      className="hover:bg-gray-50 transition border-b text-sm"
                    >
                      <td className="font-semibold">{i + 1}</td>
                      <td>
                        <input
                          className="input input-sm input-bordered w-36"
                          value={row.sentence || ""}
                          onChange={(e) =>
                            updateSentence(i, "sentence", e.target.value)
                          }
                          placeholder="Sentence"
                        />
                      </td>
                      <td>
                        <input
                          className="input input-sm input-bordered w-40"
                          value={row.definition || ""}
                          onChange={(e) =>
                            updateSentence(i, "definition", e.target.value)
                          }
                          placeholder="Definition"
                        />
                      </td>
                      <td>
                        <input
                          className="input input-sm input-bordered w-44"
                          value={row.types || ""}
                          onChange={(e) =>
                            updateSentence(i, "types", e.target.value)
                          }
                          placeholder="How Many Types"
                        />
                      </td>
                      <td>
                        <input
                          className="input input-sm input-bordered w-48"
                          value={row.structure || ""}
                          onChange={(e) =>
                            updateSentence(i, "structure", e.target.value)
                          }
                          placeholder="Structure"
                        />
                      </td>
                      <td>
                        <input
                          className="input input-sm input-bordered w-48"
                          value={row.example || ""}
                          onChange={(e) =>
                            updateSentence(i, "example", e.target.value)
                          }
                          placeholder="Example"
                        />
                      </td>
                      <td>
                        <input
                          className="input input-sm input-bordered w-60"
                          value={row.remark || ""}
                          onChange={(e) =>
                            updateSentence(i, "remark", e.target.value)
                          }
                          placeholder="Remark"
                        />
                      </td>
                    </tr>
                  ))}

                  {sentenceRows.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-6 text-gray-500">
                        No sentences found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default FirstLayer;
