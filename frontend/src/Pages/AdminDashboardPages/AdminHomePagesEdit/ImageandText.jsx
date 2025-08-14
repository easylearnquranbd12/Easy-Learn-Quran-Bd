import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ImageandText = () => {
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      tittle: "",
      description: "",
      status: "inactive",
    },
  });

  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data: imageandtext = [], isLoading } = useQuery({
    queryKey: ["imageandtext"],
    queryFn: async () => {
      const res = await axiosPublic.get("/imageandtext");
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData) => axiosPublic.post("/imageandtext", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["imageandtext"]);
      Swal.fire("Success!", "Entry added successfully.", "success");
      resetForm();
    },
    onError: () => Swal.fire("Error!", "Failed to add entry.", "error"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.put(`/imageandtext/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["imageandtext"]);
      Swal.fire("Success!", "Entry updated successfully.", "success");
      resetForm();
    },
    onError: () => Swal.fire("Error!", "Failed to update entry.", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/imageandtext/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Entry deleted successfully.", "success");
      } else {
        Swal.fire("Info", "Entry not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["imageandtext"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete entry.", "error"),
  });

  const resetForm = () => {
    reset({
      tittle: "",
      description: "",
      status: "inactive",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

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

  const onSubmit = async (data) => {
    if (!editingId && imageandtext.length >= 1) {
      Swal.fire("Not Allowed", "You can't add more than one entry.", "warning");
      return;
    }
    let imageUrl = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";
      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const json = await res.json();
        if (json?.data?.url) imageUrl = json.data.url;
        else {
          Swal.fire("Error!", "Image upload failed!", "error");
          return;
        }
      } catch {
        Swal.fire("Error!", "Image upload failed!", "error");
        return;
      }
    } else if (editingId) {
      imageUrl = imagePreview || "";
    } else {
      Swal.fire("Error!", "Please select an image.", "error");
      return;
    }

    const finalData = {
      tittle: data.tittle,
      description: data.description,
      image: imageUrl,
      status: "inactive",
    };

    if (!editingId) createMutation.mutate(finalData);
    else updateMutation.mutate({ id: editingId, data: finalData });
  };

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  return (
    <div>
      <Helmet>
        <title>Admin | Image and Text</title>
      </Helmet>

      <div className="flex flex-col items-center min-h-[80vh] py-6 space-y-8 px-4">
        {/* Form */}
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl border p-6">
          <h1 className="text-center text-2xl font-semibold mt-2 mb-8 text-primary">
            {editingId ? "Edit Entry" : "Add New Entry"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files.length > 0) setImageFile(e.target.files[0]);
              }}
              className="block w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mt-2"
              />
            )}
            <Controller
              name="tittle"
              control={control}
              rules={{
                required: "Title is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Enter title..."
                    className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <textarea
                    {...field}
                    placeholder="Enter description..."
                    className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                    rows={4}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <button
              type="submit"
              className="w-full py-2 bg-primary hover:bg-hoverPrimary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={createMutation.isLoading || updateMutation.isLoading}
            >
              {createMutation.isLoading || updateMutation.isLoading
                ? editingId
                  ? "Updating..."
                  : "Adding..."
                : editingId
                ? "Update Entry"
                : "Add Entry"}
            </button>
            {editingId && (
              <button
                type="button"
                className="w-full py-2 mt-2 border border-gray-400 text-gray-700 rounded"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* List */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4 text-indigo-700">
            Entries List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : imageandtext.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No entries found.
                    </td>
                  </tr>
                ) : (
                  imageandtext.map((item) => (
                    <tr key={item._id} className="even:bg-gray-50">
                      <td className="border px-4 py-2 text-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.tittle}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="border px-4 py-2">{item.tittle}</td>
                      <td className="border px-4 py-2 max-w-xs truncate">
                        {item.description}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex gap-2 justify-center flex-wrap">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
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
  );
};

export default ImageandText;
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Edit2, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Controller, useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const ImageandText = () => {
//   const { handleSubmit, control, reset, setValue } = useForm({
//     defaultValues: {
//       tittle: "",
//       description: "",
//       status: "inactive",
//     },
//   });

//   const [editingId, setEditingId] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();

//   const { data: imageandtext = [], isLoading } = useQuery({
//     queryKey: ["imageandtext"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/imageandtext");
//       return res.data;
//     },
//   });

//   const createMutation = useMutation({
//     mutationFn: (newData) => axiosPublic.post("/imageandtext", newData),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["imageandtext"]);
//       Swal.fire("Success!", "Entry added successfully.", "success");
//       resetForm();
//     },
//     onError: () => Swal.fire("Error!", "Failed to add entry.", "error"),
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }) => axiosPublic.put(`/imageandtext/${id}`, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["imageandtext"]);
//       Swal.fire("Success!", "Entry updated successfully.", "success");
//       resetForm();
//     },
//     onError: () => Swal.fire("Error!", "Failed to update entry.", "error"),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id) => axiosPublic.delete(`/imageandtext/${id}`),
//     onSuccess: (res) => {
//       if (res.data?.deletedCount > 0) {
//         Swal.fire("Deleted!", "Entry deleted successfully.", "success");
//       } else {
//         Swal.fire("Info", "Entry not found or already deleted.", "info");
//       }
//       queryClient.invalidateQueries(["imageandtext"]);
//     },
//     onError: () => Swal.fire("Error!", "Failed to delete entry.", "error"),
//   });

//   const resetForm = () => {
//     reset({
//       tittle: "",
//       description: "",
//       status: "inactive",
//     });
//     setImageFile(null);
//     setImagePreview(null);
//     setEditingId(null);
//   };

//   const handleEdit = (item) => {
//     setEditingId(item._id);
//     setValue("tittle", item.tittle || "");
//     setValue("description", item.description || "");
//     setImagePreview(item.image || null);
//   };

//   const handleMakeActive = async (item) => {
//     if (item.status === "active") {
//       Swal.fire("Info", "This item is already active.", "info");
//       return;
//     }

//     const confirm = await Swal.fire({
//       title: "Make this entry active?",
//       text: "Only one entry can be active at a time.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, make active",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#aaa",
//     });

//     if (confirm.isConfirmed) {
//       updateMutation.mutate({ id: item._id, data: { ...item, status: "active" } });
//     }
//   };

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

//   const onSubmit = async (data) => {
//     let imageUrl = "";

//     if (imageFile) {
//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";
//       try {
//         const res = await fetch(
//           `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
//         const json = await res.json();
//         if (json?.data?.url) imageUrl = json.data.url;
//         else {
//           Swal.fire("Error!", "Image upload failed!", "error");
//           return;
//         }
//       } catch {
//         Swal.fire("Error!", "Image upload failed!", "error");
//         return;
//       }
//     } else if (editingId) {
//       imageUrl = imagePreview || "";
//     } else {
//       Swal.fire("Error!", "Please select an image.", "error");
//       return;
//     }

//     const finalData = {
//       tittle: data.tittle,
//       description: data.description,
//       image: imageUrl,
//       status: "inactive",
//     };

//     if (!editingId) createMutation.mutate(finalData);
//     else updateMutation.mutate({ id: editingId, data: finalData });
//   };

//   useEffect(() => {
//     if (!imageFile) {
//       setImagePreview(null);
//       return;
//     }
//     const objectUrl = URL.createObjectURL(imageFile);
//     setImagePreview(objectUrl);
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [imageFile]);

//   return (
//     <div>
//       <Helmet>
//         <title>Admin | Image and Text</title>
//       </Helmet>

//       <div className="flex flex-col items-center min-h-[80vh] py-6 space-y-8 px-4">
//         {/* Form */}
//         <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl border p-6">
//           <h1 className="text-center text-2xl font-semibold mt-2 mb-8 text-primary">
//             {editingId ? "Edit Entry" : "Add New Entry"}
//           </h1>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 if (e.target.files.length > 0) setImageFile(e.target.files[0]);
//               }}
//               className="block w-full"
//             />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-32 h-32 object-cover rounded mt-2"
//               />
//             )}
//             <Controller
//               name="tittle"
//               control={control}
//               rules={{
//                 required: "Title is required",
//                 minLength: { value: 2, message: "Minimum 2 characters" },
//               }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <input
//                     {...field}
//                     placeholder="Enter title..."
//                     className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
//                       fieldState.error
//                         ? "border-red-500 focus:ring-red-200"
//                         : "border-gray-300 focus:ring-green-200"
//                     }`}
//                   />
//                   {fieldState.error && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {fieldState.error.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name="description"
//               control={control}
//               rules={{ required: "Description is required" }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <textarea
//                     {...field}
//                     placeholder="Enter description..."
//                     className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
//                       fieldState.error
//                         ? "border-red-500 focus:ring-red-200"
//                         : "border-gray-300 focus:ring-green-200"
//                     }`}
//                     rows={4}
//                   />
//                   {fieldState.error && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {fieldState.error.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <button
//               type="submit"
//               className="w-full py-2 bg-primary hover:bg-hoverPrimary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={createMutation.isLoading || updateMutation.isLoading}
//             >
//               {createMutation.isLoading || updateMutation.isLoading
//                 ? editingId
//                   ? "Updating..."
//                   : "Adding..."
//                 : editingId
//                 ? "Update Entry"
//                 : "Add Entry"}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 className="w-full py-2 mt-2 border border-gray-400 text-gray-700 rounded"
//                 onClick={resetForm}
//               >
//                 Cancel Edit
//               </button>
//             )}
//           </form>
//         </div>

//         {/* List */}
//         <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl border p-6">
//           <h2 className="text-lg font-semibold mb-4 text-indigo-700">
//             Entries List
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-4 py-2">Image</th>
//                   <th className="border px-4 py-2">Title</th>
//                   <th className="border px-4 py-2">Description</th>
//                   <th className="border px-4 py-2">Status</th>
//                   <th className="border px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-4">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : imageandtext.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-4">
//                       No entries found.
//                     </td>
//                   </tr>
//                 ) : (
//                   imageandtext.map((item) => (
//                     <tr key={item._id} className="even:bg-gray-50">
//                       <td className="border px-4 py-2 text-center">
//                         {item.image ? (
//                           <img
//                             src={item.image}
//                             alt={item.tittle}
//                             className="w-20 h-20 object-cover rounded"
//                           />
//                         ) : (
//                           "No Image"
//                         )}
//                       </td>
//                       <td className="border px-4 py-2">{item.tittle}</td>
//                       <td className="border px-4 py-2 max-w-xs truncate">{item.description}</td>
//                       <td className="border px-4 py-2 text-center">
//                         {item.status === "active" ? (
//                           <span className="text-green-600 font-semibold">Active</span>
//                         ) : (
//                           <span className="text-red-600 font-semibold">Inactive</span>
//                         )}
//                       </td>
//                       <td className="border px-4 py-2 text-center">
//                         <div className="flex gap-2 justify-center flex-wrap">
//                           <button
//                             onClick={() => handleEdit(item)}
//                             className="text-blue-600"
//                             title="Edit"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(item._id)}
//                             className="text-red-600"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                           {item.status !== "active" && (
//                             <button
//                               onClick={() => handleMakeActive(item)}
//                               className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
//                             >
//                               Make Active
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageandText;
