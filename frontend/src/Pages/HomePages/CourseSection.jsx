import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CourseSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features/courses");
      return res.data;
    },
  });

  return (
    <div className="w-full py-5 md:px-2">
      {/* TITLE */}
      <div className="text-center mb-10">
        <p className="text-xl font-bold text-green-800 uppercase relative inline-block">
          Courses
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
          {courses.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center"
            >
              {/* IMAGE ICON */}
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-lg bg-yellow-100 group-hover:bg-yellow-200 transition">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-2">
                {item.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSection;
