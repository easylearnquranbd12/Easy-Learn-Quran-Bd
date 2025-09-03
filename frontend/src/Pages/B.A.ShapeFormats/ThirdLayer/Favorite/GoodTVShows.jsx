
const GoodTVShows = () => {
  const shows = [
    "Breaking Bad",
    "Game of Thrones",
    "Friends",
    "The Office (US)",
    "Stranger Things",
    "Sherlock",
    "The Mandalorian",
    "The Crown",
    "Better Call Saul",
    "Narcos",
    "House of Cards",
    "Westworld",
    "Black Mirror",
    "Money Heist",
    "Fargo",
    "The Simpsons",
    "Rick and Morty",
    "The Big Bang Theory",
    "Peaky Blinders",
    "Vikings",
    "The Witcher",
    "Dexter",
    "Lost",
    "How I Met Your Mother",
    "Chernobyl"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Good TV Shows</h2>
      <ul className="list-disc pl-5 space-y-1 ml-5 mt-3">
        {shows.map((show, index) => (
          <li key={index}>{show}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoodTVShows;
