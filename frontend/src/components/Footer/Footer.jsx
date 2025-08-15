// // import { FaFacebook, FaPhoneAlt, FaYoutube } from "react-icons/fa";
// // import { MdEmail, MdLocationOn } from "react-icons/md";
// // import { Link } from "react-router-dom";

// // const Footer = () => {
// //   const currentYear = new Date().getFullYear();

// //   return (
// //     <footer  className="bg-[#f7fdfc] ">
// //       <div className="footer max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-base-content ">
// //         {/* Logo & Contact Info */}
// //         <div>
// //           <img src="/logo.png" alt="Mathematics Logo" className="h-12 mb-2" />
// //           <p className="mb-4 font-bold uppercase text-base">Office Address</p>

// //           <p className="flex items-center gap-2 mb-1">
// //             <FaPhoneAlt /> 019111111
// //           </p>
// //           <p className="flex items-center gap-2 mb-1">
// //             <MdEmail /> abc@gmail.com
// //           </p>
// //           <p className="flex items-center gap-2">
// //             <MdLocationOn /> 11/3 Dhaka, Bangladesh
// //           </p>
// //         </div>

// //         {/* Useful Links */}
// //         <div className="text-base">
// //           <h2 className="footer-title mb-4 text-base">Useful Links</h2>
// //           <Link
// //             to="/about-us-more-information"
// //             className="link link-hover block mb-2 text-center md:text-left "
// //           >
// //             About Us
// //           </Link>
// //           <Link
// //             to="/contact-us"
// //             className="link link-hover block mb-2 text-center md:text-left"
// //           >
// //             Contact
// //           </Link>
// //           <Link
// //             to="/privacy-policy"
// //             className="link link-hover block mb-2 text-center md:text-left"
// //           >
// //             Privacy Policy
// //           </Link>
// //           <Link
// //             to="/terms-and-conditions"
// //             className="link link-hover block mb-2 text-center md:text-left"
// //           >
// //             Terms & Conditions
// //           </Link>
// //           <Link
// //             to="/refund-policy"
// //             className="link link-hover block text-center md:text-left"
// //           >
// //             Refund Policy
// //           </Link>
// //         </div>

// //         {/* Social Media Links */}
// //         <div>
// //           <h2 className="footer-title mb-4 text-base">Follow Us</h2>
// //           <div className="flex gap-4">
// //             <a
// //               href="https://facebook.com/yourpage"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               aria-label="Facebook"
// //               className="text-blue-600 text-2xl hover:text-blue-800 transition"
// //             >
// //               <FaFacebook />
// //             </a>
// //             <a
// //               href="https://youtube.com/yourchannel"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               aria-label="YouTube"
// //               className="text-red-600 text-2xl hover:text-red-800 transition"
// //             >
// //               <FaYoutube />
// //             </a>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Bottom copyright strip */}
// //       <div className="border-t border-gray-300 text-center text-sm p-4 bg-base-100">
// //         <p>
// //           &copy; {currentYear} Mathematics || Developed by{" "}
// //           <a
// //             href="https://www.facebook.com/mozammel.dev"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="text-blue-600 hover:underline"
// //           >
// //             Mozammel Hosen
// //           </a>
// //         </p>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;

// import { FaFacebook, FaPhoneAlt, FaYoutube } from "react-icons/fa";
// import { MdEmail, MdLocationOn } from "react-icons/md";
// import { Link } from "react-router-dom";
// import imageLogo from "../../../public/nas-2png.png";
// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer
//       className="bg-[#f7fdfc] relative"
//       style={{
//         backgroundImage: `
//           radial-gradient(#e0f2f1 1px, transparent 0),
//           linear-gradient(to bottom right, #f0fdf4, #ecfdf5)`,
//         backgroundSize: "10px 10px, 100% 100%",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-base-content relative z-10">
//         {/* Logo & Contact Info */}
//         <div>
//           <img src={imageLogo} alt="Mathematics Logo" className="h-20 mb-2" />
//           <p className="mb-4 font-bold uppercase text-base">Office Address</p>

//           <p className="flex items-center gap-2 mb-1">
//             <FaPhoneAlt /> 01331223469
//           </p>
//           <p className="flex items-center gap-2 mb-1">
//             <MdEmail /> info@nasmatics.com
//           </p>
//           <p className="flex items-center gap-2">
//             <MdLocationOn /> House 15, road 11, Uttara sector 3
//           </p>
//         </div>

//         {/* Useful Links */}
//         <div className="text-base">
//           <h2 className="footer-title mb-4 text-base">Useful Links</h2>
//           <Link
//             to="/about-us-more-information"
//             className="link link-hover block mb-2  md:text-left"
//           >
//             About Us
//           </Link>
//           <Link
//             to="/contact-us"
//             className="link link-hover block mb-2  md:text-left"
//           >
//             Contact
//           </Link>
//           <Link
//             to="/privacy-policy"
//             className="link link-hover block mb-2 md:text-left"
//           >
//             Privacy Policy
//           </Link>
//           <Link
//             to="/terms-and-conditions"
//             className="link link-hover block mb-2  md:text-left"
//           >
//             Terms & Conditions
//           </Link>
//           <Link
//             to="/refund-policy"
//             className="link link-hover block  md:text-left"
//           >
//             Refund Policy
//           </Link>
//         </div>

//         {/* Social Media Links */}
//         <div>
//           <h2 className="footer-title mb-4 text-base">Follow Us</h2>
//           <div className="flex gap-4">
//             <a
//               href="https://facebook.com/yourpage"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//               className="text-blue-600 text-2xl hover:text-blue-800 transition"
//             >
//               <FaFacebook />
//             </a>
//             <a
//               href="https://youtube.com/yourchannel"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="YouTube"
//               className="text-red-600 text-2xl hover:text-red-800 transition"
//             >
//               <FaYoutube />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom copyright strip */}
//       <div className="border-t border-gray-300 text-center text-sm p-4 bg-base-100 relative z-10">
//         <p>
//           &copy; {currentYear} Nasmatics || Developed by{" "}
//           <a
//             href="https://github.com/Mozammel772"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline"
//           >
//            Mozammel
//           </a>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

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
          "http://localhost:5000/api/admin/social-links"
        );
        setSocialLinks(data);
      } catch (err) {
        console.error("Failed to fetch social links:", err);
      }
    };
    fetchSocialLinks();
  }, []);

  return (
    <footer
      className="bg-[#f7fdfc] relative"
      style={{
        backgroundImage: `
          radial-gradient(#e0f2f1 1px, transparent 0),
          linear-gradient(to bottom right, #f0fdf4, #ecfdf5)`,
        backgroundSize: "10px 10px, 100% 100%",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-2 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-base-content relative z-10">
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
            <MdLocationOn /> House 15, road 11, Uttara sector 3
          </p>
        </div>

        {/* Useful Links */}
        <div className="text-base">
          <h2 className="footer-title mb-4 text-base">Useful Links</h2>
          <Link
            to="/about-us-more-information"
            className="link link-hover block mb-2 md:text-left"
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="link link-hover block mb-2 md:text-left"
          >
            Contact
          </Link>
          <Link
            to="/privacy-policy"
            className="link link-hover block mb-2 md:text-left"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-and-conditions"
            className="link link-hover block mb-2 md:text-left"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/refund-policy"
            className="link link-hover block md:text-left"
          >
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
      <div className="border-t border-gray-300 text-center text-sm p-4 bg-base-100 relative z-10">
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
    </footer>
  );
};

export default Footer;
