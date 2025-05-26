const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority-select");
const dueDateInput = document.getElementById("due-date-input"); // New due date input
const todoList = document.getElementById("todo-list");

// Function to save tasks to Local Storage
function saveToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll("li");
    taskItems.forEach(item => {
        const taskText = item.firstChild.nodeValue.trim();
        const priority = item.querySelector("span").textContent.trim();
        const completed = item.classList.contains("completed");
        const dueDate = item.querySelector(".due-date").textContent.trim(); // Capture due date
        tasks.push({ text: taskText, priority: priority, completed: completed, dueDate: dueDate });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTodo() {
    const todoText = todoInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value; // Get the due date input

    if (todoText === "") return;

    const li = document.createElement("li");

    const textNode = document.createTextNode(todoText);
    const priorityNode = document.createElement("span");
    priorityNode.textContent = `(${priority.toUpperCase()})`;
    priorityNode.classList.add(priority); // Add class based on priority
    li.appendChild(textNode);
    li.appendChild(priorityNode);

    // Create and append due date
    const dueDateNode = document.createElement("span");
    dueDateNode.textContent = ` (Due: ${dueDate || "No due date"})`;
    dueDateNode.classList.add("due-date"); // Add class to style it
    li.appendChild(dueDateNode);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => li.remove();
    li.appendChild(deleteBtn);

    // Add checkbox to mark task as complete
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = () => toggleComplete(li);
    li.prepend(checkbox);

    // Add the new todo to the list
    todoList.appendChild(li);

    // Clear input fields after adding
    todoInput.value = "";
    dueDateInput.value = ""; // Reset the due date input
    saveToLocalStorage(); // Save to local storage after adding a new task
}

// Function to toggle task completion
function toggleComplete(li) {
    li.classList.toggle("completed");
    saveToLocalStorage(); // Update local storage after toggling completion
}

// Function to load tasks from Local Storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(task => {
            const li = document.createElement("li");
            const textNode = document.createTextNode(task.text);
            const priorityNode = document.createElement("span");
            priorityNode.textContent = task.priority;
            priorityNode.classList.add(task.priority);
            li.appendChild(textNode);
            li.appendChild(priorityNode);

            // Create and append due date
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
            deleteBtn.onclick = () => li.remove();
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
