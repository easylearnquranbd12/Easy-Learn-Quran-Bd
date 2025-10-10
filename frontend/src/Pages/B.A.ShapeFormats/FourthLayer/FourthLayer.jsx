import { Helmet } from "react-helmet-async";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import LetterWriting from "./LetterWriting";
import NewSong from "./NewSong";
import OldGeneration from "./OldGeneration";
import StoryWriting from "./StoryWriting";
import WritingExercises from "./WritingExercises";

const FourthLayer = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Helmet>
        <title> Learning Quiz |Fourth Layer</title>
        <meta name="description" content="This is the fourth layer" />
      </Helmet>
      <div className="max-w-[1400px] mx-auto">
        <TittleAnimation
          tittle="Fourth Layer"
          subtittle="This is the fourth layer"
        />
      </div>
      <NewSong/>
      <OldGeneration />
      <StoryWriting />
      <LetterWriting />
      <WritingExercises />
    </div>
  );
};

export default FourthLayer;
