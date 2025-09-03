
const GoodPoems = () => {
  const poems = [
    "The Raven - Edgar Allan Poe",
    "Ozymandias - Percy Bysshe Shelley",
    "If— - Rudyard Kipling",
    "Daffodils - William Wordsworth",
    "The Road Not Taken - Robert Frost",
    "Sonnet 18 - William Shakespeare",
    "Annabel Lee - Edgar Allan Poe",
    "Do Not Go Gentle into That Good Night - Dylan Thomas",
    "Ode to a Nightingale - John Keats",
    "Invictus - William Ernest Henley",
    "Stopping by Woods on a Snowy Evening - Robert Frost",
    "Jabberwocky - Lewis Carroll",
    "The Love Song of J. Alfred Prufrock - T.S. Eliot",
    "How Do I Love Thee? - Elizabeth Barrett Browning",
    "The Waste Land - T.S. Eliot",
    "She Walks in Beauty - Lord Byron",
    "A Psalm of Life - Henry Wadsworth Longfellow",
    "Kubla Khan - Samuel Taylor Coleridge",
    "The Charge of the Light Brigade - Alfred Lord Tennyson",
    "Phenomenal Woman - Maya Angelou",
    "Hope is the Thing with Feathers - Emily Dickinson",
    "Ode on a Grecian Urn - John Keats",
    "Elegy Written in a Country Churchyard - Thomas Gray",
    "The Tyger - William Blake",
    "Ulysses - Alfred Lord Tennyson"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Good Poems</h2>
      <ul className="list-disc pl-5 space-y-1 ml-5 mt-3">
        {poems.map((poem, index) => (
          <li key={index}>{poem}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoodPoems;
