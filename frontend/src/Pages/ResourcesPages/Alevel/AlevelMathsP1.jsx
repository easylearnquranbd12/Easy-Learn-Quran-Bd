import { Helmet } from "react-helmet-async";
import ResourceCard from "../../../components/CustomResources/ResourceCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const AlevelMathsP1 = () => {
  const resources = [
    {
      title: "CLASS NOTES",
      description:
        "Complete notes for P1 A levels from the October November session 2025",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
    {
      title: "UNSOLVED WORKSHEETS",
      description:
        "Unsolved topical worksheets with full marking schemes to practice and test your skills.",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
    {
      title: "SOLVED WORKSHEETS",
      description:
        "Topical worksheets with complete step-by-step solutions to boost your confidence and understanding.",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
    {
      title: "STUDY PLAN",
      description:
        "Video guide and a structured plan to effectively use all resources and ace your CAIE exams.",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
    {
      title: "PROGRESS CHECKLIST",
      description:
        "A topical checklist to track your preparation and ensure you cover all required topics.",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
  ];

  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | A-Level-Maths-P1</title>
      </Helmet>

      <TittleAnimation tittle="Resources A Level " subtittle="Mathematics P1" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 w-full max-w-7xl mx-auto">
        {resources.map((res, index) => (
          <ResourceCard key={index} {...res} />
        ))}
      </div>
    </div>
  );
};

export default AlevelMathsP1;
