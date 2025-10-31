import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AdminLoading from "../../../../../components/Loading/AdminLoading";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import AdminVocabularyModal from "./AdminVocabularyModal";

const AdminVocabulary = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      mainWord: "",
      banglaPronunciation: "",
      banglaMeaning: "",
      synonyms: "",
      antonyms: "",
      exampleEnglish: "",
      exampleBangla: "",
    },
  });

  // Fetch all vocabulary Fields
  const {
    data: vocabularyFields = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vocabularyFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/vocabularyField");
      return res.data.data;
    },
  });

  // Create Vocabulary
  const { mutateAsync: createVocabulary } = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosPublic.post("/first-layer/vocabulary", newData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "Vocabulary created successfully!", "success");
      reset();
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
    },
    onError: (error) => {
      Swal.fire(
        "❌ Error",
        error.message || "Failed to create vocabulary",
        "error"
      );
    },
  });
  // Fetch all vocabulary
  const {
    data: vocabulary = [],
    isLoading: vocabularyLoading,
    refetch: refetchVocabulary,
    isError: vocabularyError,
  } = useQuery({
    queryKey: ["vocabulary"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/vocabulary");
      return res.data.data || [];
    },
  });

  // ✅ Delete vocabulary (fixed version)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/first-layer/vocabulary/${id}`);
      return res.data;
    },
    onSuccess: (_, id) => {
      Swal.fire("Deleted!", "Vocabulary has been deleted.", "success");

      // ✅ Update UI instantly
      queryClient.setQueryData(["vocabulary"], (oldData) =>
        oldData ? oldData.filter((item) => item._id !== id) : []
      );

      // Optionally revalidate with backend to ensure consistency
      queryClient.invalidateQueries(["vocabulary"]);
    },
    onError: (error) => {
      Swal.fire("Error!", "Failed to delete vocabulary.", "error");
      console.error(error);
    },
  });

  // ✅ Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this vocabulary?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const [showAll, setShowAll] = useState(false);
  // Toggle show all rows
  const visibleVocabulary = showAll ? vocabulary : vocabulary.slice(0, 10);
  // form submit
  const onSubmit = async (data) => {
    createVocabulary(data);
  };

  // modal open
  const handleEditClick = (field, value, id) => {
    setFieldName(field);
    setCurrentValue(value);
    setSelectedVocabId(id);
    setModalOpen(true);
  };

  // Toggle handler using item.isActive
  const handleToggle = (currentState) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to turn ${
        currentState === "ON" ? "OFF" : "ON"
      } this vocabulary?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleIsActiveMutation.mutate(currentState);
      }
    });
  };

  // Toggle mutation using item.isActive
  const toggleIsActiveMutation = useMutation({
    mutationFn: async (currentState) => {
      const res = await axiosPublic.put(`/first-layer/vocabularyField/toggle`, {
        fieldName: "isActive", // ✅ এটা দিতে হবে
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Vocabulary is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries({ queryKey: ["vocabularyFields"] });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || error.message,
        "error"
      );
    },
  });

  if (isLoading || vocabularyLoading) {
    return <AdminLoading />;
  }

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <Helmet>
        <title>Quiz | Vocabulary</title>
      </Helmet>
      <TittleAnimation
        tittle="Create Vocabulary"
        subtittle="Create With admin or Moderator"
      />

      <div className="mt-10">
        <div className="card bg-white shadow-md rounded-2xl p-3 md:p-5">
          <div className="w-full">
            <div className="  space-y-4">
              <div className="mb-4 text-center">
                {vocabularyFields && vocabularyFields.length > 0 && (
                  <>
                    {/* Title */}
                    <div className="flex items-start justify-center gap-2 mb-2">
                      {vocabularyFields[0].title || "Title"}
                      <Edit
                        onClick={() =>
                          handleEditClick(
                            "title",
                            vocabularyFields[0].title,
                            vocabularyFields[0].title
                          )
                        }
                        className="w-5 h-5 text-green-600 cursor-pointer"
                      />
                    </div>

                    {/* description */}
                    <div className="flex items-start justify-center gap-2">
                      <span className="text-base">
                        {vocabularyFields[0].description || "description"}
                      </span>
                      <Edit
                        onClick={() =>
                          handleEditClick(
                            "description",
                            vocabularyFields[0].description,
                            vocabularyFields[0].description
                          )
                        }
                        className="min-w-5 min-h-5 w-5 h-5 text-green-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                {vocabularyFields.map((item) => (
                  <div key={item._id} className="flex items-center gap-2 my-2">
                    <span className="font-semibold">
                      Create {item.title || "Vocabulary"} Exercise
                    </span>
                    <input
                      type="checkbox"
                      className={`toggle ${
                        item.isActive === "ON" ? "toggle-success" : ""
                      }`}
                      checked={item.isActive === "ON"}
                      onChange={() => handleToggle(item.isActive)}
                    />
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {vocabularyFields?.map((item) => (
                  <div key={item._id} className="space-y-4 p-2">
                    {/* Main Word */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 ">
                      <div className="flex items-center justify-start mb-2 gap-5">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.mainWord || "Main-Word"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "mainWord",
                              item.mainWord,
                              item.mainWord
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("mainWord")}
                        className="textarea textarea-bordered w-full min-h-[80px] md:min-h-[180px]"
                        placeholder={`Enter Your ${item.mainWord}`}
                      />
                    </div>

                    {/* Bangla Pronunciation */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start mb-2 gap-5">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.banglaPronunciation || "Bangla-Pronunciation"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "banglaPronunciation",
                              item.banglaPronunciation,
                              item.banglaPronunciation
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("banglaPronunciation")}
                        className="textarea textarea-bordered w-full min-h-[80px] md:min-h-[180px]"
                        placeholder={`Enter Your ${item.banglaPronunciation}`}
                      />
                    </div>

                    {/* Bangla Meaning */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start mb-2 gap-5">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.banglaMeaning || "Bangla-Meaning"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "bangla-Meaning",
                              item.banglaMeaning,
                              item.banglaMeaning
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("banglaMeaning")}
                        className="textarea textarea-bordered w-full min-h-[80px] md:min-h-[180px]"
                        placeholder={`Enter Your ${item.banglaMeaning}`}
                      />
                    </div>

                    {/* Synonyms */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start mb-2 gap-5">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.synonyms || "Synonyms"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "Synonyms",
                              item.synonyms,
                              item.synonyms
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("synonyms")}
                        className="textarea textarea-bordered w-full min-h-[80px] md:min-h-[180px]"
                        placeholder={`Enter Your ${item.synonyms}`}
                      />
                    </div>

                    {/* Antonyms */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start mb-2 gap-5">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.antonyms || "Antonyms"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "Antonyms",
                              item.antonyms,
                              item.antonyms
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("antonyms")}
                        className="textarea textarea-bordered w-full min-h-[80px] md:min-h-[180px]"
                        placeholder={`Enter Your ${item.antonyms}`}
                      />
                    </div>

                    {/* Example (English) */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start mb-2 gap-5">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.exampleEnglish || "Example (English)"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "Example (English)",
                              item.exampleEnglish,
                              item.exampleEnglish
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("exampleEnglish")}
                        className="textarea textarea-bordered w-full min-h-[80px] md:min-h-[180px]"
                        placeholder={`Enter Your ${item.exampleEnglish}`}
                      />
                    </div>

                    {/* Example (Bangla) */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-start mb-2 gap-5">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.exampleBangla || "Example (Bangla)"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "Example (Bangla)",
                              item.exampleBangla,
                              item.exampleBangla
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("exampleBangla")}
                        className="textarea textarea-bordered w-full min-h-[80px] md:min-h-[180px]"
                        placeholder={`Enter Your ${item.exampleBangla}`}
                      />
                    </div>
                  </div>
                ))}

                <div className="flex justify-center mt-6 p-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-lg shadow-md p-5 mt-10 w-[450px] md:w-full">
        <h1 className="mb-5">
          Total Vocabulary Items:{" "}
          <span className="text-3xl font-bold ">{vocabulary.length}</span>
        </h1>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          {vocabularyLoading ? (
            <div className="p-6 text-center text-gray-500">
              Loading vocabulary...
            </div>
          ) : vocabularyError ? (
            <div className="p-6 text-center text-red-500">
              Error loading vocabulary.
            </div>
          ) : (
            <table className="table w-full">
              {vocabularyFields?.map((item, index) => (
                <thead
                  key={item._id}
                  className="bg-teal-600 text-white text-sm"
                >
                  <tr>
                    <th className="min-w-10">Serial</th>
                    <th className="min-w-96">{item?.mainWord}</th>
                    <th className="min-w-96">{item?.banglaPronunciation}</th>
                    <th className="min-w-96">{item?.banglaMeaning}</th>
                    <th className="min-w-96">{item?.synonyms}</th>
                    <th className="min-w-96">{item?.antonyms}</th>
                    <th className="min-w-96">{item?.exampleEnglish}</th>
                    <th className="min-w-96">{item?.exampleBangla}</th>
                    <th className="min-w-16">Action</th>
                  </tr>
                </thead>
              ))}
              <tbody>
                {visibleVocabulary.length > 0 ? (
                  visibleVocabulary.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition border-b text-sm"
                    >
                      <td className="font-semibold min-w-10">{i + 1}</td>
                      <td>
                        <textarea
                          readOnly
                          className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                          defaultValue={row.mainWord}
                        />
                      </td>
                      <td>
                        <textarea
                          readOnly
                          className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                          defaultValue={row.banglaPronunciation}
                        />
                      </td>
                      <td>
                        <textarea
                          readOnly
                          className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                          defaultValue={row.banglaMeaning}
                        />
                      </td>
                      <td>
                        <textarea
                          readOnly
                          className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                          defaultValue={row.synonyms}
                        />
                      </td>
                      <td>
                        <textarea
                          readOnly
                          className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                          defaultValue={row.antonyms}
                        />
                      </td>
                      <td>
                        <textarea
                          readOnly
                          className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                          defaultValue={row.exampleEnglish}
                        />
                      </td>
                      <td>
                        <textarea
                          readOnly
                          className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                          defaultValue={row.exampleBangla}
                        />
                      </td>

                      <td className="min-w-16">
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="px-2 py-1 text-red-600 rounded-md hover:bg-red-100 flex items-center gap-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500">
                      No vocabulary found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {vocabulary.length > 10 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <AdminVocabularyModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fieldName={fieldName}
          currentValue={currentValue}
          vocabId={selectedVocabId}
        />
      )}
    </div>
  );
};

export default AdminVocabulary;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Edit, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
// import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
// import EditModal from "../../../../../shared/EditModal/EditModal";

// const AdminVocabulary = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [fieldName, setFieldName] = useState("");
//   const [selectedVocabId, setSelectedVocabId] = useState(null);
//   const [currentValue, setCurrentValue] = useState("");

//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();
//   const { register, handleSubmit, reset, setValue } = useForm({
//     defaultValues: {
//       mainWord: "",
//       banglaPronunciation: "",
//       banglaMeaning: "",
//       synonyms: "",
//       antonyms: "",
//       exampleEnglish: "",
//       exampleBangla: "",
//     },
//   });

//   // Fetch all vocabulary Fields
//   const {
//     data: vocabularyFields = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["vocabularyFields"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/first-layer/vocabularyField");
//       return res.data.data;
//     },
//   });

//   // Create Vocabulary
//   const { mutateAsync: createVocabulary } = useMutation({
//     mutationFn: async (newData) => {
//       const res = await axiosPublic.post("/first-layer/vocabulary", newData);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire("✅ Success", "Vocabulary created successfully!", "success");
//       reset();
//       queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
//     },
//     onError: (error) => {
//       Swal.fire(
//         "❌ Error",
//         error.message || "Failed to create vocabulary",
//         "error"
//       );
//     },
//   });
//   // Fetch all vocabulary
//   const {
//     data: vocabulary = [],
//     isLoading: vocabularyLoading,
//     refetch: refetchVocabulary,
//     isError: vocabularyError,
//   } = useQuery({
//     queryKey: ["vocabulary"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/first-layer/vocabulary");
//       return res.data.data || [];
//     },
//   });

//   // delete vocabulary
//   const { mutateAsync: deleteVocabulary } = useMutation({
//     mutationFn: async (id) => {
//       const res = await axiosPublic.delete(`/first-layer/vocabulary/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire("Deleted!", "Vocabulary has been deleted.", "success");
//       refetchVocabulary(); // Refetch the list after deletion
//     },
//     onError: (error) => {
//       Swal.fire("Error!", "Failed to delete vocabulary.", "error");
//       console.error(error);
//     },
//   });

//   // Delete handler
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to delete this vocabulary?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteVocabulary(id);
//       }
//     });
//   };
//   const [showAll, setShowAll] = useState(false);
//   // Toggle show all rows
//   const visibleVocabulary = showAll ? vocabulary : vocabulary.slice(0, 10);
//   // form submit
//   const onSubmit = async (data) => {
//     createVocabulary(data);
//   };

//   // modal open
//   const handleEditClick = (field, value, id) => {
//     setFieldName(field);
//     setCurrentValue(value);
//     setSelectedVocabId(id);
//     setModalOpen(true);
//   };

//   // Toggle handler using item.isActive
//   const handleToggle = (currentState) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You want to turn ${
//         currentState === "ON" ? "OFF" : "ON"
//       } this vocabulary?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         toggleIsActiveMutation.mutate(currentState);
//       }
//     });
//   };

//   // Toggle mutation using item.isActive
//   const toggleIsActiveMutation = useMutation({
//     mutationFn: async (currentState) => {
//       const res = await axiosPublic.put(`/first-layer/vocabularyField/toggle`, {
//         fieldName: "isActive", // ✅ এটা দিতে হবে
//         currentValue: currentState,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: `Vocabulary is now ${data.updatedValue}`,
//       });
//       queryClient.invalidateQueries({ queryKey: ["vocabularyFields"] });
//     },
//     onError: (error) => {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || error.message,
//         "error"
//       );
//     },
//   });
//   return (
//     <div className="max-w-[1400px] mx-auto px-2">
//       <Helmet>
//         <title>Quiz | Vocabulary</title>
//       </Helmet>
//       <TittleAnimation
//         tittle="Create Vocabulary"
//         subtittle="Create With admin or Moderator"
//       />

//       <div className="mt-10">
//         <div className="card bg-white shadow-md rounded-2xl p-3 md:p-5">
//           {/* Mobile & Desktop Responsive Container */}
//           <div className="w-full">
//             {/* Mobile View - Vertical Layout */}
//             <div className="block md:hidden space-y-4">
//                 <div>
//                 {vocabularyFields.map((item) => (
//                   <div key={item._id} className="flex items-center gap-2 my-2">
//                     <span className="font-semibold">
//                       Create {item.title || "Vocabulary"} Exercise
//                     </span>
//                     <input
//                       type="checkbox"
//                       className={`toggle  ${
//                         item.isActive === "ON" ? "toggle-success" : ""
//                       }`}
//                       checked={item.isActive === "ON"}
//                       onChange={() => handleToggle(item.isActive)}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 {vocabularyFields?.map((item) => (
//                   <div key={item._id} className="space-y-4 p-2">
//                     {/* Main Word */}
//                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 w-96">
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="text-sm font-semibold text-gray-700">
//                           {item.mainWord || "Main-Word"}
//                         </label>
//                         <Edit
//                           onClick={() =>
//                             handleEditClick(
//                               "mainWord",
//                               item.mainWord,
//                               item.mainWord
//                             )
//                           }
//                           className="w-4 h-4 text-green-600 cursor-pointer"
//                         />
//                       </div>
//                       <textarea
//                         {...register("mainWord")}
//                         className="textarea textarea-bordered w-full min-h-[80px]"
//                         placeholder={`Enter Your ${item.mainWord}`}
//                       />
//                     </div>

//                     {/* Bangla Pronunciation */}
//                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="text-sm font-semibold text-gray-700">
//                           {item.banglaPronunciation || "Bangla-Pronunciation"}
//                         </label>
//                         <Edit
//                           onClick={() =>
//                             handleEditClick(
//                               "banglaPronunciation",
//                               item.banglaPronunciation,
//                               item.banglaPronunciation
//                             )
//                           }
//                           className="w-4 h-4 text-green-600 cursor-pointer"
//                         />
//                       </div>
//                       <textarea
//                         {...register("banglaPronunciation")}
//                         className="textarea textarea-bordered w-full min-h-[80px]"
//                         placeholder={`Enter Your ${item.banglaPronunciation}`}
//                       />
//                     </div>

//                     {/* Bangla Meaning */}
//                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="text-sm font-semibold text-gray-700">
//                           {item.banglaMeaning || "Bangla-Meaning"}
//                         </label>
//                         <Edit
//                           onClick={() =>
//                             handleEditClick(
//                               "bangla-Meaning",
//                               item.banglaMeaning,
//                               item.banglaMeaning
//                             )
//                           }
//                           className="w-4 h-4 text-green-600 cursor-pointer"
//                         />
//                       </div>
//                       <textarea
//                         {...register("banglaMeaning")}
//                         className="textarea textarea-bordered w-full min-h-[80px]"
//                         placeholder={`Enter Your ${item.banglaMeaning}`}
//                       />
//                     </div>

//                     {/* Synonyms */}
//                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="text-sm font-semibold text-gray-700">
//                           {item.synonyms || "Synonyms"}
//                         </label>
//                         <Edit
//                           onClick={() =>
//                             handleEditClick(
//                               "Synonyms",
//                               item.synonyms,
//                               item.synonyms
//                             )
//                           }
//                           className="w-4 h-4 text-green-600 cursor-pointer"
//                         />
//                       </div>
//                       <textarea
//                         {...register("synonyms")}
//                         className="textarea textarea-bordered w-full min-h-[80px]"
//                         placeholder={`Enter Your ${item.synonyms}`}
//                       />
//                     </div>

//                     {/* Antonyms */}
//                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="text-sm font-semibold text-gray-700">
//                           {item.antonyms || "Antonyms"}
//                         </label>
//                         <Edit
//                           onClick={() =>
//                             handleEditClick(
//                               "Antonyms",
//                               item.antonyms,
//                               item.antonyms
//                             )
//                           }
//                           className="w-4 h-4 text-green-600 cursor-pointer"
//                         />
//                       </div>
//                       <textarea
//                         {...register("antonyms")}
//                         className="textarea textarea-bordered w-full min-h-[80px]"
//                         placeholder={`Enter Your ${item.antonyms}`}
//                       />
//                     </div>

//                     {/* Example (English) */}
//                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="text-sm font-semibold text-gray-700">
//                           {item.exampleEnglish || "Example (English)"}
//                         </label>
//                         <Edit
//                           onClick={() =>
//                             handleEditClick(
//                               "Example (English)",
//                               item.exampleEnglish,
//                               item.exampleEnglish
//                             )
//                           }
//                           className="w-4 h-4 text-green-600 cursor-pointer"
//                         />
//                       </div>
//                       <textarea
//                         {...register("exampleEnglish")}
//                         className="textarea textarea-bordered w-full min-h-[80px]"
//                         placeholder={`Enter Your ${item.exampleEnglish}`}
//                       />
//                     </div>

//                     {/* Example (Bangla) */}
//                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="text-sm font-semibold text-gray-700">
//                           {item.exampleBangla || "Example (Bangla)"}
//                         </label>
//                         <Edit
//                           onClick={() =>
//                             handleEditClick(
//                               "Example (Bangla)",
//                               item.exampleBangla,
//                               item.exampleBangla
//                             )
//                           }
//                           className="w-4 h-4 text-green-600 cursor-pointer"
//                         />
//                       </div>
//                       <textarea
//                         {...register("exampleBangla")}
//                         className="textarea textarea-bordered w-full min-h-[80px]"
//                         placeholder={`Enter Your ${item.exampleBangla}`}
//                       />
//                     </div>
//                   </div>
//                 ))}

//                 <div className="flex justify-center mt-6 p-2">
//                   <button
//                     type="submit"
//                     className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md w-full"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Desktop View - Table Layout */}
//             <div className="hidden md:block">
//               <div className="mb-4 text-center">
//                 {vocabularyFields && vocabularyFields.length > 0 && (
//                   <>
//                     {/* Title */}
//                     <div className="flex items-start justify-center gap-2 mb-2">
//                       {vocabularyFields[0].title || "Title"}
//                       <Edit
//                         onClick={() =>
//                           handleEditClick(
//                             "title",
//                             vocabularyFields[0].title,
//                             vocabularyFields[0].title
//                           )
//                         }
//                         className="w-5 h-5 text-green-600 cursor-pointer"
//                       />
//                     </div>

//                     {/* description */}
//                     <div className="flex items-start justify-center gap-2">
//                       <span className="text-base">
//                         {vocabularyFields[0].description || "description"}
//                       </span>
//                       <Edit
//                         onClick={() =>
//                           handleEditClick(
//                             "description",
//                             vocabularyFields[0].description,
//                             vocabularyFields[0].description
//                           )
//                         }
//                         className="min-w-5 min-h-5 w-5 h-5 text-green-600 cursor-pointer"
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div>
//                 {vocabularyFields.map((item) => (
//                   <div key={item._id} className="flex items-center gap-2 my-2">
//                     <span className="font-semibold">
//                       Create {item.title || "Vocabulary"} Exercise
//                     </span>
//                     <input
//                       type="checkbox"
//                       className={`toggle ${
//                         item.isActive === "ON" ? "toggle-success" : ""
//                       }`}
//                       checked={item.isActive === "ON"}
//                       onChange={() => handleToggle(item.isActive)}
//                     />
//                   </div>
//                 ))}
//               </div>
//               {/* Scrollable Container with proper height */}
//               <div className="max-h-[calc(100vh-250px)] overflow-auto rounded-xl shadow border border-gray-200">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   {vocabularyFields?.map((item) => (
//                     <table key={item._id} className="table w-full">
//                       <thead className="bg-black text-white text-sm sticky top-0 z-10">
//                         <tr>
//                           <th className="min-w-16">#</th>
//                           <th className="min-w-96">
//                             <div className="flex items-center justify-center gap-2">
//                               {item.mainWord || "Main-Word"}
//                               <Edit
//                                 onClick={() =>
//                                   handleEditClick(
//                                     "mainWord",
//                                     item.mainWord,
//                                     item.mainWord
//                                   )
//                                 }
//                                 className="w-5 h-5 text-green-600 cursor-pointer"
//                               />
//                             </div>
//                           </th>
//                           <th className="min-w-96">
//                             <div className="flex items-center justify-center gap-2">
//                               {item.banglaPronunciation ||
//                                 "Bangla-Pronunciation"}
//                               <Edit
//                                 onClick={() =>
//                                   handleEditClick(
//                                     "banglaPronunciation",
//                                     item.banglaPronunciation,
//                                     item.banglaPronunciation
//                                   )
//                                 }
//                                 className="w-5 h-5 text-green-600 cursor-pointer"
//                               />
//                             </div>
//                           </th>
//                           <th className="min-w-96">
//                             <div className="flex items-center justify-center gap-2">
//                               {item.banglaMeaning || "Bangla-Meaning"}
//                               <Edit
//                                 onClick={() =>
//                                   handleEditClick(
//                                     "banglaMeaning",
//                                     item.banglaMeaning,
//                                     item.banglaMeaning
//                                   )
//                                 }
//                                 className="w-5 h-5 text-green-600 cursor-pointer"
//                               />
//                             </div>
//                           </th>
//                           <th className="min-w-96">
//                             <div className="flex items-center justify-center gap-2">
//                               {item.synonyms || "Synonyms"}
//                               <Edit
//                                 onClick={() =>
//                                   handleEditClick(
//                                     "synonyms",
//                                     item.synonyms,
//                                     item.synonyms
//                                   )
//                                 }
//                                 className="w-5 h-5 text-green-600 cursor-pointer"
//                               />
//                             </div>
//                           </th>
//                           <th className="min-w-96">
//                             <div className="flex items-center justify-center gap-2">
//                               {item.antonyms || "Antonyms"}
//                               <Edit
//                                 onClick={() =>
//                                   handleEditClick(
//                                     "antonyms",
//                                     item.antonyms,
//                                     item.antonyms
//                                   )
//                                 }
//                                 className="w-5 h-5 text-green-600 cursor-pointer"
//                               />
//                             </div>
//                           </th>
//                           <th className="min-w-96">
//                             <div className="flex items-center justify-center gap-2">
//                               {item.exampleEnglish || "Example (English)"}
//                               <Edit
//                                 onClick={() =>
//                                   handleEditClick(
//                                     "exampleEnglish",
//                                     item.exampleEnglish,
//                                     item.exampleEnglish
//                                   )
//                                 }
//                                 className="w-5 h-5 text-green-600 cursor-pointer"
//                               />
//                             </div>
//                           </th>
//                           <th className="min-w-96">
//                             <div className="flex items-center justify-center gap-2">
//                               {item.exampleBangla || " Example (Bangla)"}
//                               <Edit
//                                 onClick={() =>
//                                   handleEditClick(
//                                     "exampleBangla",
//                                     item.exampleBangla,
//                                     item.exampleBangla
//                                   )
//                                 }
//                                 className="w-5 h-5 text-green-600 cursor-pointer"
//                               />
//                             </div>
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         <tr>
//                           <td>1</td>
//                           <td>
//                             <textarea
//                               {...register("mainWord")}
//                               className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
//                               placeholder={`Enter Your ${item.mainWord}`}
//                             />
//                           </td>
//                           <td>
//                             <textarea
//                               {...register("banglaPronunciation")}
//                               className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
//                               placeholder={`Enter Your ${item.banglaPronunciation}`}
//                             />
//                           </td>
//                           <td>
//                             <textarea
//                               {...register("banglaMeaning")}
//                               className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
//                               placeholder={`Enter Your ${item.banglaMeaning}`}
//                             />
//                           </td>
//                           <td>
//                             <textarea
//                               {...register("synonyms")}
//                               className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
//                               placeholder={`Enter Your ${item.synonyms}`}
//                             />
//                           </td>
//                           <td>
//                             <textarea
//                               {...register("antonyms")}
//                               className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
//                               placeholder={`Enter Your ${item.antonyms}`}
//                             />
//                           </td>
//                           <td>
//                             <textarea
//                               {...register("exampleEnglish")}
//                               className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
//                               placeholder={`Enter Your ${item.exampleEnglish}`}
//                             />
//                           </td>
//                           <td>
//                             <textarea
//                               {...register("exampleBangla")}
//                               className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
//                               placeholder={`Enter Your ${item.exampleBangla}`}
//                             />
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   ))}
//                 </form>
//               </div>

//               {/* Submit Button - Outside the scrollable area */}
//               <div className="flex justify-center mt-6 bg-white py-4 rounded-b-2xl border-t border-gray-200">
//                 <button
//                   type="submit"
//                   onClick={handleSubmit(onSubmit)}
//                   className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md text-lg font-semibold"
//                 >
//                   Submit Vocabulary
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* History */}
//       <div className="bg-white rounded-lg shadow-md p-5 mt-10">
//         <h1 className="mb-5">
//           Total Vocabulary Items:{" "}
//           <span className="text-3xl font-bold ">{vocabulary.length}</span>
//         </h1>

//         <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
//           {vocabularyLoading ? (
//             <div className="p-6 text-center text-gray-500">
//               Loading vocabulary...
//             </div>
//           ) : vocabularyError ? (
//             <div className="p-6 text-center text-red-500">
//               Error loading vocabulary.
//             </div>
//           ) : (
//             <table className="table w-full">
//               {vocabularyFields?.map((item, index) => (
//                 <thead
//                   key={item._id}
//                   className="bg-[#bb874a] text-white text-sm"
//                 >
//                   <tr>
//                     <th className="min-w-10">Serial</th>
//                     <th className="min-w-96">{item?.mainWord}</th>
//                     <th className="min-w-96">{item?.banglaPronunciation}</th>
//                     <th className="min-w-96">{item?.banglaMeaning}</th>
//                     <th className="min-w-96">{item?.synonyms}</th>
//                     <th className="min-w-96">{item?.antonyms}</th>
//                     <th className="min-w-96">{item?.exampleEnglish}</th>
//                     <th className="min-w-96">{item?.exampleBangla}</th>
//                     <th className="min-w-16">Action</th>
//                   </tr>
//                 </thead>
//               ))}
//               <tbody>
//                 {visibleVocabulary.length > 0 ? (
//                   visibleVocabulary.map((row, i) => (
//                     <tr
//                       key={i}
//                       className="hover:bg-gray-50 transition border-b text-sm"
//                     >
//                       <td className="font-semibold min-w-10">{i + 1}</td>
//                       <td>
//                         <textarea
//                           readOnly
//                           className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
//                           defaultValue={row.mainWord}
//                         />
//                       </td>
//                       <td>
//                         <textarea
//                           readOnly
//                           className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
//                           defaultValue={row.banglaPronunciation}
//                         />
//                       </td>
//                       <td>
//                         <textarea
//                           readOnly
//                           className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
//                           defaultValue={row.banglaMeaning}
//                         />
//                       </td>
//                       <td>
//                         <textarea
//                           readOnly
//                           className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
//                           defaultValue={row.synonyms}
//                         />
//                       </td>
//                       <td>
//                         <textarea
//                           readOnly
//                           className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
//                           defaultValue={row.antonyms}
//                         />
//                       </td>
//                       <td>
//                         <textarea
//                           readOnly
//                           className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
//                           defaultValue={row.exampleEnglish}
//                         />
//                       </td>
//                       <td>
//                         <textarea
//                           readOnly
//                           className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
//                           defaultValue={row.exampleBangla}
//                         />
//                       </td>

//                       <td className="min-w-16">
//                         <button
//                           onClick={() => handleDelete(row._id)}
//                           className="px-2 py-1 text-red-600 rounded-md hover:bg-red-100 flex items-center gap-1"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" className="text-center py-6 text-gray-500">
//                       No vocabulary found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//         {vocabulary.length > 10 && (
//           <div className="flex justify-center mt-4">
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               {showAll ? "See Less" : "See More"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <EditModal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           fieldName={fieldName}
//           currentValue={currentValue}
//           vocabId={selectedVocabId}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminVocabulary;
