import axios from "axios";
import { useEffect, useState } from "react";
import { FaFacebook, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import imageLogo from "../../assets/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const { data } = await axios.get(
          "https://learning-quiz-platfrom-paid-project-ten.vercel.app/api/admin/social-links"
        );
        setSocialLinks(data);
      } catch (err) {
        console.error("Failed to fetch social links:", err);
      }
    };
    fetchSocialLinks();
  }, []);

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-yellow-50 to-green-50 animate-gradient-x"></div>

      {/* Floating Shapes (Big) */}
      <div className="absolute inset-0">
        <span className="absolute w-32 h-32 bg-green-200 rounded-full opacity-30 animate-float top-10 left-5"></span>
        <span className="absolute w-20 h-20 bg-yellow-200 rounded-full opacity-30 animate-float-slow bottom-10 right-10"></span>
        <span className="absolute w-16 h-16 bg-green-300 rounded-full opacity-30 animate-float top-1/2 left-1/3"></span>
      </div>

      {/* Small Floating Icons/Dots */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-green-500 opacity-40 text-lg animate-tiny"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {i % 2 === 0 ? "?" : "+"}
          </span>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-2 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {/* Logo & Contact Info */}
        <div>
          <img src={imageLogo} alt="Mathematics Logo" className="h-12 mb-2" />
          <p className="mb-4 font-bold uppercase text-base">Office Address</p>

          <p className="flex items-center gap-2 mb-1">
            <FaPhoneAlt /> 01331223469
          </p>
          <p className="flex items-center gap-2 mb-1">
            <MdEmail /> info@.com
          </p>
          <p className="flex items-center gap-2">
            <MdLocationOn /> House 15, road 11, Uttara sector 3
          </p>
        </div>

        {/* Useful Links */}
        <div className="text-base">
          <h2 className="footer-title mb-4 text-base">Useful Links</h2>
          <Link to="/about-us-more-information" className="link link-hover block mb-2 md:text-left">
            About Us
          </Link>
          <Link to="/contact-us" className="link link-hover block mb-2 md:text-left">
            Contact
          </Link>
          <Link to="/privacy-policy" className="link link-hover block mb-2 md:text-left">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="link link-hover block mb-2 md:text-left">
            Terms & Conditions
          </Link>
          <Link to="/refund-policy" className="link link-hover block md:text-left">
            Refund Policy
          </Link>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="footer-title mb-4 text-base">Follow Us</h2>
          <div className="flex gap-4">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-blue-600 text-2xl hover:text-blue-800 transition"
              >
                <FaFacebook />
              </a>
            )}
            {socialLinks.youtube && (
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-red-600 text-2xl hover:text-red-800 transition"
              >
                <FaYoutube />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 text-center text-sm p-4 bg-white/80 backdrop-blur relative z-10">
        <p>
          &copy; {currentYear} Learning Quiz || Developed by{" "}
          <a
            href="https://github.com/Mozammel772"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Mozammel
          </a>
        </p>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
        }
        @keyframes tinyMove {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-15px) rotate(20deg); opacity: 0.8; }
        }
        .animate-tiny {
          animation: tinyMove 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
