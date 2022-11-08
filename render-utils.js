export function renderGoblin(goblin) {
    // creating html elements to make goblin ui box
    const goblinEl = document.createElement('div');
    const nameEl = document.createElement('p');
    const emoteEl = document.createElement('p');
    const dpEl = document.createElement('p');
    const srEl = document.createElement('span');

    // goblin-box css class contains appropriate styling
    goblinEl.classList.add('goblin-box');
    nameEl.textContent = goblin.name;
    dpEl.textContent = goblin.dp < 0 ? 0 : goblin.dp; // if dp < 0, render as 0
    dpEl.id = `goblin-dp-${goblin.id}`;

    srEl.classList.add('screen-reader-only');
    srEl.id = `goblin-sr-${goblin.id}`;

    // set emoji/screenreader text, add classes as appropriate for DP value
    switch (goblin.dp) {
        case 10:
            srEl.textContent = 'super mad emoji!!';
            emoteEl.textContent = '💢';
            break;
        case 4:
            srEl.textContent = 'grumpy emoji';
            emoteEl.textContent = '😠';
            break;
        case 3:
            srEl.textContent = 'less grumpy emoji';
            emoteEl.textContent = '😒';
            break;
        case 2:
            srEl.textContent = 'neutral face emoji';
            emoteEl.textContent = '😕';
            break;
        case 1:
            srEl.textContent = 'pretty drunk emoji!!';
            emoteEl.textContent = '🥴';
            break;
        case 0:
            srEl.textContent = 'door emoji';
            emoteEl.textContent = '🚪';
            goblinEl.classList.add('went-home');
            break;
        default:
            srEl.textContent = 'question mark emoji--something went wrong';
            emoteEl.textContent = '???';
    }

    goblinEl.id = `goblin-${goblin.id}`;
    goblinEl.append(nameEl, emoteEl, dpEl, srEl);

    return goblinEl;
}

export function renderEventLogLine(line) {
    const lineEl = document.createElement('p');
    lineEl.classList.add('event-line');
    lineEl.textContent = line;
    return lineEl;
}
