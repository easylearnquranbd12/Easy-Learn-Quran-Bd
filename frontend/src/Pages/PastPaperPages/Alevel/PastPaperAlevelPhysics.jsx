import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const pastPapers = [
  {
    title: "Jan / Feb",
    path: "/past-paper/a-level/physics/january-february",
  },
  { title: "Mar / Apr", path: "/past-paper/a-level/physics/march-april" },
  { title: "May / Jun", path: "/past-paper/a-level/physics/may-june" },
  { title: "Jul / Aug", path: "/past-paper/a-level/physics/july-august" },
  {
    title: "Sep / Oct",
    path: "/past-paper/a-level/physics/september-october",
  },
  {
    title: "Nov / Dec",
    path: "/past-paper/a-level/physics/november-december",
  },
];

const PastPaperAlevelPhysics = () => {
  return (
    <div className="py-3">
      <Helmet>
        <title>Past Papers | A-Level-Physics</title>
      </Helmet>
      <TittleAnimation tittle="Past Paper A Level" subtittle="Physics" />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 w-full max-w-7xl mx-auto">
          {pastPapers.map((res, index) => (
            <SubjectCard key={index} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastPaperAlevelPhysics;
