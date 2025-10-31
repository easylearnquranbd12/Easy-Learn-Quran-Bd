import OldGeneration from "../FiveLayer/OldGeneration"
import LetterWriting from "../FourthLayer/LetterWriting"
import NewSong from "../FourthLayer/NewSong"
import StoryWriting from "../FourthLayer/StoryWriting"
import WritingExercises from "../FourthLayer/WritingExercises"

const SevenLayer = () => {
  return (
    <div>
    <NewSong/>
      <OldGeneration />
      <StoryWriting />
      <LetterWriting />
      <WritingExercises />
    </div>
  )
}

export default SevenLayer
