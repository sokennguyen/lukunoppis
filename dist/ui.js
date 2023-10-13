const NUM_SQUARES = 18;


//squares are used only by the frontend, backend deals with tasklist
let Square = function (taskId,taskName) {
    this.taskId=taskId
    this.taskName=taskName
}

const pawnColors = ["pawns/black.png", "pawns/blue.png", "pawns/brown.png", "pawns/gray.png", "pawns/green.png", "pawns/pink.png", "pawns/purple.png", "pawns/red.png", "pawns/white.png", "pawns/yellow.png"];
let animationOn = false;
let addPlayerOn = false;
let troot = trootCss();
let addplayer = addPlayerdivCss()
let myDestination = "Not yet";
let pawnsCanvas = [];
let positions = [];
let selectedColor = 0;


let framesPerRow = 8;
let frameWidth = 200;
let frameHeight = 200;
let totalFrames = 16;
let currentFrame = 0;


//              *** new toys ***
const PlayerButtonClick = async (clickedPlayer) => {
    console.log(clickedPlayer.name+' clicked!')
    const inputPlayers = players
    SetPlayers(inputPlayers)
}
const DefineSquaresList = () => {
    if (tasks.length<17) {
        console.log(`Every task must be defined. Missing ${17-tasks.length}`);
        return 
    }
    const squares = tasks.map((task,index)=>new Square(index,task))
    console.log(squares);
    return squares
}
//              *** *** * *** ***


const InitTable = () => {
    CreateNewButton('New game', () => {
        playerOnCss(true);
        update();
    });
    CreateNewButton('Roll Dice', () => {
        if (!animationOn) { //waiting time is nice
            DiceButtonHandler();
            update();
        }
    });

    let inputPlayerName = document.createElement('input')
    inputPlayerName.setAttribute('id', 'input-playername')
    addplayer.appendChild(inputPlayerName)

    let addPlayerbtn = CreateNewButton('Add Player', () => {
        let newPlayer = AddPlayer(inputPlayerName.value);
        const playerButton = document.querySelector(`.player-${newPlayer.id}`)
        playerButton.addEventListener('click',()=>PlayerButtonClick(newPlayer))
        EditPlayerColor(selectedColor, newPlayer.id);
    });

    let continueBtn = CreateNewButton('Continue', () => {
        playerOnCss(false);
    });

    let canvas = canvasCss();

    canvas.id = 'myCanvas';
    troot.appendChild(canvas);
    canvas.style.pointerEvents = 'none';

    addplayer.appendChild(inputPlayerName)
    addplayer.appendChild(addPlayerbtn)
    addplayer.appendChild(continueBtn)
    drawTable();
}

function getColourURL(colourId) {

    if (colourId >= 0 && colourId < pawnColors.length) {
        return pawnColors[colourId];
    }
}

async function update() { //This starts the animation
    if (!animationOn && destinationSquare !== myDestination) {
        animationOn = true;
        await sendPawn(destinationSquare);
        myDestination = destinationSquare;
    }
}



// This draws the first frame of the spritesheet onto a canvas
// I would have manually cropped these images 30 times by now XD
function addPawnCanvas() {
    for (let i = 0; i < pawnColors.length; i++) {
        
        let myCanvas = document.createElement('canvas');
        myCanvas.width = frameWidth * 0.25; // Half the original width
        myCanvas.height = frameHeight * 0.25; // Half the original height

        myCanvas.addEventListener('click', function (event) {
            selectedColor = i;

        });

        let context = myCanvas.getContext('2d');
        let img = new Image();
        img.src = pawnColors[i];

        img.onload = function () {
            context.drawImage(img, 0, 0, frameWidth, frameHeight, 0, 0, myCanvas.width, myCanvas.height);

            document.body.appendChild(myCanvas);

            // Store the canvas reference in both arrays
            pawnsCanvas.push(myCanvas);
            let addplayer = document.getElementById('addPlayerdiv')
            addplayer.appendChild(myCanvas)
        };
    }
}

function convertToPixels(targetPercentX, targetPercentY) {

    //Size of square
    let adjustX = 8;
    let adjustY = 7;

    targetPercentX += adjustX;
    targetPercentY += adjustY;
    let fixitX = 100 - targetPercentX;
    let windowWidthPixels = window.innerWidth;
    let windowHeightPixels = window.innerHeight;

    let targetX = (fixitX / 100) * windowWidthPixels;
    let targetY = (targetPercentY / 100) * windowHeightPixels;

    return {
        x: targetX,
        y: targetY
    };
}

function sendPawn(des) {
    //console.log(" destination t.sendpawn " + des)
    let desPos = positions[des];
    let x = desPos[1];
    let y = desPos[0];
    drawPawn(y, x);
}

//Start position of pawn
let startPixel = convertToPixels(87, 5)
let xPosition = startPixel.x;
let yPosition = startPixel.y;


function drawPawn(y, x) {

    let XandY = convertToPixels(y, x)
    let targetX = XandY.x;
    let targetY = XandY.y;


    canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    let img = new Image();

    let pawnColourId = players[previousPlayer].color;
    img.src = getColourURL(pawnColourId);


    let speed = 20;
    let distanceX = targetX - xPosition;
    let distanceY = targetY - yPosition;
    let frames = Math.sqrt(distanceX ** 2 + distanceY ** 2) / speed;
    let speedX = distanceX / frames;
    let speedY = distanceY / frames;

    let animationId; // To keep track of the animation frame ID

    img.onload = function () {
        animationId = requestAnimationFrame(animateSprite);
    };

    let scale = window.devicePixelRatio;
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;
    ctx.scale(scale, scale);


    function animateSprite() {
        // Movement towards target logic
        if (Math.abs(targetX - xPosition) > Math.abs(speedX) || Math.abs(targetY - yPosition) > Math.abs(speedY)) {
            xPosition += speedX;
            yPosition += speedY;
            animationId = requestAnimationFrame(animateSprite);
        } else {
            // Once the target is reached, reset to the first frame
            currentFrame = 0;
            cancelAnimationFrame(animationId); // Stop the animation once the target is reached
            //console.log('Animation finished!');
            animationOn = false;
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate current row and column for animation
        let currentRow = Math.floor(currentFrame / framesPerRow);
        let currentCol = currentFrame % framesPerRow;

        let desiredWidth = frameWidth * 0.2;
        let desiredHeight = frameHeight * 0.2;

        // Draw the sprite frame at the current position
        ctx.drawImage(img, currentCol * frameWidth, currentRow * frameHeight, frameWidth, frameHeight, xPosition, yPosition, desiredWidth, desiredHeight);

        // Move to the next frame for sprite animation
        currentFrame = (currentFrame + 1) % totalFrames;
    }

}
function drawTable() {
    let startCordinates = [100, 10];
    let squareIndex = 0;

    //this is where adding game squares starts
    addSquares("right", 7);
    addSquares("down", 3);
    addSquares("left", 6);
    addSquares("up", 2);


    function addSquares(dir, steps) {
        let step = 13; // 13 seems good 
        for (let i = 0; i < steps; i++) {
            let verticalStep = step * 1.6180339887;
            switch (dir) {
                case "right":
                    startCordinates[0] -= step;
                    break;
                case "left":
                    startCordinates[0] += step;
                    break;
                case "up":
                    startCordinates[1] -= verticalStep;
                    break;
                case "down":
                    startCordinates[1] += verticalStep;
                    break;
            }

            let whopple1 = Math.floor(Math.random() * 2) - 1; // -2 to 2
            let whopple2 = Math.floor(Math.random() * 5) - 2;

            //TODO: add image for start square
            let img = squareCss();

            positions[squareIndex] = [startCordinates[0] + whopple1, startCordinates[1] + whopple2];
            applyStylesToElement(img, {
                position: 'absolute',
                right: `${(startCordinates[0] + whopple1)}vw`,
                top: `${startCordinates[1] + whopple2}vh`,
                width: '8vw',
                height: '7vw',
            });
            img.setAttribute('id', squareIndex)
            //TODO: use the click event target index instead of image index
            img.addEventListener('click', (function (index) {
                return function () {
                    if (!animationOn) {
                        SquareClickHandler(index)
                        update();
                    }
                };
            })(squareIndex));
            squareIndex++;
            troot.appendChild(img);
        }
    }
}
function appendPawnCanvas() {
    for (i = 0; i > pawnsCanvas.length; i++) {

    }
}
function start() {
    InitTable()
    //append canvas
    addPawnCanvas();
}