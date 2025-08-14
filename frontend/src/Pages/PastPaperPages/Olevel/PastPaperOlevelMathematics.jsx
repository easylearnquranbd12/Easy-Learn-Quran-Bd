import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const pastPapers = [
  {
    title: "Jan / Feb",
    path: "/past-paper/o-level/Mathematics/january-february",
  },
  { title: "Mar / Apr", path: "/past-paper/o-level/Mathematics/march-april" },
  { title: "May / Jun", path: "/past-paper/o-level/Mathematics/may-june" },
  { title: "Jul / Aug", path: "/past-paper/o-level/Mathematics/july-august" },
  {
    title: "Sep / Oct",
    path: "/past-paper/o-level/Mathematics/september-october",
  },
  {
    title: "Nov / Dec",
    path: "/past-paper/o-level/Mathematics/november-december",
  },
];

const PastPaperOlevelMathematics = () => {
  return (
    <div className="py-3">
      <Helmet>
        <title>Past Papers | A-Level-Mathematics</title>
      </Helmet>
      <TittleAnimation tittle="Past Paper O Level" subtittle="Mathematics" />
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

export default PastPaperOlevelMathematics;
