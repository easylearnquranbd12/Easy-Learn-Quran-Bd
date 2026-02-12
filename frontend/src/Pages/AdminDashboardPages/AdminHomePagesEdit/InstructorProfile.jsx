import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const InstructorProfile = () => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data: instructors = [], isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/instructors");
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData) => axiosPublic.post("/instructors", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["instructors"]);
      Swal.fire("Success!", "Instructor added successfully.", "success");
      reset();
      setImageFile(null);
      setEditingId(null);
    },
    onError: () => Swal.fire("Error!", "Failed to add instructor.", "error"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.put(`/instructors/${id}`, data),
    onSuccess: (res) => {
      const modified = res.data.modifiedCount || res.data.acknowledged;
      if (modified) {
        Swal.fire("Updated!", "Instructor updated successfully.", "success");
      } else {
        Swal.fire("No Changes", "No changes were made.", "info");
      }
      queryClient.invalidateQueries(["instructors"]);
      reset();
      setEditingId(null);
      setImageFile(null);
    },
    onError: () => Swal.fire("Error!", "Failed to update instructor.", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/instructors/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Instructor deleted successfully.", "success");
      } else {
        Swal.fire("Failed", "Instructor not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["instructors"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete instructor.", "error"),
  });

  const handleMakeActive = async (instructor) => {
    if (instructor.status === "active") {
      Swal.fire("Info", "This instructor is already active.", "info");
      return;
    }
    const result = await Swal.fire({
      title: "Make this instructor active?",
      text: "Only one instructor can be active at a time.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, make active",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
    });
    if (result.isConfirmed) {
      updateMutation.mutate({ id: instructor._id, data: { status: "active" } });
    }
  };

  const onSubmit = async (data) => {
    data.status = "inactive";
    let imageUrl = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";
      const res = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      if (res.data?.data?.url) imageUrl = res.data.data.url;
      else {
        Swal.fire("Error!", "Image upload failed!", "error");
        return;
      }
    } else if (editingId) {
      imageUrl = instructors.find((i) => i._id === editingId)?.image || "";
    }

    const finalData = {
      name: data.name,
      subject: data.subject,
      rating: data.rating,
      description: data.description,
      totalCourses: data.totalCourses,
      experience: data.experience,
      image: imageUrl,
      status: data.status,
    };

    if (!editingId) createMutation.mutate(finalData);
    else updateMutation.mutate({ id: editingId, data: finalData });
  };

  const handleEdit = (instructor) => {
    setEditingId(instructor._id);
    setValue("name", instructor.name);
    setValue("subject", instructor.subject);
    setValue("rating", instructor.rating);
    setValue("description", instructor.description);
    setValue("totalCourses", instructor.totalCourses);
    setValue("experience", instructor.experience);
    setImageFile(null);
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

  return (
    <div>
      <Helmet>
        <title>Admin | Instructors</title>
      </Helmet>

      <div className="flex flex-col items-center min-h-[80vh] py-6 space-y-8 px-4">
        <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl border p-6">
          <TittleAnimation
            tittle="Instructors"
            subtittle={editingId ? "Update Instructor" : "Create Instructor"}
          />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full"
            />

            <Controller
              name="name"
              defaultValue=""
              control={control}
              rules={{
                required: "Name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Enter your Name..."
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
              name="subject"
              defaultValue=""
              control={control}
              rules={{ required: "Subject is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Be The Shape \ Physics \ Chemesti "
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
              name="rating"
              defaultValue=""
              control={control}
              rules={{ required: "Rating is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    type="number"
                    placeholder="Rating..."
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
              defaultValue=""
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <textarea
                    {...field}
                    placeholder="Enter your Description..."
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
              name="totalCourses"
              defaultValue=""
              control={control}
              rules={{
                required: "total Courses is required",
                minLength: { value: 1, message: "Minimum 1 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    placeholder="total courses ..."
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
              name="experience"
              defaultValue=""
              control={control}
              rules={{
                required: "experience is required",
                minLength: { value: 1, message: "Minimum 1 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Enter your experience..."
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
            <button
              type="submit"
              className="w-full py-2 bg-primary hover:bg-hoverPrimary text-white rounded"
            >
              {editingId ? "Update Instructor" : "Add Instructor"}
            </button>
          </form>
        </div>

        <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4 text-indigo-700">
            Instructor List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Rating</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  instructors.map((instructor) => (
                    <tr
                      key={instructor._id}
                      className={
                        instructor.status === "active" ? "bg-green-50" : ""
                      }
                    >
                      <td className="border px-4 py-2">{instructor.name}</td>
                      <td className="border px-4 py-2">{instructor.subject}</td>
                      <td className="border px-4 py-2">{instructor.rating}</td>
                      <td className="border px-4 py-2 text-center">
                        {instructor.status === "active" ? (
                          <span className="text-green-600 font-bold">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-500">Inactive</span>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex gap-2 flex-wrap justify-center">
                          <button
                            onClick={() => handleEdit(instructor)}
                            className="text-blue-600"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(instructor._id)}
                            className="text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                          {instructor.status !== "active" && (
                            <button
                              onClick={() => handleMakeActive(instructor)}
                              className="bg-green-500 text-white px-2 py-1 text-xs rounded"
                            >
                              Make Active
                            </button>
                          )}
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

export default InstructorProfile;
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Edit2, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Controller, useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const InstructorProfile = () => {
//   const { handleSubmit, control, reset, setValue } = useForm();
//   const [editingId, setEditingId] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();

//   const { data: instructors = [], isLoading } = useQuery({
//     queryKey: ["instructors"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/instructors");
//       return res.data;
//     },
//   });

//   const createMutation = useMutation({
//     mutationFn: (newData) => axiosPublic.post("/instructors", newData),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["instructors"]);
//       Swal.fire("Success!", "Instructor added successfully.", "success");
//       reset();
//       setImageFile(null);
//       setEditingId(null);
//     },
//     onError: () => Swal.fire("Error!", "Failed to add instructor.", "error"),
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }) => axiosPublic.put(`/instructors/${id}`, data),
//     onSuccess: (res) => {
//       const modified = res.data.modifiedCount || res.data.acknowledged;
//       if (modified) {
//         Swal.fire("Updated!", "Instructor updated successfully.", "success");
//       } else {
//         Swal.fire("No Changes", "No changes were made.", "info");
//       }
//       queryClient.invalidateQueries(["instructors"]);
//       reset();
//       setEditingId(null);
//       setImageFile(null);
//     },
//     onError: () => Swal.fire("Error!", "Failed to update instructor.", "error"),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id) => axiosPublic.delete(`/instructors/${id}`),
//     onSuccess: (res) => {
//       if (res.data?.deletedCount > 0) {
//         Swal.fire("Deleted!", "Instructor deleted successfully.", "success");
//       } else {
//         Swal.fire("Failed", "Instructor not found or already deleted.", "info");
//       }
//       queryClient.invalidateQueries(["instructors"]);
//     },
//     onError: () => Swal.fire("Error!", "Failed to delete instructor.", "error"),
//   });

//   const handleMakeActive = async (instructor) => {
//     if (instructor.status === "active") {
//       Swal.fire("Info", "This instructor is already active.", "info");
//       return;
//     }
//     const result = await Swal.fire({
//       title: "Make this instructor active?",
//       text: "Only one instructor can be active at a time.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, make active",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#3085d6",
//     });
//     if (result.isConfirmed) {
//       updateMutation.mutate({ id: instructor._id, data: { status: "active" } });
//     }
//   };

//   const onSubmit = async (data) => {
//     data.status = "inactive";
//     let imageUrl = "";
//     if (imageFile) {
//       const formData = new FormData();
//       formData.append("image", imageFile);
//       const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";
//       const res = await axiosPublic.post(
//         `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//         formData
//       );
//       if (res.data?.data?.url) imageUrl = res.data.data.url;
//       else {
//         Swal.fire("Error!", "Image upload failed!", "error");
//         return;
//       }
//     } else if (editingId) {
//       imageUrl = instructors.find((i) => i._id === editingId)?.image || "";
//     }

//     const finalData = {
//       name: data.name,
//       subject: data.subject,
//       rating: data.rating,
//       description: data.description,
//       totalCourses: data.totalCourses,
//       experience: data.experience,
//       image: imageUrl,
//       status: data.status,
//     };

//     if (!editingId) createMutation.mutate(finalData);
//     else updateMutation.mutate({ id: editingId, data: finalData });
//   };

//   const handleEdit = (instructor) => {
//     setEditingId(instructor._id);
//     setValue("name", instructor.name);
//     setValue("subject", instructor.subject);
//     setValue("rating", instructor.rating);
//     setValue("description", instructor.description);
//     setValue("totalCourses", instructor.totalCourses);
//     setValue("experience", instructor.experience);
//     setImageFile(null);
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

//   return (
//     <div>
//       <Helmet>
//         <title>Admin | Instructors</title>
//       </Helmet>

//       <div className="flex flex-col items-center min-h-[80vh] py-6 space-y-8 px-4">
//         <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl border p-6">
//           <TittleAnimation
//             tittle="Instructors"
//             subtittle={editingId ? "Update Instructor" : "Create Instructor"}
//           />
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImageFile(e.target.files[0])}
//               className="block w-full"
//             />

//             <Controller
//               name="name"
//               defaultValue=""
//               control={control}
//               rules={{
//                 required: "Name is required",
//                 minLength: { value: 2, message: "Minimum 2 characters" },
//               }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <input
//                     {...field}
//                     placeholder="Enter your Name..."
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
//               name="subject"
//               defaultValue=""
//               control={control}
//               rules={{ required: "Subject is required" }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <input
//                     {...field}
//                     placeholder="Be The Shape \ Physics \ Chemesti "
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
//               name="rating"
//               defaultValue=""
//               control={control}
//               rules={{ required: "Rating is required" }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <input
//                     {...field}
//                     type="number"
//                     placeholder="Rating..."
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
//               defaultValue=""
//               control={control}
//               rules={{ required: "Description is required" }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <textarea
//                     {...field}
//                     placeholder="Enter your Description..."
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
//               <Controller
//               name="totalCourses"
//               defaultValue=""
//               control={control}
//               rules={{
//                 required: "total Courses is required",
//                 minLength: { value: 1, message: "Minimum 1 characters" },
//               }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <input
//                     {...field}
//                     placeholder="total courses ..."
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
//               <Controller
//               name="experience"
//               defaultValue=""
//               control={control}
//               rules={{
//                 required: "experience is required",
//                 minLength: { value: 1, message: "Minimum 1 characters" },
//               }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <input
//                     {...field}
//                     placeholder="Enter your experience..."
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
//             <button
//               type="submit"
//               className="w-full py-2 bg-primary hover:bg-hoverPrimary text-white rounded"
//             >
//               {editingId ? "Update Instructor" : "Add Instructor"}
//             </button>
//           </form>
//         </div>

//         <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl border p-6">
//           <h2 className="text-lg font-semibold mb-4 text-indigo-700">
//             Instructor List
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-4 py-2">Name</th>
//                   <th className="border px-4 py-2">Subject</th>
//                   <th className="border px-4 py-2">Rating</th>
//                   <th className="border px-4 py-2">Status</th>
//                   <th className="border px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan="5" className="text-center py-4">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : (
//                   instructors.map((instructor) => (
//                     <tr
//                       key={instructor._id}
//                       className={
//                         instructor.status === "active" ? "bg-green-50" : ""
//                       }
//                     >
//                       <td className="border px-4 py-2">{instructor.name}</td>
//                       <td className="border px-4 py-2">{instructor.subject}</td>
//                       <td className="border px-4 py-2">{instructor.rating}</td>
//                       <td className="border px-4 py-2 text-center">
//                         {instructor.status === "active" ? (
//                           <span className="text-green-600 font-bold">
//                             Active
//                           </span>
//                         ) : (
//                           <span className="text-red-500">Inactive</span>
//                         )}
//                       </td>
//                       <td className="border px-4 py-2">
//                         <div className="flex gap-2 flex-wrap justify-center">
//                           <button
//                             onClick={() => handleEdit(instructor)}
//                             className="text-blue-600"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(instructor._id)}
//                             className="text-red-600"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                           {instructor.status !== "active" && (
//                             <button
//                               onClick={() => handleMakeActive(instructor)}
//                               className="bg-green-500 text-white px-2 py-1 text-xs rounded"
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

// export default InstructorProfile;
