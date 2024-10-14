// Reading Notes Feature
const saveNoteBtn = document.getElementById('save-note-btn');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// Save note and display it in the list
saveNoteBtn.addEventListener('click', () => {
    const note = noteInput.value.trim();
    if (note) {
        const li = document.createElement('li');
        li.textContent = note;
        notesList.appendChild(li);
        noteInput.value = ''; // Clear input after saving
    }
});

// Reading Goals Feature
const setGoalBtn = document.getElementById('set-goal-btn');
const goalInput = document.getElementById('goal-input');
const goalMessage = document.getElementById('goal-message');

setGoalBtn.addEventListener('click', () => {
    const goal = goalInput.value;
    if (goal > 0) {
        goalMessage.textContent = `You have set a goal to read ${goal} pages.`;
        goalInput.value = ''; // Clear input after setting goal
    } else {
        goalMessage.textContent = 'Please enter a valid number of pages.';
    }
});

// Reading Timer Feature
let timer;
let seconds = 0;
let isRunning = false;
const timerDisplay = document.getElementById('timer-display');
const startTimerBtn = document.getElementById('start-timer-btn');
const stopTimerBtn = document.getElementById('stop-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');

// Update timer display
function updateTimerDisplay() {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    timerDisplay.textContent =
        `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Start the timer
startTimerBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
        isRunning = true;
    }
});

// Stop the timer
stopTimerBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
});

// Reset the timer
resetTimerBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    updateTimerDisplay();
});
