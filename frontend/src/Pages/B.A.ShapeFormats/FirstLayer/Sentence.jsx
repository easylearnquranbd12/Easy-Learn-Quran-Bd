import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Sentence = () => {
  const [showCreate, setShowCreate] = useState(false);

  const createEmptySentence = () => ({
    sentence: "",
    sentence_bn: "",
    definition: "",
    definition_bn: "",
    types: "",
    types_bn: "",
    structure: "",
    structure_bn: "",
    example: "",
    example_bn: "",
    remark: "",
    remark_bn: "",
  });

  // React Hook Form setup (৩ টা খালি অবজেক্ট জেনারেট করা হচ্ছে)
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      sentences: Array.from({ length: 3 }, () => createEmptySentence()),
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
    const row = data.sentences[0];

    const allEmpty =
      !row.sentence &&
      !row.sentence_bn &&
      !row.definition &&
      !row.definition_bn &&
      !row.types &&
      !row.types_bn &&
      !row.structure &&
      !row.structure_bn &&
      !row.example &&
      !row.example_bn &&
      !row.remark &&
      !row.remark_bn;

    const anyFilled =
      row.sentence ||
      row.sentence_bn ||
      row.definition ||
      row.definition_bn ||
      row.types ||
      row.types_bn ||
      row.structure ||
      row.structure_bn ||
      row.example ||
      row.example_bn ||
      row.remark ||
      row.remark_bn;

    if (allEmpty) {
      Swal.fire({
        icon: "warning",
        title: "Empty Row",
        text: "Please fill at least one field before submitting!",
        confirmButtonColor: "#bb874a",
      });
      return;
    }

    if (
      anyFilled &&
      !(
        row.sentence &&
        row.sentence_bn &&
        row.definition &&
        row.definition_bn &&
        row.types &&
        row.types_bn &&
        row.structure &&
        row.structure_bn &&
        row.example &&
        row.example_bn &&
        row.remark &&
        row.remark_bn
      )
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Row",
        text: "Since you started filling, please complete all fields!",
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
        </div>

        {/* History Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
            <table className="table w-full">
              <thead className="bg-black text-white text-sm">
                <tr>
                  <th>#</th>
                  <th>Sentence</th>
                  <th>Sentence (বাংলা)</th>
                  <th>Definition</th>
                  <th>Definition (বাংলা)</th>
                  <th>How Many Types</th>
                  <th>Types (বাংলা)</th>
                  <th>Structure</th>
                  <th>Structure (বাংলা)</th>
                  <th>Example</th>
                  <th>Example (বাংলা)</th>
                  <th>Remark</th>
                  <th>Remark (বাংলা)</th>
                </tr>
              </thead>
              <tbody>
                {sentenceRows.length === 0 && (
                  <tr>
                    <td
                      colSpan="13"
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
                          className="input input-sm input-bordered w-60"
                          value={row.sentence || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.sentence_bn || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.definition || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.definition_bn || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.types || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.types_bn || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.structure || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.structure_bn || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.example || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.example_bn || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.remark || ""}
                        />
                      </td>
                      <td>
                        <input
                          readOnly
                          className="input input-sm input-bordered w-60"
                          value={row.remark_bn || ""}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Toggle */}
        {!isError && !isLoading && (
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

      {/* Create Form */}
      {!isError && !isLoading && showCreate && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card p-2 md:p-5  space-y-3"
        >
          <h3 className="text-xl font-semibold text-[#bb874a]">Exercise</h3>

          <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
            <table className="table w-full min-w-[1600px]">
              <thead className="bg-black text-white text-sm">
                <tr>
                  <th>Sentence</th>
                  <th>Sentence (বাংলা)</th>
                  <th>Definition</th>
                  <th>Definition (বাংলা)</th>
                  <th>Types</th>
                  <th>Types (বাংলা)</th>
                  <th>Structure</th>
                  <th>Structure (বাংলা)</th>
                  <th>Example</th>
                  <th>Example (বাংলা)</th>
                  <th>Remark</th>
                  <th>Remark (বাংলা)</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, i) => (
                  <tr key={field.id} className="border-b text-sm">
                    <td>
                      <input
                        {...register(`sentences.${i}.sentence`)}
                        className="input input-sm input-bordered w-40"
                        placeholder="Sentence"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.sentence_bn`)}
                        className="input input-sm input-bordered w-40"
                        placeholder="Sentence (বাংলা)"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.definition`)}
                        className="input input-sm input-bordered w-44"
                        placeholder="Definition"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.definition_bn`)}
                        className="input input-sm input-bordered w-44"
                        placeholder="Definition (বাংলা)"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.types`)}
                        className="input input-sm input-bordered w-32"
                        placeholder="Types"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.types_bn`)}
                        className="input input-sm input-bordered w-32"
                        placeholder="Types (বাংলা)"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.structure`)}
                        className="input input-sm input-bordered w-40"
                        placeholder="Structure"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.structure_bn`)}
                        className="input input-sm input-bordered w-40"
                        placeholder="Structure (বাংলা)"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.example`)}
                        className="input input-sm input-bordered w-40"
                        placeholder="Example"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.example_bn`)}
                        className="input input-sm input-bordered w-40"
                        placeholder="Example (বাংলা)"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.remark`)}
                        className="input input-sm input-bordered w-44"
                        placeholder="Remark"
                      />
                    </td>
                    <td>
                      <input
                        {...register(`sentences.${i}.remark_bn`)}
                        className="input input-sm input-bordered w-44"
                        placeholder="Remark (বাংলা)"
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
