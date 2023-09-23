import SingleItem from "./singleItemModel";
import * as view from "./singleItemView";

export default async function (state) {
   //создаем объект на конкретную квартиру по id, передавая id из state.routeParams
   state.singleItem = new SingleItem(state.routeParams);

   //получаем и записываем все данные по квартире
   await state.singleItem.getItem();

   //отрисовываем разметку для отдельного объекта- квартиры, второй аргумент- чтобы понять, находится ли singleItem.id в избранном
   view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

   //ЗАПУСКАЕМ ПРОСЛУШКИ СОБЫТИЙ

   //открытие модального окна
   document.querySelector(".button-order").addEventListener("click", () => {
      view.showModal();
   });

   //закрытие модального окна - клик по кнопкке
   document.querySelector(".modal__close").addEventListener("click", () => {
      view.hideModal();
   });

   //закрытие модального окна - клик по оверлею
   document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
      if (e.target.closest(".modal")) {
         return null;
      } else {
         view.hideModal();
      }
   });

   //отправка формы
   document.querySelector(".modal__form").addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = view.getInput();

      //отправили данные заявки на сервер
      await state.singleItem.submitForm(formData);

      const response = state.singleItem.response;

      if (response.message === "Bid Created") {
         alert("Ваша заявка успешно получена");
         view.hideModal();
         view.clearInput();
      } else if (response.message === "Bid Not Created") {
         // console.log(response.errors);
         response.errors.forEach((item) => alert(item));
      }
   });

   //клик по кнопке добавить в избранное"
   document.querySelector("#addToFavouriteBtn").addEventListener("click", function () {
      //добавляем  или удаляем в массив избранного id объекта недвижимости
      state.favourites.toggleFav(state.singleItem.id);

      //добавляем или удаляем активный класс кнопки и содержимое текста кнопки
      view.toggleFavouritesBtn(state.favourites.isFav(state.singleItem.id));
   });
}
