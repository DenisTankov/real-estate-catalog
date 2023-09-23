import * as view from "./bidsView";
import Bids from "./bidsModel";

export default async function (state) {
   // view.renderContainer();

   //создаем объект модели для работы с заявками, проверка на существование state.bids
   if (!state.bids) state.bids = new Bids();

   //получаем заявки с сервера
   await state.bids.getBids();

   //рендерим все заявки
   // console.log(state.bids.bids);
   view.renderBids(state.bids.bids);
}
