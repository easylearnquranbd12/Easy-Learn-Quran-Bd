// import { Image, Video, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Controller } from "react-hook-form";
// import Swal from "sweetalert2";

// // Cloudinary Config
// const CLOUD_NAME = "damrv9kir";
// const UPLOAD_PRESET = "Betheshape-images";

// // Upload helper
// const uploadToCloudinary = async (file, type) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", UPLOAD_PRESET);
//   formData.append("resource_type", type);

//   try {
//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
//       { method: "POST", body: formData }
//     );
//     const data = await res.json();
//     return { url: data.secure_url, public_id: data.public_id };
//   } catch (error) {
//     console.error(`Error uploading ${type}:`, error);
//     Swal.fire(
//       "Upload Failed",
//       `Could not upload ${type}. Please try again.`,
//       "error"
//     );
//     return null;
//   }
// };

// // Delete helper
// const deleteFromCloudinary = async (publicId, type) => {
//   try {
//     await fetch(`http://localhost:5000/delete-media/${type}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ publicId }),
//     });
//     Swal.fire("Deleted!", `${type} deleted successfully`, "success");
//   } catch (error) {
//     console.error("Delete failed", error);
//     Swal.fire("Delete Failed", `Could not delete ${type}`, "error");
//   }
// };

// const MediaUpload = ({
//   control,
//   name,
//   label,
//   type = "image",
//   maxSizeMB = 5,
//   resetSignal,
// }) => {
//   const [uploading, setUploading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [mediaData, setMediaData] = useState(null);

//   const Icon = type === "video" ? Video : Image;

//   // reset signal (form reset)
//   useEffect(() => {
//     setMediaData(null);
//   }, [resetSignal]);

//   return (
//     <div className="border p-3 rounded-md mb-2">
//       <h4 className="font-medium mb-2">
//         {label} (Max {maxSizeMB}MB) 
//       </h4>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <div>
//             {!mediaData ? (
//               <label className="relative block cursor-pointer border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-400">
//                 <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                 <p className="text-gray-700">Click to select {type}</p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Maximum size: {maxSizeMB}MB
//                 </p>
//                 <input
//                   type="file"
//                   accept={type + "/*"}
//                   className="hidden"
//                   disabled={uploading}
//                   onChange={async (e) => {
//                     const file = e.target.files[0];
//                     if (!file) return;

//                     if (file.size > maxSizeMB * 1024 * 1024) {
//                       Swal.fire(
//                         "File Too Large",
//                         `Maximum ${type} size is ${maxSizeMB}MB!`,
//                         "warning"
//                       );
//                       return;
//                     }

//                     // Local preview
//                     setMediaData({ url: URL.createObjectURL(file) });

//                     // 🔥 Instant Upload
//                     setUploading(true);
//                     const uploaded = await uploadToCloudinary(file, type);
//                     setUploading(false);

//                     if (uploaded?.url) {
//                       field.onChange(uploaded.url);
//                       setMediaData(uploaded);
//                       setSuccess(true);
//                       setTimeout(() => setSuccess(false), 3000);
//                     }
//                   }}
//                 />
//                 {uploading && (
//                   <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-lg">
//                     <p className="text-blue-600 font-medium">Uploading...</p>
//                   </div>
//                 )}
//               </label>
//             ) : (
//               <div className="border rounded-lg p-3 flex items-center justify-between relative">
//                 <div className="flex items-center gap-3">
//                   <Icon size={24} className="text-blue-600" />
//                   <div>
//                     <p className="text-gray-900 font-medium">
//                       {mediaData.public_id || "Preview selected"}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {mediaData.public_id
//                         ? "Uploaded to Database"
//                         : "Preview only"}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={async () => {
//                     if (mediaData.public_id)
//                       await deleteFromCloudinary(mediaData.public_id, type);
//                     field.onChange(null);
//                     setMediaData(null);
//                   }}
//                   className="text-red-600 hover:text-red-700"
//                   disabled={uploading}
//                 >
//                   <X size={20} />
//                 </button>
//                 {success && !uploading && (
//                   <p className="text-green-600 mt-2 text-sm">
//                     {type === "video" ? "Video" : "Image"} uploaded
//                     successfully!
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default MediaUpload;


import axios from "axios";
import { Image, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import Swal from "sweetalert2";

const CLOUD_NAME = "damrv9kir";
const UPLOAD_PRESET = "Betheshape-images";

const MediaUpload = ({ control, name, label, type = "image", maxSizeMB = 5 }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [media, setMedia] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const cancelToken = useRef(null);

  const Icon = type === "video" ? Video : Image;

  const uploadToCloudinary = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    cancelToken.current = axios.CancelToken.source();

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
      formData,
      {
        onUploadProgress: (e) => {
          if (!e.total) return;
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
        cancelToken: cancelToken.current.token,
      }
    );

    return { url: res.data.secure_url, public_id: res.data.public_id };
  };

  const handleDelete = async (field) => {
    // Cancel ongoing upload
    if (uploading && cancelToken.current) {
      cancelToken.current.cancel("Upload canceled by user");
      setUploading(false);
    }

    if (media?.public_id) {
      try {
        await axios.post(`http://localhost:5000/delete-media/${type}`, {
          publicId: media.public_id,
        });
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Delete Failed", "Could not delete file", "error");
      }
    }

    field.onChange(null);
    setMedia(null);
    setProgress(0);
    setShowSuccess(false);
  };

  return (
    <div className="border p-4 rounded-xl bg-white shadow-sm mb-4">
      <h4 className="font-semibold mb-3 text-gray-700">
        {label} (Max {maxSizeMB}MB)
      </h4>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {!media && (
              <label className="relative block cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition">
                <Icon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p>Click to upload {type}</p>

                <input
                  type="file"
                  accept={`${type}/*`}
                  className="hidden"
                  disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    if (file.size > maxSizeMB * 1024 * 1024) {
                      return Swal.fire(
                        "File Too Large",
                        `Maximum ${type} size is ${maxSizeMB}MB`,
                        "warning"
                      );
                    }

                    setUploading(true);
                    setProgress(0);
                    setShowSuccess(false);

                    try {
                      const uploaded = await uploadToCloudinary(file, type);
                      setProgress(100);
                      setTimeout(() => {
                        setUploading(false);
                        setMedia(uploaded);
                        field.onChange(uploaded.url);
                        setShowSuccess(true);
                      }, 1000);
                    } catch (err) {
                      if (axios.isCancel(err)) {
                        Swal.fire("Upload canceled", "File upload was canceled", "info");
                      } else {
                        Swal.fire("Upload Failed", "Something went wrong", "error");
                      }
                      setUploading(false);
                      setProgress(0);
                    }
                  }}
                />

                {uploading && (
                  <>
                    <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-xl">
                      <p className="text-teal-500 font-semibold mb-3">
                        Uploading... {progress}%
                      </p>
                      <div className="w-3/4 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-teal-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    {/* Close icon during upload */}
                    <button
                      type="button"
                      onClick={() => handleDelete(field)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow"
                    >
                      <X size={20} />
                    </button>
                  </>
                )}
              </label>
            )}

            {media && (
              <div className="border rounded-xl p-4 space-y-3 relative">
                <div className="flex justify-center relative">
                  {type === "image" ? (
                    <img
                      src={media.url}
                      alt="preview"
                      className="h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <video src={media.url} controls className="h-32 rounded-lg" />
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(field)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow"
                  >
                    <X size={20} />
                  </button>
                </div>

                {showSuccess && (
                  <p className="text-green-600 font-medium text-center">
                    Uploaded Successfully
                  </p>
                )}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default MediaUpload;