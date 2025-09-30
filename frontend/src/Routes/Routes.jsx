import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import ModeratorLayout from "../layout/ModeratorLayout";
import UserLayout from "../layout/UserLayout";
import AdminElegant from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Elegant/AdminElegant";
import AdminSentence from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Sentence/AdminSentence";
import EnrollCourse from "../Pages/CoursePages/EnrollCourse";
import DashboardRedirect from "../Pages/DashboardRedirect";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRouter";

// Lazy load components
const ChangePassword = lazy(() => import("../Authentication/ChangePassword"));
const ForgotPassword = lazy(() => import("../Authentication/ForgotPassword"));
const Login = lazy(() => import("../Authentication/Login"));
const Register = lazy(() => import("../Authentication/Register"));
const About = lazy(() => import("../Pages/AboutPages/About"));
const AddPaymentMethod = lazy(() =>
  import("../Pages/AddPaymentMethod/AddPaymentMethod")
);
const AdminDashboard = lazy(() =>
  import("../Pages/AdminDashboard/AdminDashboard")
);
const AdminBlogCreate = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogCreate")
);
const AdminBlogHistory = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogHistory")
);
const AdminBlogHistoryDetails = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogHistoryDetails")
);
const AdminEditBlog = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminEditBlog")
);
const InstructorProfile = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminHomePagesEdit/InstructorProfile")
);
const AdminTestimonialsSection = lazy(() =>
  import(
    "../Pages/AdminDashboardPages/AdminHomePagesEdit/AdminTestimonialsSection"
  )
);
const FooterFacebookLink = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminHomePagesEdit/FooterFacebookLink")
);
const HometextCreate = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminHomePagesEdit/HometextCreate")
);
const ImageandText = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminHomePagesEdit/ImageandText")
);
const YouTubeVideoPlayer = lazy(() =>
  import("../Pages/AdminDashboardPages/AdminHomePagesEdit/YouTubeVideoPlayer")
);
const AdminPromotion = lazy(() =>
  import(
    "../Pages/AdminDashboardPages/AdminPromotionPages/AdminPromotion/AdminPromotion"
  )
);
const AdminPromotionHistory = lazy(() =>
  import(
    "../Pages/AdminDashboardPages/AdminPromotionPages/AdminPromotionHistory/AdminPromotionHistory"
  )
);
const AllUsers = lazy(() =>
  import("../Pages/AdminDashboardPages/AllUsers/AllUsers")
);
const FirstLayer = lazy(() =>
  import("../Pages/B.A.ShapeFormats/FirstLayer/FirstLayer")
);
const FourthLayer = lazy(() =>
  import("../Pages/B.A.ShapeFormats/FourthLayer/FourthLayer")
);
const SecondLayer = lazy(() =>
  import("../Pages/B.A.ShapeFormats/SecondLayer/SecondLayer")
);
const AdminVocabulary = lazy(() =>
  import("../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Vocabulary/AdminVocabulary")
);
const ThirdLayer = lazy(() =>
  import("../Pages/B.A.ShapeFormats/ThirdLayer/ThirdLayer")
);
const Blog = lazy(() => import("../Pages/BlogPages/Blog"));
const BlogDetails = lazy(() => import("../Pages/BlogPages/BlogDetails"));
const Contact = lazy(() => import("../Pages/FooterPages/Contact"));
const PrivacyPolicy = lazy(() => import("../Pages/FooterPages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("../Pages/FooterPages/RefundPolicy"));
const TermsAndConditions = lazy(() =>
  import("../Pages/FooterPages/TermsAndConditions")
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
        path: "b-a-shape-formats/1st-layer",
        element: (
          // <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <FirstLayer />
            </Suspense>
          // </PrivateRoute>
        ),
      },
      {
        path: "b-a-shape-formats/2nd-layer",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <SecondLayer />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "b-a-shape-formats/3rd-layer",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ThirdLayer />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "b-a-shape-formats/4th-layer",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <FourthLayer />
            </Suspense>
          </PrivateRoute>
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
        path: "add-payment-method",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AddPaymentMethod />
          </Suspense>
        ),
      },
      {
        path: "create-vocabulary",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabulary />
          </Suspense>
        ),
      },
      {
        path: "create-sentence",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentence />
          </Suspense>
        ),
      },
      {
        path: "create-elegant",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminElegant />
          </Suspense>
        ),
      },


      {
        path: "create-a-new-promotion",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPromotion />
          </Suspense>
        ),
      },
      {
        path: "promotion-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPromotionHistory />
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
      {
        path: "admin-blog-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlogHistory />
          </Suspense>
        ),
      },
      {
        path: "admin-blog-history/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlogHistoryDetails />
          </Suspense>
        ),
      },
      {
        path: "admin-blog-history/edit/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminEditBlog />
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
        path: "video-player-and-image",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <YouTubeVideoPlayer />
          </Suspense>
        ),
      },
      {
        path: "change-banner-image-and-text",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ImageandText />
          </Suspense>
        ),
      },
      {
        path: "section-text-address-description",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTestimonialsSection />
          </Suspense>
        ),
      },
      {
        path: "instructor-profile-update",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InstructorProfile />
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
        element: <h1>Moderator Dashboard</h1>,
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
        path: "add-payment-method",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AddPaymentMethod />
          </Suspense>
        ),
      },
      
      {
        path: "create-a-new-promotion",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPromotion />
          </Suspense>
        ),
      },
      {
        path: "promotion-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPromotionHistory />
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
      {
        path: "admin-blog-history",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlogHistory />
          </Suspense>
        ),
      },
      {
        path: "admin-blog-history/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBlogHistoryDetails />
          </Suspense>
        ),
      },
      {
        path: "admin-blog-history/edit/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminEditBlog />
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
        path: "video-player-and-image",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <YouTubeVideoPlayer />
          </Suspense>
        ),
      },
      {
        path: "change-banner-image-and-text",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ImageandText />
          </Suspense>
        ),
      },
      {
        path: "section-text-address-description",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTestimonialsSection />
          </Suspense>
        ),
      },
      {
        path: "instructor-profile-update",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InstructorProfile />
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
        element: <h1>User Dashboard</h1>,
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
  {
    path: "/payment-confirmed",
    element: <EnrollCourse />,
  },
]);
