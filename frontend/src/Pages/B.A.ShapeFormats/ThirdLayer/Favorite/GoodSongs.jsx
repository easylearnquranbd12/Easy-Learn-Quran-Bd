
const GoodSongs = () => {
  const songs = [
    "Bohemian Rhapsody - Queen",
    "Imagine - John Lennon",
    "Stairway to Heaven - Led Zeppelin",
    "Hey Jude - The Beatles",
    "Hotel California - Eagles",
    "Smells Like Teen Spirit - Nirvana",
    "Billie Jean - Michael Jackson",
    "Like a Rolling Stone - Bob Dylan",
    "Sweet Child O' Mine - Guns N' Roses",
    "Rolling in the Deep - Adele",
    "Shape of You - Ed Sheeran",
    "Blinding Lights - The Weeknd",
    "Someone Like You - Adele",
    "Yesterday - The Beatles",
    "Let It Be - The Beatles",
    "Wonderwall - Oasis",
    "Lose Yourself - Eminem",
    "Thriller - Michael Jackson",
    "Shake It Off - Taylor Swift",
    "All of Me - John Legend",
    "Uptown Funk - Bruno Mars",
    "Take On Me - A-ha",
    "Viva La Vida - Coldplay",
    "Bad Guy - Billie Eilish",
    "Rolling in the Deep - Adele",
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2 text-center">Good Songs</h2>
      <p className="text-center">
        Music has the power to uplift, inspire, and soothe the soul. Here are some
        of the most memorable songs from various genres and eras.
      </p>
      <ul className="list-disc pl-5 space-y-1 ml-5 mt-4">
        {songs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoodSongs;
