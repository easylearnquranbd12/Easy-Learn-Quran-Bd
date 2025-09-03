import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import CorporateMail from "./CorporateMail";
import InputInterviewsQustion from "./InputInterviewsQustion";
import ProfessionalInterviewQustion from "./ProfessionalInterviewQustion";

const SecondLayer = () => {
  return (
    <div>
      <Helmet>
        <title> Learning Quiz |Second Layer</title>
        <meta name="description" content="This is the second layer" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto">
        <TittleAnimation
          tittle="Second Layer"
          subtittle="This is the second layer"
        />
        <ProfessionalInterviewQustion />
        <CorporateMail />
        <InputInterviewsQustion />
      </div>
    </div>
  );
};

export default SecondLayer;
