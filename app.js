const input = document.getElementById("input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal-div");
const todos = JSON.parse(localStorage.getItem("tasks"));
let tasks = todos || [];

if (todos) {
  for (let i = 0; i < todos.length; i++) {
    const item = document.createElement("li");
    item.textContent = todos[i];
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "x";
    deleteBtn.classList.add("deleteBtn");
    item.appendChild(deleteBtn);
    list.appendChild(item);
  }
}

function addTask() {
  error();
  let text = input.value.trim();
  if (text.length > 0) {
    let li = document.createElement("li");
    li.innerHTML = text;
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "x";
    deleteBtn.classList.add("deleteBtn");
    li.appendChild(deleteBtn);
    list.appendChild(li);
    tasks.push(text);
    clearInput();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

function clearInput() {
  input.value = "";
}

function error() {
  if (input.value.length < 1) {
    modal.style.display = "block";
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }
}

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    const deleteBtn = e.target;
    const listItem = deleteBtn.parentNode;
    let index = -1;
    const childNodes = Array.from(list.childNodes);
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i] === listItem) {
        index = i;
        break;
      }
    }
    listItem.remove();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  if (e.target.matches("li")) {
    e.target.classList.add("finished");
  }
});
