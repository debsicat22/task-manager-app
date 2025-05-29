const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority-select");
const dueDateInput = document.getElementById("due-date-input");
const todoList = document.getElementById("todo-list");

// Function to save tasks to Local Storage
function saveToLocalStorage() {
  const tasks = [];
  const taskItems = document.querySelectorAll("li");
  taskItems.forEach(item => {
    const taskText = item.firstChild.nodeValue.trim();
    const priority = item.querySelector("span").textContent.trim();
    const completed = item.classList.contains("completed");
    const dueDate = item.querySelector(".due-date").textContent.trim();
    tasks.push({ text: taskText, priority, completed, dueDate });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTodo() {
  const todoText = todoInput.value.trim();
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;

  if (todoText === "" || !priority) {
    alert("Please enter a task and select a priority.");
    return;
  }

  const li = document.createElement("li");

  const textNode = document.createTextNode(todoText);
  const priorityNode = document.createElement("span");
  priorityNode.textContent = `(${priority.toUpperCase()})`;
  priorityNode.classList.add(priority);
  li.appendChild(textNode);
  li.appendChild(priorityNode);

  const dueDateNode = document.createElement("span");
  dueDateNode.textContent = ` (Due: ${dueDate || "No due date"})`;
  dueDateNode.classList.add("due-date");
  li.appendChild(dueDateNode);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveToLocalStorage();
  };
  li.appendChild(deleteBtn);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onclick = () => toggleComplete(li);
  li.prepend(checkbox);

  todoList.appendChild(li);

  todoInput.value = "";
  prioritySelect.selectedIndex = 0;
  dueDateInput.value = "";

  saveToLocalStorage();
}

// Function to toggle completion
function toggleComplete(li) {
  li.classList.toggle("completed");
  saveToLocalStorage();
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach(task => {
      const li = document.createElement("li");
      const textNode = document.createTextNode(task.text);
      const priorityNode = document.createElement("span");
      priorityNode.textContent = task.priority;
      priorityNode.classList.add(task.priority.toLowerCase());
      li.appendChild(textNode);
      li.appendChild(priorityNode);

      const dueDateNode = document.createElement("span");
      dueDateNode.textContent = ` (Due: ${task.dueDate || "No due date"})`;
      dueDateNode.classList.add("due-date");
      li.appendChild(dueDateNode);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.onclick = () => toggleComplete(li);
      li.prepend(checkbox);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        li.remove();
        saveToLocalStorage();
      };
      li.appendChild(deleteBtn);

      if (task.completed) {
        li.classList.add("completed");
      }

      todoList.appendChild(li);
    });
  }
}

// Load tasks on page load
window.onload = loadTasks;
