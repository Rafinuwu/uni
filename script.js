// Get the text areas
const studyRoutineInput = document.getElementById('study-routine-input');
const toDoListInput = document.getElementById('to-do-list-input');
const classScheduleInput = document.getElementById('class-schedule-input');

// Function to load saved data from localStorage
function loadData() {
    studyRoutineInput.value = localStorage.getItem('studyRoutine') || '';
    toDoListInput.value = localStorage.getItem('toDoList') || '';
    classScheduleInput.value = localStorage.getItem('classSchedule') || '';
}

// Function to save data to localStorage
function saveData() {
    localStorage.setItem('studyRoutine', studyRoutineInput.value);
    localStorage.setItem('toDoList', toDoListInput.value);
    localStorage.setItem('classSchedule', classScheduleInput.value);
}

// Load the data when the page loads
window.onload = loadData;

// Save data whenever the user types something
studyRoutineInput.addEventListener('input', saveData);
toDoListInput.addEventListener('input', saveData);
classScheduleInput.addEventListener('input', saveData);
