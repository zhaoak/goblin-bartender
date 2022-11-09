/* Imports */
import { renderGoblin, renderEventLogLine } from './render-utils.js';

/* Get DOM Elements */
const playerEnergyEl = document.getElementById('player-energy-display');
const playerPowerEl = document.getElementById('player-bartending-power');
const goblinsServedEl = document.getElementById('goblins-served');
const trainBartendingButton = document.getElementById('train-bartending-button');
const takeBreakButton = document.getElementById('take-break-button');
const gameOverMessage = document.getElementById('game-over-message');
const resetButton = document.getElementById('reset-button');
const goblinListEl = document.getElementById('goblin-list');
const goblinNameInput = document.getElementById('goblin-name-input');
const addGoblinButton = document.getElementById('add-goblin-button');
const eventLogEl = document.getElementById('event-log');

/* State */
const goblinList = [
    { id: 0, name: 'Gobbo', dp: 2 },
    { id: 1, name: 'Greebo', dp: 1 },
];
let freshId = 2; // do not modify directly, call getFreshId() instead
const eventLog = [
    "Welcome to your new job. Hope your shift doesn't take too much out of you.",
    'Click on a goblin to serve them a drink.',
];
let playerEnergy = 10;
let playerPower = 1;
let score = 0; // goblins served
let gameLost = false;
const goblinDefaultNameList = [
    'Gorbo',
    'Grindle',
    'Garfield',
    'Grossman',
    'Grindcore',
    'Greg',
    'Jerma985',
    'Giblet',
    'Gem',
    'Griggs',
    'Garbage',
    'Giggle',
    'Gruntilda',
    'Gocko',
    'Gilbert',
    'Grandma',
    'Grimace',
    'Bob',
    'Gex',
    'Goose',
    'Gonk',
];

/* Events */
addGoblinButton.addEventListener('click', () => {
    addGoblin(goblinNameInput.value);
    updateGoblinList();
    updateEventLog();
    goblinNameInput.value = '';
});

trainBartendingButton.addEventListener('click', () => {
    if (playerPower >= 4) {
        addToLog("You can't train your skills any farther. You're already the best there is!");
    } else if (Math.random() > 0.25) {
        // if training fails
        addToLog(
            'You try to train, but the goblins heckle you, and you are forced to abandon your efforts.'
        );
        allGoblinsAttack(1);
        checkGameStatus();
    } else {
        // if training succeeds
        playerPower++;
        addToLog('You focus your barkeeping strength, and your Bartending Power increases!');
    }
    updatePlayerStats();
    updateGoblinList();
    updateEventLog();
});

takeBreakButton.addEventListener('click', () => {
    if (playerEnergy >= 10) {
        addToLog("You don't need a break right now.");
    } else if (Math.random() > 0.75) {
        // if taking break fails
        addToLog('You try to take a break, but the goblins demand your attention!');
        allGoblinsAttack(0.5);
        checkGameStatus();
    } else {
        // if training succeeds
        playerEnergy += 3;
        addToLog('You chill out for a bit. The goblins can wait! (+3 Energy)');
        if (playerEnergy > 10) {
            playerEnergy = 10; // player energy should not exceed 10
        }
    }
    updatePlayerStats();
    updateGoblinList();
    updateEventLog();
});

resetButton.addEventListener('click', () => {
    resetGame();
});

/* Display Functions */
function updateGoblinList() {
    goblinListEl.textContent = '';
    for (let goblin of goblinList) {
        const goblinEl = renderGoblin(goblin);
        // only add event listener if game not over
        if (gameLost === false) {
            goblinEl.addEventListener('click', () => {
                serveGoblin(goblin);
            });
        }
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

function gameOver() {
    addGoblinButton.disabled = true;
    goblinNameInput.disabled = true;
    trainBartendingButton.disabled = true;
    takeBreakButton.disabled = true;

    gameLost = true;

    for (let goblin of goblinList) {
        goblin.dp = 10;
    }
    addToLog(
        `You collapse in exhaustion after managing to serve ${score} goblins, but they were simply too annoying for you in the end.`
    );
    addToLog('Game Over!');
    gameOverMessage.classList.remove('hidden');
    updateEventLog();
    updateGoblinList();
    updatePlayerStats();
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
    // if goblin is already at 0 dp, remove from list and increment score
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
        if (goblin.dp < 0) {
            // if goblin reduced to less than 0 DP, set to 0
            goblin.dp = 0;
        }

        // note in log if goblin loses all dp
        if (goblin.dp <= 0) {
            addToLog(`${goblin.name} looks about ready to go home.`);
        }
        // check if player out of energy
        checkGameStatus();
    }

    updateEventLog();
    updateGoblinList();
    updatePlayerStats();
}

function resetGame() {
    playerPower = 1;
    playerEnergy = 10;
    score = 0;
    freshId = 2;
    gameLost = false;

    goblinList.splice(0); // empty array
    goblinList.push({ id: 0, name: 'Gobbo', dp: 2 });
    goblinList.push({ id: 1, name: 'Greebo', dp: 1 });

    addGoblinButton.disabled = false;
    goblinNameInput.disabled = false;
    trainBartendingButton.disabled = false;
    takeBreakButton.disabled = false;
    gameOverMessage.classList.add('hidden');

    eventLog.splice(0); // wipe array
    addToLog('Game reset.');
    addToLog("Welcome to your new job. Hope your shift doesn't take too much out of you.");
    addToLog('Click a goblin to serve them a drink.');
    updateGoblinList();
    updatePlayerStats();
    updateEventLog();
}

function addGoblin(customName) {
    if (goblinList.length >= 4) {
        addToLog('The bar is already full, and cannot accommodate more goblins.');
        return;
    }
    let newGoblin = { id: getFreshId(), name: customName, dp: -1 };
    if (newGoblin.name === '') {
        // assign random name if none provided
        newGoblin.name = goblinDefaultNameList[returnRandInt(goblinDefaultNameList.length - 1)];
    }

    // randomly determine new goblin's DP, from 1 to 4
    newGoblin.dp = Math.ceil(Math.random() * 4);
    goblinList.push(newGoblin);
    addToLog(`${newGoblin.name} enters the bar.`);
}

function allGoblinsAttack(modifier) {
    for (let goblin of goblinList) {
        calcGoblinAttack(goblin, modifier);
    }
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
            case 0:
                addToLog(`${goblin.name} drunkenly giggles to themself quietly. (Energy -0)`);
                break;
            default:
                addToLog('Something is wrong. Consider complaining to github.com/zhaoak about it!');
        }
    } else {
        // if goblin misses
        addToLog(
            `${goblin.name} says something annoying, but fortunately, you weren't listening. (Energy -0)`
        );
    }
}

function returnRandInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function checkGameStatus() {
    if (playerEnergy <= 0) {
        gameOver();
    }
}

// (don't forget to call any display functions you want to run on page load!)
updateGoblinList();
updateEventLog();
updatePlayerStats();
