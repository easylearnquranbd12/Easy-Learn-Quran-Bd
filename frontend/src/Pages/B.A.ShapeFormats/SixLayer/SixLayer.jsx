import Elegant from "../FirstLayer/Elegant";
import Idiom from "../FirstLayer/Idiom";
import NewTantuster from "../FirstLayer/NewTantuster";
import Tantuster from "../FirstLayer/Tantuster";
import Vocabulary from "../FirstLayer/Vocabulary";
import Article from "../SecondLayer/Article";
import Sentence from "../SecondLayer/Sentence";
import Tense from "../SecondLayer/Tense";
import Verb from "../SecondLayer/Verb";

const SixLayer = () => {
  return (
    <div>
      <Vocabulary />
      <Elegant />
      <Idiom />
      <Tantuster />
      <NewTantuster />
      <Sentence />
      <Verb />
      <Article />
      <Tense />
    </div>
  );
};

export default SixLayer;
