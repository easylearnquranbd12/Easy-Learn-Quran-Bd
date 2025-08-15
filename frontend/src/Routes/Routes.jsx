import { createBrowserRouter } from "react-router-dom";
import ChangePassword from "../Authentication/ChangePassword";
import ForgotPassword from "../Authentication/ForgotPassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AddContentPage from "../components/Admin/ManageCourse/Pages/AddContentPage";
import AddCoursePage from "../components/Admin/ManageCourse/Pages/AddCoursePage";
import CourseDetailsPage from "../components/Admin/ManageCourse/Pages/CourseDetailsPage";
import CourseListPage from "../components/Admin/ManageCourse/Pages/CourseListPage";
import EditCoursePage from "../components/Admin/ManageCourse/Pages/EditCoursePage";
import EnrollmentManagementPage from "../components/Admin/ManageCourse/Pages/enrollment-management-page";
import ManageContentResourcesPage from "../components/Admin/ManageCourse/Pages/ManageContentResourcesPage";
import SelectCourseForResourcesPage from "../components/Admin/ManageCourse/Pages/SelectCourseForResourcesPage";
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
import AdminTestimonialsSection from "../Pages/AdminDashboardPages/AdminHomePagesEdit/AdminTestimonialsSection";
import FooterFacebookLink from "../Pages/AdminDashboardPages/AdminHomePagesEdit/FooterFacebookLink";
import HometextCreate from "../Pages/AdminDashboardPages/AdminHomePagesEdit/HometextCreate";
import ImageandText from "../Pages/AdminDashboardPages/AdminHomePagesEdit/ImageandText";
import YouTubeVideoPlayer from "../Pages/AdminDashboardPages/AdminHomePagesEdit/YouTubeVideoPlayer";
import AllUsers from "../Pages/AdminDashboardPages/AllUsers/AllUsers";
import Blog from "../Pages/BlogPages/Blog";
import BlogDetails from "../Pages/BlogPages/BlogDetails";
import CourseDetails from "../Pages/CoursePages/CourseDetails";
import Course from "../Pages/CoursePages/Courses";
import EnrollCourse from "../Pages/CoursePages/EnrollCourse";
import PaymentConfirmed from "../Pages/CoursePages/PaymentConfirmed";
import DashboardRedirect from "../Pages/DashboardRedirect";
import Contact from "../Pages/FooterPages/Contact";
import PrivacyPolicy from "../Pages/FooterPages/PrivacyPolicy";
import RefundPolicy from "../Pages/FooterPages/RefundPolicy";
import TermsAndConditions from "../Pages/FooterPages/TermsAndConditions";
import Home from "../Pages/HomePages/Home";
import Profile from "../Pages/ProfilePages/Profile";
import Achievements from "../Pages/UserDashboard/Achievements";
import ContinueLearning from "../Pages/UserDashboard/ContinueLearning";
import CoursePlayer from "../Pages/UserDashboard/CoursePlayer";
import Favorites from "../Pages/UserDashboard/Favorites";
import MyCourses from "../Pages/UserDashboard/MyCourses";
import UserCourse from "../Pages/UserDashboard/UserCourse";
import UserDashboard from "../Pages/UserDashboard/UserDashboard";
import AdminRoute from "./AdminRoute";
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
      
     
      // Course Routes
      {
        path: "/courses",
        element: <Course />,
      },
      {
        path: "/course-details/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "/enroll-course/:courseId",
        element: (
          <PrivateRoute>
            <EnrollCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-confirmed/:courseId",
        element: (
          <PrivateRoute>
            <PaymentConfirmed />
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
        path: "courses/list",
        element: <CourseListPage />,
      },
      {
        path: "courses/add",
        element: <AddCoursePage />,
      },
      {
        path: "add-payment-method",
        element: <AddPaymentMethod />,
      },
      {
        path: "courses/edit/:courseId",
        element: <EditCoursePage />,
      },
      {
        path: "courses/details/:courseId",
        element: <CourseDetailsPage />,
      },
      {
        path: "content/add",
        element: <AddContentPage />,
      },
      {
        path: "content/resources/:courseId",
        element: <ManageContentResourcesPage />,
      },
      {
        path: "content/resources",
        element: <SelectCourseForResourcesPage />,
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
      {
        path: "enrollments",
        element: <EnrollmentManagementPage />,
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
        element: <UserDashboard />,
      },
      {
        path: "my-courses",
        element: <MyCourses />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "achievements",
        element: <Achievements />,
      },
      {
        path: "course-outline",
        element: <UserCourse />,
      },
      // {
      //   path: "overviewPage",
      //   element: <OverviewPage />,
      // },
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
    path: "/learn/:id",
    element: (
      <PrivateRoute>
        <ContinueLearning />
      </PrivateRoute>
    ),
  },
  {
    path: "/course-player/:courseId",
    element: (
      <PrivateRoute>
        <CoursePlayer />
      </PrivateRoute>
    ),
  },
])
