import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import imageLogo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";

const getNavigationLinks = (user) => {
  const baseLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us-more-information" },
    {
      title: "B.A. Shape Formats",
      subLinks: [
        { title: "1st Layer", link: "/b-a-shape-formats/1st-layer" },
        { title: "2nd Layer", link: "/b-a-shape-formats/2nd-layer" },
        { title: "3rd Layer", link: "/b-a-shape-formats/3rd-layer" },
        { title: "4th Layer", link: "/b-a-shape-formats/4th-layer" },
        { title: "5th Layer", link: "/b-a-shape-formats/5th-layer" },
        { title: "6th Layer", link: "/b-a-shape-formats/6th-layer" },
        { title: "7th Layer", link: "/b-a-shape-formats/7th-layer" },
      ],
    },
  ];

  if (user) {
    baseLinks.splice(4, 0, { title: "Dashboard", link: "/dashboard" });
  }

  baseLinks.push(
    {
      title: "Contribute",
      subLinks: [
        { title: "Blank Format", link: "/contribute/blank-format" },
        { title: "Upload PDF", link: "/contribute/upload-pdf" },
      ],
    },
    { title: "PDF Download", link: "/pdf-download" },
    { title: "Others", link: "/others" },
    {
      title: "Language",
      subLinks: [
        { title: "বাংলা", action: "setLanguage", lang: "bn" },
        { title: "English", action: "setLanguage", lang: "en" },
      ],
    }
  );

  return baseLinks;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [desktopSubMenu, setDesktopSubMenu] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navigationLinks = getNavigationLinks(user);

  const handleMobileMenuClick = () => {
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const isActive = (link) => {
    return link === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(link);
  };

  // Optimized animation variants
  const desktopSubMenuVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.1 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.1 },
    },
  };

  const subMenuItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15 },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: {
      x: "-100%",
      transition: { duration: 0.2 },
    },
  };

  const mobileSubMenuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const mobileItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.15,
      },
    }),
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-2xl z-50 px-1 py-1.5">
      <div className="max-w-[1400px] mx-auto h-[70px] flex justify-between items-center">
        <div>
          <img className="h-8 w-16 cursor-pointer" src={imageLogo} alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end gap-2 items-center font-semibold  text-xl">
          {navigationLinks.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setDesktopSubMenu(index)}
              onMouseLeave={() => setDesktopSubMenu(null)}
            >
              {item.subLinks ? (
                <div className="flex items-center cursor-pointer">
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-block rounded-md text-xl font-semibold transition duration-200 cursor-pointer ${
                      isActive(item.link)
                        ? "text-activeTextPrimary"
                        : "text-black hover:text-hoverTextPrimary px-2 py-1.5"
                    }`}
                  >
                    {item.title}
                  </motion.span>
                  {desktopSubMenu === index ? (
                    <IoMdArrowDropup size={18} />
                  ) : (
                    <IoMdArrowDropdown size={18} />
                  )}
                </div>
              ) : (
                <Link to={item.link}>
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-block rounded-md text-base md:text-lg font-semibold transition duration-200 ${
                      isActive(item.link)
                        ? "text-activeTextPrimary"
                        : "text-black hover:text-hoverTextPrimary px-4 py-1.5"
                    }`}
                  >
                    {item.title}
                  </motion.span>
                </Link>
              )}

              {/* Desktop Submenu */}
              <AnimatePresence>
                {item.subLinks && desktopSubMenu === index && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={desktopSubMenuVariants}
                    className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md z-50 min-w-[200px] py-2 border border-gray-100"
                  >
                    {item.subLinks.map((subItem) => (
                      <motion.div
                        key={subItem.title}
                        variants={subMenuItemVariants}
                      >
                        <Link to={subItem.link}>
                          <motion.div
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.1 }}
                            className={`block text-base font-medium transition duration-200 rounded-md mx-2 px-4 py-2 ${
                              location.pathname === subItem.link
                                ? "text-activeTextPrimary "
                                : "text-black hover:text-hoverTextPrimary hover:bg-gray-50"
                            }`}
                          >
                            {subItem.title}
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {user ? (
            <motion.span
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="py-1.5 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-md cursor-pointer"
            >
              Logout
            </motion.span>
          ) : (
            <Link to="/login">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-block px-4 py-1.5 rounded-md ${
                  location.pathname === "/login"
                    ? "bg-bgButton text-white"
                    : "text-white bg-bgButton hover:bg-hoverBgButton"
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
          className="bg-[#d6a772] rounded-md px-3 py-2 hover:bg-[#bb874a] cursor-pointer md:hidden"
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
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white px-4 z-50 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 border-b min-h-24">
                <div>
                  <img
                    className="h-8 w-16 cursor-pointer"
                    src={imageLogo}
                    alt="Logo"
                  />
                </div>
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
                {/* Mobile Navigation Links */}
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
                      {item.subLinks ? (
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleSubMenu(index)}
                        >
                          <span
                            className={`font-semibold transition duration-200 px-2 py-1.5 ${
                              isActive(item.link)
                                ? "text-activeTextPrimary"
                                : "text-black hover:text-hoverTextPrimary "
                            }`}
                          >
                            {item.title}
                          </span>
                          {activeSubMenu === index ? (
                            <IoMdArrowDropup size={22} />
                          ) : (
                            <IoMdArrowDropdown size={22} />
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.link}
                          onClick={handleMobileMenuClick}
                          className={`inline-block font-semibold transition duration-200 rounded-md px-2 py-1.5 ${
                            isActive(item.link)
                              ? "text-activeTextPrimary"
                              : "text-black hover:text-hoverTextPrimary "
                          }`}
                        >
                          {item.title}
                        </Link>
                      )}

                      {/* Mobile Submenu */}
                      <AnimatePresence>
                        {item.subLinks && activeSubMenu === index && (
                          <motion.div
                            variants={mobileSubMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            {item.subLinks.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.title}
                                custom={subIndex}
                                variants={mobileItemVariants}
                              >
                                <Link
                                  to={subItem.link}
                                  onClick={handleMobileMenuClick}
                                  className={`block text-base border-t font-medium transition duration-200 rounded-md px-4 py-2 ${
                                    location.pathname === subItem.link
                                      ? "text-activeTextPrimary"
                                      : "text-black hover:text-hoverTextPrimary hover:bg-gray-100"
                                  }`}
                                >
                                  {subItem.title}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Fixed Login/Logout Button at Bottom */}
              <div className="mt-auto pt-4 border-t">
                {user ? (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 bg-red-600 hover:bg-red-800 text-white rounded-md font-semibold cursor-pointer"
                  >
                    Logout
                  </motion.button>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleMobileMenuClick}
                    className="block w-full text-center py-2 bg-bgButton hover:bg-hoverBgButton text-white rounded-md font-semibold"
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
