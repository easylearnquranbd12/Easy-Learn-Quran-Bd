import axios from "axios";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CustomLoading from "../../components/Loading/CustomLoading";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import ShareModal from "./ShareModal";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const blogUrl = `https://nasmatics.com/blog-us/${id}`; // <-- Replace with your actual URL
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/blog/blog/${id}`);
      setBlog(res.data);
      setLoading(false);
    } catch (err) {
      setError("Blog not found.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [id]);

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
        <title>Nasmatics | Blog Details</title>
      </Helmet>
      <div className="max-w-7xl mx-auto  py-8">
        {/* TittleAnimation - no change */}
        <TittleAnimation tittle="Blog Details" subtittle="Blog More" />

        {/* Title */}
        <motion.h1
          className="text-2xl lg:text-3xl font-bold text-green-700 mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          {blog.title}
        </motion.h1>

        {/* Blog Image */}
        {blog.imageUrl && (
          <motion.img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-xl mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          />
        )}

        {/* Author + Share container */}
        <motion.div
          className="flex justify-between flex-wrap md:flex-nowrap items-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          {/* Author Info */}
          <div>
            <div className="flex items-center space-x-4">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-12 md:16 rounded-full ring-2 ring-offset-2">
                  <img src={blog.authorUrl} alt={blog.authorName} />
                </div>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-lg">
                  {blog.authorName}
                </p>
                <p className="text-green-700 font-bold uppercase text-base">
                  {blog.authorRole}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Posted on: {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Share Button */}
          <div className="mt-4 md:mt-0 md:flex md:justify-center md:items-center">
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-green-800 hover:bg-green-900 text-white px-4 py-1 md:px-6 md:py-1.5 rounded text-lg"
            >
              Share
            </button>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center my-2 "
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
        >
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-lg md:text-xl font-semibold text-gray-800">
            More Blog Details
          </span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </motion.div>

        {/* Subheading */}
        <motion.h1
          className="text-xl lg:text-2xl font-bold text-green-700 mb-4 "
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={5}
        >
          {blog.name}
        </motion.h1>

        {/* Blog Content */}
        <motion.div
          className="text-gray-700 prose max-w-none mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={6}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
        ></motion.div>

        {/* Share Modal */}
        {showShareModal && (
          <ShareModal
            blogTitle={blog.title}
            blogUrl={blogUrl}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
