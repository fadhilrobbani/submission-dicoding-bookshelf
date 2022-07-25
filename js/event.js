checkboxValue.addEventListener("click", () => {
   isCompleted();
   console.log(`add book to ${isCompleted()}`);
});

document.addEventListener(RENDER_EVENT, () => {
   console.log("render event already successful");
});

document.addEventListener(SET_EVENT, () => {
   console.log("set event already successful");
});

document.addEventListener("DOMContentLoaded", () => {
   const addForm = document.getElementById("form");
   addForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      addBook();
      render();
      addForm.reset();
   });

   getDataFromStorage(BOOKS_KEY);
   render();
});
