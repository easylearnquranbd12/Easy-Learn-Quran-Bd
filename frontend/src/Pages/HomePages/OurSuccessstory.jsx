import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const OurSuccessstory = () => {
  const axiosPublic = useAxiosPublic();

  // ✅ Get Data
  const { data: successStories = [], isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner/stories");
      return res.data;
    },
  });

  return (
    <div className="py-16 max-w-[1400px] mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1d46]">
          OUR SUCCESS STORIES
        </h2>
        <p className="text-teal-500 mt-2">
           See how students are improving their English skills and building
            confidence through our structured learning system.
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide px-5 md:px-16">
        {/* Loading skeleton */}
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[250px] h-[400px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="skeleton w-full h-full rounded-xl"></div>
            </div>
          ))}

        {!isLoading &&
          successStories.map((story) => (
            <div
              key={story._id}
              className="relative w-[250px] h-[400px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
            >
              {/* সরাসরি ভিডিও */}
              <video
                src={story.video}
                controls
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OurSuccessstory;
