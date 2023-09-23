import * as view from "./listingView";

export default function (state) {
   //рендер контейнера для карточек
   view.render();

   //рендер карточек
   state.results.forEach(function (item) {
      view.renderCard(item, state.favourites.isFav(item.id));
   });

   //запускаем прослушку клика на иконки "добавить в избранное"
   addToFavsListener();

   state.emitter.subscribe("event:render-listing-after-reset", () => {
      //очистить контейнер с карточками
      view.clearListingContainer();

      //отрендерить карточки
      state.results.forEach(function (item) {
         view.renderCard(item, state.favourites.isFav(item.id));
      });
   });

   state.emitter.subscribe("event:render-listing", () => {
      //очистить контейнер с карточками
      view.clearListingContainer();

      //отрендерить карточки
      state.results.forEach(function (item) {
         view.renderCard(item, state.favourites.isFav(item.id));
      });

      //запускаем прослушку клика на иконки "добавить в избранное" при работе фильтра
      addToFavsListener();
   });

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
