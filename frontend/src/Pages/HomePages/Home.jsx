import AboutSection from "./AboutSection";
import BannerSection from "./BannerSection";
import CourseSection from "./CourseSection";
import FeaturesSection from "./FeaturesSection";
import MessengerIcon from "./MessengerIcon";
import StartQuranJourney from "./StartQuranJourney";
import TestimonialSection from "./TestimonialSection";

const Home = () => {
  return (
    <div>
      <BannerSection />
      <FeaturesSection/>
      <AboutSection/>
      <CourseSection/>
      <TestimonialSection/>
      <StartQuranJourney/>
      <MessengerIcon />
    </div>
  );
};

export default Home;
