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
import PastPaperAlevel from "../Pages/PastPaperPages/Alevel/PastPaperAlevel";
import PastPaperAlevelChemistry from "../Pages/PastPaperPages/Alevel/PastPaperAlevelChemistry";
import PastPaperAlevelChemistryJanuary from "../Pages/PastPaperPages/Alevel/PastPaperAlevelChemistryJanuary";
import PastPaperAlevelChemistryJuly from "../Pages/PastPaperPages/Alevel/PastPaperAlevelChemistryJuly";
import PastPaperAlevelChemistryMarch from "../Pages/PastPaperPages/Alevel/PastPaperAlevelChemistryMarch";
import PastPaperAlevelChemistryMay from "../Pages/PastPaperPages/Alevel/PastPaperAlevelChemistryMay";
import PastPaperAlevelChemistryNovember from "../Pages/PastPaperPages/Alevel/PastPaperAlevelChemistryNovember";
import PastPaperAlevelChemistrySeptember from "../Pages/PastPaperPages/Alevel/PastPaperAlevelChemistrySeptember";
import PastPaperAlevelMathematics from "../Pages/PastPaperPages/Alevel/PastPaperAlevelMathematics";
import PastPaperAlevelMathematicsJanuary from "../Pages/PastPaperPages/Alevel/PastPaperAlevelMathematicsJanuary";
import PastPaperAlevelMathematicsJuly from "../Pages/PastPaperPages/Alevel/PastPaperAlevelMathematicsJuly";
import PastPaperAlevelMathematicsMarch from "../Pages/PastPaperPages/Alevel/PastPaperAlevelMathematicsMarch";
import PastPaperAlevelMathematicsMay from "../Pages/PastPaperPages/Alevel/PastPaperAlevelMathematicsMay";
import PastPaperAlevelMathematicsNovember from "../Pages/PastPaperPages/Alevel/PastPaperAlevelMathematicsNovember";
import PastPaperAlevelMathematicsSeptember from "../Pages/PastPaperPages/Alevel/PastPaperAlevelMathematicsSeptember";
import PastPaperAlevelPhysics from "../Pages/PastPaperPages/Alevel/PastPaperAlevelPhysics";
import PastPaperAlevelPhysicsJanuary from "../Pages/PastPaperPages/Alevel/PastPaperAlevelPhysicsJanuary";
import PastPaperAlevelPhysicsJuly from "../Pages/PastPaperPages/Alevel/PastPaperAlevelPhysicsJuly";
import PastPaperAlevelPhysicsMarch from "../Pages/PastPaperPages/Alevel/PastPaperAlevelPhysicsMarch";
import PastPaperAlevelPhysicsMay from "../Pages/PastPaperPages/Alevel/PastPaperAlevelPhysicsMay";
import PastPaperAlevelPhysicsNovember from "../Pages/PastPaperPages/Alevel/PastPaperAlevelPhysicsNovember";
import PastPaperAlevelPhysicsSeptember from "../Pages/PastPaperPages/Alevel/PastPaperAlevelPhysicsSeptember";
import PastPaperOlevel from "../Pages/PastPaperPages/Olevel/PastPaperOlevel";
import PastPaperOlevelChemistry from "../Pages/PastPaperPages/Olevel/PastPaperOlevelChemistry";
import PastPaperOlevelChemistryJanuary from "../Pages/PastPaperPages/Olevel/PastPaperOlevelChemistryJanuary";
import PastPaperOlevelChemistryJuly from "../Pages/PastPaperPages/Olevel/PastPaperOlevelChemistryJuly";
import PastPaperOlevelChemistryMarch from "../Pages/PastPaperPages/Olevel/PastPaperOlevelChemistryMarch";
import PastPaperOlevelChemistryMay from "../Pages/PastPaperPages/Olevel/PastPaperOlevelChemistryMay";
import PastPaperOlevelChemistryNovember from "../Pages/PastPaperPages/Olevel/PastPaperOlevelChemistryNovember";
import PastPaperOlevelChemistrySeptember from "../Pages/PastPaperPages/Olevel/PastPaperOlevelChemistrySeptember";
import PastPaperOlevelMathematics from "../Pages/PastPaperPages/Olevel/PastPaperOlevelMathematics";
import PastPaperOlevelMathematicsJanuary from "../Pages/PastPaperPages/Olevel/PastPaperOlevelMathematicsJanuary";
import PastPaperOlevelMathematicsJuly from "../Pages/PastPaperPages/Olevel/PastPaperOlevelMathematicsJuly";
import PastPaperOlevelMathematicsMarch from "../Pages/PastPaperPages/Olevel/PastPaperOlevelMathematicsMarch";
import PastPaperOlevelMathematicsMay from "../Pages/PastPaperPages/Olevel/PastPaperOlevelMathematicsMay";
import PastPaperOlevelMathematicsNovember from "../Pages/PastPaperPages/Olevel/PastPaperOlevelMathematicsNovember";
import PastPaperOlevelMathematicsSeptember from "../Pages/PastPaperPages/Olevel/PastPaperOlevelMathematicsSeptember";
import PastPaperOlevelPhysics from "../Pages/PastPaperPages/Olevel/PastPaperOlevelPhysics";
import PastPaperOlevelPhysicsJanuary from "../Pages/PastPaperPages/Olevel/PastPaperOlevelPhysicsJanuary";
import PastPaperOlevelPhysicsJuly from "../Pages/PastPaperPages/Olevel/PastPaperOlevelPhysicsJuly";
import PastPaperOlevelPhysicsMarch from "../Pages/PastPaperPages/Olevel/PastPaperOlevelPhysicsMarch";
import PastPaperOlevelPhysicsMay from "../Pages/PastPaperPages/Olevel/PastPaperOlevelPhysicsMay";
import PastPaperOlevelPhysicsNovember from "../Pages/PastPaperPages/Olevel/PastPaperOlevelPhysicsNovember";
import PastPaperOlevelPhysicsSeptember from "../Pages/PastPaperPages/Olevel/PastPaperOlevelPhysicsSeptember";
import Profile from "../Pages/ProfilePages/Profile";
import Alevel from "../Pages/ResourcesPages/Alevel/Alevel";
import AlevelChemistry from "../Pages/ResourcesPages/Alevel/AlevelChemistry";
import { default as AlevelChemistryA1 } from "../Pages/ResourcesPages/Alevel/AlevelChemistryA1";
import AlevelChemistryA3 from "../Pages/ResourcesPages/Alevel/AlevelChemistryA3";
import AlevelMaths from "../Pages/ResourcesPages/Alevel/AlevelMaths";
import AlevelMathsM1 from "../Pages/ResourcesPages/Alevel/AlevelMathsM1";
import AlevelMathsP1 from "../Pages/ResourcesPages/Alevel/AlevelMathsP1";
import AlevelMathsP3 from "../Pages/ResourcesPages/Alevel/AlevelMathsP3";
import AlevelMathsS1 from "../Pages/ResourcesPages/Alevel/AlevelMathsS1";
import AlevelPhysics from "../Pages/ResourcesPages/Alevel/AlevelPhysics";
import AlevelPhysicsA2 from "../Pages/ResourcesPages/Alevel/AlevelPhysicsA2";
import AlevelPhysicsAs from "../Pages/ResourcesPages/Alevel/AlevelPhysicsAs";
import Olevel from "../Pages/ResourcesPages/Olevel/Olevel";
import OlevelChemistry from "../Pages/ResourcesPages/Olevel/OlevelChemistry";
import OlevelMaths from "../Pages/ResourcesPages/Olevel/OlevelMaths";
import OlevelPhysics from "../Pages/ResourcesPages/Olevel/OlevelPhysics";
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
      {
        path: "/resources/a-level",
        element: <Alevel />,
      },
      {
        path: "/resources/a-level/maths",
        element: <AlevelMaths />,
      },
      {
        path: "/resources/a-level/maths/p1",
        element: <AlevelMathsP1 />,
      },
      {
        path: "/resources/a-level/maths/p3",
        element: <AlevelMathsP3 />,
      },
      {
        path: "/resources/a-level/maths/s1",
        element: <AlevelMathsS1 />,
      },
      {
        path: "/resources/a-level/maths/m1",
        element: <AlevelMathsM1 />,
      },
      {
        path: "/resources/a-level/physics",
        element: <AlevelPhysics />,
      },
      {
        path: "/resources/a-level/physics/as",
        element: <AlevelPhysicsAs />,
      },
      {
        path: "/resources/a-level/physics/a2",
        element: <AlevelPhysicsA2 />,
      },
      {
        path: "/resources/a-level/chemistry",
        element: <AlevelChemistry />,
      },
      {
        path: "/resources/a-level/chemistry/a1",
        element: <AlevelChemistryA1 />,
      },
      {
        path: "/resources/a-level/chemistry/a3",
        element: <AlevelChemistryA3 />,
      },
      {
        path: "/resources/o-level",
        element: <Olevel />,
      },
      {
        path: "/resources/o-level/maths",
        element: <OlevelMaths />,
      },
      {
        path: "/resources/o-level/physics",
        element: <OlevelPhysics />,
      },
      {
        path: "/resources/o-level/chemistry",
        element: <OlevelChemistry />,
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
      // Past Paper Routes
      {
        path: "/past-paper/a-level",
        element: <PastPaperAlevel />,
      },
      {
        path: "/past-paper/a-level/Mathematics",
        element: <PastPaperAlevelMathematics />,
      },
      {
        path: "/past-paper/a-level/Mathematics/january-february",
        element: <PastPaperAlevelMathematicsJanuary />,
      },
      {
        path: "/past-paper/a-level/Mathematics/march-april",
        element: <PastPaperAlevelMathematicsMarch />,
      },
      {
        path: "/past-paper/a-level/Mathematics/may-june",
        element: <PastPaperAlevelMathematicsMay />,
      },
      {
        path: "/past-paper/a-level/Mathematics/july-august",
        element: <PastPaperAlevelMathematicsJuly />,
      },
      {
        path: "/past-paper/a-level/Mathematics/september-october",
        element: <PastPaperAlevelMathematicsSeptember />,
      },
      {
        path: "/past-paper/a-level/Mathematics/november-december",
        element: <PastPaperAlevelMathematicsNovember />,
      },
      {
        path: "/past-paper/a-level/physics",
        element: <PastPaperAlevelPhysics />,
      },
      {
        path: "past-paper/a-level/physics/january-february",
        element: <PastPaperAlevelPhysicsJanuary />,
      },
      {
        path: "past-paper/a-level/physics/march-april",
        element: <PastPaperAlevelPhysicsMarch />,
      },
      {
        path: "past-paper/a-level/physics/may-june",
        element: <PastPaperAlevelPhysicsMay />,
      },
      {
        path: "past-paper/a-level/physics/july-august",
        element: <PastPaperAlevelPhysicsJuly />,
      },
      {
        path: "past-paper/a-level/physics/september-october",
        element: <PastPaperAlevelPhysicsSeptember />,
      },
      {
        path: "past-paper/a-level/physics/november-december",
        element: <PastPaperAlevelPhysicsNovember />,
      },
      {
        path: "/past-paper/a-level/chemistry",
        element: <PastPaperAlevelChemistry />,
      },
      {
        path: "past-paper/a-level/chemistry/january-february",
        element: <PastPaperAlevelChemistryJanuary />,
      },
      {
        path: "past-paper/a-level/chemistry/march-april",
        element: <PastPaperAlevelChemistryMarch />,
      },
      {
        path: "past-paper/a-level/chemistry/may-june",
        element: <PastPaperAlevelChemistryMay />,
      },
      {
        path: "past-paper/a-level/chemistry/july-august",
        element: <PastPaperAlevelChemistryJuly />,
      },
      {
        path: "past-paper/a-level/chemistry/september-october",
        element: <PastPaperAlevelChemistrySeptember />,
      },
      {
        path: "past-paper/a-level/chemistry/november-december",
        element: <PastPaperAlevelChemistryNovember />,
      },
      {
        path: "/past-paper/o-level",
        element: <PastPaperOlevel />,
      },
      {
        path: "/past-paper/o-level/Mathematics",
        element: <PastPaperOlevelMathematics />,
      },
      {
        path: "/past-paper/o-level/Mathematics/january-february",
        element: <PastPaperOlevelMathematicsJanuary />,
      },
      {
        path: "/past-paper/o-level/Mathematics/january-february",
        element: <PastPaperOlevelMathematicsJanuary />,
      },
      {
        path: "/past-paper/o-level/Mathematics/march-april",
        element: <PastPaperOlevelMathematicsMarch />,
      },
      {
        path: "/past-paper/o-level/Mathematics/may-june",
        element: <PastPaperOlevelMathematicsMay />,
      },
      {
        path: "/past-paper/o-level/Mathematics/july-april",
        element: <PastPaperOlevelMathematicsJuly />,
      },
      {
        path: "/past-paper/o-level/Mathematics/september-october",
        element: <PastPaperOlevelMathematicsSeptember />,
      },
      {
        path: "/past-paper/o-level/Mathematics/november-december",
        element: <PastPaperOlevelMathematicsNovember />,
      },
      {
        path: "/past-paper/o-level/physics",
        element: <PastPaperOlevelPhysics />,
      },
      {
        path: "/past-paper/o-level/physics/january-february",
        element: <PastPaperOlevelPhysicsJanuary />,
      },
      {
        path: "/past-paper/o-level/physics/march-april",
        element: <PastPaperOlevelPhysicsMarch />,
      },
      {
        path: "/past-paper/o-level/physics/may-june",
        element: <PastPaperOlevelPhysicsMay />,
      },
      {
        path: "/past-paper/o-level/physics/july-april",
        element: <PastPaperOlevelPhysicsJuly />,
      },
      {
        path: "/past-paper/o-level/physics/september-october",
        element: <PastPaperOlevelPhysicsSeptember />,
      },
      {
        path: "/past-paper/o-level/physics/november-december",
        element: <PastPaperOlevelPhysicsNovember />,
      },
      {
        path: "/past-paper/o-level/chemistry",
        element: <PastPaperOlevelChemistry />,
      },
      {
        path: "/past-paper/o-level/chemistry/january-february",
        element: <PastPaperOlevelChemistryJanuary />,
      },
      {
        path: "/past-paper/o-level/chemistry/march-april",
        element: <PastPaperOlevelChemistryMarch />,
      },
      {
        path: "/past-paper/o-level/chemistry/may-june",
        element: <PastPaperOlevelChemistryMay />,
      },
      {
        path: "/past-paper/o-level/chemistry/july-august",
        element: <PastPaperOlevelChemistryJuly />,
      },
      {
        path: "/past-paper/o-level/chemistry/september-october",
        element: <PastPaperOlevelChemistrySeptember />,
      },
      {
        path: "/past-paper/o-level/chemistry/november-december",
        element: <PastPaperOlevelChemistryNovember />,
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
