import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const GoodLifeStyle = () => {
  const axiosPublic = useAxiosPublic();
  const [openIndex, setOpenIndex] = useState(null);

  // ✅ Fetch song fields
  const { data: songFields = [], isLoading: fieldsLoading } = useQuery({
    queryKey: ["songFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/third-layer/goodLifeStyleField");
      return res.data?.data || [];
    },
  });

  // ✅ Fetch all good songs
  const { data: goodSongs = [], isLoading: songsLoading } = useQuery({
    queryKey: ["goodSongs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/third-layer/goodLifeStyle");
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
        {songFields.length === 0 ? (
          <p className="text-gray-500">No song fields found.</p>
        ) : (
          <div className="space-y-6">
            {songFields.map((field) => (
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
        {goodSongs.length === 0 ? (
          <p className="text-gray-500 text-center">No items found.</p>
        ) : (
          <div className="space-y-3">
            {goodSongs.map((song, index) => (
              <div
                key={song._id}
                className="border rounded-xl overflow-hidden transition-all duration-300"
              >
                {/* Header Button */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center px-4 py-3 font-semibold bg-gray-100 hover:bg-gray-200 transition"
                >
                  <span>
                    {index + 1}. {song.name}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Content */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    openIndex === index ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div
                    className="px-4 py-3 text-gray-700 text-sm lg:text-base"
                    dangerouslySetInnerHTML={{ __html: song.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default GoodLifeStyle;
