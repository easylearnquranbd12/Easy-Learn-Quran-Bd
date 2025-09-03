
const GoodComedies = () => {
  const comedies = [
    "The Hangover",
    "Superbad",
    "Step Brothers",
    "Bridesmaids",
    "Anchorman",
    "Dumb and Dumber",
    "Groundhog Day",
    "The Big Lebowski",
    "Ferris Bueller's Day Off",
    "Mean Girls",
    "Zoolander",
    "Tropic Thunder",
    "Ghostbusters",
    "Shaun of the Dead",
    "Hot Fuzz",
    "Napoleon Dynamite",
    "The 40-Year-Old Virgin",
    "Coming to America",
    "Legally Blonde",
    "Ace Ventura: Pet Detective",
    "School of Rock",
    "Crazy Rich Asians",
    "Pitch Perfect",
    "The Grand Budapest Hotel",
    "Jojo Rabbit"
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2 text-center">Good Comedies</h2>
      <p className="text-center">A curated list of some of the best comedy films to brighten your day.</p>
      <ul className="list-disc pl-5 space-y-1 ml-5 mt-3">
        {comedies.map((comedy, index) => (
          <li key={index}>{comedy}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoodComedies;
