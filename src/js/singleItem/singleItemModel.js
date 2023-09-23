export default class SingleItem {
   constructor(id) {
      this.id = id;
   }

   async getItem() {
      try {
         const queryString = `https://jsproject.webcademy.ru/items/${this.id}`;
         const response = await fetch(queryString);
         const data = await response.json();
         this.result = await data;
      } catch (error) {
         // alert(error);
      }
   }

   //отправка данных из модального окна на сервер, в заявки
   async submitForm(formData) {
      const queryString = `https://jsproject.webcademy.ru/bidnew`;
      const response = await fetch(queryString, {
         method: "POST",
         headers: {
            "Content-type": "application/json; charset=UTF-8",
         },
         body: JSON.stringify(formData),
      });

      //после отправки получаем ответ с сервера и записываем в state.singleItem
      const data = await response.json();
      this.response = await data;
      // console.log(this.response.message);
   }
}
