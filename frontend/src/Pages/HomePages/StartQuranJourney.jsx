import { Link } from "react-router-dom";
import startQuran from "../../assets/image/startQuranBg.png";

const StartQuranJourney = () => {
  return (
    <div className="max-w-[1400px] mx-auto ">
      {/* 🔥 BG CONTAINER */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${startQuran})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 🔥 CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[280px] md:min-h-[320px] px-4">
          {/* TITLE */}
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">
            Start Your Quran Journey Today
          </h1>

          {/* BUTTON */}
          <Link to="/enroll-now" className="bg-white text-green-800 px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartQuranJourney;
