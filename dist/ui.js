const NUM_SQUARES = 18;

//squares are used only by the frontend, backend deals with tasklist
let Square = function (taskId, taskName) {
    this.taskId = taskId
    this.taskName = taskName
}

let UIplayers = [];
let animationOn = false;
let addPlayerOn = false;
let hideAll = true;
let playerMove = false;

let pawnsCanvas = [];
let positions = [];
let selectedColor = 0;

let troot = trootCss();

let savedTasksets = new Array()
//              *** new toy ***
const PlayerButtonClick = (clickedPlayer) => {
    console.log(clickedPlayer.name + ' clicked!')
    showPlayerCss(clickedPlayer.color)

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

const OpenTasksInputModal = () => {
    const taskModal = document.createElement('dialog')

    const modalHeader = document.createElement('h2')
    modalHeader.textContent = 'Enter All Tasks'

    const modalForm = document.createElement('form')
    modalForm.setAttribute('method', 'dialog')

    const inputContainer = document.createElement('div')
    applyStylesToElement(inputContainer, {
        maxWidth: '50vw'
    });
    for (let i = 0; i<17 ; i++){
        const taskInputField = document.createElement('input')
        applyStylesToElement(taskInputField,{
            margin: '5px'
        })
        taskInputField.setAttribute('type','text')
        taskInputField.setAttribute('id',`${i}`)
        inputContainer.appendChild(taskInputField)
    }

    const submitContainer = document.createElement('div')
    const savedTasksetsDropdown = document.createElement('select')
    savedTasksetsDropdown.setAttribute('id','taskset-selector')
    const defaultOption = document.createElement('option')
    defaultOption.setAttribute('value','default')
    defaultOption.innerText='Choose...'
    savedTasksetsDropdown.appendChild(defaultOption)
    const testReturnedTasksets = savedTasksets
    savedTasksets.forEach(taskset => {
        const option = document.createElement('option')
        option.textContent = taskset.id
        savedTasksetsDropdown.appendChild(option)
    });
    const saveButton = document.createElement('button')
    saveButton.textContent = 'save and close'
    saveButton.onclick=(e)=>{
        e.preventDefault()
        const allTasksInput = document.querySelectorAll('input:not(#input-playername)')
        const selectValue = document.querySelector('select').value 
        let tasksArray = []
        if (selectValue==='default'){
            for (let i = 0; i < allTasksInput.length; i++){
                if (allTasksInput[i].value==='') {
                    alert('Please enter every tasks')
                    break
                }
                tasksArray.push(allTasksInput[i].value)
            }
            PushTaskset(tasksArray)
        }
        else {
            tasksArray=testReturnedTasksets.find(taskset => taskset.id === selectValue).tasks
        }
        if (tasksArray.length===17){
            SetTasks(tasksArray)
            CreateNewButton('Clear Board',()=> {
                WipeSessionHistory()
                ClearPlayersButtons()
                location.reload();
            })
            CreateNewButton('Roll Dice', () => {
                if (!animationOn) { //waiting time is nice
                    let player = DiceButtonHandler();
                    //console.log(player)
                    playerMove = true
                    update(player);
                }
            });
            const newGameButton = document.querySelector('.new-game-button')
            troot.removeChild(newGameButton)
            taskModal.close()
        }
    }
    const label = document.createElement('label')
    label.setAttribute('for','taskset-selector')
    label.textContent='Or choose an existing taskset: '
    submitContainer.appendChild(label)
    submitContainer.appendChild(savedTasksetsDropdown)
    submitContainer.appendChild(saveButton)

    modalForm.appendChild(inputContainer)
    modalForm.appendChild(submitContainer)
    taskModal.appendChild(modalHeader)
    taskModal.appendChild(modalForm)
    troot.appendChild(taskModal)

    taskModal.showModal()
}

const InitTable = () => {
    if (localStorage.getItem('players')||localStorage.getItem('tasks')){
        CreateNewButton('Clear Board',()=> {
            WipeSessionHistory()
            ClearPlayersButtons()
            location.reload();
        })
        CreateNewButton('Roll Dice', () => {
            if (!animationOn) { //waiting time is nice
                let player = DiceButtonHandler();
                //console.log(player)
                playerMove = true
                update(player);
            }
        });
    }
    else {
        GetAllTasksets().then(result =>{
            savedTasksets = result
            console.log('loaded tasksets');
        } )
        CreateNewButton('New game', () => {
            //playerOnCss(true);
            OpenTasksInputModal()
        });
    }
    
    

    let inputPlayerName = document.createElement('input')
    inputPlayerName.setAttribute('id', 'input-playername')

    let addPlayerbtn = CreateNewButton('', () => { // Add player
        if (!pawnColors[selectedColor][1]) { 
            let newPlayer = AddPlayer(inputPlayerName.value);
            const playerButton = document.querySelector(`.player-${newPlayer.id}`)
            playerButton.addEventListener('click', () => {
                hideAll = false;
                console.log("this playerbutton from NOT created from local storage")
                PlayerButtonClick(newPlayer);
                refreshTable(players[newPlayer.id]);
            });

            EditPlayerColor(selectedColor, newPlayer.id);
            //Create UIplayer
            addUIplayer(selectedColor, newPlayer.currentPos)

        }
        else {
            console.log("selected color " + selectedColor)
            alert("Color already picked")
        }
    });
    addPlayerbtn.setAttribute('id', 'addPlayer')

    

    drawTable();
    playerOnScreenCss();
    let addplayer = addPlayerdivCss();
    addplayer.appendChild(inputPlayerName)
    addplayer.appendChild(inputPlayerName)
    addplayer.appendChild(addPlayerbtn)
    LoadPlayerButtons()
    inputPlayerNameCss();


}
function getColourURL(colourId) {

    if (colourId >= 0 && colourId < pawnColors.length) {
        //console.log(pawnColors[[colourId][0]])
        return pawnColors[colourId][0];
    }
}

async function update(player) { //This starts the animation
    console.log(player)
    console.log("t.update")

    if (player != null) {

        if (!animationOn && player.currentPos !== aniCtrl.myDestination) {
            await showPlayerCss(player.color);
            //console.log(destinationSquare)
            animationOn = true;
            await UIplayers[player.color].sendPawn(destinationSquare);
            aniCtrl.myDestination = destinationSquare;
        }
        else {

        }
    }
}
function refreshUIplayers(localS) {
    if (localS.getItem('players')) {
        showPlayerCss(0);
        let myPlayers = JSON.parse(localS.getItem('players'));
        myPlayers.forEach(myPlayer => {

            //First hide everything
            previousPlayer = myPlayer.id
            addUIplayer(myPlayer.color, myPlayer.currentPos)

        });
    }
}
function refreshTable(player) {   
    let img = document.getElementById(0);
    img.src = "./images/Start.png"
    for (let i = 1; i < NUM_SQUARES; i++ ) {
        let img = document.getElementById(i);
        img.src = "./images/Kirja.png"
    }
    if (!hideAll && player != null) {
    player.history.forEach(move => {
        let img = document.getElementById(move);
        img.src = bookColors[player.color];
    });
    }
    loadColor();

}
function refreshAll() {
    refreshTable();
    showPlayerCss();

}
function addUIplayer(colorIndex,curpos) {
    let playerPawn = createUIPlayer(colorIndex)
    UIplayers[colorIndex] = playerPawn;
    pawnColors[colorIndex][1] = true;
    playerPawn.sendPawn(curpos);
}
// This draws the first frame of the spritesheet onto a canvas
//function addPawnCanvas() {
//    for (let i = 0; i < pawnColors.length; i++) {
        
//        let myCanvas = document.createElement('canvas');
//        myCanvas.width = aniCtrl.frameWidth * 0.25; // Half the original width
//        myCanvas.height = aniCtrl.frameHeight * 0.25; // Half the original height

//        myCanvas.addEventListener('click', function (event) {
//            selectedColor = i;

//        });

//        let context = myCanvas.getContext('2d');
//        let img = new Image();
//        img.src = getColourURL(i);

//        img.onload = function () {
//            context.drawImage(img, 0, 0, aniCtrl.frameWidth, aniCtrl.frameHeight, 0, 0, myCanvas.width, myCanvas.height);

//            document.body.appendChild(myCanvas);

//            // Store the canvas reference in both arrays
//            pawnsCanvas.push(myCanvas);
//            let addplayer = document.getElementById('addPlayerdiv')
//           // addplayer.appendChild(myCanvas)
//        };
//    }
//}

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
            img.setAttribute('id',squareIndex)
            //TODO: use the click event target index instead of image index
            img.addEventListener('click', (function (index) {
                return function () {
                    if (!animationOn) {
                        SquareClickHandler(index)
                        update(players[previousPlayer]);
                    }
                };
            })(squareIndex));
            squareIndex++;
            troot.appendChild(img);
        }
    }
}
function exitBigBook() {
    bigBookOnCss(false);


}
function appendPawnCanvas() {
    for (i = 0; i > pawnsCanvas.length; i++) {

    }
}
function start() {
    let localS = InitState()   
    InitTable()
    //append canvas
    //addPawnCanvas();
    refreshUIplayers(localS);
    bigBookCss();


}