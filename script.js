const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
const winnerMessageText = document.querySelector('[data-winning-message-text]')
const winnerMessageTextElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('winningMessage')

const cellElement = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')

let circleTurn 


const handlClick = (e) => {
    cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)

    // check winner
    if(checkWin(currentClass)){
        console.log('winner');
        endgame(false)
    }else if(isDraw()){
        endgame(true)
    }else{
        // Switch turns
        SwapTurn()
        setBoardHoverClass()
    }
    
}

const startGame = () => {
    circleTurn = false
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handlClick)
        cell.addEventListener('click', handlClick ,{once: true}
        )})
        
    setBoardHoverClass()
    winnerMessageTextElement.classList.remove('show')
}
    
startGame()
restartButton.addEventListener('click', startGame)

function endgame(draw){
    if(draw){
        winnerMessageText.innerText = 'Draw!'
    }else{
        winnerMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }

    winnerMessageTextElement.classList.add('show')
}

function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function SwapTurn(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })
}