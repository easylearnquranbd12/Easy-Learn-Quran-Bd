import { motion } from "framer-motion";

const MathExamsPage = () => {
  const exams = [
    {
      title: "O LEVEL/IGCSE MATH",
      code: "4024/0580",
      shape: "square",
      hoverShape: "circle",
      color: "bg-blue-500",
      textColor: "text-white",
      codeDigits: "24"
    },
    {
      title: "O LEVEL/IGCSE ADD MATH",
      code: "4037/0606",
      shape: "hexagon",
      hoverShape: "circle",
      color: "bg-green-500",
      textColor: "text-white",
      codeDigits: "37"
    },
    {
      title: "A LEVEL P1",
      code: "9709/1",
      shape: "square",
      hoverShape: "circle",
      color: "bg-purple-500",
      textColor: "text-white",
      codeDigits: "09"
    },
    {
      title: "A LEVEL P3",
      code: "9709/3",
      shape: "diamond",
      hoverShape: "circle",
      color: "bg-red-500",
      textColor: "text-white",
      codeDigits: "09"
    },
    {
      title: "A LEVEL S1",
      code: "9709/5",
      shape: "triangle",
      hoverShape: "circle",
      color: "bg-yellow-500",
      textColor: "text-gray-800",
      codeDigits: "09"
    },
    {
      title: "A LEVEL M1",
      code: "9709/4",
      shape: "pentagon",
      hoverShape: "circle",
      color: "bg-indigo-500",
      textColor: "text-white",
      codeDigits: "09"
    },
  ];

  const Shape = ({ exam }) => {
    const shapeStyles = {
      square: "rounded-lg",
      hexagon: "hexagon",
      circle: "rounded-full",
      diamond: "diamond",
      triangle: "triangle",
      pentagon: "pentagon"
    };

    return (
      <motion.div
        className={`w-16 h-16 ${exam.color} flex items-center justify-center ${exam.textColor} font-bold text-sm relative`}
        initial={{ borderRadius: shapeStyles[exam.shape] }}
        whileHover={{ 
          borderRadius: shapeStyles[exam.hoverShape],
          rotate: 360,
          scale: 1.1
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.span 
          className="z-10"
          whileHover={{ scale: 1.2 }}
        >
          {exam.codeDigits}
        </motion.span>
        <motion.div 
          className="absolute inset-0 opacity-0 hover:opacity-20 bg-white transition-opacity duration-300"
          style={{ borderRadius: "inherit" }}
        />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen  py-12 ">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          Math Exams
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
            >
              <Shape exam={exam} />
              <div className="mt-4 text-center">
                <h2 className="font-semibold text-gray-800 text-sm">{exam.title}</h2>
                <p className="text-gray-600 text-xs mt-1">{exam.code}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hexagon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        .diamond {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
        .triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .pentagon {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }
      `}</style>
    </div>
  );
};

export default MathExamsPage;