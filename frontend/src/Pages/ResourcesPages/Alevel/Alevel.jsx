import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const aLevelSubjects = [
  { title: "Maths", path: "/resources/a-level/maths" },
  { title: "Physics", path: "/resources/a-level/physics" },
  { title: "Chemistry", path: "/resources/a-level/chemistry" },
];

const Alevel = () => {
  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | A-Level</title>
      </Helmet>
      <TittleAnimation tittle="Resources" subtittle="A Level" />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-6 w-full max-w-7xl mx-auto">
          {aLevelSubjects.map((res, index) => (
            <SubjectCard key={index} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alevel;
