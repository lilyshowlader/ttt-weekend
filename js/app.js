/*------------------------ Constants --------------------------------*/
//A constant's value does not change and remains constant indefinitely
// Step 5 - Define the required constants
// 5a) In a constant called `winningCombos` define the eight possible winning combinations as an array of arrays.

const winningCombos = [
  [0, 1, 2],[3, 4, 5],[6, 7, 8],
  [0, 3, 6],[1, 4, 7],[2, 5, 8],
  [0, 4, 8],[2, 4, 6]
];

console.log(winningCombos)
/*----------------------Variables (state) --------------------------*/
// variable, on the other hand, alters its value according to the equation

// Step 1 - Define the required variables used to track the state of the game
// 1a) Use a variable named `board` to represent the state of the squares on the board.
// 1b) Use a variable named `turn` to track whose turn it is.
// 1c) Use a variable named `winner` to represent if anyone has won yet, or if a tie has occurred.
let board, turn, winner


/*------------------------ Cached Element References ----------------*/
// Step 2 - Store cached element references
// 2a) In a constant called `squareEls`, store the nine elements 
//    representing the squares on the page.
// 2b) In a constant called `messageEl`, store the element that displays the 
//    game's status on the page.

//Question - why did we select the class and not the section?
const squareEls = document.querySelectorAll(".board > div")
console.log(squareEls)
const messageEl = document.querySelector("#message")
console.log(messageEl)
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset-button')

/*--------------------------- Event Listeners -----------------------*/

boardEl.addEventListener('click', handleClick) 
resetBtnEl.addEventListener('click', init)

/*------------------------------ Functions --------------------------*/
// Step 3 - Upon loading, the game state should be initialized, and a function 
// should be called to render this game state
// 3a) Create a function called `init`.
// 3b) Call this `init` function when the app loads.
// 3c) Set the `board` variable to an array containing nine `null`s to 
//    represent empty squares.
// 3d) Set the `turn` to `1` - which will represent player X.
// 3e) Set the `winner` to `null`.
// 3f) Call a function called `render` at the end of the `init` function.
init()

function init() {
  board =[null, null, null, null, null, null, null, null, null]
  console.log(board)
  turn = 1
  winner = null
  render()
}

// Step 6A-6H within the handleClick function 
// Step 6d: this step we're only creating return statements for two events: One is if the winner value is 1(x) or -1(o), we will return nothing. The other event is if there is a value in the sqidx (other player can't access the square and override the value) ex. [1, null, null, null, null, null, null, null, null]
// we're setting this up so that in these two events nothing will happen
// handleClick
function handleClick(evt) {
  let sqIdx = parseInt(evt.target.id[2])
  console.log(sqIdx)
  if (!sqIdx && sqIdx !== 0) {
    return 
  }
  if (winner) {
    return
  }
  if (board[sqIdx]) {
    return 
  }
  board[sqIdx] = turn 
  turn = turn * -1 
  winner = getWinner()
  render()
}


//if (/=== 1 || winner === -1 || winner === 'T') (alternative to if(winner))
// this functions runs after everytime someone makes a move 

function getWinner() {
  let bestCombo = []
  winningCombos.forEach(function(combo){
    //combo //combo will look like [0,1,2]
    // let comboValue = 0
    let comboValue = board[combo[0]] + board[combo[1]] + board[combo[2]]
    bestCombo.push(Math.abs(comboValue))
  }) 
    let winnersCombo = bestCombo.some(function(value){
      return value === 3
    })
    if (winnersCombo === true) {
      return turn * -1
    } else if (!board.some(function(value){return value === null})){
      return 'T'
    }
      return null
    
    
}

// Step 4 - The state of the game should be displayed to the user. We typed out a function named render above - we now have to define what our render function does. 
// 4a) Create a function called render
// 4b) Loop over `board` and for each element (use forEach):
// - Use the current index of the iteration to access the corresponding square in the `squareEls` array (these are the parameters).
// - Style that square however you wish, dependent (IF) on the value contained in the current cell being iterated over (`-1`, `1` , or null`).  
// 4c) Display/Render a message based on the current game state:
// - If winner has a value of `null` (meaning the game is still in progress), render whose turn it is.
// - If `winner` is equal to `'T'` (tie), render/display a tie message.
// - Otherwise, render/display a congratulatory message to the player that has won.

function render() {
  board.forEach(function(square, idx) {
  // check if square is 1, -1 or null
  // if 1 set the element at idx of squareElse to x
  // if -1 set the element at idx of squareEls to 0
  // if null, set the element at idx of squareElse to empty
    if (square === 1) {
      squareEls[idx].textContent = 'X'
    } else if (square === -1) {
      squareEls[idx].textContent = '0'
    } else {
      squareEls[idx].textContent = ''
    }
  })
  if (winner === null) {
    if(turn === 1) {
      messageEl.textContent = "Player One- Time to play!"
    } else {
      messageEl.textContent = "Player Two- Time to play!"
    }
    // the above displays who's turn it is
  } else if (winner === 'T') {
    messageEl.textContent = "It's a tie!"
  } else if (winner === 1) {
    messageEl.textContent = "Congrats Player One, You Won!"
    } else if (winner === -1)
    messageEl.textContent = "Congrats Player Two, You Won!"
}
  


