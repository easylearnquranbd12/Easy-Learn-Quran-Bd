const Promotion = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(500px,_1fr)_200px] gap-6 max-w-[1400px] mx-auto py-12">
      {/* Left Section (ছোট width + height) */}
      <div className="bg-green-100 rounded-xl p-4 flex items-center justify-center min-h-[180px]">
        <p className="text-center text-gray-700 font-medium text-sm">
          🚀 Left Side Promotion
        </p>
      </div>

      {/* Middle Section (বড় width + height) */}
      <div className="bg-white rounded-xl p-10 shadow-lg border border-[#1f4e43] min-h-[380px]">
        <h2 className="text-2xl font-bold text-center text-[#1f4e43] mb-6">
          Main Promotion Content
        </h2>
        <p className="text-gray-600 text-center">
          এখানে তুমি তোমার মূল content রাখবা (testimonial, stats বা অন্য কিছু)।
        </p>
      </div>

      {/* Right Section (ছোট width + height) */}
      <div className="bg-green-100 rounded-xl p-4 flex items-center justify-center min-h-[180px]">
        <p className="text-center text-gray-700 font-medium text-sm">
          🎯 Right Side Promotion
        </p>
      </div>
    </div>
  );
};

export default Promotion;
