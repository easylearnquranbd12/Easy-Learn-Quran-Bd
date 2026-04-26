import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BannerSection = () => {
  const axiosPublic = useAxiosPublic();

  // ✅ Fetch banners
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner");
      return res.data;
    },
  });

  // ✅ only active banner
  const activeBanner = banners.find((item) => item.status === "active");

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        Loading banner...
      </div>
    );
  }

  if (!activeBanner) {
    return null;
  }

  return (
    <div className="w-full flex justify-center ">
      <div className="relative w-full max-w-[1400px] rounded-2xl  shadow-xl">
        {/* 🔥 IMAGE - Fully visible without cropping */}
        <div className="relative w-full">
          <img
            src={activeBanner.ideaShareImage}
            alt="banner"
            className="w-full h-auto min-h-[300px] object-cover  rounded-lg"
            style={{
              maxHeight: "600px",
              width: "100%",
            }}
          />
        </div>
        {/* 🔥 CONTENT - Responsive positioning */}
        <div className="absolute inset-0 flex flex-col justify-center items-start p-2  md:p-8 text-white">
          <h2 className="text-xl md:text-3xl  text-justify font-bold mb-1 md:mb-3 max-w-[60%] sm:max-w-full">
            {activeBanner.title}
          </h2>

          <div
            className="text-xs sm:text-sm md:text-base max-w-[60%] text-justify md:max-w-[600px] text-gray-100 line-clamp-3 sm:line-clamp-none"
            dangerouslySetInnerHTML={{
              __html: activeBanner.description,
            }}
          />

          <div className="mt-2 md:mt-6">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/enroll-now" className="bg-white text-green-800 px-2 md:px-4 py-1 md:py-1.5  rounded-lg font-medium text-xs md:text-sm hover:bg-gray-100 transition-colors">
                Start Free Trial
              </Link>
              <Link to="/enroll-now" className="border border-white px-2 md:px-4 py-1 md:py-1.5   rounded-lg text-xs md:text-sm hover:bg-white/10 transition-colors">
                Join Now
              </Link>
            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-2 md:gap-3 mt-4 sm:mt-6 text-xs md:text-sm text-gray-200">
              <span className="flex items-center gap-1">✔ Live Classes</span>
              <span className="flex items-center gap-1">
                ✔ Qualified Teachers
              </span>
              <span className="flex items-center gap-1">
                ✔ Flexible Schedule
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
