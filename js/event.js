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
   const submitForm = document.getElementById("form");
   submitForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      addBook();
      render();
      submitForm.reset();
   });
   getDataFromStorage(BOOKS_KEY);
   render();
});
