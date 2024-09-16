// Add Task functionality
document.getElementById('add-task').addEventListener('click', function() {
  const todoList = document.getElementById('todo-list');
  const newTask = document.createElement('li');
  
  newTask.innerHTML = `
    <input type="checkbox" class="todo-checkbox">
    <span contenteditable="true" class="todo-text">New Task</span>
    <button class="delete-btn">Delete</button>
  `;

  todoList.appendChild(newTask);

  // Add delete functionality to the new task
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', deleteTask);
  });
});

// Delete Task functionality
function deleteTask(e) {
  const task = e.target.parentElement;
  task.remove();
}

// Make sure delete functionality works on initial load
const deleteBtns = document.querySelectorAll('.delete-btn');
deleteBtns.forEach((btn) => {
  btn.addEventListener('click', deleteTask);
});

// Expand rows when content overflows
const routineTable = document.getElementById('routine-table');
routineTable.addEventListener('input', adjustHeight);

function adjustHeight(e) {
  if (e.target.tagName === 'TD' || e.target.tagName === 'TH') {
    e.target.style.height = 'auto';
    e.target.style.height = (e.target.scrollHeight) + 'px';
  }
}
