const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radius = 20;
var ctx = canvas.getContext("2d");
let x = Math.floor(radius + Math.random() * (innerWidth - 2*radius));
let y = Math.floor(innerHeight/2 + (Math.random() * (innerHeight - innerHeight/2 - 200)));
let changeX = Math.ceil(7 + Math.random() * 8);
let changeY = Math.ceil(7 + Math.random() * 8);

let rectangles = [];

let myMovinRect = {
    x: innerWidth/2,
    y: innerHeight -80,
    width: 185,
    height: 40
};

// move base
document.addEventListener('wheel', event => {
    console.log(event.deltaY);
    if(event.deltaY > 0 && myMovinRect.x -30 >= 0) {
        myMovinRect.x -= 35;
    }
    else if(event.deltaY < 0 && myMovinRect.x + myMovinRect.width + 30 <= innerWidth) {
        myMovinRect.x += 35;
    }
});

createRectangles();

setInterval(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.fillStyle = "#f5eaea";
    ctx.fillRect(myMovinRect.x, myMovinRect.y, myMovinRect.width, myMovinRect.height);
    bounceFromRect(myMovinRect);

    printRectangles(ctx);

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(x, y, radius, 0, 2* Math.PI);
    ctx.stroke();

    // Checks for ball touching a canvas limit
    if(x + radius > innerWidth || x - radius < 0){
        changeX *= -1; 
    }
    if(y - radius < 0){
        changeY *= -1;
    }
    if(y + radius > innerHeight){
        alert('You Lost!!!!')
    }

    checkBounceAndDeleteRect();

    x = x + changeX;
    y = y - changeY;
 }, 27);

function createRectangles() {
    let posX = 20;
    let posY = 20;
    const width = 190;
    const height = 50;
    const separation = 20;
    const numberOfRectangles = 21;

    for(let i = 0; i < numberOfRectangles; i++){
        let rect = {
            x: posX,
            y: posY,
            width: width,
            height: height
        };
        rectangles.push(rect);
        if((posX + 2*width + separation) >= innerWidth) {
            posX = separation;
            posY = posY + height + separation;
        } else {
            posX = posX + width + separation
        }
    }
}

function printRectangles(ctx) {
    for( rectangle of rectangles){
        ctx.fillStyle = "#1f8330";
        ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }
}

function checkBounceAndDeleteRect() {
    for(let i = 0; i < rectangles.length; i++){
        let rect = rectangles[i];
        let bounced = bounceFromRect(rect);

        if(bounced){
            rectangles.splice(i, 1);
        }
        if (rectangles.length <= 0) {
            alert('You Won!!!')
        }
    }
}

function bounceFromRect(rect) {
    let ballUpper = y - radius;
    let ballLower = y + radius;
    let ballLeft = x - radius;
    let ballRight = x + radius;
    let bounced = false;

    const isOnXRange = (x >= rect.x && x <= (rect.x + rect.width));
    const isOnYRange = (y >= rect.y && y <= (rect.y + rect.height));
    const surpassesHorizontalEdges = (ballLower >= rect.y) && (ballUpper <= (rect.y + rect.height));
    const surpassesVerticalEdges = (ballRight >= rect.x) && (ballLeft <= rect.x + rect.width);

    if(isOnXRange && surpassesHorizontalEdges){
        changeY *= -1;
        bounced = true;
    }
    if(isOnYRange && surpassesVerticalEdges){
        changeX *= -1;
        bounced = true;
    }
    return bounced;
}