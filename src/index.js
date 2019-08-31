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
 * Add Task to Tasks-List
 */
form.addEventListener("submit", addTask);

function addTask(event) {
  event.preventDefault();

  if (taskInput.value === "") {
    alert.classList.remove("invisible");
    alert.classList.add("alert-danger");
    alert.classList.add("alert-no-input");
  } else {
    alert.classList.add("invisible");
    const listElements = document.createElement("li");
    listElements.appendChild(document.createTextNode(taskInput.value));
    const linkElement = document.createElement("a");
    linkElement.innerHTML = "<i class='fa fa-remove'></i>";
    linkElement.classList = "icon-remove";
    listElements.appendChild(linkElement);
    listElements.classList = "list-tasks list-item";
    taskList.appendChild(listElements);
  }

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";
}

/**
 * Remove Task from Tasks-List
 */
taskList.addEventListener("click", removeTask);

function removeTask(event) {
  const iconRemove = event.target;
  const linkElementToBeRemoved = iconRemove.parentElement;
  const listElementToBeRemoved = linkElementToBeRemoved.parentElement;
  if (linkElementToBeRemoved.classList.contains("icon-remove")) {
    listElementToBeRemoved.remove();
    removeTaskFromLocalStorage(listElementToBeRemoved);
  }
}

/**
 * Clear Tasks from Tasks-List
 */
clearButton.addEventListener("click", clearTask);

function clearTask() {
  taskList.innerHTML = "";

  clearTaskFromLocalStorage();
}

/**
 * Filter Tasks
 */
filterInput.addEventListener("keyup", filterTask);

function filterTask(event) {
  const inputContent = event.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-item");

  listItems.forEach(listItem => {
    const listItemContent = listItem.textContent;
    if (listItemContent.toLowerCase().indexOf(inputContent) != -1) {
      listItem.style.display = "block";
    } else {
      listItem.style.display = "none";
    }
  });
}

/**
 * Store Task in LocalStorage
 */
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Get Tasks from Local Storage
 */
document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    alert.classList.add("invisible");
    const listElements = document.createElement("li");
    listElements.appendChild(document.createTextNode(task));
    const linkElement = document.createElement("a");
    linkElement.innerHTML = "<i class='fa fa-remove'></i>";
    linkElement.classList = "icon-remove";
    listElements.appendChild(linkElement);
    listElements.classList = "list-tasks list-item";
    taskList.appendChild(listElements);
  });
}

/**
 * Remove from Local Storage
 */
function removeTaskFromLocalStorage(listElementToBeRemoved) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (listElementToBeRemoved.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Clear from Local Storage
 */
function clearTaskFromLocalStorage() {
  localStorage.clear();
}
