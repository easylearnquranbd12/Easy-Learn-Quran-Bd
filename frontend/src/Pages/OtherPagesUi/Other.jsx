import { ExternalLink, PlayCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Other = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/other");
      const data = await res.json();
      if (res.ok) setIdeas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="min-h-screen py-10 ">
      <Helmet>
        <title>AI Tools Archive</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-2 md:px-6">
        {/* ===== Header ===== */}

        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-green-600 flex items-center justify-center mb-6">
            <Sparkles className="text-green-600 w-8 h-8" />
          </div>

          <h1 className="text-4xl font-semibold text-gray-900">
            AI Tools & Learning Resources
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Explore powerful AI tools with tutorials and official websites.
            Learn how to use them effectively for productivity and development.
          </p>

          <div className="w-28 h-[2px] bg-green-600 mx-auto mt-8"></div>
        </div>

        {/* ===== Loading ===== */}

        {loading ? (
          <div className="text-center py-20 text-gray-600">
            Loading resources...
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-20 border-t border-b border-gray-300">
            <h3 className="text-2xl text-gray-800">No Resources Available</h3>
            <p className="text-gray-500 mt-4">
              AI resources will appear here once added.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-300">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"
              >
                {/* Left Side */}

                <div className="flex gap-5">
                  <img
                    src={idea.ideaShareImage}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {idea.name}
                    </h3>

                    <div
                      className="text-gray-600 text-sm mt-2"
                      dangerouslySetInnerHTML={{
                        __html: idea.description,
                      }}
                    />

                    <p className="text-xs text-gray-400 mt-3">
                      Added on{" "}
                      {new Date(idea.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Buttons */}

                <div className="flex gap-4">
                  {idea?.videolink && (
                    <a
                      href={idea.videolink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition px-5 py-2 rounded"
                    >
                      <PlayCircle size={18} />
                      Tutorial
                    </a>
                  )}

                  {idea?.websitelink && (
                    <a
                      href={idea.websitelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition px-5 py-2 rounded"
                    >
                      <ExternalLink size={18} />
                      Website
                    </a>
                  )}

                  {idea?.extraWebsitelink && (
                    <a
                      href={idea.extraWebsitelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Extra Website"
                      className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition px-4 py-2 rounded"
                    >
                      <ExternalLink size={18} />
                      Extra
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Other;
