

import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import "./QuillCustom.css";

const AdminBlogCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

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
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: false, // 🔥 This disables sending cookies
          }
        );

        if (imgbbResponse.data && imgbbResponse.data.data.url) {
          imageUrl = imgbbResponse.data.data.url;
        } else {
          toast.error("Image upload failed! Try again.");
          return;
        }
      }

      const blogData = {
        title: data.title,
        name: data.name,
        content: editorContent,
        imageUrl,
        createdAt: new Date().toISOString(),
        authorName: user.displayName,
        authorEmail: user.email,
        authorRole: user.role,
        authorUrl: user.photoURL,
      };
    
      const res = await axiosPublic.post("/blog/blog", blogData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Blog post created successfully!");
        reset();
        setImage(null);
        setEditorContent("");
      } else {
        toast.error("Failed to create blog post.");
      }
    } catch (error) {
   
      toast.error("Something went wrong!");
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
    <div className="flex justify-center items-center min-h-screen ">
      <Helmet>
        <title>Admin | Create Blog</title>
      </Helmet>

      <div className="w-full max-w-7xl bg-white rounded-xl shadow-2xl border border-borderColor overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-4 md:px-6  py-6  text-white">
          <h2 className="text-3xl font-bold">Create Blog Post</h2>
          <p className="text-indigo-200 text-sm mt-1">
            Publish your article with image and content
          </p>
        </div>

        {/* Form Body */}
        <div className=" p-4 md:p-8 lg:px-20 lg:py-12">
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
                className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-200 ${errors.title ? "border-red-500" : "border-gray-300"
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
                className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-200 ${errors.name ? "border-red-500" : "border-gray-300"
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

            {/* Image Upload */}
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Upload Image :
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:bg-primary file:text-white file:rounded-md file:px-5 file:py-2 file:border-0 text-sm mt-1 "
              />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mt-4 w-40 h-40 object-cover rounded-md shadow "
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-1.5 md:py-2 rounded-lg text-white font-semibold transition text-lg ${loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-primary hover:bg-hoverPrimary"
                }`}
            >
              {loading ? "Posting..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCreate;
