const FreeTrialSection = () => {
  return (
    <div className="w-full py-16 bg-gray-50">
      
      {/* TITLE */}
      <h2 className="text-center text-lg md:text-xl font-semibold text-green-900 mb-10">
        FREE TRIAL 
      </h2>

      {/* MAIN CARD */}
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-[#d9f3e7] to-[#bde8d6] p-8 md:p-10 flex flex-col justify-center">
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Start Your Free <br /> Trial Today
          </h2>

          <p className="text-gray-700 text-sm md:text-base mb-6">
            Live 1-to-1 Quran Classes for Kids & Adults <br />
            with Certified Male & Female Teachers.
          </p>

          <button className="w-fit px-6 py-2 rounded-full bg-[#0f3d2e] text-white hover:bg-[#145c43] transition">
            Start Now
          </button>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-6 md:p-8 bg-white">
          <form className="space-y-4">
            
            {/* NAME */}
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* WHATSAPP */}
            <input
              type="text"
              placeholder="WhatsApp"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* COUNTRY */}
            <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
              <option>Country</option>
              <option>Bangladesh</option>
              <option>India</option>
              <option>USA</option>
            </select>

            {/* COURSE */}
            <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
              <option>Course</option>
              <option>Quran Reading</option>
              <option>Tajweed</option>
              <option>Islamic Studies</option>
            </select>

            {/* BUTTON */}
            <button className="w-full py-2 rounded-full bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white font-medium hover:opacity-90 transition">
              Book Free Trial Now
            </button>

            <p className="text-center text-xs text-gray-500">
              No Payment Required
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};

export default FreeTrialSection;