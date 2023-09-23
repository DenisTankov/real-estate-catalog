import bids from "./../bids/bidsController";

export default function (state) {
   //очищаем контейнер
   document.querySelector("#app").innerHTML = "";
   bids(state);
}
