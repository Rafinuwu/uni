document.addEventListener("DOMContentLoaded", function () {
  const routineTable = document.getElementById('routine-table');
  const scheduleTable = document.getElementById('schedule-table');
  const todoList = document.getElementById('todo-list');
  const addTaskBtn = document.getElementById('add-task-btn');
  const newTaskInput = document.getElementById('new-task');

  // Load saved data from localStorage for Routine Section
  function loadRoutineData() {
    for (let i = 0; i < routineTable.rows.length; i++) {
      for (let j = 0; j < routineTable.rows[i].cells.length; j++) {
        const cellId = `routine-${i}-${j}`;
        const savedData = localStorage.getItem(cellId);
        if (savedData) {
          routineTable.rows[i].cells[j].innerText = savedData;
        }
      }
    }
  }

  // Load saved data from localStorage for Schedule Section
  function loadScheduleData() {
    for (let i = 0; i < scheduleTable.rows.length; i++) {
      for (let j = 0; j < scheduleTable.rows[i].cells.length; j++) {
        const cellId = `schedule-${i}-${j}`;
        const savedData = localStorage.getItem(cellId);
        if (savedData) {
          scheduleTable.rows[i].cells[j].innerText = savedData;
        }
      }
    }
  }

  // Save data to localStorage for Routine Section
  routineTable.addEventListener('input', function (event) {
    const target = event.target;
    const row = target.parentElement.rowIndex;
    const col = target.cellIndex;
    const cellId = `routine-${row}-${col}`;
    localStorage.setItem(cellId, target.innerText);
  });

  // Save data to localStorage for Schedule Section
  scheduleTable.addEventListener('input', function (event) {
    const target = event.target;
    const row = target.parentElement.rowIndex;
    const col = target.cellIndex;
    const cellId = `schedule-${row}-${col}`;
    localStorage.setItem(cellId, target.innerText);
  });

  // Load saved tasks from localStorage
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    savedTasks.forEach(task => addTask(task.text, task.completed));
  }

  // Add a new task
  function addTask(text, completed = false) {
    const li = document.createElement('li');
    li.innerText = text;
    if (completed) {
      li.classList.add('completed');
    }

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
      li.remove();
      saveTasks();
    });

    li.appendChild(deleteBtn);

    // Mark task as completed
    li.addEventListener('click', function () {
      li.classList.toggle('completed');
      saveTasks();
    });

    todoList.appendChild(li);
    saveTasks();
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    todoList.querySelectorAll('li').forEach(li => {
      tasks.push({
        text: li.firstChild.textContent,
        completed: li.classList.contains('completed')
      });
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }

  // Add new task button event
  addTaskBtn
