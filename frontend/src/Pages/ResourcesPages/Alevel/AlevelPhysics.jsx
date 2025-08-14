import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const aLevelSubjects = [
  { title: "As", path: "/resources/a-level/physics/as" },
  { title: "A2", path: "/resources/a-level/physics/a2" },
];

const Alevel = () => {
  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | A-Level-Physics</title>
      </Helmet>
      <TittleAnimation tittle="Resources A Level " subtittle="Physics" />
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 w-full max-w-7xl mx-auto ">
          {aLevelSubjects.map((res, index) => (
            <SubjectCard key={index} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alevel;
