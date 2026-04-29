import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Achievements = () => {
  const axiosPublic = useAxiosPublic();

  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features/achievements");
      return res.data;
    },
  });

  return (
    <div className="w-full py-10 md:px-2">
      
<div className="text-center mb-12">
  <p className="text-xl md:text-2xl font-bold uppercase tracking-wide inline-block bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
    Achievements

    {/* GRADIENT LINE */}
    <span className="block w-24 h-0.5 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#5be7b4]"></span>
  </p>
</div>

      {/* LOADING */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="max-w-[1400px] mx-auto grid grid-cols-2  md:grid-cols-4 gap-3 md:gap-6">
          
          {achievements.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center border-l-4 border-[#145c43]"
            >
              
              {/* ICON */}
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-yellow-100 group-hover:bg-yellow-200 transition">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No Icon</span>
                )}
              </div>

              {/* COUNT (Main Highlight) */}
              <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-1">
                +{item.count}
              </h2>

              {/* TITLE */}
              <h3 className="font-medium text-gray-700 text-sm md:text-base">
                {item.name}
              </h3>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Achievements;