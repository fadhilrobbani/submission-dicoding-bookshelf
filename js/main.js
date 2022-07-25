const RENDER_EVENT = "render-event";
const SET_EVENT = "set-event";
const checkboxValue = document.getElementById("is-completed");

const render = () => {
   const uncompletedBook = document.getElementById("uncompleted-book");
   uncompletedBook.innerHTML = "";
   const completedBook = document.getElementById("completed-book");
   completedBook.innerHTML = "";
   for (const book of books) {
      const bookElement = makeBook(book);
      if (!book.isComplete) {
         uncompletedBook.append(bookElement);
      } else {
         completedBook.append(bookElement);
      }
   }
   console.log("BERHASIL DIRENDER");
   document.dispatchEvent(new Event(RENDER_EVENT));
};

const makeBook = (bookObject) => {
   const textTitle = document.createElement("h2");
   textTitle.innerText = bookObject.title;

   const textAuthorAndYear = document.createElement("p");
   textAuthorAndYear.innerText = `${bookObject.author} | ${bookObject.year}`;

   const textContainer = document.createElement("div");
   textContainer.classList.add("inner");
   textContainer.append(textTitle, textAuthorAndYear);

   const container = document.createElement("div");
   container.classList.add("item", "shadow");
   container.append(textContainer);
   container.setAttribute("id", `book-${bookObject.id}`);

   const makeTrashButton = () => {
      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-button");
      trashButton.addEventListener("click", () => {
         confirmDialog(
            `Apakah Anda yakin ingin menghapus buku "${bookObject.title}"?`,
            deleteBook,
            bookObject.id
         );
      });
      return trashButton;
   };

   const makeEditButton = () => {
      const editButton = document.createElement("button");
      editButton.classList.add("edit-button");
      editButton.addEventListener("click", () => {
         formDialog(`Edit Buku "${bookObject.title}"`, editBook, bookObject);
      });
      return editButton;
   };

   if (!bookObject.isComplete) {
      const checkButton = document.createElement("button");
      checkButton.classList.add("check-button");
      checkButton.addEventListener("click", () => {
         moveBookToCompleted(bookObject.id);
      });

      const trashButton = makeTrashButton();
      const editButton = makeEditButton();

      container.append(checkButton, editButton, trashButton);
   } else {
      const uncheckButton = document.createElement("button");
      uncheckButton.classList.add("uncheck-button");
      uncheckButton.addEventListener("click", () => {
         moveBookToUncompleted(bookObject.id);
      });

      const trashButton = makeTrashButton();
      const editButton = makeEditButton();

      container.append(uncheckButton, editButton, trashButton);
   }

   return container;
};

const addBook = () => {
   const id = +new Date();
   const titleInput = document.getElementById("title").value;
   const authorInput = document.getElementById("author").value;
   const yearInput = document.getElementById("year").value;
   const isCompletedInput = isCompleted();

   const bookObject = generateBookObject(
      id,
      titleInput,
      authorInput,
      yearInput,
      isCompletedInput
   );
   books.push(bookObject);
   setDataToStorage(BOOKS_KEY, books);
   console.log(books);
};

const moveBookToCompleted = (bookId) => {
   const findBook = findBookById(bookId);

   if (findBook !== null) {
      findBook.isComplete = true;
   }

   setDataToStorage(BOOKS_KEY, books);
   render();
};

const moveBookToUncompleted = (bookId) => {
   const findBook = findBookById(bookId);
   if (findBook !== null) {
      findBook.isComplete = false;
   }

   setDataToStorage(BOOKS_KEY, books);
   render();
};

const deleteBook = (bookId) => {
   for (let i = 0; i < books.length; i++) {
      if (bookId === books[i].id) {
         books.splice(i, 1);
      }
   }
   setDataToStorage(BOOKS_KEY, books);
   render();
};

const editBook = (bookId) => {
   const editTitle = document.getElementById("editTitle").value;
   const editAuthor = document.getElementById("editAuthor").value;
   const editYear = document.getElementById("editYear").value;

   for (let i = 0; i < books.length; i++) {
      if (books[i].id === bookId) {
         books[i].title = editTitle;
         books[i].author = editAuthor;
         books[i].year = editYear;
      }
   }

   setDataToStorage(BOOKS_KEY, books);
   render();
};

const generateBookObject = (id, title, author, year, isComplete) => {
   return {
      id,
      title,
      author,
      year,
      isComplete,
   };
};

const isCompleted = () => {
   if (checkboxValue.checked) return true;
   return false;
};

const confirmDialog = (message, callback, bookId) => {
   const confirmModal = document.getElementById("confirmModal");
   const confirmModalMessage = document.getElementById("confirmModalMessage");
   confirmModalMessage.innerText = message;
   confirmModal.style.display = "flex";

   const yesButton = document.getElementById("yesConfirmButton");
   const noButton = document.getElementById("noConfirmButton");

   yesButton.onclick = () => {
      callback(bookId);
      confirmModal.style.display = "none";
   };

   noButton.onclick = () => {
      confirmModal.style.display = "none";
   };
};

const formDialog = (message, callback, bookObject) => {
   const formModal = document.getElementById("formModal");
   const formModalMessage = document.getElementById("formModalMessage");
   const cancelButton = document.getElementById("cancelFormButton");
   const editTitle = document.getElementById("editTitle");
   const editAuthor = document.getElementById("editAuthor");
   const editYear = document.getElementById("editYear");

   formModalMessage.innerText = message;
   editTitle.value = bookObject.title;
   editAuthor.value = bookObject.author;
   editYear.value = bookObject.year;
   formModal.style.display = "flex";

   formModal.onsubmit = (ev) => {
      ev.preventDefault();
      callback(bookObject.id);
      formModal.style.display = "none";
   };

   cancelButton.onclick = (ev) => {
      ev.preventDefault();
      formModal.style.display = "none";
   };
};
