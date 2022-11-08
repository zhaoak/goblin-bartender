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
let freshId = 2; // do not modify directly, call getFreshId() instead
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
            serveGoblin(goblin);
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

function updatePlayerStats() {
    playerEnergyEl.textContent = `${playerEnergy}/10`;
    playerPowerEl.textContent = `${playerPower} DP`;
    goblinsServedEl.textContent = score;
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

function serveGoblin(goblin) {
    // if goblin is already at 0 dp, remove from list
    if (goblin.dp === 0) {
        addToLog(`${goblin.name} decides it's time to go home and leaves. They do not tip.`);
        const findGoblinIndexById = (element) => element.id === goblin.id;
        const removedGoblinIndex = goblinList.findIndex(findGoblinIndexById);
        goblinList.splice(removedGoblinIndex, 1); // remove goblin by id
        score++;
    } else {
        // otherwise, reduce goblin's dp, goblin attacks
        addToLog(`You get ${goblin.name} a drink. (${goblin.name} DP -${playerPower})`);
        calcGoblinAttack(goblin, 1); // no modifier when clicking goblin
        goblin.dp -= playerPower;
    }

    updateEventLog();
    updateGoblinList();
    updatePlayerStats();
}

function calcGoblinAttack(goblin, modifier) {
    const effectiveDp = Math.floor(goblin.dp * modifier);
    if (Math.random() <= 0.25 * effectiveDp) {
        // if goblin hits
        playerEnergy -= effectiveDp;
        switch (effectiveDp) {
            case 4:
                addToLog(
                    `${goblin.name} starts ranting about how great cryptocurrency is. You feel exhausted, and you're barely even listening. (Energy -4)`
                );
                break;
            case 3:
                addToLog(
                    `${goblin.name} complains about how slow the customer service is here. (Energy -3)`
                );
                break;
            case 2:
                addToLog(`${goblin.name} says something racist about kobolds. Gross! (Energy -2)`);
                break;
            case 1:
                addToLog(`${goblin.name} drunkenly sings a battle song. (Energy -1)`);
                break;
            default:
                addToLog('Something is wrong.');
        }
    } else {
        // if goblin misses
        addToLog(
            `${goblin.name} says something annoying, but fortunately, you weren't listening. (Energy -0)`
        );
    }
}

// (don't forget to call any display functions you want to run on page load!)
updateGoblinList();
updateEventLog();
