// Study Routine and Class Schedule
const routineDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const scheduleDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const times = Array(10).fill(''); // Add your times here, e.g., ['8 AM', '9 AM', ...]

// Function to generate table rows
function generateTableRows(tableBodyId, days) {
    const tbody = document.getElementById(tableBodyId);
    times.forEach((time) => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);
        days.forEach(() => {
            const cell = document.createElement('td');
            cell.setAttribute('contenteditable', 'true'); // Editable cells
            cell.style.minHeight = '40px'; // Ensure each cell starts at a minimum height
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

// Load the tables
generateTableRows('routine-body', routineDays);  // For study routine
generateTableRows('schedule-body', scheduleDays); // For class schedule

// To-Do List
const toDoList = document.getElementById('to-do-list');
const newTaskInput = document.getElementById('new-task');

// Load saved tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => {
        addTaskElement(task.text, task.completed);
    });
}

// Add new task
function addTask() {
    const taskText = newTaskInput.value;
    if (taskText.trim() !== '') {
        addTaskElement(taskText, false);
        saveTasks();
    }
    newTaskInput.value = '';
}

// Add task element to the DOM
function addTaskElement(text, completed) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        saveTasks();
    });

    const taskText = document.createTextNode(text);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    li.classList.toggle('completed', completed);
    toDoList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    toDoList.querySelectorAll('li').forEach((li) => {
        tasks.push({
            text: li.childNodes[1].textContent, // The task text
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load the tasks when the page loads
window.onload = () => {
    loadTasks();
};
