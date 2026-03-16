import ElegantFormat from "./ElegantFormat";
import IdiomFormat from "./IdiomFormat";
import NewtantusterFormat from "./NewTantusterFormat";
import TantusterFormat from "./TantusterFormat";
import VocabularyFormat from "./VocabularyFormat";

const SixLayer = () => {
  return (
    <div>
      <VocabularyFormat />
      <ElegantFormat />
      <IdiomFormat />
      <TantusterFormat />
      <NewtantusterFormat />
    </div>
  );
};

export default SixLayer;
