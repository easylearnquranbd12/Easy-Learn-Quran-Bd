import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import Favorite from "./Favorite";
import TravelTopics from "./TravelTopics";

const ThirdLayer = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Helmet>
        <title> Learning Quiz |Third Layer</title>
        <meta name="description" content="This is the third layer" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto">
        <TittleAnimation
          tittle="Third Layer"
          subtittle="This is the third layer"
        />
      </div>
      <Favorite/>
      <TravelTopics />
    </div>
  );
};

export default ThirdLayer;
