export default class FavouritesCards {
   constructor(favsList) {
      this.favsList = favsList;
   }
   async getFavs() {
      try {
         const ids = this.favsList.toString(); //преобразует массив в строку через запятую
         if (ids === "") {
            return;
         }

         const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`;
         const result = await fetch(queryString);
         const data = await result.json();
         this.cards = await data;
      } catch (error) {
         // alert(error);
         console.log(error);
      }
   }
}
