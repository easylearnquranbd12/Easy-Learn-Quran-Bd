import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import "./QuillCustom.css";

const AdminEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/blog/${id}`);
        const blog = res.data;
        reset({ title: blog.title, name: blog.name });
        setEditorContent(blog.content);
        setExistingImageUrl(blog.imageUrl);
      } catch (err) {
        toast.error("Failed to load blog data.");
      }
    };

    if (id) fetchBlog();
  }, [id, reset, axiosPublic]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (!editorContent || editorContent === "<p><br></p>") {
      toast.error("Blog content cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = existingImageUrl;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

        const imgbbResponse = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );

        if (imgbbResponse.data?.data?.url) {
          imageUrl = imgbbResponse.data.data.url;
        } else {
          toast.error("Image upload failed! Try again.");
          return;
        }
      }

      const updatedBlog = {
        title: data.title,
        name: data.name,
        content: editorContent,
        imageUrl,
        updatedAt: new Date().toISOString(),
      };

      const res = await axiosPublic.put(`/blog/blog/${id}`, updatedBlog);
      if (res.status === 200) {
        toast.success("Blog updated successfully!");
        navigate("/admin-dashboard/admin-blog-history");
      } else {
        toast.error("Failed to update blog.");
      }
    } catch (err) {
      toast.error("Something went wrong while updating blog.");
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "clean"],
    ],
  };

  return (
    <div className="min-h-screen  py-12  text-gray-800">
      <Helmet>
        <title>Edit Blog</title>
      </Helmet>

      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-2xl border border-borderColor overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-4 md:px-8 lg:px-20 py-6 lg:py-12 text-white">
          <h2 className="text-3xl font-bold">Edit Blog Post</h2>
          <p className="text-indigo-200 text-sm mt-1">
            Update your article content and image
          </p>
        </div>

        {/* Form Body */}
        <div className="p-4 md:p-8 lg:px-20 lg:py-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-base mb-1 font-medium text-gray-700 block">
                Blog Title :
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required." })}
                placeholder="Enter blog title"
                className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="text-base mb-1 font-medium text-gray-700 block">
                Blog Name :
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required." })}
                placeholder="Enter blog name"
                className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Quill Editor */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Content :
              </label>
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                modules={quillModules}
                theme="snow"
                className="bg-white rounded-lg border border-indigo-300"
              />
            </div>

            {/* Image Upload & Preview */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Upload Image :
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:bg-primary file:text-white file:rounded-md file:px-5 file:py-2 file:border-0 text-sm mt-1"
              />

              {/* Image Preview */}
              <div className="mt-4">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="New Preview"
                    className="w-40 h-40 object-cover rounded-md shadow"
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                  />
                ) : existingImageUrl ? (
                  <img
                    src={existingImageUrl}
                    alt="Current"
                    className="w-40 h-40 object-cover rounded-md shadow"
                  />
                ) : (
                  <p className="text-gray-400 italic text-sm mt-1">
                    No image uploaded yet.
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full lg:py-2 py-1.5 rounded-lg text-white font-semibold transition text-base ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-primary hover:bg-hoverPrimary"
              }`}
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditBlog;
