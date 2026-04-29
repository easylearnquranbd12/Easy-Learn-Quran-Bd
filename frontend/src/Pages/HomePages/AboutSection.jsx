import { Link } from "react-router-dom";
import aboutBgImage from "../../assets/image/aboutimage.png";
import liveClass from "../../assets/image/liveClass.png";

const AboutSection = () => {
  return (
    <div className="max-w-[1400px] mx-auto  py-6">
      
      {/* SECTION TITLE */}
      {/* SECTION TITLE */}
<div className="text-center mb-14">

  {/* TOP TAG */}
  <span className="inline-block px-5 py-2 rounded-full bg-[#145c43]/10 text-[#145c43] text-sm md:text-base font-semibold tracking-[2px] uppercase border border-[#145c43]/20 shadow-sm">
    Easy Learn Quran BD
  </span>

  {/* MAIN TITLE */}
  <h2 className="mt-5 text-xl md:text-3xl font-extrabold leading-tight text-gray-800">
    Learn Quran Online With <br />
    <span className="bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
      Proper Tajweed & Guidance
    </span>
  </h2>

  {/* DESCRIPTION */}
  <p className="max-w-3xl mx-auto mt-5 text-sm md:text-lg text-gray-600 leading-relaxed">
    We provide professional online Quran classes for kids and adults
    with experienced male and female teachers. Learn Quran recitation,
    Tajweed, memorization, and Islamic studies from the comfort of your home.
  </p>

  {/* LINE */}
  <span className="block w-28 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1]"></span>
</div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1  gap-6">

        {/* ABOUT CARD */}
{/* ABOUT CARD */}
{/* ABOUT CARD */}
<div className="relative overflow-hidden rounded-[35px] shadow-2xl group">

  {/* IMAGE */}
  <img
    src={aboutBgImage}
    alt="about"
    className="w-full h-[420px] md:h-[520px] object-cover group-hover:scale-110 transition-all duration-700"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d2e]/90 via-[#145c43]/50 to-[#145c43]/10"></div>

  {/* CONTENT */}
  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white z-10">

    {/* TOP TAG */}
    <div className="mb-5">
      <span className="inline-flex items-center px-5 py-2 rounded-full bg-[#145c43]/80 backdrop-blur-md border border-white/20 text-xs md:text-sm uppercase tracking-[3px] font-semibold shadow-lg">
        About Easy Learn Quran
      </span>
    </div>

    {/* HEADING */}
    <h2 className="text-2xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-5">
      Learn Quran Online <br />
      With Proper Tajweed & Islamic Guidance
    </h2>

    {/* DESCRIPTION */}
    <p className="text-sm md:text-lg text-gray-200 leading-relaxed max-w-2xl mb-8">
      Easy Learn Quran BD provides interactive online Quran classes
      for kids and adults with experienced male and female teachers.
      Build strong Quran recitation, Tajweed, memorization, and
      Islamic knowledge from home.
    </p>

    {/* BUTTONS */}
    <div className="flex flex-wrap gap-4">

      <Link
        to="/about-us-more-information"
        className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300"
      >
        Learn More
      </Link>

      <Link
        to="/enroll-now"
        className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/30 backdrop-blur-md bg-white/10 text-white font-semibold hover:bg-white hover:text-[#145c43] transition-all duration-300"
      >
        Free Trial Class
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