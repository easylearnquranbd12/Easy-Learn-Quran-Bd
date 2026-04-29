// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { CgClose } from "react-icons/cg";
// import { FaBars } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import imageLogo from "../../assets/logo.png";
// import { useTranslation } from "../../context/TranslationContext";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const getNavigationLinks = (user) => {
//   // 🏠 Base Menu Links
//   const baseLinks = [
//     { title: "Home", link: "/" },
//     { title: "About Us", link: "/about-us-more-information" },
//   ];

//   // 👤 Dashboard If Logged In
//   if (user) {
//     baseLinks.splice(3, 0, { title: "Dashboard", link: "/dashboard" });
//   }

//   baseLinks.push(
//     { title: "Free Trial", link: "/enroll-now" },
//     { title: "Contact", link: "/contact-us" },
//     { title: "Blog", link: "/blog-us" },
//   );

//   return baseLinks;
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSubMenu, setActiveSubMenu] = useState(null);
//   const [desktopSubMenu, setDesktopSubMenu] = useState(null);
//   const location = useLocation();
//   const { user, logout } = useAuth();
//   const { setLanguage, loading } = useTranslation();
//   const axiosPublic = useAxiosPublic();



//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);

//   const navigationLinks = getNavigationLinks(
//     user,
//     setLanguage,
  
//   );

//   const toggleSubMenu = (index) =>
//     setActiveSubMenu(activeSubMenu === index ? null : index);

//   const isActive = (link) =>
//     link === "/"
//       ? location.pathname === "/"
//       : location.pathname.startsWith(link);

//   const mobileMenuVariants = {
//     hidden: { x: "-100%" },
//     visible: {
//       x: 0,
//       transition: { type: "spring", stiffness: 400, damping: 30 },
//     },
//     exit: { x: "-100%", transition: { duration: 0.2 } },
//   };

//   const mobileItemVariants = {
//     hidden: { y: -10, opacity: 0 },
//     visible: (i) => ({
//       y: 0,
//       opacity: 1,
//       transition: { delay: i * 0.03, duration: 0.15 },
//     }),
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] shadow-2xl z-50 px-1 py-1">
//       <div className="max-w-[1400px] mx-auto h-[70px] flex justify-between items-center">
//         <img className="h-42 w-56 cursor-pointer " src={imageLogo} alt="Logo" />

//         {/* Desktop Menu */}
//         <div className="hidden md:flex flex-1 justify-end gap-2 items-center font-medium">
         
//           {navigationLinks.map((item, index) => (
//             <div key={index} className="flex items-center">
//               <Link to={item.link}>
//                 <motion.span
//                   whileHover={{ y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`inline-block text-sm md:text-base font-medium transition duration-200 ${
//                     isActive(item.link)
//                       ? "text-[#d4af37]"
//                       : "text-white hover:text-[#d4af37] px-3 py-1.5"
//                   }`}
//                 >
//                   {item.title}
//                 </motion.span>
//               </Link>

//               {/* 🔥 Divider */}
//               {index !== navigationLinks.length - 1 && (
//                 <span className="text-white/50 mx-1">|</span>
//               )}
//             </div>
//           ))}

         
//           {user ? (
//             <motion.span
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={logout}
//               className="py-1.5 px-4 bg-red-100 hover:bg-red-200 text-sm md:text-base text-red-600 rounded-md cursor-pointer"
//             >
//               Logout
//             </motion.span>
//           ) : (
//             <Link to="/login">
//               <motion.span
//                 whileHover={{ y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`inline-block px-4 py-1.5 rounded-md text-sm md:text-base ${
//                   location.pathname === "/login"
//                     ? "bg-teal-700 text-white"
//                     : "text-white bg-teal-700 hover:bg-teal-900"
//                 }`}
//               >
//                 Login
//               </motion.span>
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-teal-600 rounded-md px-3 py-2 hover:bg-teal-900 cursor-pointer md:hidden"
//         >
//           <FaBars
//             onClick={() => setIsOpen(true)}
//             size={24}
//             className="text-white"
//           />
//         </motion.button>
//       </div>

//       {/* Mobile Sidebar */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsOpen(false)}
//               className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden"
//             />

//             <motion.div
//               variants={mobileMenuVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] px-4 z-50 shadow-2xl flex flex-col"
//             >
//               <div className="flex justify-between items-center mb-4 border-b min-h-24">
//                 <img className="h-20 w-32 cursor-pointer brightness-105 invert" src={imageLogo} alt="Logo" />
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="bg-red-100 rounded-md px-2 py-1 hover:bg-red-50"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <CgClose
//                     size={28}
//                     className="text-red-600 hover:text-red-400"
//                   />
//                 </motion.button>
//               </div>

//               <div className="flex-1 overflow-y-auto">
//                 <div className="flex flex-col gap-3 font-medium text-lg ">
//                   {navigationLinks.map((item, index) => (
//                     <motion.div
//                       key={index}
//                       custom={index}
//                       initial="hidden"
//                       animate="visible"
//                       variants={mobileItemVariants}
//                       className="border-b pb-1"
//                     >
//                       <Link
//                         to={item.link}
//                         onClick={() => setIsOpen(false)}
//                         className={`inline-block font-medium transition duration-200 rounded-md px-2 py-1.5 ${
//                           isActive(item.link)
//                             ? "text-teal-700"
//                             : "text-white hover:text-teal-700"
//                         }`}
//                       >
//                         {item.title}
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
               
//               </div>

//               <div className="mt-auto pt-4 border-t">
//                 {user ? (
//                   <motion.button
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       logout();
//                       setIsOpen(false);
//                     }}
//                     className="w-full py-3 bg-red-600 hover:bg-red-800 text-white rounded-md font-medium cursor-pointer"
//                   >
//                     Logout
//                   </motion.button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     onClick={() => setIsOpen(false)}
//                     className="block w-full text-center py-2 bg-teal-700 hover:bg-teal-900 text-white rounded-md font-medium"
//                   >
//                     Login
//                   </Link>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Navbar;
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import imageLogo from "../../assets/logo.png";
import { useTranslation } from "../../context/TranslationContext";
import useAuth from "../../hooks/useAuth";

const getNavigationLinks = (user) => {
  const baseLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us-more-information" },
  ];

  if (user) {
    baseLinks.splice(2, 0, {
      title: "Dashboard",
      link: "/dashboard",
    });
  }

  baseLinks.push(
    { title: "Free Trial", link: "/enroll-now" },
    { title: "Contact", link: "/contact-us" },
    { title: "Blog", link: "/blog-us" },
  );

  return baseLinks;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const { user, logout } = useAuth();

  const { setLanguage } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navigationLinks = getNavigationLinks(
    user,
    setLanguage,
  );

  const isActive = (link) =>
    link === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(link);

  const mobileMenuVariants = {
    hidden: {
      x: "-100%",
    },

    visible: {
      x: 0,

      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },

    exit: {
      x: "-100%",

      transition: {
        duration: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    hidden: {
      y: -10,
      opacity: 0,
    },

    visible: (i) => ({
      y: 0,
      opacity: 1,

      transition: {
        delay: i * 0.04,
        duration: 0.2,
      },
    }),
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#063b2d] via-[#0b5b43] to-[#063b2d] shadow-2xl border-b border-[#d4af37]/20">
      
      {/* TOP NAVBAR */}
      <div className="max-w-[1400px] mx-auto h-[74px] px-3 lg:px-5 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <div className="bg-[#0b4d39] border border-[#d4af37]/20 rounded-md px-2 py-1 shadow-lg">
            <img
              className="h-[52px] md:h-[58px] w-auto object-contain cursor-pointer"
              src={imageLogo}
              alt="Logo"
            />
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 font-medium">

          {navigationLinks.map((item, index) => (
            <div
              key={index}
              className="flex items-center"
            >
              <Link to={item.link}>
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative inline-block px-3 py-2 text-sm lg:text-[15px] font-semibold rounded-md transition-all duration-300 ${
                    isActive(item.link)
                      ? "text-[#d4af37]"
                      : "text-white hover:text-[#d4af37]"
                  }`}
                >
                  {item.title}

                  {/* ACTIVE LINE */}
                  {isActive(item.link) && (
                    <span className="absolute left-3 bottom-0 w-[70%] h-[2px] bg-[#d4af37] rounded-full" />
                  )}
                </motion.span>
              </Link>

              {index !==
                navigationLinks.length - 1 && (
                <span className="text-white/30 text-sm">
                  |
                </span>
              )}
            </div>
          ))}

          {/* LOGIN / LOGOUT */}
          {user ? (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="ml-3 px-5 py-2 rounded-md bg-[#f6d7d7] hover:bg-[#f2c2c2] text-red-600 text-sm font-semibold shadow"
            >
              Logout
            </motion.button>
          ) : (
            <Link to="/login">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`ml-3 inline-block px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                  location.pathname === "/login"
                    ? "bg-[#145c43] text-white"
                    : "bg-[#145c43] hover:bg-[#0f3d2e] text-white"
                }`}
              >
                Login
              </motion.span>
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="md:hidden bg-[#145c43] hover:bg-[#0f3d2e] p-2.5 rounded-md shadow-lg"
        >
          <FaBars
            size={22}
            className="text-white"
          />
        </motion.button>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
            />

            {/* SIDEBAR */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 w-[82%] max-w-sm bg-gradient-to-b from-[#063b2d] via-[#0b5b43] to-[#063b2d] z-50 shadow-2xl flex flex-col"
            >

              {/* TOP */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">

                <div className="bg-[#0b4d39] border border-[#d4af37]/20 rounded-md px-2 py-1">
                  <img
                    className="h-14 w-auto object-contain"
                    src={imageLogo}
                    alt="Logo"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="bg-red-100 hover:bg-red-200 p-2 rounded-md"
                >
                  <CgClose
                    size={24}
                    className="text-red-600"
                  />
                </motion.button>
              </div>

              {/* MENU */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="flex flex-col gap-3">

                  {navigationLinks.map(
                    (item, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={
                          mobileItemVariants
                        }
                      >
                        <Link
                          to={item.link}
                          onClick={() =>
                            setIsOpen(false)
                          }
                          className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            isActive(item.link)
                              ? "bg-[#d4af37] text-[#063b2d]"
                              : "bg-white/5 text-white hover:bg-white/10"
                          }`}
                        >
                          {item.title}
                        </Link>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>

              {/* BOTTOM BUTTON */}
              <div className="p-4 border-t border-white/10">
                {user ? (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
                  >
                    Logout
                  </motion.button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="block w-full text-center py-3 rounded-xl bg-[#145c43] hover:bg-[#0f3d2e] text-white font-semibold"
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