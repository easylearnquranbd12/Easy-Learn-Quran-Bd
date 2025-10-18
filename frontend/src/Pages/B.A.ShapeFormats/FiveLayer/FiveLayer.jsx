import LetterWritting from "./LetterWritting";
import OldGeneration from "./OldGeneration";
import Quiz from "./Quiz";
import StoryWritting from "./StoryWritting";

const FiveLayer = () => {
  return (
    <div>
      <OldGeneration />
      <StoryWritting />
      <LetterWritting />
     <Quiz/>
     
    </div>
  );
};

export default FiveLayer;
