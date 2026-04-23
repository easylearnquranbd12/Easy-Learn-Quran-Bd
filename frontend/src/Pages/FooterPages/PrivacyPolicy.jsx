import { motion } from "framer-motion";
import {
  Cookie,
  FileLock,
  Info,
  LockKeyhole,
  Phone,
  RefreshCcw,
  Share2,
  User,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
        <title>Easy Learn Quran BD | Privacy Policy</title>
      </Helmet>

      <motion.div
        className="px-2 py-5 max-w-7xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.div variants={fadeInUp}>
          <TittleAnimation
            tittle="Privacy Policy"
            subtittle="Easy Learn Quran BD"
          />
        </motion.div>

        {/* Intro */}
        <motion.p
          className="text-lg mb-6 text-justify leading-relaxed"
          variants={fadeInUp}
        >
          At Easy Learn Quran BD, your privacy is very important to us. We are
          committed to protecting your personal information and ensuring a safe
          and secure learning environment for all students and guardians.
        </motion.p>

        {/* Sections */}
        {[
          {
            icon: <User className="text-blue-600" />,
            title: "1. Information We Collect",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>Your name, phone number, email address, and address</li>
                <li>Student account and course enrollment details</li>
                <li>Learning progress, feedback, and communication data</li>
              </ul>
            ),
          },
          {
            icon: <Info className="text-yellow-600" />,
            title: "2. Use of Information",
            content: (
              <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                <li>To provide Quran learning classes and services</li>
                <li>To communicate with students and guardians</li>
                <li>To improve teaching quality and user experience</li>
                <li>To maintain platform safety and prevent misuse</li>
              </ul>
            ),
          },
          {
            icon: <Share2 className="text-orange-600" />,
            title: "3. Information Sharing",
            content: (
              <>
                <p className="mb-4 text-lg text-justify">
                  Easy Learn Quran BD does not sell or share your personal data
                  with third parties except:
                </p>
                <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                  <li>When required by law</li>
                  <li>With your consent</li>
                  <li>With trusted service providers working for us</li>
                </ul>
              </>
            ),
          },
          {
            icon: <Cookie className="text-pink-600" />,
            title: "4. Cookies",
            content: (
              <p className="mb-6 text-lg text-justify">
                We use cookies to improve your browsing experience and track
                website performance. You can disable cookies anytime from your
                browser settings.
              </p>
            ),
          },
          {
            icon: <FileLock className="text-red-600" />,
            title: "5. Data Security",
            content: (
              <p className="mb-6 text-lg text-justify">
                We use secure systems and technologies to protect your personal
                data. However, no online platform can guarantee 100% security.
              </p>
            ),
          },
          {
            icon: <LockKeyhole className="text-purple-600" />,
            title: "6. User Rights",
            content: (
              <>
                <p className="mb-4 text-lg text-justify">
                  As a user, you have the right to:
                </p>
                <ul className="list-disc ml-8 mb-6 text-lg space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Contact us for privacy-related concerns</li>
                </ul>
              </>
            ),
          },
          {
            icon: <RefreshCcw className="text-indigo-600" />,
            title: "7. Policy Updates",
            content: (
              <p className="mb-6 text-lg text-justify">
                Easy Learn Quran BD may update this Privacy Policy at any time.
                Please review this page regularly to stay informed.
              </p>
            ),
          },
          {
            icon: <Phone className="text-green-700" />,
            title: "8. Contact Us",
            content: (
              <>
                <p className="mb-2 text-lg">
                  📧 Email:{" "}
                  <a
                    href="mailto:info@easylearnquranbd.com"
                    className="text-blue-600 underline"
                  >
                    info@easylearnquranbd.com
                  </a>
                </p>
                <p className="text-lg mb-10">
                  📞 Phone:{" "}
                  <a
                    href="tel:+8801518-494454"
                    className="text-blue-600 underline"
                  >
                    +8801518-494454
                  </a>
                </p>
              </>
            ),
          },
        ].map((section, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
              {section.icon}
              {section.title}
            </h2>
            {section.content}
          </motion.div>
        ))}

        {/* Final Note */}
        <motion.p
          className="text-xl font-semibold text-green-700 text-justify"
          variants={fadeInUp}
        >
          🔒 We value your trust and are committed to protecting your personal
          information at Easy Learn Quran BD.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
