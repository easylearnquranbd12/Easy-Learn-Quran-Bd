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
        <h2 className="text-2xl md:text-4xl font-extrabold text-teal-600">
          Our Success Stories
        </h2>

        <p className=" mt-2 max-w-6xl mx-auto leading-relaxed text-justify">
          দেখুন কীভাবে হাজারো শিক্ষার্থী Betheshape ব্যবহার করে তাদের English
          skills উন্নত করছে। Grammar, Vocabulary এবং Sentence structure এ দক্ষতা
          অর্জন করে তারা এখন আরও confident হয়ে উঠছে। আমাদের structured learning
          system আপনাকেও সফলতার পথে এগিয়ে নিতে প্রস্তুত।
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
