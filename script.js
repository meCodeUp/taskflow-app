document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadLabels(); // Labels beim Start laden
});

function addTask() {
    let taskInput = document.getElementById("taskInput").value.trim();
    let priority = document.getElementById("prioritySelect").value;
    let label = document.getElementById("labelInput").value.trim();

    if (taskInput === "") {
        alert("Bitte eine Aufgabe eingeben!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskInput, priority: priority, label: label });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if (label) {
        saveLabel(label);
    }

    document.getElementById("taskInput").value = "";
    document.getElementById("labelInput").value = "";

    showTaskList();  // Nach dem Hinzufügen zur Liste wechseln
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    if (!taskList) return;
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <div class="task-item" style="border-left: 5px solid ${getPriorityColor(task.priority)};">
                <div>
                    <strong>${task.label || "Keine Kategorie"}</strong>: ${task.text}
                </div>
                <button onclick="removeTask(${index})">X</button>
            </div>`;
        taskList.appendChild(li);
    });
}

function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function getPriorityColor(priority) {
    switch (priority) {
        case "Hoch": return "#e74c3c";  // Rot
        case "Mittel": return "#f39c12";  // Orange
        case "Niedrig": return "#27ae60";  // Grün
        default: return "#bdc3c7";  // Grau
    }
}

// Zeige Aufgabenliste-Seite
function showTaskList() {
    document.getElementById("add-task-page").style.display = "none";
    document.getElementById("task-list-page").style.display = "block";
    loadTasks();
}

// Zeige Aufgaben-Hinzufügen-Seite
function showAddTaskPage() {
    document.getElementById("task-list-page").style.display = "none";
    document.getElementById("add-task-page").style.display = "block";
}

// Speichere neue Labels in LocalStorage
function saveLabel(label) {
    let labels = JSON.parse(localStorage.getItem("labels")) || [];
    if (!labels.includes(label)) {
        labels.push(label);
        localStorage.setItem("labels", JSON.stringify(labels));
        loadLabels();  // Sofort aktualisieren
    }
}

// Lade gespeicherte Labels in das Datalist
function loadLabels() {
    let labels = JSON.parse(localStorage.getItem("labels")) || [];
    let dataList = document.getElementById("labelOptions");

    dataList.innerHTML = "";  // Vorherige Optionen löschen

    labels.forEach(label => {
        let option = document.createElement("option");
        option.value = label;
        dataList.appendChild(option);
    });
}