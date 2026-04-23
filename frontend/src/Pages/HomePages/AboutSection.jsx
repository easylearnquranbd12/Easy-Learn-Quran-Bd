import aboutBgImage from "../../assets/image/aboutimage.png";
import liveClass from "../../assets/image/liveClass.png";

const AboutSection = () => {
  return (
    <div className="max-w-[1400px] mx-auto md:px-2 py-6">
      <div className="text-center mb-10">
        <p className="text-xl font-bold text-green-800 uppercase relative inline-block">
          About Section
          {/* Wavy Underline */}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
        {/* 🔥 ABOUT SECTION */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background Image */}
          <img
            src={aboutBgImage}
            alt="about"
            className="w-full h-[300px] md:h-[350px] object-cover"
          />

          {/* Content (no overlay) */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <p className="text-sm md:text-base uppercase text-green-800 mb-2 font-bold">
              About Section
            </p>

            <h2 className="text-base md:text-lg font-semibold text-gray-700 leading-relaxed max-w-[500px]">
              At Easy Learn Quran BD, we focus on proper Tajweed, understanding,
              and character building through Quran education.
            </h2>
          </div>
        </div>

        {/* 🔥 LIVE CLASS PREVIEW */}
        <div className="rounded-2xl shadow-md">
          <p className="text-sm md:text-base uppercase text-center text-green-800 mb-3 font-bold">
            (Live Class Preview)
          </p>

          <div className="rounded-xl overflow-hidden shadow">
            <img
              src={liveClass}
              alt="live class"
              className="w-full h-[250px] md:h-[300px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
