import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import footer from "../../assets/image/footer.png";
import imageLogo from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [socialLinks, setSocialLinks] = useState({});

  const [loading, setLoading] = useState(true);

  const iconMap = {
    facebook: (
      <FaFacebook className="text-white text-xl hover:scale-110 transition-all duration-300" />
    ),

    youtube: (
      <FaYoutube className="text-white text-xl hover:scale-110 transition-all duration-300" />
    ),

    instagram: (
      <FaInstagram className="text-white text-xl hover:scale-110 transition-all duration-300" />
    ),

    twitter: (
      <FaTwitter className="text-white text-xl hover:scale-110 transition-all duration-300" />
    ),

    linkedin: (
      <FaLinkedin className="text-white text-xl hover:scale-110 transition-all duration-300" />
    ),

    tiktok: (
      <FaTiktok className="text-white text-xl hover:scale-110 transition-all duration-300" />
    ),

    whatsapp: (
      <FaWhatsapp className="text-white text-xl hover:scale-110 transition-all duration-300" />
    ),
  };

  const fetchSocialLinks = async () => {
    try {
      const { data } = await axios.get(
        "https://easy-learn-quran-bd.vercel.app/api/admin/social-links",
      );

      setSocialLinks(data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();

    const interval = setInterval(
      fetchSocialLinks,
      5000,
    );

    return () => clearInterval(interval);
  }, []);

  const validLinks = Object.entries(
    socialLinks,
  ).filter(
    ([_, value]) =>
      value && value.trim() !== "",
  );

  return (
    <footer
      className="relative bg-cover bg-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${footer})`,
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#063b2d]/95 via-[#0b5b43]/95 to-[#063b2d]/95 z-0" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        {/* LOGO + CONTACT */}
        <div>

          {/* NAVBAR STYLE LOGO */}
          <div className="inline-block bg-[#0b4d39] border border-[#d4af37]/20 rounded-md px-3 py-2 shadow-xl mb-6">
  <img
    className="h-[58px] md:h-[65px] w-auto object-contain mx-auto"
    src={imageLogo}
    alt="Logo"
  />

  <p className="text-center text-[11px] md:text-xs text-gray-200 mt-2 tracking-wide leading-relaxed">
    Worldwide Online Islamic Education Platform
  </p>
</div>

          <h2 className="text-lg font-bold uppercase tracking-wide text-[#d4af37] mb-5">
            Office Address
          </h2>

          <div className="space-y-4">

            <p className="flex items-center gap-3 text-gray-200">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <FaPhoneAlt className="text-[#d4af37]" />
              </span>

              +8801518-494454
            </p>

            <p className="flex items-center gap-3 text-gray-200">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <MdEmail className="text-[#d4af37]" />
              </span>

              info@easylearnquranbd.com
            </p>

            <p className="flex items-start gap-3 text-gray-200 leading-relaxed">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mt-1">
                <MdLocationOn className="text-[#d4af37]" />
              </span>

              Kishoreganj Sadar, Dhaka,
              Bangladesh-2300
            </p>
          </div>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h2 className="text-xl font-bold text-[#d4af37] mb-6">
            Useful Links
          </h2>

          <div className="flex flex-col gap-4 text-gray-200">

            <Link
              to="/about-us-more-information"
              className="hover:text-[#d4af37] transition-all duration-300 hover:translate-x-1"
            >
              About Us
            </Link>

            <Link
              to="/contact-us"
              className="hover:text-[#d4af37] transition-all duration-300 hover:translate-x-1"
            >
              Contact
            </Link>

            <Link
              to="/privacy-policy"
              className="hover:text-[#d4af37] transition-all duration-300 hover:translate-x-1"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="hover:text-[#d4af37] transition-all duration-300 hover:translate-x-1"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/refund-policy"
              className="hover:text-[#d4af37] transition-all duration-300 hover:translate-x-1"
            >
              Refund Policy
            </Link>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h2 className="text-xl font-bold text-[#d4af37] mb-6">
            Follow Us
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Stay connected with us through
            social media and get the latest
            updates, courses, and Islamic
            learning resources.
          </p>

          {loading ? (
            <p className="text-gray-400">
              Loading...
            </p>
          ) : validLinks.length > 0 ? (
            <div className="flex flex-wrap gap-4">

              {validLinks.map(
                ([platform, url]) =>
                  iconMap[platform] && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#145c43] border border-white/10 flex items-center justify-center transition-all duration-300 shadow-lg"
                    >
                      {iconMap[platform]}
                    </a>
                  ),
              )}
            </div>
          ) : (
            <p className="text-gray-400">
              No Social Link
            </p>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-300">

          <p className="text-center md:text-left">
            © {currentYear} Easy Learn Quran
            BD. All Rights Reserved.
          </p>

          <p className="text-center md:text-right">
            Developed by{" "}
            <a
              href="https://github.com/Mozammel772"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37] hover:underline font-medium"
            >
              Mozammel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;