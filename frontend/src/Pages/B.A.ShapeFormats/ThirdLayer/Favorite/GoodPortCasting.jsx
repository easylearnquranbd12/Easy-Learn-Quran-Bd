
const GoodPortCasting = () => {
  const portCastings = [
    "Leonardo DiCaprio - Inception",
    "Morgan Freeman - Shawshank Redemption",
    "Robert De Niro - The Godfather Part II",
    "Al Pacino - Scarface",
    "Tom Hanks - Forrest Gump",
    "Meryl Streep - The Devil Wears Prada",
    "Scarlett Johansson - Lost in Translation",
    "Christian Bale - The Dark Knight",
    "Heath Ledger - The Dark Knight",
    "Johnny Depp - Pirates of the Caribbean",
    "Natalie Portman - Black Swan",
    "Brad Pitt - Fight Club",
    "Angelina Jolie - Maleficent",
    "Joaquin Phoenix - Joker",
    "Emma Stone - La La Land",
    "Robert Downey Jr. - Iron Man",
    "Chris Hemsworth - Thor",
    "Gal Gadot - Wonder Woman",
    "Mark Ruffalo - Avengers: Endgame",
    "Anne Hathaway - Les Misérables",
    "Denzel Washington - Training Day",
    "Hugh Jackman - Logan",
    "Christian Bale - American Psycho",
    "Matt Damon - The Martian",
    "Ryan Gosling - La La Land"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Good Port Casting</h2>
      <ul className="list-disc pl-5 space-y-1 ml-5 mt-3">
        {portCastings.map((pc, index) => (
          <li key={index}>{pc}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoodPortCasting;
