/*With querySelectorAll, you select ALL the buttons that are in that html, i.e. rock, paper or sissors button values 
     if you were to add/have more buttons, you could add f.ex; class="Choice" only on the choice buttons and query them by class only
*/
const possibleChoices = document.querySelectorAll('button');
/* Pick out the elements by ids, i.e. the choices to be displayed */
const compChoiceDisplay = document.getElementById('comp-choice'); // You could also use 'Query Selector'
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');

// variable of what was chosen
let userChoice;

// Display what was chosen in the display element, and assign chosen value to a variable
const choice = possibleChoices.forEach(choice => 
    choice.addEventListener('click', event => {    // only gets executed if there is a click! and only this method, nothing more
        userChoice = event.target.id;              // gets the id of the button clicked
        userChoiceDisplay.innerHTML = userChoice;  // innerHtml -> is the text that lays between the tags of this element

        // generate the random choice of the computer:
        const compChoice = gererateComputerChoice();
        compChoiceDisplay.innerHTML = compChoice;

        // compare with user choice and decide who won:
        const result = compareChoices(userChoice, compChoice);
        resultDisplay.innerHTML = result;
    })
);

function gererateComputerChoice() {
    const possibleCompChoices = ['rock', 'paper', 'scissors'];
    const randIndex = Math.floor(Math.random()*possibleCompChoices.length);
    const randValue = possibleCompChoices[randIndex];
    return randValue;
}

function compareChoices(userChoice, compChoice) {
    if(userChoice === compChoice) {
        return `It's a Tie!`;
    }
    const bothChoices = [userChoice, compChoice];
    const winningCombinations = [['scissors', 'paper'],['rock', 'scissors'],['paper', 'rock']];
    let result = 'You Lost!';
    winningCombinations.forEach(comb => {
        const isWinnigComb = comb.length === bothChoices.length && comb.every((element, index) => {
            return element === bothChoices[index];
        });
        if(isWinnigComb){result = 'You Won!';}
    });

    return result;
}

// this code is not executed ever
console.log(userChoice);