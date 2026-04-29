import AboutSection from "./AboutSection";
import Achievements from "./Achievements";
import BannerSection from "./BannerSection";
import Countries from "./Countries";
import CourseSection from "./CourseSection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import FreeTrialSection from "./FreeTrialSection";
import LearningPath from "./LearningPath";
import MessengerIcon from "./MessengerIcon";
import PricingSection from "./PricingSection";
import StartQuranJourney from "./StartQuranJourney";
import Teacher from "./Teacher";
import TestimonialSection from "./TestimonialSection";

const Home = () => {
  return (
    <div>
      <BannerSection />
      <Countries/>
      <Achievements />
      <FeaturesSection />
      <FreeTrialSection />
      <AboutSection />
      <CourseSection />
      <LearningPath />
      <Teacher />
      <PricingSection />
      <TestimonialSection />
      <FAQSection />
      <StartQuranJourney />
      <MessengerIcon />
    </div>
  );
};

export default Home;
