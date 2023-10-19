//Data handling functions
const PushTaskset = async(taskset) => {
    let taskService = await import('./services/tasks.js')
    return taskService.create({"tasks":taskset}) 
}
const GetAllTasksets = async () => {
    const tasksService=await import('./services/tasks.js')
    return tasksService.getAll()
}

//          ui.js stuff

// at InitTable() localStorage validation -> else
// GetAllTasksets().then(result =>{
//     savedTasksets = result
//     console.log('loaded');
// } )


let destinationSquare = "Not yet";
let tasks = [
];

let players = [];
let Player = function(name) {
    this.name = name
    this.currentPos = 0
    this.color=1
    this.id = players.length
    this.history = []
}
let currentPlayer = -1
let previousPlayer = -1

//use this to set tasks for the board
const SetTasks = (tasksList) => {
    const stringedTasks = JSON.stringify(tasksList)
    localStorage.setItem('tasks',stringedTasks)
    tasks=tasksList
    return localStorage.getItem('tasks')
}
const SetPlayers = (inputPlayers) => {
    const stringedPlayers = JSON.stringify(inputPlayers)
    localStorage.setItem('players',stringedPlayers)
    players = inputPlayers
    console.log(localStorage.getItem('players'));
    return localStorage.getItem('players')
}
const InitState = () => {
    if (localStorage.getItem('tasks')) 
        tasks = JSON.parse(localStorage.getItem('tasks'))
    if (localStorage.getItem('players'))

        players = JSON.parse(localStorage.getItem('players'))
    return localStorage
}
//right now only clears players
const WipeSessionHistory = () => {
    if (localStorage.getItem('players')||localStorage.getItem('tasks')) localStorage.clear()
    return true
}
const ClearPlayersButtons = () => {
    const allPlayerButtons = document.querySelectorAll('button[class^="player-"]')
    allPlayerButtons.forEach(button=> {
        document.querySelector('#maintable').removeChild(button)
    })
    console.log(allPlayerButtons);

}
const LoadPlayerButtons = () => {
    const allPlayerButtons = players.map(player => {
        let playerButton = CreateNewButton(player.name, () => SetCurrentPlayer(player));
        playerButton.setAttribute('class', 'player-' + player.id.toString())
        const addedPlayerButton = document.querySelector(`.player-${player.id}`)
        addedPlayerButton.addEventListener('click', () => {
            console.log("this playerbutton from created from local storage")
            hideAll = false;
            refreshTable(players[player.id]);
            PlayerButtonClick(player);
        });

        return addedPlayerButton
    })
    return allPlayerButtons;
}

const FindImageById = (id) => document.getElementById(id)
const PlayerMove = (destination) => {
    players[currentPlayer].currentPos = destination
    players[currentPlayer].history.push(destination)
    SetPlayers(players)
}
const IsMovable = () => currentPlayer === -1 ? false : true
const DiceButtonHandler = () => {
    try {
        if (!IsMovable()) {
            console.log('A player must be chosen first, then move');
            return
        }
        const rolledDice = RollDiceOnce()
        if (players[currentPlayer].currentPos+rolledDice<=17)
            PlayerMove(players[currentPlayer].currentPos + rolledDice)
        else {
            PlayerMove(rolledDice-(17 - players[currentPlayer].currentPos))
            console.log(rolledDice);
        }
        //Here adjust images atributes to include player
        const foundImg = FindImageById(players[currentPlayer].currentPos)
        foundImg.src = "./images/Kirja.png"
        destinationSquare = players[currentPlayer].currentPos
        previousPlayer = currentPlayer
        currentPlayer = -1

        return players[previousPlayer]
    } catch (error) {
        if (players.length == 0)
            console.log('Add A Player First')
    }
}
const SquareClickHandler = (index) => {
    try {
        if (!IsMovable()) {
            console.log('A player must be chosen first, then move');
            return
        }
        else if (index===0) {
            console.log('Not allowed to move to starting position');
            return
        }
        PlayerMove(index)
        //Here adjust images atributes to include player
        const foundImg = FindImageById(players[currentPlayer].currentPos)
        foundImg.src = 'Player_1.png'
        destinationSquare = players[currentPlayer].currentPos
        previousPlayer = currentPlayer
        currentPlayer = -1
        playerMove = true
        refreshTable(players[previousPlayer.id]);


        return players[currentPlayer].currentPos
    } catch (error) {
        if (players.length == 0)
            console.log('Add A Player First')
    }
}
const CreateNewButton = (buttonName, func) => {
    const maintable = document.getElementById("maintable");
    let aNewButton = document.createElement('button')
    aNewButton.textContent=buttonName
    const buttonClassName = buttonName.toLowerCase().replace(' ','-').concat('-button')
    aNewButton.setAttribute('class',buttonClassName.toString())
    aNewButton.onclick = func
    maintable.appendChild(aNewButton)
    return aNewButton
}

const RollDiceOnce = () => Math.round(Math.random()*5+1)

const AddPlayer = (name) => {
    const newPlayer = new Player(name)
    players.push(newPlayer)
    const newPlayerButton = CreateNewButton(newPlayer.name,()=>SetCurrentPlayer(newPlayer));
    newPlayerButton.setAttribute('class','player-'+newPlayer.id.toString())

    const inputPlayerName = document.querySelector('#input-playername')
    inputPlayerName.value=null
    SetPlayers(players)
    return newPlayer
}

const SetCurrentPlayer = (playerObj) => {
    currentPlayer = playerObj.id
}

const EditPlayerColor = (colorNumber, playerId) => {

    players[playerId].color=colorNumber
}
const GetPlayerHistoryById = (playerId) => players[playerId].history
// move-in-turn won't be implemented
// const IsAllPlayed = () => {
//     let allHasPlayed =true
//     players.forEach(player => {
//         if(player.currentPos===0) allHasPlayed = false
//     });
//     return allHasPlayed
// }
