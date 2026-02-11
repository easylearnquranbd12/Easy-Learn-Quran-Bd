import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import GoodMovie from "./GoodMovie";
import GoodNobel from "./GoodNobel";
import GoodPorem from "./GoodPorem";
import GoodSong from "./GoodSong";
import Traveling from "./Traveling";

const FourthLayer = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Helmet>
        <title> Learning Quiz |Fourth Layer</title>
        <meta name="description" content="This is the fourth layer" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto">
        <TittleAnimation
          tittle="Fourth Layer"
          subtittle="This is the fourth layer"
        />
      </div>
      <Traveling />
      <GoodSong />
      <GoodMovie />
      <GoodPorem />
      <GoodNobel />
    </div>
  );
};

export default FourthLayer;
