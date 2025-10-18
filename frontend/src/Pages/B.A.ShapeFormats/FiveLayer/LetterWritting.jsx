import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const LetterWritting = () => {
  const axiosPublic = useAxiosPublic();
  
  // ✅ Fetch song fields
  const { data: letterWritingFields = [], isLoading: fieldsLoading } = useQuery({
    queryKey: ["letterWritingFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/letterWritingField");
      return res.data?.data || [];
    },
  });

  // ✅ Fetch all good songs
  const { data: letterWriting = [], isLoading: songsLoading } = useQuery({
    queryKey: ["letterWriting"],
    queryFn: async () => {
      const res = await axiosPublic.get("/five-layer/letterWriting");
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


  return (
    <div className="max-w-[1400px] mx-auto p-6 space-y-10 bg-white rounded-2xl shadow-md my-10">
      {/* ✅ Song Fields */}
      <section className="text-center">
        {letterWritingFields.length === 0 ? (
          <p className="text-gray-500">No song fields found.</p>
        ) : (
          <div className="space-y-6">
            {letterWritingFields.map((field) => (
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
        {letterWriting.length === 0 ? (
          <p className="text-gray-500 text-center">No items found.</p>
        ) : (
          <div className="space-y-3">
            {letterWriting.map((song, index) => (
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

export default LetterWritting;
