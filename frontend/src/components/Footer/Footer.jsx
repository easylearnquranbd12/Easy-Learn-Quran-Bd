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
    facebook: <FaFacebook className="hover:scale-110 transition text-white text-xl" />,
    youtube: <FaYoutube className="hover:scale-110 transition text-white text-xl" />,
    instagram: <FaInstagram className="hover:scale-110 transition text-white text-xl" />,
    twitter: <FaTwitter className="hover:scale-110 transition text-white text-xl" />,
    linkedin: <FaLinkedin className="hover:scale-110 transition text-white text-xl" />,
    tiktok: <FaTiktok className="hover:scale-110 transition text-white text-xl" />,
    whatsapp: <FaWhatsapp className="hover:scale-110 transition text-white text-xl" />,
  };

  const fetchSocialLinks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/social-links");
      setSocialLinks(data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
    const interval = setInterval(fetchSocialLinks, 5000);
    return () => clearInterval(interval);
  }, []);

  const validLinks = Object.entries(socialLinks).filter(
    ([_, value]) => value && value.trim() !== ""
  );

  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${footer})` }}
    >
    

      {/* 🔥 Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & Contact */}
        <div>
          <img src={imageLogo} alt="Logo" className="h-16 w-24 mb-4" />
          <p className="font-bold uppercase mb-4 text-gray-200">Office Address</p>

          <p className="flex items-center gap-2 mb-2 text-gray-300">
            <FaPhoneAlt /> +8801518-494454
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-300">
            <MdEmail /> info@easylearnquranbd.com
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <MdLocationOn /> Kishoreganj Sadar, Dhaka, Bangladesh-2300
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="font-semibold mb-4 text-gray-200">Useful Links</h2>
          <Link to="/about-us-more-information" className="block mb-2 hover:text-green-400 transition">
            About Us
          </Link>
          <Link to="/contact-us" className="block mb-2 hover:text-green-400 transition">
            Contact
          </Link>
          <Link to="/privacy-policy" className="block mb-2 hover:text-green-400 transition">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="block mb-2 hover:text-green-400 transition">
            Terms & Conditions
          </Link>
          <Link to="/refund-policy" className="hover:text-green-400 transition">
            Refund Policy
          </Link>
        </div>

        {/* Social */}
        <div>
          <h2 className="font-semibold mb-4 text-gray-200">Follow Us</h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : validLinks.length > 0 ? (
            <div className="flex gap-4 flex-wrap">
              {validLinks.map(
                ([platform, url]) =>
                  iconMap[platform] && (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                      {iconMap[platform]}
                    </a>
                  )
              )}
            </div>
          ) : (
            <p className="text-gray-400">No Social Link</p>
          )}
        </div>
      </div>

      {/* 🔥 Bottom Bar */}
      <div className="relative z-10 border-t border-green-800 text-center py-4 text-sm text-gray-300">
        <p>
          &copy; {currentYear} Learning Quiz || Developed by{" "}
          <a
            href="https://github.com/Mozammel772"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            Mozammel
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;