/*------------------------ Constants --------------------------------*/



/*----------------------Variables (state) ----------------------------*/
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
init()

function init() {
  board =[null, null, null, null, null, null, null, null, null]
  console.log(board)
  turn = 1
  winner = null
  render()
}

