import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import imageLogo from "../../assets/logo.png";
import { useTranslation } from "../../context/TranslationContext";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const getNavigationLinks = (user) => {
  // 🏠 Base Menu Links
  const baseLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us-more-information" },
    { title: "Teachers", link: "/teachers" },
  ];

  // 👤 Dashboard If Logged In
  if (user) {
    baseLinks.splice(3, 0, { title: "Dashboard", link: "/dashboard" });
  }

  baseLinks.push(
    { title: " Enroll Now", link: "/enroll-now" },
    { title: "Contact", link: "/contact" },
  );

  return baseLinks;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [desktopSubMenu, setDesktopSubMenu] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { setLanguage, loading } = useTranslation();
  const axiosPublic = useAxiosPublic();



  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navigationLinks = getNavigationLinks(
    user,
    setLanguage,
  
  );

  const toggleSubMenu = (index) =>
    setActiveSubMenu(activeSubMenu === index ? null : index);

  const isActive = (link) =>
    link === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(link);

  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: { x: "-100%", transition: { duration: 0.2 } },
  };

  const mobileItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.03, duration: 0.15 },
    }),
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] shadow-2xl z-50 px-1 py-1">
      <div className="max-w-[1400px] mx-auto h-[70px] flex justify-between items-center">
        <img className="h-8 w-20 cursor-pointer" src={imageLogo} alt="Logo" />

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end gap-2 items-center font-medium">
         
          {navigationLinks.map((item, index) => (
            <div key={index} className="flex items-center">
              <Link to={item.link}>
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-block text-sm md:text-base font-medium transition duration-200 ${
                    isActive(item.link)
                      ? "text-[#d4af37]"
                      : "text-white hover:text-[#d4af37] px-3 py-1.5"
                  }`}
                >
                  {item.title}
                </motion.span>
              </Link>

              {/* 🔥 Divider */}
              {index !== navigationLinks.length - 1 && (
                <span className="text-white/50 mx-1">|</span>
              )}
            </div>
          ))}

         
          {user ? (
            <motion.span
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="py-1.5 px-4 bg-red-100 hover:bg-red-200 text-sm md:text-base text-red-600 rounded-md cursor-pointer"
            >
              Logout
            </motion.span>
          ) : (
            <Link to="/login">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-block px-4 py-1.5 rounded-md text-sm md:text-base ${
                  location.pathname === "/login"
                    ? "bg-teal-700 text-white"
                    : "text-white bg-teal-700 hover:bg-teal-900"
                }`}
              >
                Login
              </motion.span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-600 rounded-md px-3 py-2 hover:bg-teal-900 cursor-pointer md:hidden"
        >
          <FaBars
            onClick={() => setIsOpen(true)}
            size={24}
            className="text-white"
          />
        </motion.button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden"
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] px-4 z-50 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 border-b min-h-24">
                <img
                  className="h-12 w-20 cursor-pointer"
                  src={imageLogo}
                  alt="Logo"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-100 rounded-md px-2 py-1 hover:bg-red-50"
                  onClick={() => setIsOpen(false)}
                >
                  <CgClose
                    size={28}
                    className="text-red-600 hover:text-red-400"
                  />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-3 font-medium text-lg ">
                  {navigationLinks.map((item, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={mobileItemVariants}
                      className="border-b pb-1"
                    >
                      <Link
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className={`inline-block font-medium transition duration-200 rounded-md px-2 py-1.5 ${
                          isActive(item.link)
                            ? "text-teal-700"
                            : "text-white hover:text-teal-700"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
               
              </div>

              <div className="mt-auto pt-4 border-t">
                {user ? (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 bg-red-600 hover:bg-red-800 text-white rounded-md font-medium cursor-pointer"
                  >
                    Logout
                  </motion.button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-2 bg-teal-700 hover:bg-teal-900 text-white rounded-md font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
