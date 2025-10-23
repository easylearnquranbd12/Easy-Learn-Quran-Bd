import Elegant from "./Elegant";
import Idiom from "./Idiom";
import NewTantuster from "./NewTantuster";
import Tantuster from "./Tantuster";
import Vocabulary from "./Vocabulary";

const FirstLayer = () => {
  return (
    <div className="py-10 space-y-10 ">
      <div>
        <Vocabulary />
        <Elegant />
        <Idiom />
        <Tantuster />
        <NewTantuster />
      </div>
    </div>
  );
};

export default FirstLayer;
