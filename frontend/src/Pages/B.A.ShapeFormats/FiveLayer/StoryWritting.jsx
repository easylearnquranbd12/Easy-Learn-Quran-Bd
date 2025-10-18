import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const StoryWritting = () => {
  const axiosPublic = useAxiosPublic();
  const [openIndex, setOpenIndex] = useState(null);
  // ✅ Fetch song fields
  const { data: storyWritingFields = [], isLoading: fieldsLoading } = useQuery({
    queryKey: ["storyWritingFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/storyWritingField");
      return res.data?.data || [];
    },
  });

  // ✅ Fetch all good songs
  const { data: storyWriting = [], isLoading: songsLoading } = useQuery({
    queryKey: ["storyWriting"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/storyWriting");
      return res.data || [];
    },
  });

  const isLoading = fieldsLoading || songsLoading;

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
    );
  }

  // ✅ Toggle collapse item
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 space-y-10 bg-white rounded-2xl shadow-md my-10">
      {/* ✅ Song Fields */}
      <section className="text-center">
        {storyWritingFields.length === 0 ? (
          <p className="text-gray-500">No song fields found.</p>
        ) : (
          <div className="space-y-6">
            {storyWritingFields.map((field) => (
              <div key={field._id} className="p-4">
                <h3 className="font-semibold text-3xl">{field.title}</h3>
                <p className="text-gray-600 text-sm lg:text-base text-justify py-5">
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Good Life Style Section (Collapsible) */}
      <section>
        {storyWriting.length === 0 ? (
          <p className="text-gray-500 text-center">No items found.</p>
        ) : (
          <div className="space-y-3">
            {storyWriting.map((song, index) => (
              <div
                key={song._id}
                className="border rounded-xl overflow-hidden transition-all duration-300"
              >
                <h1 className="text-center text-3xl py-5">{song.name}</h1>
                <div
                  className="px-4 py-3 text-gray-700 text-sm lg:text-base"
                  dangerouslySetInnerHTML={{ __html: song.description }}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StoryWritting;
