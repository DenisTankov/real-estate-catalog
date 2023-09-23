export default class Favourites {
   constructor() {
      this.favs = [];
      //работа с LS. Извлекаем данные и записываем в favs
      this.readStorage();
   }

   addFav(id) {
      this.favs.push(id);
      //сохранение в LS
      this.saveData();
   }

   removeFav(id) {
      const index = this.favs.indexOf(id);
      this.favs.splice(index, 1);
      //сохранение в LS
      this.saveData();
   }

   isFav(id) {
      return this.favs.indexOf(id) !== -1 ? true : false;
   }

   //функция для кнопки "добавить в избранное", добавляем или удаляем  из массива id квартиры. Функция учитвает повторное нажатие на кнопку
   toggleFav(id) {
      this.isFav(id) ? this.removeFav(id) : this.addFav(id);
   }

   //сохранение в LS
   saveData() {
      localStorage.setItem("favs", JSON.stringify(this.favs));
   }

   //получаем данные из LS
   readStorage() {
      const storage = JSON.parse(localStorage.getItem("favs"));
      //если storage не пустой
      if (storage) this.favs = storage;
   }
}
