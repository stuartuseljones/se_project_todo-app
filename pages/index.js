import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
    todoCounter.updateTotal(false);
  } else {
    todoCounter.updateTotal(false);
  }
}

function handleTotal(completed) {
  todoCounter.updateTotal(completed);
}

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    handleDelete,
    handleTotal
  );
  const todoElement = todo.getView();

  return todoElement;
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const todoData = { name, date, id };
    const todoElement = generateTodo(todoData);
    section.addItem(todoElement);
    handleTotal(true);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos, //pass initial todo's
  renderer: (todoData) => {
    const todoElement = generateTodo(todoData);
    return todoElement;
  },
  containerSelector: ".todos__list",
});
section.renderItems();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});

// addTodoForm.addEventListener("submit", (event) => {
//   // event.preventDefault();
//   // const name = event.target.name.value;
//   // const dateInput = event.target.date.value;
//   // // Create a date object and adjust for timezone
//   // const date = new Date(dateInput);
//   // date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
//   // const id = uuidv4();
//   // const todoData = { name, date, id };
//   // // addTodo(todoData);
//   // addTodoPopup.close();
//   // newTodoValidator.resetValidation();
// });

// initialTodos.forEach((item) => {
//   addTodo(item);
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
