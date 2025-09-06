import { createBrowserRouter } from "react-router-dom";
import ChangePassword from "../Authentication/ChangePassword";
import ForgotPassword from "../Authentication/ForgotPassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import UserLayout from "../layout/UserLayout";
import About from "../Pages/AboutPages/About";
import AddPaymentMethod from "../Pages/AddPaymentMethod/AddPaymentMethod";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import AdminBlogCreate from "../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogCreate";
import AdminBlogHistory from "../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogHistory";
import AdminBlogHistoryDetails from "../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogHistoryDetails";
import AdminEditBlog from "../Pages/AdminDashboardPages/AdminBlogsPages/AdminEditBlog";
import InstructorProfile from "../Pages/AdminDashboardPages/AdminHomePagesEdit/InstructorProfile";
// import Textandbanner from "../Pages/AdminDashboardPages/AdminHomePagesEdit/Textandbanner";
import ModeratorLayout from "../layout/ModeratorLayout";
import AdminTestimonialsSection from "../Pages/AdminDashboardPages/AdminHomePagesEdit/AdminTestimonialsSection";
import FooterFacebookLink from "../Pages/AdminDashboardPages/AdminHomePagesEdit/FooterFacebookLink";
import HometextCreate from "../Pages/AdminDashboardPages/AdminHomePagesEdit/HometextCreate";
import ImageandText from "../Pages/AdminDashboardPages/AdminHomePagesEdit/ImageandText";
import YouTubeVideoPlayer from "../Pages/AdminDashboardPages/AdminHomePagesEdit/YouTubeVideoPlayer";
import AdminPromotion from "../Pages/AdminDashboardPages/AdminPromotionPages/AdminPromotion/AdminPromotion";
import AdminPromotionHistory from "../Pages/AdminDashboardPages/AdminPromotionPages/AdminPromotionHistory/AdminPromotionHistory";
import AllUsers from "../Pages/AdminDashboardPages/AllUsers/AllUsers";
import FirstLayer from "../Pages/B.A.ShapeFormats/FirstLayer/FirstLayer";
import FourthLayer from "../Pages/B.A.ShapeFormats/FourthLayer/FourthLayer";
import SecondLayer from "../Pages/B.A.ShapeFormats/SecondLayer/SecondLayer";
import ThirdLayer from "../Pages/B.A.ShapeFormats/ThirdLayer/ThirdLayer";
import Blog from "../Pages/BlogPages/Blog";
import BlogDetails from "../Pages/BlogPages/BlogDetails";
import EnrollCourse from "../Pages/CoursePages/EnrollCourse";
import DashboardRedirect from "../Pages/DashboardRedirect";
import Contact from "../Pages/FooterPages/Contact";
import PrivacyPolicy from "../Pages/FooterPages/PrivacyPolicy";
import RefundPolicy from "../Pages/FooterPages/RefundPolicy";
import TermsAndConditions from "../Pages/FooterPages/TermsAndConditions";
import Home from "../Pages/HomePages/Home";
import Profile from "../Pages/ProfilePages/Profile";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRouter";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us-more-information",
        element: <About />,
      },

      {
        path: "b-a-shape-formats/1st-layer",
        element: (
          <PrivateRoute>
            {/* <PaymentRoute> */}
              <FirstLayer />
            {/* </PaymentRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "b-a-shape-formats/2nd-layer",
        element: (
          <PrivateRoute>
            <SecondLayer />
          </PrivateRoute>
        ),
      },
      {
        path: "b-a-shape-formats/3rd-layer",
        element: (
          <PrivateRoute>
            <ThirdLayer />
          </PrivateRoute>
        ),
      },
      {
        path: "b-a-shape-formats/4th-layer",
        element: (
          <PrivateRoute>
            <FourthLayer />
          </PrivateRoute>
        ),
      },

      // Blog
      {
        path: "/blog-us",
        element: <Blog />,
      },
      {
        path: "/blog-us/:id",
        element: <BlogDetails />,
      },
      // Authentication
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      // footer
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
    ],
  },
  // Admin Dashboard
  {
    path: "admin-dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "manage-users/all-users",
        element: <AllUsers />,
      },

      {
        path: "add-payment-method",
        element: <AddPaymentMethod />,
      },
      {
        path: "create-a-new-promotion",
        element: <AdminPromotion />,
      },
      {
        path: "promotion-history",
        element: <AdminPromotionHistory />,
      },
     
      // Admin Blog Routes
      {
        path: "create-a-new-blog",
        element: <AdminBlogCreate />,
      },
      {
        path: "admin-blog-history",
        element: <AdminBlogHistory />,
      },
      {
        path: "admin-blog-history/:id",
        element: <AdminBlogHistoryDetails />,
      },
      {
        path: "admin-blog-history/edit/:id",
        element: <AdminEditBlog />,
      },
     
      // Home Pages text banner and instructor Profile Update
      {
        path: "create-a-home-text",
        element: <HometextCreate />,
      },
      {
        path: "video-player-and-image",
        element: <YouTubeVideoPlayer />,
      },
      {
        path: "change-banner-image-and-text",
        element: <ImageandText />,
      },
      {
        path: "section-text-address-description",
        element: <AdminTestimonialsSection />,
      },
      {
        path: "instructor-profile-update",
        element: <InstructorProfile />,
      },
      {
        path: "footer-facebook-url-change",
        element: <FooterFacebookLink />,
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
      // Admin Profile oo Password Change
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
  // Moderator Dashboard
  {
    path: "moderator-dashboard",
    element: (
      <PrivateRoute>
        <ModeratorRoute>
          <ModeratorLayout />
        </ModeratorRoute>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <h1>Moderator Dashboard</h1>
      },
      {
        path: "manage-users/all-users",
        element: <AllUsers />,
      },

      {
        path: "add-payment-method",
        element: <AddPaymentMethod />,
      },
      {
        path: "create-a-new-promotion",
        element: <AdminPromotion />,
      },
      {
        path: "promotion-history",
        element: <AdminPromotionHistory />,
      },
     
      // Admin Blog Routes
      {
        path: "create-a-new-blog",
        element: <AdminBlogCreate />,
      },
      {
        path: "admin-blog-history",
        element: <AdminBlogHistory />,
      },
      {
        path: "admin-blog-history/:id",
        element: <AdminBlogHistoryDetails />,
      },
      {
        path: "admin-blog-history/edit/:id",
        element: <AdminEditBlog />,
      },
     
      // Home Pages text banner and instructor Profile Update
      {
        path: "create-a-home-text",
        element: <HometextCreate />,
      },
      {
        path: "video-player-and-image",
        element: <YouTubeVideoPlayer />,
      },
      {
        path: "change-banner-image-and-text",
        element: <ImageandText />,
      },
      {
        path: "section-text-address-description",
        element: <AdminTestimonialsSection />,
      },
      {
        path: "instructor-profile-update",
        element: <InstructorProfile />,
      },
      {
        path: "footer-facebook-url-change",
        element: <FooterFacebookLink />,
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
      // Admin Profile oo Password Change
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },



  
  // User Dashboard
  {
    path: "user-dashboard",
    element: (
      <PrivateRoute>
        <UserRoute>
          <UserLayout />
        </UserRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <h1>User Dashboard</h1>,
      },
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardRedirect />
      </PrivateRoute>
    ),
  },
  {
    path: "/payment-confirmed",
    element: <EnrollCourse />,
  },
]);
