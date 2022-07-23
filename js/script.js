document.addEventListener(SET_EVENT, () => {
   console.log(`terjadi perubahan data`);
});

document.addEventListener(RENDER_EVENT, () => {
   console.log("render sukses");
});

document.addEventListener("DOMContentLoaded", () => {
   const submitForm = document.getElementById("form");
   submitForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      addTodo();
   });
   getDataFromStorage(TODOS_KEY);
   render();
});

const addTodo = () => {
   const textTodo = document.getElementById("title").value;
   const timestamp = document.getElementById("date").value;

   const generateID = generateId();
   const todoObject = generateTodoObject(
      generateID,
      textTodo,
      timestamp,
      false
   );
   todos.push(todoObject);

   setDataToStorage(TODOS_KEY, todos);
};

const makeTodo = (todoObject) => {
   const textTitle = document.createElement("h2");
   textTitle.innerText = todoObject.task;

   const textTimestamp = document.createElement("p");
   textTimestamp.innerText = todoObject.timestamp;

   const textContainer = document.createElement("div");
   textContainer.classList.add("inner");
   textContainer.append(textTitle, textTimestamp);

   const container = document.createElement("div");
   container.classList.add("item", "shadow");
   container.append(textContainer);
   container.setAttribute("id", `${todoObject.id}`);

   if (!todoObject.isCompleted) {
      const checkButton = document.createElement("button");
      checkButton.classList.add("check-button");

      checkButton.addEventListener("click", () => {
         addTaskCompleted(todoObject.id);
      });

      container.append(checkButton);
   } else {
      const undoButton = document.createElement("button");
      undoButton.classList.add("undo-button");
      undoButton.addEventListener("click", () => {
         undoTaskFromCompleted(todoObject.id);
      });

      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-button");
      trashButton.addEventListener("click", () => {
         removeTaskFromCompleted(todoObject.id);
      });

      container.append(undoButton, trashButton);
   }

   return container;
};

const findTodoById = (todoId) => {
   for (const todo of todos) {
      if (todo.id === todoId) return todo;
   }
   return null;
};

const findIndexById = (todoId) => {
   for (const todo of todos) {
      if (todos[todo].id === todoId) return todo;
   }
   return -1;
};

const addTaskCompleted = (todoId) => {
   const findTodo = findTodoById(todoId);
   if (findTodo === null) return;
   findTodo.isCompleted = true;

   setDataToStorage(TODOS_KEY, todos);
   render();
};

const removeTaskFromCompleted = (todoId) => {
   const findTodo = findTodoById(todoId);
   for (let i = 0; i < todos.length; i++) {
      if (todos[i] === findTodo) {
         todos.splice(i, 1);
      }
   }

   setDataToStorage(TODOS_KEY, todos);
   render();
};

const undoTaskFromCompleted = (todoId) => {
   const findTodo = findTodoById(todoId);
   if (findTodo === null) return;
   findTodo.isCompleted = false;

   setDataToStorage(TODOS_KEY, todos);
   render();
};

const generateId = () => {
   return +new Date();
};

const generateTodoObject = (id, task, timestamp, isCompleted) => {
   return {
      id,
      task,
      timestamp,
      isCompleted,
   };
};
