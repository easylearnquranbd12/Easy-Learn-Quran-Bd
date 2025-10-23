import { Helmet } from "react-helmet-async";
import Article from "./Article";
import Preposition from "./Preposition";
import Sentence from "./Sentence";
import Tense from "./Tense";
import Verb from "./Verb";

const SecondLayer = () => {
  return (
    <div>
      <Helmet>
        <title> Learning Quiz |Second Layer</title>
        <meta name="description" content="This is the second layer" />
      </Helmet>
      <Sentence />
      <Verb />
      <Article />
      <Tense />
      <Preposition />
    </div>
  );
};

export default SecondLayer;

