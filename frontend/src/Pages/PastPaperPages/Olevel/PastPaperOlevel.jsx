import { Helmet } from "react-helmet-async";
import SubjectCard from "../../../components/CustomResources/SubjectCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const PastPaperOlevel = () => {
  const subjects = [
    { title: "Mathematics", path: "/past-paper/o-level/Mathematics" },
    { title: "Physics", path: "/past-paper/o-level/physics" },
    { title: "Chemistry", path: "/past-paper/o-level/chemistry" },
  ];

  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | Past Paper</title>
      </Helmet>
      <TittleAnimation tittle="Past Paper" subtittle="O Level" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 w-full max-w-7xl mx-auto">
        {subjects.map((subject, index) => (
          <SubjectCard key={index} {...subject} />
        ))}
      </div>
    </div>
  );
};

export default PastPaperOlevel;
