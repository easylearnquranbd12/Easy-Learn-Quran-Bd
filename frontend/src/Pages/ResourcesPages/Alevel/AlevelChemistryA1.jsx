import { Helmet } from "react-helmet-async";
import ResourceCard from "../../../components/CustomResources/ResourceCard";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";

const AlevelChemistryA1 = () => {
  const resources = [
    {
      title: "CLASS NOTES",
      description: "Complete notes for  A levels from the session Session",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
    {
      title: "PAST PAPER RESOURCES",
      description: "solved Past Papers (Marathons).",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
    {
      title: "PAST PAPER SESSION",
      description:
        "Topical Past Paper with complete step-by-step solutions to boost your confidence.",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
    {
      title: "PRATICAL PAPER 3",
      description: "Paper 3 Syllabus.",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
    {
      title: "BOOKS",
      description: "Reference Books for CAIE Preparation",
      link: "https://drive.google.com/drive/folders/1JuC8P-Isjb8k8OA9QAcHaISluO-uuXoj",
    },
  ];

  return (
    <div className="py-3">
      <Helmet>
        <title>Nasmatics | A-Level-Chemistry-A1</title>
      </Helmet>
      <TittleAnimation tittle="Resources A Level " subtittle="Chemistry A1" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6 w-full max-w-7xl mx-auto">
        {resources.map((res, index) => (
          <ResourceCard key={index} {...res} />
        ))}
      </div>
    </div>
  );
};

export default AlevelChemistryA1;
