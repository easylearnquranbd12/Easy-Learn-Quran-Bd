import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Countries = () => {
  const axiosPublic = useAxiosPublic();

  const { data: country = [], isLoading } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features/country");
      return res.data;
    },
  });

  return (
    <div className="w-full ">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="max-w-[1400px] mx-auto flex  justify-between items-center border rounded-2xl bg-white overflow-hidden">
          {country.map((item, index) => (
            <div
              key={item._id}
              className={`flex items-center justify-between px-6 py-2 text-center transition-all duration-300 hover:bg-[#145c43] hover:text-white ${
                index !== country.length - 1
                  ? "border-r border-gray-200"
                  : ""
              }`}
            >
              <h2 className="text-base md:text-xl font-semibold text-[#145c43] hover:text-white">
                {item.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;