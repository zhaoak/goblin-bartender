/* Imports */

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
    'Welcome to your new job. Hope your shift doesn\'t take too much out of you.',
    'Click a goblin to serve them a drink.',
];

/* Events */

/* Display Functions */

// (don't forget to call any display functions you want to run on page load!)
