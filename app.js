/* Imports */
import { renderGoblin, renderEventLogLine } from './render-utils.js';

/* Get DOM Elements */
const playerEnergyEl = document.getElementById('player-energy-display');
const playerPowerEl = document.getElementById('player-bartending-power');
const goblinsServedEl = document.getElementById('goblins-served');
const trainBartendingButton = document.getElementById('train-bartending-button');
const takeBreakButton = document.getElementById('take-break-button');
const resetButton = document.getElementById('reset-button');
const goblinListEl = document.getElementById('goblin-list');
const goblinNameInput = document.getElementById('goblin-name-input');
const addGoblinButton = document.getElementById('add-goblin-button');
const eventLogEl = document.getElementById('event-log');

/* State */
const goblinList = [
    { id: 0, name: 'Gobbo', dp: 2 },
    { id: 1, name: 'Grebbo', dp: 1 },
];
let freshId = 2;
const eventLog = [
    "Welcome to your new job. Hope your shift doesn't take too much out of you.",
    'Click on a goblin to serve them a drink.',
];
let playerEnergy = 10;
let playerPower = 1;
let score = 0; // goblins served
let gameOver = false;

/* Events */

/* Display Functions */
function updateGoblinList() {
    goblinListEl.textContent = '';
    for (let goblin of goblinList) {
        const goblinEl = renderGoblin(goblin);
        goblinEl.addEventListener('click', () => {
            // call goblin click handler
        });
        goblinListEl.append(goblinEl);
    }
}

function updateEventLog() {
    eventLogEl.textContent = '';
    for (let line of eventLog) {
        eventLogEl.append(renderEventLogLine(line));
    }
}

/* Misc Functions */
function getFreshId() {
    freshId++;
    return freshId - 1;
}

function addToLog(message) {
    eventLog.push(message);
    // log has max of ten lines
    if (eventLog.length > 10) {
        eventLog.shift(); // pops element at index 0
    }
}

// (don't forget to call any display functions you want to run on page load!)
updateGoblinList();
updateEventLog();
