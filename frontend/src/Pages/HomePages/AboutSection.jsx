import { Link } from "react-router-dom";
import aboutBgImage from "../../assets/image/aboutimage.png";
import liveClass from "../../assets/image/liveClass.png";

const AboutSection = () => {
  return (
    <div className="max-w-[1400px] mx-auto  py-6">
      
      {/* SECTION TITLE */}
      <div className="text-center mb-14">
        <p className="text-xl md:text-2xl font-bold uppercase tracking-wide inline-block bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
          About Us
        </p>

        <span className="block w-24 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1]"></span>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1  gap-6">

        {/* ABOUT CARD */}
{/* ABOUT CARD */}
<div className="relative rounded-[35px] overflow-hidden group shadow-2xl">
  
  {/* IMAGE */}
  <img
    src={aboutBgImage}
    alt="about"
    className="w-full h-[400px] md:h-[350px] object-cover group-hover:scale-105 transition duration-700"
  />

  {/* LIGHT OVERLAY */}
  <div className="absolute inset-0 bg-black/20"></div>

  {/* CONTENT */}
  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white">
    
    {/* TAG */}
    <span className="w-fit px-4 py-1 rounded-full bg-[#145c43]/80 backdrop-blur-sm text-xs md:text-sm uppercase tracking-[3px] font-semibold mb-4">
      About More
    </span>

    {/* HEADING */}
    <h2 className="text-xl md:text-2xl font-bold leading-tight mb-4 drop-shadow-lg">
      Learn Quran With Proper Tajweed & Understanding
    </h2>

    {/* DESCRIPTION */}
    <p className="text-sm md:text-lg text-white leading-relaxed mb-8 max-w-[650px] drop-shadow-md">
      At Easy Learn Quran BD, we focus on proper Tajweed,
      understanding, and character building through Quran
      education for kids and adults.
    </p>

    {/* BUTTON */}
    <div>
      <Link
        to="/about-us-more-information"
        className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] text-white font-semibold hover:scale-105 transition duration-300"
      >
        Learn More
      </Link>
    </div>
  </div>
</div>

        {/* LIVE CLASS CARD */}
        <div className="bg-white rounded-[30px] shadow-xl overflow-hidden border border-gray-100">
          
          {/* TOP TEXT */}
          <div className="p-6 md:p-8 text-center">
            <p className="uppercase tracking-[3px] text-sm text-[#145c43] font-semibold mb-3">
              Live Class Preview
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Experience Interactive Online Classes
            </h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-[500px] mx-auto">
              Join live one-to-one Quran sessions with experienced male &
              female teachers from anywhere in the world.
            </p>
          </div>

          {/* IMAGE */}
          <div className="px-4 pb-4">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={liveClass}
                alt="live class"
                className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;