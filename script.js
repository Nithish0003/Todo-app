const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick"),
  alertMessage = document.getElementById("AlertMessage");
loadTasks();
function CreateToDoData(task) {
  const trimedValue = task ? task.trim() : todoValue.value.trim(task);
  if (trimedValue === "") {
    alertMessage.innerText = "Please enter your todo text";
    todoValue.focus();
    setTimeout(() => {
      alertMessage.innerText = "";
    }, 3000);
  } else {
    let li = document.createElement("li");
    const todoItems = `<div onclick="CompleteToDoItem(this)">${trimedValue}</div>
    <div class="todo-controls"></div>
    <img class="edit" onclick="UpdateToDoItem(this)" src="images/pencil.png"/>
    <img class="delete" onclick="DeleteToDoItem(this)" src="images/trash.png"/>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
    if (!task) {
      todoValue.value = "";
      saveTasks();
    }
  }
}
function CompleteToDoItem(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
  }
}
function saveTasks() {
  let tasks = [];
  listItems.querySelectorAll("li").forEach(function (item) {
    {
      tasks.push(item.querySelector("div").innerText.trim());
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => CreateToDoData(task));
}
function UpdateToDoItem(e) {
  const todoText = e.parentElement.querySelector("div").innerText;
  todoValue.value = todoText;
  e.parentElement.remove();
  addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
  addUpdateClick.setAttribute("src", "images/refresh.png");
}
function UpdateOnSelectionItems() {
  let li = document.createElement("li");
  const todoItems = `
      <div onclick="CompleteToDoItem(this)">${todoValue.value}</div>
      <div class="todo-controls"></div>
      <img class="edit" onclick="UpdateToDoItem(this)" src="images/pencil.png"/>
      <img class="delete" onclick="DeleteToDoItem(this)" src="images/trash.png"/>
    `;
  li.innerHTML = todoItems;
  listItems.appendChild(li);
  addUpdateClick.setAttribute("onclick", "CreateToDoData()");
  addUpdateClick.setAttribute("src", "images/plus.png");
  todoValue.value = "";
  saveTasks();
}
function DeleteToDoItem(e) {
  let deleteValue = e.parentElement.querySelector("div").innerText;
  if (confirm(`Are you sure you want to delete this ${deleteValue}?`)) {
    e.parentElement.remove();
    saveTasks();
  }
}
