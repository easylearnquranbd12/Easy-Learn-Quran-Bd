// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Trash2 } from "lucide-react";
// import { Helmet } from "react-helmet-async";
// import { Controller, useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const YouTubeVideoPlayer = () => {
//   const { handleSubmit, control, reset } = useForm();
//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();

//   const { data: banners = [], isLoading } = useQuery({
//     queryKey: ["banners"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/youtube-video");
//       return res.data;
//     },
//   });

//   const createMutation = useMutation({
//     mutationFn: (newData) => axiosPublic.post("/youtube-video", newData),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["banners"]);
//       Swal.fire("Success!", "Video link uploaded successfully.", "success");
//       reset();
//     },
//     onError: () => Swal.fire("Error!", "Failed to upload video.", "error"),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id) => axiosPublic.delete(`/youtube-video/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["banners"]);
//       Swal.fire("Deleted!", "Video deleted successfully.", "success");
//     },
//     onError: () => Swal.fire("Error!", "Failed to delete video.", "error"),
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }) => axiosPublic.put(`/youtube-video/${id}`, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["banners"]);
//       Swal.fire("Success!", "Video marked as active.", "success");
//     },
//     onError: () => Swal.fire("Error!", "Failed to update status.", "error"),
//   });

//   const onSubmit = (data) => {
//     const payload = {
//       title: data.title,
//       description: "",
//       status: "inactive",
//     };
//     createMutation.mutate(payload);
//   };

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       deleteMutation.mutate(id);
//     }
//   };

//   const handleMakeActive = async (banner) => {
//     if (banner.status === "active") {
//       Swal.fire("Info", "This video is already active.", "info");
//       return;
//     }

//     const result = await Swal.fire({
//       title: "Make this video active?",
//       text: "Only one video can be active at a time. This will deactivate others.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, make active",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#aaa",
//     });

//     if (result.isConfirmed) {
//       updateMutation.mutate({ id: banner._id, data: { status: "active" } });
//     }
//   };

//   return (
//     <div>
//       <Helmet>
//         <title>Admin | Upload YouTube Video</title>
//       </Helmet>

//       <div className="flex flex-col items-center min-h-[80vh] py-6 space-y-8 px-4">
//         <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl border p-6">
//           <h1 className="text-center text-2xl font-semibold mb-6 text-primary">
//             Upload YouTube Video
//           </h1>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <Controller
//               name="title"
//               defaultValue=""
//               control={control}
//               rules={{
//                 required: "YouTube link is required",
               
//               }}
//               render={({ field, fieldState }) => (
//                 <div>
//                   <input
//                     {...field}
//                     placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
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
//               className="w-full py-3 bg-primary hover:bg-hoverPrimary text-white font-medium rounded-lg"
//               disabled={createMutation.isLoading}
//             >
//               {createMutation.isLoading ? "Uploading..." : "Upload Video"}
//             </button>
//           </form>
//         </div>

//         <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl border p-6">
//           <h2 className="text-lg font-semibold mb-4 text-indigo-700">
//             Uploaded Videos
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="table-auto w-full border-collapse border border-gray-200 min-w-[700px]">
//               <thead>
//                 <tr className="bg-gray-100 text-sm text-gray-700">
//                   <th className="border border-gray-300 py-2 px-4">Video</th>
//                   <th className="border border-gray-300 py-2 px-4 text-center">Status</th>
//                   <th className="border border-gray-300 py-2 px-4 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan={3} className="text-center py-4">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : banners.length === 0 ? (
//                   <tr>
//                     <td colSpan={3} className="text-center py-4">
//                       No videos uploaded.
//                     </td>
//                   </tr>
//                 ) : (
//                   banners.map((banner) => {
//                     const videoId = banner.title?.split("v=")[1];
//                     return (
//                       <tr key={banner._id} className="text-sm border-t border-gray-200">
//                         <td className="border border-gray-300 py-2 px-4 text-center">
//                           {videoId ? (
//                             <iframe
//                               width="250"
//                               height="150"
//                               src={`https://www.youtube.com/embed/${videoId}`}
//                               title="YouTube Video"
//                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                               allowFullScreen
//                             />
//                           ) : (
//                             <p className="text-red-500">Invalid Link</p>
//                           )}
//                         </td>
//                         <td className="border border-gray-300 py-2 px-4 text-center">
//                           {banner.status === "active" ? (
//                             <span className="text-green-600 font-semibold">Active</span>
//                           ) : (
//                             <span className="text-red-600 font-semibold">Inactive</span>
//                           )}
//                         </td>
//                         <td className="border border-gray-300 py-2 px-4">
//                           <div className="flex justify-center gap-2">
//                             <button
//                               onClick={() => handleDelete(banner._id)}
//                               className="text-red-600 hover:text-red-800"
//                               title="Delete"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                             {banner.status !== "active" && (
//                               <button
//                                 onClick={() => handleMakeActive(banner)}
//                                 className="text-white text-xs px-2 py-1 bg-green-500 hover:bg-green-600 rounded"
//                               >
//                                 Make Active
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YouTubeVideoPlayer;


import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const YouTubeVideoPlayer = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [mediaHistory, setMediaHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const mediaType = watch("mediaType");

  // Fetch media history on component mount
  useEffect(() => {
    fetchMediaHistory();
  }, []);

  const fetchMediaHistory = async () => {
    try {
      const response = await axiosPublic.get("/media");
      setMediaHistory(response.data);
    } catch (error) {
      console.error("Error fetching media history:", error);
      Swal.fire("Error", "Failed to load media history", "error");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let imageUrl = "";

    // Handle image upload
    if (mediaType === "image" && data.imageFile?.length) {
      try {
        const formData = new FormData();
        formData.append("image", data.imageFile[0]);
        
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=a616b7cb4177b6d22010843ec1f12500`,
          { method: "POST", body: formData }
        );
        const json = await res.json();
        imageUrl = json?.data?.url || "";
      } catch (error) {
        Swal.fire("Error!", "Image upload failed!", "error");
        setLoading(false);
        return;
      }
    }

    // Prepare payload
    const payload = {
      title: data.title,
      mediaType: data.mediaType,
      mediaUrl: mediaType === "image" ? imageUrl : mediaType === "video" ? data.videoUrl : null,
      content: mediaType === "text" ? data.content : null,
      status: "inactive" // New uploads are inactive by default
    };

    try {
      await axiosPublic.post("/media", payload);
      Swal.fire("Success", "Media uploaded successfully!", "success");
      reset();
      await fetchMediaHistory();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/media/${id}`);
          setMediaHistory(mediaHistory.filter(item => item._id !== id));
          Swal.fire("Deleted!", "Your media has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete media.", "error");
        }
      }
    });
  };

  const handleEdit = (mediaItem) => {
    setEditingId(mediaItem._id);
    setEditFormData({
      title: mediaItem.title,
      status: mediaItem.status
    });
  };

  const handleEditSubmit = async (id) => {
    try {
      await axiosPublic.put(`/media/${id}`, editFormData);
      setMediaHistory(mediaHistory.map(item => 
        item._id === id ? { ...item, ...editFormData } : item
      ));
      setEditingId(null);
      Swal.fire("Success", "Media updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update media", "error");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    
    try {
      // First deactivate all other active items if activating this one
      if (newStatus === "active") {
        await axiosPublic.patch("/media/deactivate-all");
      }
      
      await axiosPublic.patch(`/media/${id}/status`, { status: newStatus });
      setMediaHistory(mediaHistory.map(item => {
        if (item._id === id) return { ...item, status: newStatus };
        if (newStatus === "active") return { ...item, status: "inactive" };
        return item;
      }));
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const renderMediaContent = (mediaItem) => {
    switch (mediaItem.mediaType) {
      case "image":
        return (
          <a href={mediaItem.mediaUrl} target="_blank" rel="noopener noreferrer">
            <img 
              src={mediaItem.mediaUrl} 
              alt={mediaItem.title} 
              className="w-16 h-16 object-cover rounded"
            />
          </a>
        );
      case "video":
        return (
          <a 
            href={mediaItem.mediaUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Video
          </a>
        );
      case "text":
        return (
          <div className="max-w-xs truncate" title={mediaItem.content}>
            {mediaItem.content}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Upload New Media</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              {...register("title", { required: true })} 
              placeholder="Enter title" 
              className="input input-bordered w-full" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Media Type</label>
            <select 
              {...register("mediaType", { required: true })} 
              className="select select-bordered w-full"
            >
              <option value="">Select Media Type</option>
              <option value="image">Image</option>
              <option value="video">Video (YouTube)</option>
              <option value="text">Text</option>
            </select>
          </div>

          {mediaType === "image" && (
            <div>
              <label className="block text-sm font-medium mb-1">Image File</label>
              <input 
                type="file" 
                {...register("imageFile")} 
                accept="image/*" 
                className="file-input file-input-bordered w-full" 
              />
            </div>
          )}

          {mediaType === "video" && (
            <div>
              <label className="block text-sm font-medium mb-1">YouTube URL</label>
              <input 
                {...register("videoUrl", { required: mediaType === "video" })} 
                placeholder="https://www.youtube.com/watch?v=..." 
                className="input input-bordered w-full" 
              />
            </div>
          )}

          {mediaType === "text" && (
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea 
                {...register("content", { required: mediaType === "text" })} 
                placeholder="Enter your text content" 
                className="textarea textarea-bordered w-full" 
                rows={5}
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="bg-primary hover:bg-hoverPrimary w-full mt-4"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Upload Media"
            )}
          </button>
        </form>
      </div>

      {/* Media History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Media History</h2>
          <button 
            onClick={() => setIsHistoryVisible(!isHistoryVisible)}
            className="btn btn-sm btn-outline"
          >
            {isHistoryVisible ? "Hide" : "Show"} History
          </button>
        </div>

        {isHistoryVisible && (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mediaHistory.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No media found</td>
                  </tr>
                ) : (
                  mediaHistory.map((item) => (
                    <tr key={item._id}>
                      <td>{renderMediaContent(item)}</td>
                      <td>
                        {editingId === item._id ? (
                          <input
                            type="text"
                            value={editFormData.title}
                            onChange={(e) => setEditFormData({
                              ...editFormData,
                              title: e.target.value
                            })}
                            className="input input-sm input-bordered"
                          />
                        ) : (
                          item.title
                        )}
                      </td>
                      <td className="capitalize">{item.mediaType}</td>
                      <td>
                        <button
                          onClick={() => handleStatusToggle(item._id, item.status)}
                          className={`btn btn-xs ${item.status === 'active' ? 'btn-success' : 'btn-warning'}`}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="flex space-x-1">
                          {editingId === item._id ? (
                            <>
                              <button
                                onClick={() => handleEditSubmit(item._id)}
                                className="btn btn-xs btn-success"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="btn btn-xs btn-error"
                              >
                                <FaTimes />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(item)}
                                className="btn btn-xs btn-info"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-xs btn-error"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideoPlayer;