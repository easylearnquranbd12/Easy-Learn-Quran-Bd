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
      
      {/* TITLE */}
      <div className="text-center mb-10">
        <p className="text-xl font-bold text-green-800 uppercase relative inline-block">
          Achievements
          <span className="absolute left-0 -bottom-2 w-full">
            <svg viewBox="0 0 200 10" className="w-full h-3">
              <path
                d="M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5 T 140 5 T 160 5 T 180 5 T 200 5"
                fill="transparent"
                stroke="#065f46"
                strokeWidth="2"
              />
            </svg>
          </span>
        </p>
      </div>

      {/* LOADING */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {achievements.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center"
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