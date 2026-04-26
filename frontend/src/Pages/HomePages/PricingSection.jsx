const PricingSection = () => {
  return (
    <div className="py-5 bg-[#eaeeec]">
      {/* TITLE */}
      <h2 className="text-center text-xl md:text-3xl font-bold text-gray-600 tracking-[3px] mb-14">
        PRICING 
      </h2>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-4 items-center">
        
        {/* BASIC */}
        <div className="bg-white rounded-2xl shadow-sm p-7 text-center border border-gray-100">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
            Basic
          </h3>

          <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
            Clean Seed elite donec condimentum ornare, sapien and experience.
          </p>

          <button className="bg-[#e6f0eb] text-gray-700 text-sm md:text-base px-6 py-2 rounded-full font-medium">
            Plan Plan
          </button>
        </div>

        {/* STANDARD (CENTER ACTIVE) */}
        <div className="bg-white rounded-2xl shadow-md p-7 text-center border border-green-700 relative scale-105">
          
          {/* TOP LABEL */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-700 text-white text-[11px] px-4 py-1 rounded-full font-medium">
            Best Package
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 mt-2">
            Standard
          </h3>

          <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
            Donec Sed elit donec posuere suspendisse vestibulum, urna blandit sapien.
          </p>

          <button className="bg-green-700 text-white text-sm md:text-base px-6 py-2 rounded-full font-medium shadow-sm">
            Free Trial Available
          </button>
        </div>

        {/* PREMIUM */}
        <div className="bg-white rounded-2xl shadow-sm p-7 text-center border border-gray-100">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
            Premium
          </h3>

          <p className="text-sm md:text-lg text-gray-500 leading-relaxed mb-6">
            Pretium Sed donec urna vestibulum sapien, condimentum experience.
          </p>

          <button className="bg-[#e6f0eb] text-gray-700 text-sm md:text-base px-6 py-2 rounded-full font-medium">
            Plan Plan
          </button>
        </div>

      </div>
    </div>
  );
};

export default PricingSection;