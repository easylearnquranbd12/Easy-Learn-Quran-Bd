import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const RefundPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Easy Learn Quran BD | Refund Policy</title>
      </Helmet>

      <div className="px-2 py-6 max-w-7xl mx-auto">
        <TittleAnimation
          tittle="Refund Policy"
          subtittle="Easy Learn Quran BD"
        />

        {/* 🔥 Intro */}
        <motion.p
          className="text-lg text-justify mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          At <strong>Easy Learn Quran BD</strong>, we are committed to providing
          high-quality Quran learning services with qualified teachers and a
          smooth online experience. Please read our refund policy carefully
          before making any payment.
        </motion.p>

        {/* 🔁 Return Policy */}
        <motion.h2
          className="text-xl font-semibold text-green-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          🔁 Return Policy
        </motion.h2>

        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <li>
            As our Quran classes are digital and service-based, we{" "}
            <strong>do not accept returns</strong> once a class or course has
            been started.
          </li>
          <li>
            Enrollment and class schedules are{" "}
            <strong>non-transferable</strong> to another student.
          </li>
        </motion.ul>

        {/* 💸 Refund */}
        <motion.h2
          className="text-xl font-semibold text-green-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          💸 Refund Eligibility
        </motion.h2>

        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <li>
            Refunds are <strong>not guaranteed</strong> once payment is
            completed.
          </li>
          <li>
            Refund requests may be considered only in special cases such as:
          </li>
          <li className="ml-4">
            • Duplicate payment  
            <br />
            • Technical issues preventing class access  
            <br />
            • Failure to provide scheduled classes
          </li>
          <li>
            All refund requests must be submitted within{" "}
            <strong>48 hours</strong> of payment.
          </li>
          <li>
            Requests should be sent to:{" "}
            <a
              href="mailto:info@easylearnquranbd.com"
              className="text-blue-600 underline"
            >
              info@easylearnquranbd.com


            </a>
          </li>
        </motion.ul>

        {/* ⚠️ Notes */}
        <motion.h2
          className="text-xl font-semibold text-green-700 mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          ⚠️ Important Notes
        </motion.h2>

        <motion.ul
          className="list-disc list-inside mb-6 text-justify text-base space-y-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
        >
          <li>
            If classes have already started or been attended, refund requests
            may not be approved.
          </li>
          <li>
            Easy Learn Quran BD reserves the right to{" "}
            <strong>approve or reject</strong> any refund request.
          </li>
          <li>
            Processing time for approved refunds may take{" "}
            <strong>5–10 working days</strong>.
          </li>
        </motion.ul>

        {/* ✅ Closing */}
        <motion.p
          className="text-base text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={8}
        >
          ✅ Our goal is to provide the best Quran learning experience. If you
          face any issues, please contact us — we are always here to help.
        </motion.p>
      </div>
    </>
  );
};

export default RefundPolicy;