import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import BeforeProfesional from "./BeforeProfesional";
import CorporateEmail from "./CorporateEmail";
import DevelopYourSkills from "./DevelopYourSkills";
import GoodLifeStyle from "./GoodLifeStyle";

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
        <GoodLifeStyle />
        <BeforeProfesional />
        <CorporateEmail />
        <DevelopYourSkills />
      </div>
    </div>
  );
};

export default ThirdLayer;
