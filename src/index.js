/**
 * DOM ELEMENTS
 */
const form = document.querySelector("#form-tasks");
const taskList = document.querySelector(".list-tasks");
const clearButton = document.querySelector("#clear-btn");
const filterInput = document.querySelector("#input-filter");
const taskInput = document.querySelector("#input-task");
const alert = document.querySelector(".invisible");

/**
 * Add Tasks
 */
form.addEventListener("submit", addTask);

function addTask(event) {
  event.preventDefault();

  if (taskInput.value === "") {
    alert.classList.remove("invisible");
    alert.classList.add("alert-danger");
    alert.classList.add("alert-no-input");
  }

  const listElements = document.createElement("li");
  listElements.appendChild(document.createTextNode(taskInput.value));
  taskList.appendChild(listElements);

  taskInput.value = "";
}
