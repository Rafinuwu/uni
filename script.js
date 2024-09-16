// Study Routine and Class Schedule
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = Array(10).fill(''); // You can add times of your liking, e.g., ['8 AM', '9 AM', ...]

// Function to generate table rows
function generateTableRows(tableBodyId) {
    const tbody = document.getElementById(tableBodyId);
    times.forEach((time) => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);
        days.forEach(() => {
            const cell = document.createElement('td');
            cell.setAttribute('contenteditable', 'true'); // Editable cells
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

// Load the tables
generateTableRows('routine-body');
generateTableRows('schedule-body');

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
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(text));
    li.classList.toggle('completed', completed);
    toDoList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    toDoList.querySelectorAll('li').forEach((li) => {
        tasks.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load the tasks when the page loads
window.onload = () => {
    loadTasks();
};
