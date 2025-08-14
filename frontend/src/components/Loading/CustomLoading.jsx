import { motion } from "framer-motion";

const CustomLoading = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-black">
      {/* ✅ Rotating border with "N" inside */}
      <motion.div
        className="w-20 h-20 border-4 border-[#6155a8] border-t-[#0ae40a] rounded-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      >
        <div className="text-2xl font-bold text-[#1f4e43]">N</div>
      </motion.div>

      {/* 🔽 Optional fade-in text below */}
      <motion.p
        className="mt-4 text-sm md:text-base tracking-widest text-[#8818c9]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Nasmatics.com
      </motion.p>
    </div>
  );
};

export default CustomLoading;
