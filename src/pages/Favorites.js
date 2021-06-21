import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import MeetupList from "../meetups/MeetupList";

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  const favorites = favoritesCtx.favorites;

  let content;

  if(favoritesCtx.totalFavorites === 0 ){
      content = <p>You got no favorites, add one!!</p>
  }else{
      content = <MeetupList meetups={favorites} />
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
