/*
    1. create 12 cards -> By creating array of objects! each object can have the image path and a name
*/

const images = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
];

// then just make pairs of them, duplicate them
const duplicateImages = images;
const imagesWithDuplicates = images.concat(duplicateImages);
// then put them in a random order
imagesWithDuplicates.sort(() => Math.random() - 0.5);

// and then pass them to the html (covered)?
const grid = document.querySelector('#grid'); // searches for id
const scoreDisplay = document.querySelector('#score');
const flippedDisplay = document.querySelector('#flipped');

createBoard();

let lastFlipped = [];
let score = 0;
let cardsFlipped = 0;

// creates the 12 image elements each one with its own UNIQUE ID!
function createBoard(){
    let id = 0;
    imagesWithDuplicates.forEach(imgeObj => {
        const element = document.createElement('img');      // (i) CREATES an <image> html element
        element.setAttribute('src', 'images/blank.png');    // sets the element attibute src
        element.setAttribute('data-id', id++);              // sets the element attribute data-id (a unique id)
        grid.appendChild(element);                          // can also use: grid.insertAdjacentElement('beforeend', element);
        element.addEventListener('click', flipCard);
    });
}
// breaks and styling done in css

function flipCard() {
    const id = this.getAttribute('data-id');    // "this" here allows us to acces the element of the eventListenerMethod
    this.setAttribute('src', imagesWithDuplicates[id].img);
    // add a check if same item was clicked twice, thend do nothing
    lastFlipped.unshift(this);
    if(lastFlipped.length >= 2){
        setTimeout(compareEquallity, 1000);
    }
}

function compareEquallity() {
    //how to get all images under grid:
    // const bla = document.querySelectorAll('#grid img'); // selects all images inside of element with "grid" id!

    const id = lastFlipped[0].getAttribute('data-id');
    const id2 = lastFlipped[1].getAttribute('data-id');

    if(id === id2){
        lastFlipped.pop();
        return;
    }
    if(imagesWithDuplicates[id].name !== imagesWithDuplicates[id2].name ){
        // no match, hide 2 from flipped array
        lastFlipped.forEach( element => element.setAttribute('src', 'images/blank.png'));
    } else {
        alert('You found a match!');
        // add white image backround and do nothing more -> The for next rounds check tose are not clickable! 
        lastFlipped[0].setAttribute('src', 'images/white.png');
        lastFlipped[1].setAttribute('src', 'images/white.png');
        lastFlipped[0].removeEventListener('click', flipCard); // (i) SOLUTION! , not clickable: with removeEventListener!
        lastFlipped[1].removeEventListener('click', flipCard);
        cardsFlipped++;
    }
    score++;
    lastFlipped = [];
    scoreDisplay.innerHTML = score;
    flippedDisplay.innerHTML = cardsFlipped;
    // last if condition if you won,  
}




/* my approach -> have them all covered by default and ony show it on click
 then in the html have an uid for each image, and when its clicked just do the same as in rock paper scissors, 
 get it by uid and display the pic. The img tags and uids are made with JS! (not manually)
 */


/* then make a function triggered on click, where you uncover 2 and increase the score each time, 
    if they are a pair, then set them white, and not clickable (how to make element unclickable?)
*/

