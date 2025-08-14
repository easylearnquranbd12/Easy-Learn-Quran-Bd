import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AdminBlogHistoryDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setActionLoading(true);
        await axiosPublic.delete(`/blog/blog/${id}`);

        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your post has been successfully deleted.",
          confirmButtonColor: "#d97706",
        });

        navigate("/admin-dashboard/admin-blog-history");
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/admin-dashboard/admin-blog-history/edit/${id}`);
  };

  if (loading) return <p>Loading</p>;
  if (!blog) return <div className="text-center p-5">No blog found.</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <TittleAnimation
        tittle="Admin Blog Details"
        subtittle="Admin Reviews"
      />

      <div className="bg-white border border-borderColor rounded-lg shadow-xl hover:shadow-2xl transition">
        <figure className="rounded-t-3xl overflow-hidden p-3">
          <img
            src={blog.imageUrl || "https://via.placeholder.com/300x200"}
            alt="Blog"
            className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure>

        <div className="p-4 md:p-6 space-y-4 bg-green-50">
          <div className="py-5">
            <h2 className="text-xl font-semibold text-green-700">
              {blog.title}
            </h2>
          </div>
          <div className="pt-5">
            <div
              className="prose text-gray-700 max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full py-10">
            <button
              onClick={handleEdit}
              className="w-full btn btn-base  lg:btn-lg bg-primary hover:bg-hoverPrimary text-white text-base"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full btn btn-base lg:btn-lg bg-red-600 hover:bg-red-800 text-white text-base"
              disabled={actionLoading}
            >
              <FaTrash className="mr-1" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AdminBlogHistoryDetails;
