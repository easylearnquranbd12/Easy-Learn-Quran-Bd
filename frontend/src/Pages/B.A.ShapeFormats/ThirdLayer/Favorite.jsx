import GoodComedies from "./Favorite/GoodComedies"
import GoodMovies from "./Favorite/GoodMovies"
import GoodNovels from "./Favorite/GoodNovels"
import GoodPoems from "./Favorite/GoodPoems"
import GoodPortCasting from "./Favorite/GoodPortCasting"
import GoodSongs from "./Favorite/GoodSongs"
import GoodTVShows from "./Favorite/GoodTVShows"

const Favorite = () => {
  return (
    <div>
        <GoodMovies />
        <GoodSongs/>
        <GoodNovels/>
        <GoodPoems/>
        <GoodTVShows/>
        <GoodComedies/>
        <GoodPortCasting/>

    </div>
  )
}

export default Favorite
