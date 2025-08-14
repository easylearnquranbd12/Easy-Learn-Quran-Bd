import AllCourse from "./AllCourse";
import HometextCreateui from "./HometextCreateui";
import Instructors from "./Instructors";
import MeetTheTeacher from "./MeetTheTeacher";
import TestimonialsSection from "./TestimonialsSection";
import Trustedme from "./Trustedme";
import VideoPlayer from "./VideoPlayer";

const Home = () => {
  return (
    <div>
      <HometextCreateui />
      <VideoPlayer/>
      <AllCourse />
      <MeetTheTeacher/>
      {/* <MathleteHome/> */}
      <Trustedme />
      <Instructors />
       <TestimonialsSection/>
      {/* <Textimonial /> */}
    </div>
  );
};

export default Home;
