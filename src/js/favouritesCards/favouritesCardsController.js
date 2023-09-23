import FavouritesCards from "./favouritesCardsModel";
import * as view from "./favouritesCardsView";

export default async function (state) {
   //получаем список объектов, которые находятся в избранном
   const favsList = state.favourites.favs;

   //получение данных с сервера
   const favouriteCards = new FavouritesCards(favsList);
   await favouriteCards.getFavs();

   //отображаем контейнер и карточки
   view.renderPage(favouriteCards.cards);

   //запускаем прослушку клика на иконки "добавить в избранное" при работе фильтра
   addToFavsListener();

   //функция для работы иконок "добавить в избранное"
   function addToFavsListener() {
      Array.from(document.getElementsByClassName("card__like")).forEach(function (item) {
         item.addEventListener("click", function (e) {
            e.preventDefault();

            //находим id объекта по которому кликнули
            const currentId = e.target.closest(".card").dataset.id;

            //добавление или удаление элемента из избранного
            state.favourites.toggleFav(currentId);

            //включаем/выключаем иконку с избранным
            view.toggleFavouriteIcon(e.target.closest(".card__like"), state.favourites.isFav(currentId));
         });
      });
   }
}
