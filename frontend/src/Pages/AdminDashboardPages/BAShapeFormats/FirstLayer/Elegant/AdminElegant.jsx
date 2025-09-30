import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const AdminElegant = () => {
  const [sentenceRows, setSentenceRows] = useState([
    {
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
    },
  ]);

  const [history, setHistory] = useState([]);

  // Input change handler
  const handleChange = (index, field, value) => {
    const updatedRows = [...sentenceRows];
    updatedRows[index][field] = value;
    setSentenceRows(updatedRows);
  };

  // Fetch history
  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/first-layer");
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Submit handler
  const submitGrammar = async () => {
    // const hasEmpty = sentenceRows.some(
    //   (row) =>
    //     !row.sentence ||
    //     !row.sentence_bn ||
    //     !row.definition ||
    //     !row.definition_bn ||
    //     !row.types ||
    //     !row.types_bn ||
    //     !row.structure ||
    //     !row.structure_bn ||
    //     !row.example ||
    //     !row.example_bn ||
    //     !row.remark ||
    //     !row.remark_bn
    // );

    // if (hasEmpty) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Missing Data",
    //     text: "Please fill out all fields before submitting!",
    //     confirmButtonColor: "#bb874a",
    //   });
    //   return;
    // }

    try {
      const res = await fetch("http://localhost:5000/first-layer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sentenceRows),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Grammar Exercises submitted successfully.",
          confirmButtonColor: "#bb874a",
        });
        setSentenceRows([
          {
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
          },
        ]);
        fetchHistory();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit data!", "error");
    }
  };

  // Delete handler
  const deleteSentence = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#bb874a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:5000/first-layer/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Sentence has been deleted.", "success");
        fetchHistory();
      } catch (error) {
        Swal.fire("Error", "Failed to delete sentence!", "error");
      }
    }
  };

  return (
    <div className="relative pb-24">
      {/* Input Section */}
      <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3">
        <h3 className="text-xl font-semibold text-[#bb874a]">📖 Sentence</h3>
        <p>Create Your Sentence</p>

        {/* Input Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="table w-full min-w-[1200px]">
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
              {sentenceRows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 border-b text-sm">
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Sentence"
                      value={row.sentence}
                      onChange={(e) =>
                        handleChange(i, "sentence", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Sentence (বাংলা)"
                      value={row.sentence_bn}
                      onChange={(e) =>
                        handleChange(i, "sentence_bn", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Definition"
                      value={row.definition}
                      onChange={(e) =>
                        handleChange(i, "definition", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Definition (বাংলা)"
                      value={row.definition_bn}
                      onChange={(e) =>
                        handleChange(i, "definition_bn", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Types"
                      value={row.types}
                      onChange={(e) => handleChange(i, "types", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Types (বাংলা)"
                      value={row.types_bn}
                      onChange={(e) =>
                        handleChange(i, "types_bn", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Structure"
                      value={row.structure}
                      onChange={(e) =>
                        handleChange(i, "structure", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Structure (বাংলা)"
                      value={row.structure_bn}
                      onChange={(e) =>
                        handleChange(i, "structure_bn", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Example"
                      value={row.example}
                      onChange={(e) =>
                        handleChange(i, "example", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Example (বাংলা)"
                      value={row.example_bn}
                      onChange={(e) =>
                        handleChange(i, "example_bn", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Remark"
                      value={row.remark}
                      onChange={(e) =>
                        handleChange(i, "remark", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input input-sm input-bordered w-40"
                      placeholder="Remark (বাংলা)"
                      value={row.remark_bn}
                      onChange={(e) =>
                        handleChange(i, "remark_bn", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Center Submit Button */}
        <div className="flex justify-center mt-5">
          <button
            className="px-6 py-2 bg-[#bb874a] text-white rounded-lg shadow-lg hover:bg-[#5e4528] transition"
            onClick={submitGrammar}
          >
            Submit Now
          </button>
        </div>
      </div>

      {/* History Section */}
      <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3">
        <h3 className="text-xl font-semibold text-[#bb874a]">📜 History</h3>
        <p>Sentence History</p>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="table w-full min-w-[1600px]">
            <thead className="bg-gray-800 text-white text-sm">
              <tr>
                <th>Serial</th>
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
                <th>Action</th>
              </tr>
            </thead>
           <tbody>
  {history.map((row, index) => (
    <tr key={row._id} className="hover:bg-gray-50 border-b text-sm">
      <td className="min-w-[80px]">{index + 1}</td>
      <td className="min-w-[200px]">{row.sentence}</td>
      <td className="min-w-[200px]">{row.sentence_bn}</td>
      <td className="min-w-[200px]">{row.definition}</td>
      <td className="min-w-[200px]">{row.definition_bn}</td>
      <td className="min-w-[150px]">{row.types}</td>
      <td className="min-w-[150px]">{row.types_bn}</td>
      <td className="min-w-[200px]">{row.structure}</td>
      <td className="min-w-[200px]">{row.structure_bn}</td>
      <td className="min-w-[200px]">{row.example}</td>
      <td className="min-w-[200px]">{row.example_bn}</td>
      <td className="min-w-[200px]">{row.remark}</td>
      <td className="min-w-[200px]">{row.remark_bn}</td>
      <td className="min-w-[100px]">
        <button
          onClick={() => deleteSentence(row._id)}
          className="text-red-500 hover:text-red-700"
        >
            <Trash2 size={18} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminElegant;
