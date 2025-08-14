import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow min-h-[75vh] bg-[#edf7f4] ">
        <div className="px-3 mt-20 py-3">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
