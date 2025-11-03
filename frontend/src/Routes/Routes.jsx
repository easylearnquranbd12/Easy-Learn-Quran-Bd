import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import ModeratorLayout from "../layout/ModeratorLayout";
import UserLayout from "../layout/UserLayout";
import AdminArticle from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Article/AdminArticle";
import AdminPreposition from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Preposition/AdminPreposition";
import AdminTense from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Tense/AdminTense";
import AdminVerb from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Verb/AdminVerb";

import AdminPorem from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Porem/AdminPorem";

import AllUserPayment from "../Pages/AdminDashboardPages/AdminPaymentPages/AllUserPayment";
import AdminPdfUpload from "../Pages/AdminDashboardPages/AdminPdfManagement/AdminPdfUpload";
import UserUploadPdfManage from "../Pages/AdminDashboardPages/AdminPdfManagement/UserUploadPdfManage";
import AdminIdiom from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Idiom/AdminIdiom";
import AdminNewTantuster from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/NewTantuster/AdminNewTantuster";
import AdminTantuster from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Tantuster/AdminTantuster";
import AdminLetterWritting from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/LetterWritting/AdminLetterWritting";
import Adminmcq from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/MCQ/Adminmcq";
import AdminOldGenaration from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/OldGenaration/AdminOldGenaration";
import AdminStoryWritting from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/StoryWritting/AdminStoryWritting";
import AdminMovie from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Movie/AdminMovie";
import AdminNovel from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Novel/AdminNovel";
import AdminSong from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Song/AdminSong";
import AdminTraveling from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Traveling/AdminTraveling";
import LayerManage from "../Pages/AdminDashboardPages/BAShapeFormats/LayerManage/LayerManage";
import AdminBeforeProfessional from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/BeforeProfessional/AdminBeforeProfessional";
import AdminCorporateEmail from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/CorporateEmail/AdminCorporateEmail";
import AdminDevelopYourSkills from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/DevelopYourSkills/AdminDevelopYourSkills";
import AdminGoodLifeStyle from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/GoodLifeStyle/AdminGoodLifeStyle";
import IdeaShareAnsSuggestion from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/IdeaShareAnsSuggestion/IdeaShareAnsSuggestion";
import BlankFormat from "../Pages/ContributePages/BlankFormat/BlankFormat";
import UploadPDF from "../Pages/ContributePages/UploadPDF/UploadPDF";
import DashboardRedirect from "../Pages/DashboardRedirect";
import PaymentHome from "../Pages/PaymentPages/PaymentHome";
import PaymentMethod from "../Pages/PaymentPages/PaymentMethod";
import SuccessPayment from "../Pages/PaymentPages/SuccessPayment";
import PDFDownload from "../Pages/PDFDownloadPages/PDFDownload";
import UserUploadPdf from "../Pages/UserUploadPdf/UserUploadPdf";
import AdminRoute from "./AdminRoute";
import LayerRoutes from "./LayerRoutes";
import ModeratorRoute from "./ModeratorRoute";
import PaymentRoute from "./PaymentRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRouter";

// Lazy load components
const ChangePassword = lazy(() => import("../Authentication/ChangePassword"));
const AdminSentence = lazy(() =>
  import(
    "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Sentence/AdminSentence"
  )
);
const AdminElegant = lazy(() =>
  import(
    "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Elegant/AdminElegant"
  )
);
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
  import(
    "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Vocabulary/AdminVocabulary"
  )
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
      // {
      //   path: "b-a-shape-formats/1st-layer",
      //   element: (
      //     // <PrivateRoute>
      //     <Suspense fallback={<LoadingSpinner />}>
      //       <FirstLayer />
      //     </Suspense>
      //     // </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "b-a-shape-formats/2nd-layer",
      //   element: (
      //     <PrivateRoute>
      //       <Suspense fallback={<LoadingSpinner />}>
      //         <SecondLayer />
      //       </Suspense>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "b-a-shape-formats/3rd-layer",
      //   element: (
      //     <PrivateRoute>
      //       <Suspense fallback={<LoadingSpinner />}>
      //         <ThirdLayer />
      //       </Suspense>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "b-a-shape-formats/4th-layer",
      //   element: (
      //     <PrivateRoute>
      //       <Suspense fallback={<LoadingSpinner />}>
      //         <FourthLayer />
      //       </Suspense>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "b-a-shape-formats/5th-layer",
      //   element: (
      //     <PrivateRoute>
      //       <Suspense fallback={<LoadingSpinner />}>
      //         <FiveLayer />
      //       </Suspense>
      //     </PrivateRoute>
      //   ),
      // },

      {
        path: "b-a-shape-formats/*",
        element: (
          <PrivateRoute>
            <PaymentRoute>
            <LayerRoutes />
            </PaymentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/ba-shape-format-payment-confirmed",
        element: <PaymentHome />,
      },

      // Contribute Pages
      {
        path: "contribute/blank-format",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BlankFormat />
          </Suspense>
        ),
      },
      {
        path: "contribute/upload-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UploadPDF />
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

      // download pdf
      {
        path: "/pdf-download",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PDFDownload />
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
        path: "layer-manage",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <LayerManage />
            </Suspense>
          </PrivateRoute>
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
      // First Layer
      {
        path: "create-vocabulary",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVocabulary />
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
        path: "create-idiom",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminIdiom />
          </Suspense>
        ),
      },
        {
        path: "create-tantuster",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTantuster />
          </Suspense>
        ),
      },
      {
        path: "new-tantuster",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNewTantuster />
          </Suspense>
        ),
      },
      // Second Layer 
      {
        path: "create-sentence",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSentence />
          </Suspense>
        ),
      },
       {
        path: "create-verb",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminVerb />
          </Suspense>
        ),
      },
      {
        path: "create-article",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArticle />
          </Suspense>
        ),
      },
      {
        path: "create-tense",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTense />
          </Suspense>
        ),
      },
      {
        path: "create-preposition",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPreposition />
          </Suspense>
        ),
      },

      // Third Layer
      {
        path: "good-life-style",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminGoodLifeStyle />
          </Suspense>
        ),
      },
      {
        path: "professional-life-style",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminBeforeProfessional />
          </Suspense>
        ),
      },
      {
        path: "corporate-email",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCorporateEmail />
          </Suspense>
        ),
      },
      {
        path: "develop-your-skills",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDevelopYourSkills />
          </Suspense>
        ),
      },
      {
        path: "idea-share-and-suggestion",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <IdeaShareAnsSuggestion />
          </Suspense>
        ),
      },
    
// Fourth Layer
           
      {
        path: "create-traveling",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminTraveling />
          </Suspense>
        ),
      },
      {
        path: "create-song",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSong />
          </Suspense>
        ),
      },
      {
        path: "create-porem",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPorem />
          </Suspense>
        ),
      },
      {
        path: "create-movie",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminMovie />
          </Suspense>
        ),
      },
      {
        path: "create-novel",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminNovel />
          </Suspense>
        ),
      },
     
      // Five Layer
      {
        path: "create-old-generation",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminOldGenaration />
          </Suspense>
        ),
      },
      {
        path: "create-story-writting",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminStoryWritting />
          </Suspense>
        ),
      },
      {
        path: "create-letter-writting",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLetterWritting />
          </Suspense>
        ),
      },
      {
        path: "create-mcq",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Adminmcq />
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
      {
        path: "upload-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPdfUpload />
          </Suspense>
        ),
      },
      {
        path: "manage-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserUploadPdfManage />
          </Suspense>
        ),
      },
      // payment confirmed
      {
        path: "all-user-payments",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AllUserPayment />
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
        path: "upload-pdf",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserUploadPdf />
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
    element: (
      <PrivateRoute>
        <PaymentMethod />
      </PrivateRoute>
    ),
  },
  {
    path: "/payment-success",
    element: (
      <PrivateRoute>
        <SuccessPayment />
      </PrivateRoute>
    ),
  },
]);
// import { lazy, Suspense } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import ErrorPage from "../ErrorPage/ErrorPage";
// import AdminLayout from "../layout/AdminLayout";
// import MainLayout from "../layout/MainLayout";
// import ModeratorLayout from "../layout/ModeratorLayout";
// import UserLayout from "../layout/UserLayout";
// import AdminArticle from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Article/AdminArticle";
// import AdminPreposition from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Preposition/AdminPreposition";
// import AdminTense from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Tense/AdminTense";
// import AdminVerb from "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Verb/AdminVerb";

// import AdminPorem from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Porem/AdminPorem";

// import AdminIdiom from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Idiom/AdminIdiom";
// import AdminTantuster from "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Tantuster/AdminTantuster";
// import AdminLetterWritting from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/LetterWritting/AdminLetterWritting";
// import Adminmcq from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/MCQ/Adminmcq";
// import AdminOldGenaration from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/OldGenaration/AdminOldGenaration";
// import AdminStoryWritting from "../Pages/AdminDashboardPages/BAShapeFormats/FiveLayer/StoryWritting/AdminStoryWritting";
// import AdminSong from "../Pages/AdminDashboardPages/BAShapeFormats/FourthLayer/Song/AdminSong";
// import LayerManage from "../Pages/AdminDashboardPages/BAShapeFormats/LayerManage/LayerManage";
// import AdminBeforeProfessional from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/BeforeProfessional/AdminBeforeProfessional";
// import AdminCorporateEmail from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/CorporateEmail/AdminCorporateEmail";
// import AdminDevelopYourSkills from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/DevelopYourSkills/AdminDevelopYourSkills";
// import AdminGoodLifeStyle from "../Pages/AdminDashboardPages/BAShapeFormats/ThirdLayer/GoodLifeStyle/AdminGoodLifeStyle";
// import FiveLayer from "../Pages/B.A.ShapeFormats/FiveLayer/FiveLayer";
// import EnrollCourse from "../Pages/CoursePages/EnrollCourse";
// import DashboardRedirect from "../Pages/DashboardRedirect";
// import AdminRoute from "./AdminRoute";
// import ModeratorRoute from "./ModeratorRoute";
// import PrivateRoute from "./PrivateRoute";
// import UserRoute from "./UserRouter";

// // Lazy load components
// const ChangePassword = lazy(() => import("../Authentication/ChangePassword"));
// const AdminSentence = lazy(() =>
//   import(
//     "../Pages/AdminDashboardPages/BAShapeFormats/SecondLayer/Sentence/AdminSentence"
//   )
// );
// const AdminElegant = lazy(() =>
//   import(
//     "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Elegant/AdminElegant"
//   )
// );
// const ForgotPassword = lazy(() => import("../Authentication/ForgotPassword"));
// const Login = lazy(() => import("../Authentication/Login"));
// const Register = lazy(() => import("../Authentication/Register"));
// const About = lazy(() => import("../Pages/AboutPages/About"));
// const AddPaymentMethod = lazy(() =>
//   import("../Pages/AddPaymentMethod/AddPaymentMethod")
// );
// const AdminDashboard = lazy(() =>
//   import("../Pages/AdminDashboard/AdminDashboard")
// );
// const AdminBlogCreate = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogCreate")
// );
// const AdminBlogHistory = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogHistory")
// );
// const AdminBlogHistoryDetails = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminBlogHistoryDetails")
// );
// const AdminEditBlog = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminBlogsPages/AdminEditBlog")
// );
// const InstructorProfile = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminHomePagesEdit/InstructorProfile")
// );
// const AdminTestimonialsSection = lazy(() =>
//   import(
//     "../Pages/AdminDashboardPages/AdminHomePagesEdit/AdminTestimonialsSection"
//   )
// );
// const FooterFacebookLink = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminHomePagesEdit/FooterFacebookLink")
// );
// const HometextCreate = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminHomePagesEdit/HometextCreate")
// );
// const ImageandText = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminHomePagesEdit/ImageandText")
// );
// const YouTubeVideoPlayer = lazy(() =>
//   import("../Pages/AdminDashboardPages/AdminHomePagesEdit/YouTubeVideoPlayer")
// );
// const AdminPromotion = lazy(() =>
//   import(
//     "../Pages/AdminDashboardPages/AdminPromotionPages/AdminPromotion/AdminPromotion"
//   )
// );
// const AdminPromotionHistory = lazy(() =>
//   import(
//     "../Pages/AdminDashboardPages/AdminPromotionPages/AdminPromotionHistory/AdminPromotionHistory"
//   )
// );
// const AllUsers = lazy(() =>
//   import("../Pages/AdminDashboardPages/AllUsers/AllUsers")
// );
// const FirstLayer = lazy(() =>
//   import("../Pages/B.A.ShapeFormats/FirstLayer/FirstLayer")
// );
// const FourthLayer = lazy(() =>
//   import("../Pages/B.A.ShapeFormats/FourthLayer/FourthLayer")
// );
// const SecondLayer = lazy(() =>
//   import("../Pages/B.A.ShapeFormats/SecondLayer/SecondLayer")
// );
// const AdminVocabulary = lazy(() =>
//   import(
//     "../Pages/AdminDashboardPages/BAShapeFormats/FirstLayer/Vocabulary/AdminVocabulary"
//   )
// );
// const ThirdLayer = lazy(() =>
//   import("../Pages/B.A.ShapeFormats/ThirdLayer/ThirdLayer")
// );
// const Blog = lazy(() => import("../Pages/BlogPages/Blog"));
// const BlogDetails = lazy(() => import("../Pages/BlogPages/BlogDetails"));
// const Contact = lazy(() => import("../Pages/FooterPages/Contact"));
// const PrivacyPolicy = lazy(() => import("../Pages/FooterPages/PrivacyPolicy"));
// const RefundPolicy = lazy(() => import("../Pages/FooterPages/RefundPolicy"));
// const TermsAndConditions = lazy(() =>
//   import("../Pages/FooterPages/TermsAndConditions")
// );
// const Home = lazy(() => import("../Pages/HomePages/Home"));
// const Profile = lazy(() => import("../Pages/ProfilePages/Profile"));

// // Loading component for Suspense fallback
// const LoadingSpinner = () => (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "50vh",
//     }}
//   >
//     <div>Loading...</div>
//   </div>
// );

// export const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Home />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/about-us-more-information",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <About />
//           </Suspense>
//         ),
//       },
//       {
//         path: "b-a-shape-formats/1st-layer",
//         element: (
//           // <PrivateRoute>
//           <Suspense fallback={<LoadingSpinner />}>
//             <FirstLayer />
//           </Suspense>
//           // </PrivateRoute>
//         ),
//       },
//       {
//         path: "b-a-shape-formats/2nd-layer",
//         element: (
//           <PrivateRoute>
//             <Suspense fallback={<LoadingSpinner />}>
//               <SecondLayer />
//             </Suspense>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "b-a-shape-formats/3rd-layer",
//         element: (
//           <PrivateRoute>
//             <Suspense fallback={<LoadingSpinner />}>
//               <ThirdLayer />
//             </Suspense>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "b-a-shape-formats/4th-layer",
//         element: (
//           <PrivateRoute>
//             <Suspense fallback={<LoadingSpinner />}>
//               <FourthLayer />
//             </Suspense>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "b-a-shape-formats/5th-layer",
//         element: (
//           <PrivateRoute>
//             <Suspense fallback={<LoadingSpinner />}>
//               <FiveLayer />
//             </Suspense>
//           </PrivateRoute>
//         ),
//       },

//       // Blog
//       {
//         path: "/blog-us",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Blog />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/blog-us/:id",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <BlogDetails />
//           </Suspense>
//         ),
//       },
//       // Authentication
//       {
//         path: "/register",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Register />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/login",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Login />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/forgot-password",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <ForgotPassword />
//           </Suspense>
//         ),
//       },
//       // footer
//       {
//         path: "/contact-us",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Contact />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/privacy-policy",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <PrivacyPolicy />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/terms-and-conditions",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <TermsAndConditions />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/refund-policy",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <RefundPolicy />
//           </Suspense>
//         ),
//       },
//     ],
//   },
//   // Admin Dashboard
//   {
//     path: "admin-dashboard",
//     element: (
//       <PrivateRoute>
//         <AdminRoute>
//           <AdminLayout />
//         </AdminRoute>
//       </PrivateRoute>
//     ),
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminDashboard />
//           </Suspense>
//         ),
//       },
//       {
//         path: "manage-users/all-users",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AllUsers />
//           </Suspense>
//         ),
//       },
//       {
//         path: "layer-manage",
//         element: (
//           <PrivateRoute>
//             <Suspense fallback={<LoadingSpinner />}>
//               <LayerManage />
//             </Suspense>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "add-payment-method",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AddPaymentMethod />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-vocabulary",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminVocabulary />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-idiom",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminIdiom />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-sentence",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminSentence />
//           </Suspense>
//         ),
//       },
//       {
//         path: "good-life-style",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminGoodLifeStyle />
//           </Suspense>
//         ),
//       },
//       {
//         path: "professional-life-style",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminBeforeProfessional />
//           </Suspense>
//         ),
//       },
//       {
//         path: "corporate-email",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminCorporateEmail />
//           </Suspense>
//         ),
//       },
//       {
//         path: "develop-your-skills",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminDevelopYourSkills />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-elegant",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminElegant />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-tantuster",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminTantuster />
//           </Suspense>
//         ),
//       },

//       {
//         path: "create-verb",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminVerb />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-article",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminArticle />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-tense",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminTense />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-preposition",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminPreposition />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-song",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminSong />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-porem",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminPorem />
//           </Suspense>
//         ),
//       },
//       // Five Layer
//       {
//         path: "create-old-generation",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminOldGenaration />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-story-writting",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminStoryWritting />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-letter-writting",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminLetterWritting />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-mcq",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Adminmcq />
//           </Suspense>
//         ),
//       },
//       {
//         path: "create-a-new-promotion",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminPromotion />
//           </Suspense>
//         ),
//       },
//       {
//         path: "promotion-history",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminPromotionHistory />
//           </Suspense>
//         ),
//       },
//       // Admin Blog Routes
//       {
//         path: "create-a-new-blog",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminBlogCreate />
//           </Suspense>
//         ),
//       },
//       {
//         path: "admin-blog-history",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminBlogHistory />
//           </Suspense>
//         ),
//       },
//       {
//         path: "admin-blog-history/:id",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminBlogHistoryDetails />
//           </Suspense>
//         ),
//       },
//       {
//         path: "admin-blog-history/edit/:id",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminEditBlog />
//           </Suspense>
//         ),
//       },
//       // Home Pages text banner and instructor Profile Update
//       {
//         path: "create-a-home-text",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <HometextCreate />
//           </Suspense>
//         ),
//       },
//       {
//         path: "video-player-and-image",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <YouTubeVideoPlayer />
//           </Suspense>
//         ),
//       },
//       {
//         path: "change-banner-image-and-text",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <ImageandText />
//           </Suspense>
//         ),
//       },
//       {
//         path: "section-text-address-description",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminTestimonialsSection />
//           </Suspense>
//         ),
//       },
//       {
//         path: "instructor-profile-update",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <InstructorProfile />
//           </Suspense>
//         ),
//       },
//       {
//         path: "footer-facebook-url-change",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <FooterFacebookLink />
//           </Suspense>
//         ),
//       },
//       {
//         path: "*",
//         element: <ErrorPage />,
//       },
//       // Admin Profile and Password Change
//       {
//         path: "my-profile",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Profile />
//           </Suspense>
//         ),
//       },
//       {
//         path: "change-password",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <ChangePassword />
//           </Suspense>
//         ),
//       },
//     ],
//   },
//   // Moderator Dashboard
//   {
//     path: "moderator-dashboard",
//     element: (
//       <PrivateRoute>
//         <ModeratorRoute>
//           <ModeratorLayout />
//         </ModeratorRoute>
//       </PrivateRoute>
//     ),
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <h1>Moderator Dashboard</h1>,
//       },
//       {
//         path: "manage-users/all-users",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AllUsers />
//           </Suspense>
//         ),
//       },
//       {
//         path: "add-payment-method",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AddPaymentMethod />
//           </Suspense>
//         ),
//       },

//       {
//         path: "create-a-new-promotion",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminPromotion />
//           </Suspense>
//         ),
//       },
//       {
//         path: "promotion-history",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminPromotionHistory />
//           </Suspense>
//         ),
//       },
//       // Admin Blog Routes
//       {
//         path: "create-a-new-blog",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminBlogCreate />
//           </Suspense>
//         ),
//       },
//       {
//         path: "admin-blog-history",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminBlogHistory />
//           </Suspense>
//         ),
//       },
//       {
//         path: "admin-blog-history/:id",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminBlogHistoryDetails />
//           </Suspense>
//         ),
//       },
//       {
//         path: "admin-blog-history/edit/:id",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminEditBlog />
//           </Suspense>
//         ),
//       },
//       // Home Pages text banner and instructor Profile Update
//       {
//         path: "create-a-home-text",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <HometextCreate />
//           </Suspense>
//         ),
//       },
//       {
//         path: "video-player-and-image",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <YouTubeVideoPlayer />
//           </Suspense>
//         ),
//       },
//       {
//         path: "change-banner-image-and-text",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <ImageandText />
//           </Suspense>
//         ),
//       },
//       {
//         path: "section-text-address-description",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <AdminTestimonialsSection />
//           </Suspense>
//         ),
//       },
//       {
//         path: "instructor-profile-update",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <InstructorProfile />
//           </Suspense>
//         ),
//       },
//       {
//         path: "footer-facebook-url-change",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <FooterFacebookLink />
//           </Suspense>
//         ),
//       },
//       {
//         path: "*",
//         element: <ErrorPage />,
//       },
//       // Admin Profile and Password Change
//       {
//         path: "my-profile",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Profile />
//           </Suspense>
//         ),
//       },
//       {
//         path: "change-password",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <ChangePassword />
//           </Suspense>
//         ),
//       },
//     ],
//   },
//   // User Dashboard
//   {
//     path: "user-dashboard",
//     element: (
//       <PrivateRoute>
//         <UserRoute>
//           <UserLayout />
//         </UserRoute>
//       </PrivateRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: <h1>User Dashboard</h1>,
//       },
//       {
//         path: "my-profile",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <Profile />
//           </Suspense>
//         ),
//       },
//       {
//         path: "change-password",
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <ChangePassword />
//           </Suspense>
//         ),
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardRedirect />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: "/payment-confirmed",
//     element: <EnrollCourse />,
//   },
// ]);
