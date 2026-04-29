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
     


          <div className="text-center mb-12">
  <p className="text-xl md:text-2xl font-bold uppercase tracking-wide inline-block bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
   Courses

    {/* GRADIENT LINE */}
    <span className="block w-24 h-0.5 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#5be7b4]"></span>
  </p>
</div>

      {/* LOADING */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="max-w-[1400px]  mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {courses.map((item) => (
            <div
              key={item._id}
              className="bg-white border-l-4 border-[#145c43] rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center"
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
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed text-justify">
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
