import filter from "./../filter/filterController";
import listing from "../listing/listingController";

export default async function (state) {
   document.querySelector("#app").innerHTML = "";

   //важный момент. Сначала получаем данные с api, только после этого работаем с компонентом listing
   await filter(state);
   listing(state);
}
