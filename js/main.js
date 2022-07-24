document.addEventListener(RENDER_EVENT, () => {
   console.log("render event already successful");
});

document.addEventListener(SET_EVENT, () => {
   console.log("set event already successful");
});

document.addEventListener("DOMContentLoaded", () => {
   const submitForm = document.getElementById("form");
   submitForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      addBook();
   });
   getDataFromStorage(BOOKS_KEY);
   render();
});

const addBook = () => {};

const moveBookToFinished = () => {};

const moveBookToUnfinished = () => {};

const deleteBook = () => {};

const findBookById = () => {};

const findBookByTitle = () => {};

const makeBook = () => {};
