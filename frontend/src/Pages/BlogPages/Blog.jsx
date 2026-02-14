import axios from "axios";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CustomLoading from "../../components/Loading/CustomLoading";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.get("https://api.betheshape.com/blog/blog", {
        withCredentials: true,

      });
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blogs.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const truncateWords = (text, limit = 50) => {
    if (typeof text !== "string") return "";
    const words = text.trim().split(/\s+/);
    return (
      words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "")
    );
  };

  if (loading) return <CustomLoading />;

  if (error) {
    return (
      <div className="min-h-[70vh]  flex items-center justify-center p-4">
        <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
          <AlertCircle size={40} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl text-red-500 mb-2">Unable to Load blog</h2>
          <p className="text-black mb-6">{error}</p>
          <button
            onClick={fetchBlogs}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Be The Shape | Blog</title>
      </Helmet>
      <div className="max-w-7xl mx-auto  py-8">
        <TittleAnimation tittle="Blog" subtittle="Latest Blogs" />
        <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md border border-indigo-200 hover:border-indigo-300 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl flex flex-col h-[500px] overflow-hidden group"
            >
              {/* Image */}
              {blog.imageUrl && (
                <Link to={`/blog-us/${blog._id}`}>
                  <div className="overflow-hidden h-64 w-full ">
                    <img
                      src={blog.imageUrl}
                      alt="Blog"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 p-2 rounded-2xl "
                    />
                  </div>
                </Link>
              )}

              {/* Text Section */}
              <div className="bg-green-50 p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition line-clamp-2 mb-2">
                  {truncateWords(blog?.name)}
                </h3>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* Author Section */}
                <div className="flex items-center mt-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-indigo-300 ring-offset-2 overflow-hidden">
                      <img src={blog.authorUrl} alt={blog.authorName} />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-bold text-base line-clamp-1 ">
                      {blog.authorName}
                    </p>
                    <p className="text-indigo-600 text-base font-bold uppercase line-clamp-1">
                      {blog.authorRole}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <p className="text-sm text-gray-500 mt-4">
                  {new Date(blog.createdAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
