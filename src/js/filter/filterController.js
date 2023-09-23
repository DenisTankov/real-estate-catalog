import Filter from "./filterModel";
import * as view from "./filterView";

export default async function (state) {
   //создаем объект фильтра
   if (!state.filter) state.filter = new Filter();

   //получение параметров для фильтра
   await state.filter.getParams();

   //отрисовка фильтра
   view.render(state.filter.params);

   //делаем запрос на сервер по объектам квартир
   await state.filter.getResults();
   state.results = state.filter.result;

   //обновляем счетчик на кнопке
   view.changeButtonText(state.filter.result.length);

   //прослушка событий формы
   const form = document.querySelector("#filter-form");

   //изменение формы
   form.addEventListener("change", async function (e) {
      e.preventDefault();
      state.filter.query = view.getInput();
      await state.filter.getResults();
      //добавляем отфильтрованные квартиры в глобальный объект state, чтобы работать с компонентами listing и тд
      state.results = state.filter.result;
      view.changeButtonText(state.filter.result.length);
   });

   //сброс формы, при этом у кнопки type="reset". Значения в инпутах формы сбрасываются изза кнопки type="reset"
   form.addEventListener("reset", async function () {
      state.filter.query = "";
      await state.filter.getResults();
      view.changeButtonText(state.filter.result.length);

      //очищаем контейнер
      const listingContainer = document.querySelector("#listingContainer");
      listingContainer.innerHTML = "";

      //получаем данные из фильтра по объектам
      state.filter.query = view.getInput();
      await state.filter.getResults();
      state.results = state.filter.result;
      state.emitter.emit("event:render-listing-after-reset", {});
   });

   //отправка формы
   form.addEventListener("submit", async function (e) {
      e.preventDefault();
      state.emitter.emit("event:render-listing", {});
   });
}
