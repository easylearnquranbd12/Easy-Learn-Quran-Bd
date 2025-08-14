import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AdminBlogHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosPublic.get(`blog/blog?email=${user?.email}`);
        setBlogs(res.data || []);
      } catch (error) {
        toast.error("❌ Failed to load blog history.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchBlogs();
  }, [user, axiosPublic]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
    try {
      const res = await axiosPublic.delete(`/blog/blog/${id}`);
      if (res.status === 200) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        toast.success("✅ Blog deleted successfully.");
      } else {
        toast.error("❌ Failed to delete blog.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-1">
      <TittleAnimation
        tittle="Total Post History"
        subtittle={`Total Posts (${blogs.length})`}
      />

      {blogs.length === 0 ? (
        <p className="text-gray-500 p-5">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card w-full bg-white border border-borderColor rounded-lg shadow-2xl hover:shadow-lg transition duration-300"
            >
              <figure className="rounded-t-3xl overflow-hidden p-3">
                <img
                  src={blog.imageUrl || "https://via.placeholder.com/300x200"}
                  alt="Blog"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>

              <div className="card-body p-4 space-y-3 bg-green-50 rounded-md">
                <p className="text-base text-gray-700 ">
                  <span> Tittle: </span>
                  <span className="text-gray-700 font-semibold">
                    {blog.title?.slice(0, 40)} ...
                  </span>
                </p>
                <p className="text-base text-gray-700">
                  Content:
                  <div
                    className="line-clamp-3 prose max-w-none font-medium text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(blog.content?.slice(0, 100)),
                    }}
                  ></div>
                </p>

                <div className="card-actions pt-2">
                  <button
                    onClick={() =>
                      navigate(`/admin-dashboard/admin-blog-history/${blog._id}`)
                    }
                    className="btn w-[95%] btn-base bg-primary hover:bg-hoverPrimary text-white rounded-md px-4 py-2 mx-auto"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogHistory;
