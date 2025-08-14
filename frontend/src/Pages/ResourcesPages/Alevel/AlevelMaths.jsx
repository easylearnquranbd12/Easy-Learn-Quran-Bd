import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const AlevelMaths = () => {
  const aLevelSubjects = [
    { title: "P1", path: "/resources/a-level/maths/p1" },
    { title: "P3", path: "/resources/a-level/maths/p3" },
    { title: "S1", path: "/resources/a-level/maths/s1" },
    { title: "M1", path: "/resources/a-level/maths/m1" },
  ];

  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | A-Level-Maths</title>
      </Helmet>

      <TittleAnimation tittle="Resources A Level" subtittle="Mathematics" />
      <div className="flex justify-center items-center max-w-7xl mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-6 w-full ">
          {aLevelSubjects.map((res, index) => (
            <SubjectCard key={index} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlevelMaths;
