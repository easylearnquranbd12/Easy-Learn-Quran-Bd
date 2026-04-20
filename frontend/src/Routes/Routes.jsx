import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import UserLayout from "../layout/UserLayout";



import AdminAboutPage from "../Pages/AdminDashboardPages/AboutPages/AdminAboutPage";
import DashboardRedirect from "../Pages/DashboardRedirect";
import EnrollPages from "../Pages/EnrollPages/EnrollPages";
import UserDashboard from "../Pages/UserUploadPdf/UserDashboard";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRouter";

// Lazy load components
const ChangePassword = lazy(() => import("../Authentication/ChangePassword"));
const ForgotPassword = lazy(() => import("../Authentication/ForgotPassword"));
const Login = lazy(() => import("../Authentication/Login"));
const Register = lazy(() => import("../Authentication/Register"));
const About = lazy(() => import("../Pages/AboutPages/About"));

const AdminDashboard = lazy(
  () => import("../Pages/AdminDashboard/AdminDashboard"),
);
const AdminBlogCreate = lazy(
  () => import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogCreate"),
);

const FooterFacebookLink = lazy(
  () =>
    import("../Pages/AdminDashboardPages/AdminHomePagesEdit/FooterFacebookLink"),
);
const HometextCreate = lazy(
  () =>
    import("../Pages/AdminDashboardPages/AdminHomePagesEdit/HometextCreate"),
);


const AllUsers = lazy(
  () => import("../Pages/AdminDashboardPages/AllUsers/AllUsers"),
);

const Blog = lazy(() => import("../Pages/BlogPages/Blog"));
const BlogDetails = lazy(() => import("../Pages/BlogPages/BlogDetails"));
const Contact = lazy(() => import("../Pages/FooterPages/Contact"));
const PrivacyPolicy = lazy(() => import("../Pages/FooterPages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("../Pages/FooterPages/RefundPolicy"));
const TermsAndConditions = lazy(
  () => import("../Pages/FooterPages/TermsAndConditions"),
);
const Home = lazy(() => import("../Pages/HomePages/Home"));
const Profile = lazy(() => import("../Pages/ProfilePages/Profile"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
    }}
  >
    <div>Loading...</div>
  </div>
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about-us-more-information",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/enroll-now",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EnrollPages />
          </Suspense>
        ),
      },
    

      // Blog
      {
        path: "/blog-us",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/blog-us/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BlogDetails />
          </Suspense>
        ),
      },
      // Authentication
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ForgotPassword />
          </Suspense>
        ),
      },

      // footer
      {
        path: "/contact-us",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "/terms-and-conditions",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TermsAndConditions />
          </Suspense>
        ),
      },
      {
        path: "/refund-policy",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RefundPolicy />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "manage-users/all-users",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AllUsers />
          </Suspense>
        ),
      },
      {
        path: "manage-about-page",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminAboutPage />
          </Suspense>
        ),
      },
      

      // Admin Blog Routes
      {
        path: "create-a-new-blog",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlogCreate />
          </Suspense>
        ),
      },

      // Home Pages text banner and instructor Profile Update
      {
        path: "create-a-home-text",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HometextCreate />
          </Suspense>
        ),
      },
     

      {
        path: "footer-facebook-url-change",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FooterFacebookLink />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      // Admin Profile and Password Change
      {
        path: "my-profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ChangePassword />
          </Suspense>
        ),
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
        element: <UserDashboard />,
      },
      {
        path: "my-profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
     
      {
        path: "change-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ChangePassword />
          </Suspense>
        ),
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
  
]);
