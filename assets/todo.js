// Selectors
const form = document.querySelector("form");
const addTodo = document.querySelector(".add-todo");
const list = document.querySelector(".new-todo");

const theme = document.createElement("button");
theme.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i>';
form.appendChild(theme);

// Event
form.addEventListener("submit", addNewTodo);

theme.addEventListener("click", function () {
  if (theme.classList.toggle("change-color")) {
    document.body.style.background = "rgba(216, 189, 9, 0.915)";
  } else {
    document.body.style.background =
      "linear-gradient(90deg, rgba(7, 149, 244) 0%, rgba(71, 7, 131) 50%,rgba(1, 11, 205, 0.658) 100%)";
  }
});

// Functions
function addNewTodo(e) {
  e.preventDefault();

  if (addTodo.value === " ") {
    alert("Please write a todo!");
  } else {
    addToSessionStorage(addTodo.value);
    const todoDiv = createTodoDiv(addTodo.value);
    list.appendChild(todoDiv);
  }

  addTodo.value = "";
}

function addToSessionStorage(todo) {
  let todoArr = JSON.parse(sessionStorage.getItem("todos")) || [];
  todoArr.push(todo);
  sessionStorage.setItem("todos", JSON.stringify(todoArr));
}

function createTodoDiv(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = createNewTodoInput(todo);
  todoDiv.appendChild(newTodo);

  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  todoDiv.appendChild(completeBtn);

  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todoDiv.appendChild(trashBtn);

  completeBtn.addEventListener("click", function () {
    if (
      completeBtn.innerHTML === '<i class="fa-regular fa-pen-to-square"></i>'
    ) {
      completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      newTodo.removeAttribute("readonly");
    } else {
      completeBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
      newTodo.setAttribute("readonly", "readonly");
    }
  });

  trashBtn.addEventListener("click", function (e) {
    if (confirm("Are you sure you want to delete?")) {
      list.removeChild(todoDiv);
      removeFromSessionStorage(todo);
    }
  });

  return todoDiv;
}

function createNewTodoInput(todo) {
  const newTodo = document.createElement("input");
  newTodo.value = capitalizeStr(todo);
  newTodo.type = "text";
  newTodo.setAttribute("readonly", "readonly");
  newTodo.classList.add("new-list");
  return newTodo;
}

function capitalizeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getFromSessionStorage() {
  let todoArr = JSON.parse(sessionStorage.getItem("todos")) || [];
  todoArr.forEach(function (todo) {
    const todoDiv = createTodoDiv(todo);
    list.appendChild(todoDiv);
  });
}

function removeFromSessionStorage(todo) {
  let todoArr = JSON.parse(sessionStorage.getItem("todos")) || [];
  const index = todoArr.indexOf(todo);
  if (index > -1) {
    todoArr.splice(index, 1);
    sessionStorage.setItem("todos", JSON.stringify(todoArr));
  }
}

getFromSessionStorage();
