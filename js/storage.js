const books = [];
const BOOKS_KEY = "books-key";
const RENDER_EVENT = "render-event";
const SET_EVENT = "set-event";

const isStorageExist = () => {
   if (typeof Storage === undefined) {
      console.warn("STORAGE DOESN'T EXIST");
      return false;
   }
   return true;
};

const getDataFromStorage = (key) => {
   if (isStorageExist) {
      const booksData = JSON.parse(localStorage.getItem(key));
      if (booksData !== null) {
         for (const book of booksData) {
            books.push(book);
         }
      }
   }
};

const setDataToStorage = (key, value) => {
   if (isStorageExist) {
      const booksString = JSON.stringify(todos);
      localStorage.setItem(key, value);
      document.dispatchEvent(new Event(SET_EVENT));
   }
};

const render = () => {};
