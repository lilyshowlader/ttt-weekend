/*------------------------ Constants --------------------------------*/



/*----------------------Variables (state) --------------------------*/
// Step 1 - Define the required variables used to track the state of the game
// 1a) Use a variable named `board` to represent the state of the squares on
//    the board.
// 1b) Use a variable named `turn` to track whose turn it is.
// 1c) Use a variable named `winner` to represent if anyone has won yet, or 
// if a tie has occurred.
let board, turn, winner


/*------------------------ Cached Element References ----------------*/
// Step 2 - Store cached element references
// 2a) In a constant called `squareEls`, store the nine elements 
//    representing the squares on the page.
// 2b) In a constant called `messageEl`, store the element that displays the 
//    game's status on the page.

const squareEls = document.querySelectorAll(".board > div")
console.log(squareEls)
const messageEl = document.querySelector("#message")
console.log(messageEl)

/*--------------------------- Event Listeners -----------------------*/



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

// 4b) Loop over `board` and for each element:
// - Use the current index of the iteration to access the corresponding 
// square in the `squareEls` array.
// - Style that square however you wish, dependent on the value  
// contained in the current cell being iterated over (`-1`, `1`, or
//       `null`).  
// 4c) Render a message based on the current game state:
// If winner has a value of `null` (meaning the game is still in
// progress), render whose turn it is.
// - If `winner` is equal to `'T'` (tie), render a tie message.
// - Otherwise, render a congratulatory message to the player that has 
// won.

function render() {
  board.forEach(function(square,idx) {
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
      messageEl.textContent = "It's player ones turn"
    } else {
      messageEl.textContent = "It's player twos turn"
    }
    // display who's turn it is
  } else if (winner === 'T') {
    messageEl.textContent = "It is a tie!"
  } else {
    messageEl.textContent = "Congrats, you won!"
  }
}


