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

const moveBookToUncompleted = () => {};

const deleteBook = () => {};

const findBookById = (bookId) => {
   for (const book of books) {
      if (book.id === bookId) {
         return book;
      }
   }
   return null;
};

const findBookByTitle = () => {};

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

   if (!bookObject.isComplete) {
      const checkButton = document.createElement("button");
      checkButton.classList.add("check-button");
      checkButton.addEventListener("click", () => {
         moveBookToCompleted(bookObject.id);
      });

      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-button");
      trashButton.addEventListener("click", () => {
         deleteBook(bookObject.id);
      });

      container.append(checkButton, trashButton);
   } else {
      const uncheckButton = document.createElement("button");
      uncheckButton.classList.add("uncheck-button");
      uncheckButton.addEventListener("click", () => {
         moveBookToUncompleted(bookObject.id);
      });

      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-button");
      trashButton.addEventListener("click", () => {
         deleteBook(bookObject.id);
      });

      container.append(uncheckButton, trashButton);
   }

   return container;
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
