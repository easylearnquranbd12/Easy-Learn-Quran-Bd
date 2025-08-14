import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

// Animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

// Section Component with animation and dynamic styling
const Section = ({ title, items, custom, color }) => {
  const colorMap = {
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-300",
      text: "text-indigo-700",
      link: "text-indigo-600",
      hover: "hover:text-indigo-800",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-700",
      link: "text-green-600",
      hover: "hover:text-green-800",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-800",
      link: "text-yellow-600",
      hover: "hover:text-yellow-800",
    },
  };

  const styles = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      className="mb-8"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={custom}
    >
      <h2 className={`text-lg font-bold mb-2 ${styles.text}`}>{title}</h2>
      <div className={`rounded-lg p-4 border ${styles.bg} ${styles.border} shadow-sm`}>
        <ul className="list-disc pl-5 space-y-2">
          {items.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.link} font-medium underline-offset-2 hover:underline ${styles.hover} transition-colors duration-200`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const PastPaperAlevelMathDetails = () => {
  return (
    <>
      <Helmet>
        <title>Nasmatics | Additional Papers</title>
      </Helmet>

      <div className="py-3 px-3 max-w-7xl mx-auto">
        <TittleAnimation
          tittle="Additional Mathematics"
          subtittle="January / February"
        />

        <motion.h2
          className="text-xl font-medium text-blue-700 mt-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          January / February
        </motion.h2>

        <motion.p
          className="text-blue-600 font-medium mt-1"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          A Level
        </motion.p>

        <motion.p
          className="text-blue-700 font-semibold mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          English International Examination
        </motion.p>

        {/* 🎯 Sections with colorful backgrounds */}
        <Section
          title="Question Papers January / February"
          items={[
            {
              label: "Question Paper 11",
              url: "https://example.com/paper11.pdf",
            },
            {
              label: "Question Paper 12",
              url: "https://example.com/paper12.pdf",
            },
            {
              label: "Question Paper 21",
              url: "https://example.com/paper21.pdf",
            },
            {
              label: "Question Paper 22",
              url: "https://example.com/paper22.pdf",
            },
          ]}
          custom={4}
          color="indigo"
        />

        <Section
          title="Mark Schemes January / February"
          items={[
            { label: "Mark Scheme 11", url: "https://example.com/ms11.pdf" },
            { label: "Mark Scheme 12", url: "https://example.com/ms12.pdf" },
            { label: "Mark Scheme 21", url: "https://example.com/ms21.pdf" },
            { label: "Mark Scheme 22", url: "https://example.com/ms22.pdf" },
          ]}
          custom={5}
          color="green"
        />

        <Section
          title="Others January / February"
          items={[
            {
              label: "Grade Threshold",
              url: "https://example.com/grade-threshold.pdf",
            },
          ]}
          custom={6}
          color="yellow"
        />
      </div>
    </>
  );
};

export default PastPaperAlevelMathDetails;
 