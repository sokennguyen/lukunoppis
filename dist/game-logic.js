//NOTE: for discussion
let destinationSquare = "Not yet";
let tasks = [
    "Kävellen kirjastoon lainaamaan.",
    "Kuuntele äänikirjaa.",
    "Esittele lempi satukirjasi.",
    "Siivoa kirjahyllysi.",
    "Tutustu tietokisjaan.",
    "Lue majassa.",
    "Lue ja venettyle samalla.",
    "Etsi ja kuuntele kuunnelma.",
    "Lue ääneen toisille.",
    "Lue eläinsatu.",
    "Kierätä tarpeetomat kirjat.",
    "Pyydä joku lukemaan sinulle.",
    "Lue ystävyydestä.",
    "Lainaa kaverilta luettavaa.",
    "Lue tosi oudossa paikassa.",
    "Lue runo. Lähetä runo ääniviestinä tutullesi.",
    "Etsi tietoa kiinostavasta aiheesta."
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

const DbTrial = async() => {
    let taskService = await import('./services/tasks.js')
    return taskService.create({"tasks":tasks}) 
}

//use this to set tasks for the board
const SetTasks = (tasksList) => {
    //this function will handle saving tasks to DB
    tasks=tasksList
    return tasks
}
const FindImageById = (id) => document.getElementById(id)
const PlayerMove = (destination) => {
    players[currentPlayer].currentPos = destination
    players[currentPlayer].history.push(destination)
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
        foundImg.src = 'Player_1.png'
        destinationSquare = players[currentPlayer].currentPos
        previousPlayer = currentPlayer
        currentPlayer = -1

        return players[currentPlayer].currentPos
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
    return newPlayer
}

const SetCurrentPlayer = (playerObj) => {
    currentPlayer = playerObj.id
    //TODO: highlight the clicked button 
    //TODO: switch board view to currentPlayer view (load their history)
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
