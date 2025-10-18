// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Edit, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Controller, useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
// import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
// import RichTextField from "../../../../../shared/TextEditor/RichTextField";
// import LetterWrittingModal from "./LetterWrittingModal";

// const AdminLetterWritting = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [fieldName, setFieldName] = useState("");
//   const [selectedVocabId, setSelectedVocabId] = useState(null);
//   const [currentValue, setCurrentValue] = useState("");

//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();

//   // ✅ Form Setup
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       description: "",
//     },
//   });

//   // ✅ Fetch vocabulary fields
//   const { data: letterWritingFields = [] } = useQuery({
//     queryKey: ["letterWritingFields"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/five-layer/letterWritingField");
//       return res.data?.data || [];
//     },
//   });
//   // ✅ Create Song
//   const createMutation = useMutation({
//     mutationFn: (newData) =>
//       axiosPublic.post("/five-layer/letterWriting", newData),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["letterWriting"]);
//       Swal.fire(
//         "✅ Success!",
//         "Good Life Style added successfully.",
//         "success"
//       );
//       resetForm();
//     },
//     onError: () => Swal.fire("❌ Error!", "Failed to add song.", "error"),
//   });
//   // ✅ Get all song fetch Data
//   const { data: letterWritings = [], isLoading } = useQuery({
//     queryKey: ["letterWritings"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/five-layer/letterWriting");
//       return res.data || [];
//     },
//   });

//   console.log(letterWritings);
//   // ✅ Delete Song
//   const deleteMutation = useMutation({
//     mutationFn: (id) => axiosPublic.delete(`/five-layer/letterWritingField/${id}`),
//     onSuccess: (res) => {
//       if (res.data?.deletedCount > 0) {
//         Swal.fire("Deleted!", "Song deleted successfully.", "success");
//       } else {
//         Swal.fire("Info", "Song not found or already deleted.", "info");
//       }
//       queryClient.invalidateQueries(["letterWritings"]);
//     },
//     onError: () => Swal.fire("Error!", "Failed to delete song.", "error"),
//   });

//   // ✅ Reset Form
//   const resetForm = () => {
//     reset({
//       name: "",
//       description: "",
//     });
//   };

//   // ✅ Submit Handler
//   const onSubmit = async (data) => {
//     // if (!imageUrl) {
//     //   Swal.fire("Error!", "Please upload a song image.", "error");
//     //   return;
//     // }

//     createMutation.mutate(data);
//   };

//   // ✅ Delete Handler
//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });
//     if (confirm.isConfirmed) deleteMutation.mutate(id);
//   };

//   // ✅ Modal Edit Handler
//   const handleEditClick = (field, value, id) => {
//     setFieldName(field);
//     setCurrentValue(value);
//     setSelectedVocabId(id);
//     setModalOpen(true);
//   };

//   // ✅ Toggle Handler
//   const toggleIsActiveMutation = useMutation({
//     mutationFn: async (currentState) => {
//       const res = await axiosPublic.put(`/five-layer/letterWritingField/toggle`, {
//         fieldName: "isActive",
//         currentValue: currentState,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: `Song field is now ${data.updatedValue}`,
//       });
//       queryClient.invalidateQueries(["letterWritingFields"]);
//     },
//     onError: (error) =>
//       Swal.fire(
//         "Error!",
//         error.response?.data?.message || error.message,
//         "error"
//       ),
//   });

//   const handleToggle = (currentState) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You want to turn ${
//         currentState === "ON" ? "OFF" : "ON"
//       } this field?`,
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

//   // ✅ Safe truncate function
//   const truncateHTML = (html = "", wordLimit = 10) => {
//     if (!html || typeof html !== "string") return "";
//     const text = html.replace(/<[^>]+>/g, " ");
//     const words = text.split(/\s+/).filter(Boolean).slice(0, wordLimit);
//     return (
//       words.join(" ") + (text.split(/\s+/).length > wordLimit ? "..." : "")
//     );
//   };

//   return (
//     <div className=" px-2">
//       <Helmet>
//         <title>Admin | Create Good Life Style Management</title>
//       </Helmet>

//       <TittleAnimation
//         tittle="Create Good Life Style"
//         subtittle="Manage letterWriting & Vocabulary Fields"
//       />

//       <div className="mt-10 lg:min-w-[1000px]">
//         <div className=" w-full bg-white shadow-md rounded-2xl p-3 md:p-5">
//           {/* ✅ Vocabulary Fields Section */}
//           <div className="text-center mb-6">
//             {letterWritingFields && letterWritingFields.length > 0 && (
//               <>
//                 <div className="flex items-start justify-center gap-2 mb-2">
//                   {letterWritingFields[0].title || "Title"}
//                   <Edit
//                     onClick={() =>
//                       handleEditClick(
//                         "title",
//                         letterWritingFields[0].title,
//                         letterWritingFields[0]._id
//                       )
//                     }
//                     className="w-5 h-5 text-green-600 cursor-pointer"
//                   />
//                 </div>

//                 <div className="flex items-start justify-center gap-2">
//                   <span className="text-base">
//                     {letterWritingFields[0].description || "Description"}
//                   </span>
//                   <Edit
//                     onClick={() =>
//                       handleEditClick(
//                         "description",
//                         letterWritingFields[0].description,
//                         letterWritingFields[0]._id
//                       )
//                     }
//                     className="w-5 h-5 text-green-600 cursor-pointer"
//                   />
//                 </div>
//               </>
//             )}

//             {letterWritingFields.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center gap-2 justify-center mt-3"
//               >
//                 <span className="font-semibold">
//                   Toggle {item.title || "Song Field"}
//                 </span>
//                 <input
//                   type="checkbox"
//                   className={`toggle ${
//                     item.isActive === "ON" ? "toggle-success" : ""
//                   }`}
//                   checked={item.isActive === "ON"}
//                   onChange={() => handleToggle(item.isActive)}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* ✅ Create Song Form */}
//           <div className="w-full  bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//               {/* Song Name */}
//               <div className="form-control w-full py-6">
//                 <label className="label">
//                   <span className="label-text text-base font-medium text-gray-700">
//                     Name:
//                   </span>
//                 </label>
//                 <Controller
//                   name="name"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       placeholder="Enter song name..."
//                       className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
//                     />
//                   )}
//                 />
//               </div>
//               <div className="w-full">
//                 <RichTextField
//                   name="description"
//                   control={control}
//                   placeholder="Enter Your Description..."
//                   className="w-full min-h-[300px]" // ensure editor is full width
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-orange-600 disabled:opacity-70 disabled:cursor-not-allowed"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Adding..." : "Add Song"}
//               </button>
//             </form>
//           </div>

//           {/* ✅ letterWriting List */}
//           <div className="w-full bg-white shadow-lg rounded-xl border p-4 sm:p-6">
//             <h2 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-700">
//               List
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="table-auto w-full text-sm sm:text-base">
//                 <thead className="bg-black text-white">
//                   <tr>
//                     <th className="px-4 py-2">Name</th>
//                     <th className="px-4 py-2">Description</th>
//                     <th className="px-4 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {isLoading ? (
//                     <tr>
//                       <td colSpan={3} className="text-center py-4">
//                         Loading...
//                       </td>
//                     </tr>
//                   ) : letterWritings.length === 0 ? (
//                     <tr>
//                       <td colSpan={3} className="text-center py-4">
//                         No letter Writing found.
//                       </td>
//                     </tr>
//                   ) : (
//                     letterWritings.map((item) => (
//                       <tr key={item._id} className="hover:bg-gray-50 border-b">
//                         <td className="px-4 py-2 text-center">{item.name}</td>
//                         <td
//                           className="px-4 py-2 text-center"
//                           dangerouslySetInnerHTML={{
//                             __html: truncateHTML(item.description, 10),
//                           }}
//                         ></td>
//                         <td className="px-4 py-2 text-center">
//                           <button
//                             onClick={() => handleDelete(item._id)}
//                             className="text-red-600 hover:text-red-800"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Modal */}
//       {modalOpen && (
//         <LetterWrittingModal
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

// export default AdminLetterWritting;




import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import RichTextField from "../../../../../shared/TextEditor/RichTextField";
import LetterWrittingModal from "./LetterWrittingModal";

const AdminStoryWritting = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // ✅ Form Setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // ✅ Fetch vocabulary fields
  const { data: letterWritingFields = [] } = useQuery({
    queryKey: ["letterWritingFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/letterWritingField");
      return res.data?.data || [];
    },
  });
  // ✅ Create Song
  const createMutation = useMutation({
    mutationFn: (newData) =>
      axiosPublic.post("/five-layer/letterWriting", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["songs"]);
      Swal.fire(
        "✅ Success!",
        "Good Life Style added successfully.",
        "success"
      );
      resetForm();
    },
    onError: () => Swal.fire("❌ Error!", "Failed to add song.", "error"),
  });
  // ✅ Get all song fetch Data
  const { data: letterWritings = [], isLoading } = useQuery({
    queryKey: ["letterWritings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/letterWriting");
      return res.data || [];
    },
  });

  console.log(letterWritings);
  // ✅ Delete Song
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/five-layer/letterWriting/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Song deleted successfully.", "success");
      } else {
        Swal.fire("Info", "Song not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["songs"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete song.", "error"),
  });

  // ✅ Reset Form
  const resetForm = () => {
    reset({
      name: "",
      description: "",
    });
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    // if (!imageUrl) {
    //   Swal.fire("Error!", "Please upload a song image.", "error");
    //   return;
    // }

    createMutation.mutate(data);
  };

  // ✅ Delete Handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) deleteMutation.mutate(id);
  };

  // ✅ Modal Edit Handler
  const handleEditClick = (field, value, id) => {
    setFieldName(field);
    setCurrentValue(value);
    setSelectedVocabId(id);
    setModalOpen(true);
  };

  // ✅ Toggle Handler
  const toggleIsActiveMutation = useMutation({
    mutationFn: async (currentState) => {
      const res = await axiosPublic.put(`/five-layer/letterWritingField/toggle`, {
        fieldName: "isActive",
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Song field is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries(["letterWritingFields"]);
    },
    onError: (error) =>
      Swal.fire(
        "Error!",
        error.response?.data?.message || error.message,
        "error"
      ),
  });

  const handleToggle = (currentState) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to turn ${
        currentState === "ON" ? "OFF" : "ON"
      } this field?`,
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

  // ✅ Safe truncate function
  const truncateHTML = (html = "", wordLimit = 10) => {
    if (!html || typeof html !== "string") return "";
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).slice(0, wordLimit);
    return (
      words.join(" ") + (text.split(/\s+/).length > wordLimit ? "..." : "")
    );
  };

  return (
    <div className=" px-2">
      <Helmet>
        <title>Admin | Create Good Life Style Management</title>
      </Helmet>

      <TittleAnimation
        tittle="Create Good Life Style"
        subtittle="Manage Songs & Vocabulary Fields"
      />

      <div className="mt-10 lg:min-w-[1000px]">
        <div className=" w-full bg-white shadow-md rounded-2xl p-3 md:p-5">
          {/* ✅ Vocabulary Fields Section */}
          <div className="text-center mb-6">
            {letterWritingFields && letterWritingFields.length > 0 && (
              <>
                <div className="flex items-start justify-center gap-2 mb-2">
                  {letterWritingFields[0].title || "Title"}
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "title",
                        letterWritingFields[0].title,
                        letterWritingFields[0]._id
                      )
                    }
                    className="w-5 h-5 text-green-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-center gap-2">
                  <span className="text-base">
                    {letterWritingFields[0].description || "Description"}
                  </span>
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "description",
                        letterWritingFields[0].description,
                        letterWritingFields[0]._id
                      )
                    }
                    className="w-5 h-5 text-green-600 cursor-pointer"
                  />
                </div>
              </>
            )}

            {letterWritingFields.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-2 justify-center mt-3"
              >
                <span className="font-semibold">
                  Toggle {item.title || "Song Field"}
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

          {/* ✅ Create Song Form */}
          <div className="w-full  bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Song Name */}
              <div className="form-control w-full py-6">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Name:
                  </span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter song name..."
                      className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <RichTextField
                  name="description"
                  control={control}
                  placeholder="Enter Your Description..."
                  className="w-full min-h-[300px]" // ensure editor is full width
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-orange-600 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Song"}
              </button>
            </form>
          </div>

          {/* ✅ Songs List */}
          <div className="w-full bg-white shadow-lg rounded-xl border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-700">
              List
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm sm:text-base">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : letterWritings.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No songs found.
                      </td>
                    </tr>
                  ) : (
                    letterWritings.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 border-b">
                        <td className="px-4 py-2 text-center">{item.name}</td>
                        <td
                          className="px-4 py-2 text-center"
                          dangerouslySetInnerHTML={{
                            __html: truncateHTML(item.description, 10),
                          }}
                        ></td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      {modalOpen && (
        <LetterWrittingModal
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

export default AdminStoryWritting;
