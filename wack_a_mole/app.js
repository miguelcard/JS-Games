/*
     My approach:
     1. generate grid with random placement of the mole image -> just need to change the class of an element for css 
        styling and add event listener, use classList.add() & classList.remove()
     3. only on that one mole image put an event listener on Click, if its clicked increase score and randomly place mole again
     2. change mole image on a timer (i) use setInterval() clearInterval()
     4. finish game with an alert if initial timer runs out
 */

//1.
const grid = document.querySelector('#grid');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
let score = 0;
let timeLeft = 10;
const speed = 600;

createGrid();
let handle = setInterval(setRandomMole, speed);

// Sets timer ( we know is over when time left == 0, and Displays timer
let timerHandle = setInterval(() => {
    timeLeftDisplay.textContent = --timeLeft;
        if(timeLeft === 0){
            clearInterval(timerHandle);
            clearInterval(handle);
            clearLastMoleIfExists();
        }
    }, 1000);

// is called only once at the beggining
function createGrid() {
    for(var i = 0; i < 9; i++){
        const element = document.createElement('img');
        // element.setAttribute('src', 'images/blank.png'); // no need for setting image here, rather direct in class css!
        element.setAttribute('data-id', i);
        element.classList.add('square');
        grid.appendChild(element);
    }
}

function setRandomMole() { 
    clearLastMoleIfExists();
    const rand = Math.floor(Math.random() * 9);
    const nextMole = document.querySelector(`[data-id="${rand}"]`);
    // nextMole.setAttribute('src', 'images/ice-cream.png');
    nextMole.classList.add('moleClass');
    nextMole.addEventListener('mousedown', addScoreAndNext);
}

function clearLastMoleIfExists() {
    const lastMole = document.querySelector('.moleClass');
    if (lastMole !== null) {
        lastMole.classList.remove('moleClass');
        // lastMole.setAttribute('src', 'images/blank.png');
        lastMole.removeEventListener('mousedown', addScoreAndNext);
    }
}

function addScoreAndNext(){ // access element from the event listener with "this"
    score++;
    scoreDisplay.textContent = score;   // innerHtml returns all text including tags (of child elements)
    clearInterval(handle);
    setRandomMole();
    handle = setInterval(setRandomMole, 1000);
}