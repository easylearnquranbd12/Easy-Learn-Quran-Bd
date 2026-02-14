import { Image, Video, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Swal from "sweetalert2";

// Cloudinary Config
const CLOUD_NAME = "dltj0stlz";
const UPLOAD_PRESET = "Quiz-Platfrom";

// Upload helper
const uploadToCloudinary = async (file, type) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("resource_type", type);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return { url: data.secure_url, public_id: data.public_id };
  } catch (error) {
    console.error(`Error uploading ${type}:`, error);
    Swal.fire(
      "Upload Failed",
      `Could not upload ${type}. Please try again.`,
      "error"
    );
    return null;
  }
};

// Delete helper
const deleteFromCloudinary = async (publicId, type) => {
  try {
    await fetch(`https://api.betheshape.com/delete-media/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
    Swal.fire("Deleted!", `${type} deleted successfully`, "success");
  } catch (error) {
    console.error("Delete failed", error);
    Swal.fire("Delete Failed", `Could not delete ${type}`, "error");
  }
};

const MediaUpload = ({
  control,
  name,
  label,
  type = "image",
  maxSizeMB = 5,
  resetSignal,
}) => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mediaData, setMediaData] = useState(null);

  const Icon = type === "video" ? Video : Image;

  // reset signal (form reset)
  useEffect(() => {
    setMediaData(null);
  }, [resetSignal]);

  return (
    <div className="border p-3 rounded-md mb-2">
      <h4 className="font-medium mb-2">
        {label} (Max {maxSizeMB}MB) 
      </h4>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            {!mediaData ? (
              <label className="relative block cursor-pointer border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-400">
                <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-700">Click to select {type}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Maximum size: {maxSizeMB}MB
                </p>
                <input
                  type="file"
                  accept={type + "/*"}
                  className="hidden"
                  disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    if (file.size > maxSizeMB * 1024 * 1024) {
                      Swal.fire(
                        "File Too Large",
                        `Maximum ${type} size is ${maxSizeMB}MB!`,
                        "warning"
                      );
                      return;
                    }

                    // Local preview
                    setMediaData({ url: URL.createObjectURL(file) });

                    // 🔥 Instant Upload
                    setUploading(true);
                    const uploaded = await uploadToCloudinary(file, type);
                    setUploading(false);

                    if (uploaded?.url) {
                      field.onChange(uploaded.url);
                      setMediaData(uploaded);
                      setSuccess(true);
                      setTimeout(() => setSuccess(false), 3000);
                    }
                  }}
                />
                {uploading && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-lg">
                    <p className="text-blue-600 font-medium">Uploading...</p>
                  </div>
                )}
              </label>
            ) : (
              <div className="border rounded-lg p-3 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <Icon size={24} className="text-blue-600" />
                  <div>
                    <p className="text-gray-900 font-medium">
                      {mediaData.public_id || "Preview selected"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {mediaData.public_id
                        ? "Uploaded to Database"
                        : "Preview only"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    if (mediaData.public_id)
                      await deleteFromCloudinary(mediaData.public_id, type);
                    field.onChange(null);
                    setMediaData(null);
                  }}
                  className="text-red-600 hover:text-red-700"
                  disabled={uploading}
                >
                  <X size={20} />
                </button>
                {success && !uploading && (
                  <p className="text-green-600 mt-2 text-sm">
                    {type === "video" ? "Video" : "Image"} uploaded
                    successfully!
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MediaUpload;
