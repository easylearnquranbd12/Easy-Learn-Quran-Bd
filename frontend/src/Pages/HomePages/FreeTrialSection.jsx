import { Link } from "react-router-dom";

const FreeTrialSection = () => {
  return (
    <div className="w-full py-16 bg-[#f8faf9] ">
      {/* TITLE */}
      <div className="text-center mb-12">
        <p className="text-xl md:text-2xl font-bold uppercase tracking-wide inline-block bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1] bg-clip-text text-transparent">
          FREE TRIAL
        </p>

        <span className="block w-24 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#83e6c1]"></span>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 rounded-lg overflow-hidden shadow-xl border border-[#d7efe4] bg-white">
        
        {/* LEFT SIDE */}
        <div className="relative bg-gradient-to-br from-[#145c43] via-[#1b7a58] to-[#83e6c1] p-10 md:p-14 flex flex-col justify-center text-white">
          
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <p className="uppercase tracking-[4px] text-sm mb-4 text-white/80">
            Learn Quran Online
          </p>

          <h2 className="text-xl md:text-3xl font-bold leading-tight mb-6">
            Start Your Free <br /> Trial Today
          </h2>

          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Live 1-to-1 Quran Classes for Kids & Adults with
            Certified Male & Female Teachers.
          </p>

          <div>
            <Link
              to="/enroll-now"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-[#145c43] font-semibold hover:scale-105 transition duration-300"
            >
              Start Now
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-6 md:p-10 bg-white">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Book Your Free Class
            </h3>

            <p className="text-gray-500 text-sm">
              Fill up the form and our team will contact you soon.
            </p>
          </div>

          <form className="space-y-5">
            {/* NAME */}
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#145c43]"
            />

            {/* WHATSAPP */}
            <input
              type="text"
              placeholder="WhatsApp Number"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#145c43]"
            />

            {/* COUNTRY */}
            <select className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#145c43]">
              <option>Select Country</option>
              <option>Bangladesh</option>
              <option>India</option>
              <option>USA</option>
            </select>

            {/* COURSE */}
            <select className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#145c43]">
              <option>Select Course</option>

              <option value="islamic-studies-for-kids-course">
                Islamic Studies for Kids Course
              </option>

              <option value="quran-translation-course">
                Quran Translation Course
              </option>

              <option value="quran-reading-course">
                Quran Reading Course
              </option>

              <option value="tajweed">
                Rules of Tajweed – Quran Recitation
              </option>

              <option value="hifz-ul-quran">
                Quran Memorization Course (Hifz-ul-Quran)
              </option>

              <option value="arabic-for-beginners-noorani-qaida">
                Arabic For Beginners – Noorani Qaida
              </option>
            </select>

            {/* BUTTON */}
            <Link
              to="/enroll-now"
              className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-[#145c43] via-[#1f8a63] to-[#145c43] text-white font-semibold text-base md:text-lg hover:scale-[1.02] transition duration-300"
            >
              Book Free Trial Now
            </Link>

            <p className="text-center text-sm text-gray-500">
              No Payment Required
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialSection;