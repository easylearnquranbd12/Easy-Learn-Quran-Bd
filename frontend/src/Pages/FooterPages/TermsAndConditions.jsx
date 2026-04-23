import { motion } from "framer-motion";
import {
  AlertCircle,
  Ban,
  FileText,
  Globe,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Easy Learn Quran BD | Terms & Conditions</title>
      </Helmet>

      <div className="px-2 py-5 max-w-7xl mx-auto">
        <TittleAnimation
          tittle="Terms & Conditions"
          subtittle="Easy Learn Quran BD"
        />

        {/* 🔥 Intro */}
        <motion.h1
          className="text-2xl lg:text-3xl font-bold mb-6 text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Welcome to Easy Learn Quran BD
        </motion.h1>

        <motion.p
          className="mb-6 text-lg leading-relaxed text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          By accessing and using our platform, you agree to follow the terms and
          conditions of Easy Learn Quran BD. These terms are designed to ensure a
          respectful, safe, and effective Quran learning environment for all
          students.
        </motion.p>

        {/* 🔥 Cookies */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <ShieldCheck className="text-green-600" />
          Use of Cookies
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          We use cookies to improve your browsing experience and analyze website
          performance. By continuing to use our website, you agree to our use of
          cookies in accordance with our Privacy Policy.
        </motion.p>

        {/* 🔥 Content Ownership */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <FileText className="text-purple-600" />
          Intellectual Property
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          All course materials, videos, and content provided by Easy Learn Quran
          BD are protected by copyright. These materials are for personal
          learning use only and must not be copied, shared, or distributed
          without permission.
        </motion.p>

        {/* 🔥 Linking */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
        >
          <Link2 className="text-cyan-600" />
          Hyperlinking
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={8}
        >
          Trusted organizations may link to our website without prior approval.
          However, others must request permission before linking to Easy Learn
          Quran BD.
        </motion.p>

        {/* 🔥 iFrame */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={9}
        >
          <Ban className="text-red-600" />
          iFrames Policy
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={10}
        >
          You may not embed or display our website content within frames or
          modify its visual presentation without written permission.
        </motion.p>

        {/* 🔥 Liability */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={11}
        >
          <AlertCircle className="text-orange-500" />
          Content Liability
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={12}
        >
          We are not responsible for any external content linked to or from our
          website. Users are responsible for ensuring their use of content
          complies with applicable laws.
        </motion.p>

        {/* 🔥 Link Removal */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={13}
        >
          <Globe className="text-blue-500" />
          Link Removal
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={14}
        >
          If you find any content or link on our website inappropriate, you may
          contact us. We will review requests but are not obligated to remove
          content immediately.
        </motion.p>

        {/* 🔥 Disclaimer */}
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={15}
        >
          <ShieldCheck className="text-gray-700" />
          Disclaimer
        </motion.h2>

        <motion.p
          className="mb-6 text-lg text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={16}
        >
          While we strive to provide accurate and high-quality Quran learning
          services, Easy Learn Quran BD does not guarantee uninterrupted service
          or error-free content. We are not liable for any damages arising from
          the use of our platform.
        </motion.p>

        {/* 🔥 Closing */}
        <motion.p
          className="text-xl font-semibold text-green-700 mt-10 text-justify"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={17}
        >
          📘 Thank you for choosing Easy Learn Quran BD. We appreciate your trust
          and are committed to helping you on your Quran learning journey.
        </motion.p>
      </div>
    </>
  );
};

export default TermsAndConditions;