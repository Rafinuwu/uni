document.addEventListener("DOMContentLoaded", function () {
  const routineTable = document.getElementById('routine-table');
  const scheduleTable = document.getElementById('schedule-table');

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

  // Load saved data on page load
  loadRoutineData();
  loadScheduleData();
});
