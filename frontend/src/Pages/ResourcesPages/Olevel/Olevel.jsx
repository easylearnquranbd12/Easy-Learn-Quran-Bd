import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const oLevelSubjects = [
  { title: "Maths", path: "/resources/o-level/maths" },
  { title: "Physics", path: "/resources/o-level/physics" },
  { title: "Chemistry", path: "/resources/o-level/chemistry" },
];

const Olevel = () => {
  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | O-Level</title>
      </Helmet>
      <TittleAnimation tittle="Resources" subtittle="O Level" />
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 w-full max-w-7xl mx-auto ">
          {oLevelSubjects.map((res, index) => (
            <SubjectCard key={index} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Olevel;
