document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Bitte eine Aufgabe eingeben!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <button onclick="removeTask(this)">X</button>`;
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.textContent.replace("X", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");

    // Aufgabenliste leeren, bevor neue Aufgaben geladen werden
    taskList.innerHTML = ""; 

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task} <button onclick="removeTask(this)">X</button>`;
        li.draggable = true; // Damit Drag & Drop funktioniert
        taskList.appendChild(li);
    });

    enableDragAndDrop(); // Sicherstellen, dass Drag & Drop aktiviert ist
}

function removeTask(button) {
    let li = button.parentElement;
    li.classList.add("removing");
    setTimeout(() => {
        li.remove();
        saveTasks();
    }, 300); // Nach 300ms löschen
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  enableDragAndDrop();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Bitte eine Aufgabe eingeben!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <button onclick="removeTask(this)">X</button>`;
    li.draggable = true;
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function enableDragAndDrop() {
  let items = document.querySelectorAll("#taskList li");
  items.forEach(item => {
      item.addEventListener("dragstart", dragStart);
      item.addEventListener("dragover", dragOver);
      item.addEventListener("drop", drop);
  });
}

let draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (draggedItem !== event.target) {
      let list = document.getElementById("taskList");
      let items = Array.from(list.children);
      let draggedIndex = items.indexOf(draggedItem);
      let targetIndex = items.indexOf(event.target);

      if (draggedIndex > targetIndex) {
          list.insertBefore(draggedItem, event.target);
      } else {
          list.insertBefore(draggedItem, event.target.nextSibling);
      }

      saveTasks();
  }
}