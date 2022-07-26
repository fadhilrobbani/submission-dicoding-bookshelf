const books = [];
const BOOKS_KEY = "books-key";

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
      const booksString = JSON.stringify(value);
      localStorage.setItem(key, booksString);
      document.dispatchEvent(new Event(SET_EVENT));
   }
};

const findBookById = (bookId) => {
   for (const book of books) {
      if (book.id === bookId) {
         return book;
      }
   }
   return null;
};

const findBook = (searchValue) => {
   const filteredBook = [];
   for (const book of books) {
      const titleBook = book.title.toLowerCase().replace(/\s+/g, "");
      const authorBook = book.author.toLowerCase().replace(/\s+/g, "");
      const yearBook = book.year.toString().toLowerCase().replace(/\s+/g, "");
      if (
         titleBook.includes(searchValue) ||
         authorBook.includes(searchValue) ||
         yearBook.includes(searchValue)
      ) {
         filteredBook.push(book);
      }
   }
   return filteredBook;
};
