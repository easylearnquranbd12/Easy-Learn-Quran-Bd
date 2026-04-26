const LearningPath = () => {
  const steps = ["Qaida", "Reading", "Tajweed", "Hifz"];

  return (
    <div className="w-full py-8 bg-gray-50">
      
      {/* TITLE */}
      <h2 className="text-center text-lg md:text-xl font-semibold text-gray-700 mb-12">
        LEARNING PATH
      </h2>

      <div className="max-w-[900px] mx-auto relative">

        {/* CURVED LINE (TOP) */}
        <div className="relative h-24 mb-2">
          <div className="absolute inset-0 border-t-2 border-green-200 rounded-t-full"></div>

          {/* BADGE (attached on curve) */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-4">
            <div className="px-5 py-1.5 bg-green-100 text-green-800 rounded-full text-xs shadow">
              Smooth connecting line
            </div>
          </div>
        </div>

        {/* STRAIGHT LINE */}
        <div className="relative mb-8">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-green-300"></div>

          {/* ARROW RIGHT */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 text-lg">
            →
          </div>

          {/* STEPS */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                
                {/* DOT */}
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-semibold shadow z-10">
                  {index + 1}
                </div>

                {/* LABEL */}
                <p className="mt-3 text-sm font-medium text-gray-700">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LearningPath;