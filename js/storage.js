const todos = [];
const TODOS_KEY = "todos-key";
const RENDER_EVENT = "render-event";
const SET_EVENT = "set-event";

const isStorageExist = () => {
   return typeof Storage === undefined;
};

const render = () => {
   const uncompletedTodolist = document.getElementById("todos");
   uncompletedTodolist.innerHTML = "";
   const completedTodolist = document.getElementById("completed-todos");
   completedTodolist.innerHTML = "";

   for (const todo of todos) {
      const todoElement = makeTodo(todo);
      if (!todo.isCompleted) {
         uncompletedTodolist.append(todoElement);
      } else {
         completedTodolist.append(todoElement);
      }
   }

   document.dispatchEvent(new Event(RENDER_EVENT));
};

const getDataFromStorage = (key) => {
   if (isStorageExist) {
      const dataJson = JSON.parse(localStorage.getItem(key));

      if (dataJson !== null) {
         for (const todo of dataJson) {
            todos.push(todo);
         }
      }
   }
};

const setDataToStorage = (key, value) => {
   if (isStorageExist) {
      const stringJson = JSON.stringify(value);
      localStorage.setItem(key, stringJson);
      document.dispatchEvent(new Event(SET_EVENT));
   }
};
