import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const pastPapers = [
  {
    title: "Jan / Feb",
    path: "/past-paper/a-level/chemistry/january-february",
  },
  { title: "Mar / Apr", path: "/past-paper/a-level/chemistry/march-april" },
  { title: "May / Jun", path: "/past-paper/a-level/chemistry/may-june" },
  { title: "Jul / Aug", path: "/past-paper/a-level/chemistry/july-august" },
  {
    title: "Sep / Oct",
    path: "/past-paper/a-level/chemistry/september-october",
  },
  {
    title: "Nov / Dec",
    path: "/past-paper/a-level/chemistry/november-december",
  },
];

const PastPaperAlevelChemistry = () => {
  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | Past Papers A-Level-Chemistry</title>
      </Helmet>
      <TittleAnimation tittle="Past Paper A Level" subtittle="Chemistry" />
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

export default PastPaperAlevelChemistry;
