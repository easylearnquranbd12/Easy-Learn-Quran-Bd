// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import Swal from "sweetalert2";

// const Sentence = () => {
//   const [sentenceRow, setSentenceRow] = useState([
//     { sentence: "", definition: "", types: "", structure: "", example: "", remark: "" },
//     { sentence: "", definition: "", types: "", structure: "", example: "", remark: "" },
//     { sentence: "", definition: "", types: "", structure: "", example: "", remark: "" },
//   ]);

//   const handleChange = (index, field, value) => {
//     const updatedRows = [...sentenceRows];
//     updatedRows[index][field] = value;
//     setSentenceRow(updatedRows);
//   };

//   const fetchSentence = async () => {
//     const res = await axios.get("http://localhost:5000/first-layer");
//     return Array.isArray(res.data) ? res.data : [];
//   };
//   const {
//     data: sentenceRows = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["sentenceRows"],
//     queryFn: fetchSentence,
//   });

//   // Submit handler
//   const submitGrammar = async () => {
//     const hasEmpty = sentenceRow.some(
//       (row) =>
//         !row.sentence ||
//         !row.definition ||
//         !row.types ||
//         !row.structure ||
//         !row.example ||
//         !row.remark
//     );

//     if (hasEmpty) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Data",
//         text: "Please fill out all fields before submitting!",
//         confirmButtonColor: "#bb874a",
//       });
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/first-layer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(sentenceRow),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Submitted!",
//           text: "Grammar Exercises submitted successfully.",
//           confirmButtonColor: "#bb874a",
//         });
//         setSentenceRow([
//           {
//             sentence: "",
//             definition: "",
//             types: "",
//             structure: "",
//             example: "",
//             remark: "",
//           },
//         ]);
//         fetchHistory();
//       }
//     } catch (error) {
//       Swal.fire("Error", "Failed to submit data!", "error");
//     }
//   };
//   return (
//     <div className="card bg-gray-50 my-5 shadow-md rounded-2xl">
//       <div className="  p-2 md:p-5 mt-10 space-y-3 ">
//         <h3 className="text-xl font-semibold text-[#bb874a]">📖 Sentence</h3>
//         <p>Learning Your Sentence</p>

//         <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
//           <table className="table w-full">
//             <thead className="bg-black text-white text-sm">
//               <tr>
//                 <th>#</th>
//                 <th>Sentence</th>
//                 <th>Definition</th>
//                 <th>How Many Types</th>
//                 <th>Structure</th>
//                 <th>Example</th>
//                 <th>Remark</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* যদি কোন sentenceRows না থাকে */}
//               {sentenceRows.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center py-8 md:py-12 text-gray-500">
//                     {isLoading ? (
//                       "Loading sentences..."
//                     ) : isError ? (
//                       <button onClick={refetch}>Refresh</button>
//                     ) : (
//                       "No sentences found."
//                     )}
//                   </td>
//                 </tr>
//               )}

//               {/* Normal sentenceRows */}
//               {sentenceRows.length > 0 &&
//                 sentenceRows.map((row, i) => (
//                   <tr
//                     key={row._id || i}
//                     className="hover:bg-gray-50 transition border-b text-sm"
//                   >
//                     <td className="font-semibold">{i + 1}</td>
//                     <td>
//                       <input
//                         readOnly
//                         className="input input-sm input-bordered w-96"
//                         value={row.sentence || ""}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         readOnly
//                         className="input input-sm input-bordered w-96"
//                         value={row.definition || ""}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         readOnly
//                         className="input input-sm input-bordered w-96"
//                         value={row.types || ""}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         readOnly
//                         className="input input-sm input-bordered w-96"
//                         value={row.structure || ""}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         readOnly
//                         className="input input-sm input-bordered w-96"
//                         value={row.example || ""}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         readOnly
//                         className="input input-sm input-bordered max-w-96"
//                         value={row.remark || ""}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {!isError && !isLoading && sentenceRow.length >= 0 && (
//         <div className="card   p-2 md:p-5 mt-10 space-y-3">
//           <h3 className="text-xl font-semibold text-[#bb874a]">📖 Sentence</h3>
//           <p>Create Your Sentence</p>

//           {/* Input Table */}
//           <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
//             <table className="table w-full min-w-[800px]">
//               <thead className="bg-black text-white text-sm">
//                 <tr>
//                   <th>Sentence</th>
//                   <th>Definition</th>
//                   <th>Types</th>
//                   <th>Structure</th>
//                   <th>Example</th>
//                   <th>Remark</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sentenceRow.map((row, i) => (
//                   <tr key={i} className="hover:bg-gray-50 border-b text-sm">
//                     <td>
//                       <input
//                         className="input input-sm input-bordered w-36"
//                         placeholder="Sentence"
//                         onChange={(e) =>
//                           handleChange(i, "sentence", e.target.value)
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         className="input input-sm input-bordered w-40"
//                         placeholder="Definition"

//                         onChange={(e) =>
//                           handleChange(i, "definition", e.target.value)
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         className="input input-sm input-bordered w-44"
//                         placeholder="How Many Types"

//                         onChange={(e) =>
//                           handleChange(i, "types", e.target.value)
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         className="input input-sm input-bordered w-48"
//                         placeholder="Structure"

//                         onChange={(e) =>
//                           handleChange(i, "structure", e.target.value)
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         className="input input-sm input-bordered w-48"
//                         placeholder="Example"

//                       />
//                     </td>
//                     <td>
//                       <input
//                         className="input input-sm input-bordered w-60"
//                         placeholder="Remark"

//                         onChange={(e) =>
//                           handleChange(i, "remark", e.target.value)
//                         }
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Center Submit Button */}
//           <div className="flex justify-center mt-5">
//             <button
//               className="px-6 py-2 bg-[#bb874a] text-white rounded-lg shadow-lg hover:bg-[#5e4528] transition"
//               onClick={submitGrammar}
//             >
//               Submit Now
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sentence;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Sentence = () => {
  const [showCreate, setShowCreate] = useState(false); // toggle state

  // React Hook Form setup
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      sentences: [
        {
          sentence: "",
          definition: "",
          types: "",
          structure: "",
          example: "",
          remark: "",
        },
        {
          sentence: "",
          definition: "",
          types: "",
          structure: "",
          example: "",
          remark: "",
        },
        {
          sentence: "",
          definition: "",
          types: "",
          structure: "",
          example: "",
          remark: "",
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "sentences",
  });

  // Fetch sentences
  const fetchSentence = async () => {
    const res = await axios.get("http://localhost:5000/first-layer");
    return Array.isArray(res.data) ? res.data : [];
  };

  const {
    data: sentenceRows = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["sentenceRows"],
    queryFn: fetchSentence,
  });

  // Submit handler
  const onSubmit = async (data) => {
    const hasEmpty = data.sentences.some(
      (row) =>
        !row.sentence ||
        !row.definition ||
        !row.types ||
        !row.structure ||
        !row.example ||
        !row.remark
    );

    if (hasEmpty) {
      Swal.fire({
        icon: "warning",
        title: "Missing Data",
        text: "Please fill out all fields before submitting!",
        confirmButtonColor: "#bb874a",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/first-layer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.sentences),
      });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Grammar Exercises submitted successfully.",
          confirmButtonColor: "#bb874a",
        });
        reset();
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit data!", "error");
    }
  };

  return (
    <div className="card bg-gray-50 my-5 shadow-md rounded-2xl">
      <div className="p-2 md:p-5 mt-5 space-y-3">
        <div className="text-center">
          <h3 className="text-xl md:text-3xl py-5 font-semibold text-[#bb874a] text-center">
            Sentence Builder
          </h3>
          <p className=" text-justify">
            Develop your grammar skills by practicing how to create, structure,
            and analyze meaningful sentences. Learn the rules step by step and
            apply them through examples to improve both writing and
            communication.
          </p>
        </div>

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
              {sentenceRows.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 md:py-12 text-gray-500"
                  >
                    {isLoading ? (
                      "Loading sentences..."
                    ) : isError ? (
                      <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-[#bb874a] text-white rounded-lg shadow hover:bg-[#5e4528] transition"
                      >
                        Refresh
                      </button>
                    ) : (
                      "No sentences found."
                    )}
                  </td>
                </tr>
              )}

              {sentenceRows.length > 0 &&
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
        </div>

        {/* Show toggle only if not error & not loading */}
        {!isError && !isLoading && sentenceRows.length >= 0 && (
          <div className="flex items-center mt-4">
            <h1 className="pr-8">Create Your Exercise Form</h1>
            <input
              type="checkbox"
              className="toggle toggle-lg"
              checked={showCreate}
              onChange={(e) => setShowCreate(e.target.checked)}
            />
          </div>
        )}
      </div>

      {/* Create Form (only visible when toggle is on) */}
      {!isError && !isLoading && showCreate && sentenceRows.length >= 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card p-2 md:p-5  space-y-3"
        >
          <h3 className="text-xl font-semibold text-[#bb874a]">Exercise</h3>
          <p>Create Your Sentence exercise</p>

          <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
            <table className="table w-full min-w-[800px]">
              <thead className="bg-black text-white text-sm">
                <tr>
                  <th>Sentence</th>
                  <th>Definition</th>
                  <th>Types</th>
                  <th>Structure</th>
                  <th>Example</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, i) => (
                  <tr
                    key={field.id}
                    className="hover:bg-gray-50 border-b text-sm"
                  >
                    <td>
                      <input
                        {...register(`sentences.${i}.sentence`)}
                        className="input input-sm input-bordered w-36"
                        placeholder="Sentence"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.definition`)}
                        className="input input-sm input-bordered w-40"
                        placeholder="Definition"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.types`)}
                        className="input input-sm input-bordered w-44"
                        placeholder="How Many Types"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.structure`)}
                        className="input input-sm input-bordered w-48"
                        placeholder="Structure"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.example`)}
                        className="input input-sm input-bordered w-48"
                        placeholder="Example"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.remark`)}
                        className="input input-sm input-bordered w-60"
                        placeholder="Remark"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="px-6 py-2 bg-[#bb874a] text-white rounded-lg shadow-lg hover:bg-[#5e4528] transition"
            >
              Submit Now
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Sentence;
