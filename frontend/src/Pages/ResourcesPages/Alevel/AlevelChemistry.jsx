import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const aLevelSubjects = [
  { title: "A1", path: "/resources/a-level/chemistry/a1" },
  { title: "A3", path: "/resources/a-level/chemistry/a3" },
];

const Alevel = () => {
  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | A-Level-Chemistry</title>
      </Helmet>
        <TittleAnimation tittle="Resources A Level " subtittle="Chemistry" />
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 w-full max-w-7xl mx-auto">
          {aLevelSubjects.map((res, index) => (
            <SubjectCard key={index} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alevel;
