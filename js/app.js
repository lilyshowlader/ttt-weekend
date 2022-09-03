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
// whatever we need to track over the course of the game that will change 
// Step 1 - Define the required variables used to track the state of the game
// 1a) Use a variable named `board` to represent the state of the squares on the board.
// 1b) Use a variable named `turn` to track whose turn it is.
// 1c) Use a variable named `winner` to represent if anyone has won yet, or if a tie has occurred.
let board, turn, winner

// board is reffering to all the squares on the tic tac toe board. the state of the squares will change depending on who is clicking on what. 
// turn will also be changing because there are two players, X and O (1 & -1)
// winner will be a boolean - this will also change
// if you think about it - everytime a user clicks on something - these variables will change 

/*------------------------ Cached Element References ----------------*/
// Step 2 - Store cached element references
// 2a) In a constant called `squareEls`, store the nine elements 
//    representing the squares on the page.
// 2b) In a constant called `messageEl`, store the element that displays the 
//    game's status on the page.

// Keep in mind, any items passed into querySelector, querySelectorAll, and getElementById must be in string-format 
// everything that you put in your cached element references gives you access to your HTML
const squareEls = document.querySelectorAll(".board > div")
console.log(squareEls)
// above we are using the child selector to access all of the divs which contain the squares 
const messageEl = document.querySelector("#message")
console.log(messageEl)
// the message element disp lays the message for who's turn it is or who has won 
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset-button')



/*--------------------------- Event Listeners -----------------------*/
//Syntax for addEventListener - element.addEventListener(event, function)
boardEl.addEventListener('click', handleClick) 
// the eventlistener was added to the "Bigger picture element" which is the board and not to the squares, since squares are a nodeList because the squares are added in the HTML and not Javascript. We didn't add an eventListener to squareEls because squareEls is a node list. 
// the action is click. the click can be enter, or up arrow or mouse click. above event listener is passing an event object to the handleClick function. we're saying when someone clicks on the board, the handleClick function executes. 
// we are using ONE event listener to one element instead of 9 because we are taking advantage of bubbling. with bubbling - we can add an event listener to a top level object, and it can access the individual elements that are nested in the parent element 
resetBtnEl.addEventListener('click', init)
// reset button element is the big picture when function/action click is done, the initialization function happens// you invoke the init function when clicking on the reset button 

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

// the beginning settings of the game 
// the first thing you want to do is set up an initilization function. 
// this is what the website will look like initially
// the board is filled with nulls because when you first start the game, the board is empty
// the turn is set to 1 because the first player is player X and one is equal to X
// the winner is null because there is no winner yet
// render is an update to the page (we need to add a render function)
init()

function init() {
  board =[
    null, null, null, 
    null, null, null,
    null, null, null]
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
  console.log(evt.target)
  // Convert the ID sq string into a usable number
  // the first thing we want to do is grab the index of whatever square was clicked by the user, which contains the DIV ids, then we need to change the string to a number, which represents the square in number form
  // below we are targeting the ID, accessing the 2nd index of the string (which is the number we want) and then using parse int to convert the string into a number
  // When a user clicks on one of the divs(squares), we can figure out which square it was by:
    // finding the ID on evt.target
    // that ID from the div should correspond with the appropriate element in the board array 
    
  let sqIdx = parseInt(evt.target.id[2])
// the sqIdx represents two things. 1 - the square ID in HTML and the position in the board state variable 
  if (isNaN(sqIdx)) {
  // if a user clicks on something BESIDES a board square (but within the board section/space) we don't want that to affect the game. So we return, which moves this function forward. (moves on)
    return 
  }
  if (winner) {
    return
  // we are saying if there is a winner, the game should be stopped at that point 
  }
  if (board[sqIdx]) {
    return 
  // above we are saying in a square on the board is occupied, that square should not be able to be clicked on again/ we need to get out of step
  }
  // below, depending on what square is clicked, that determines who's turn it is or who's turn it is next
  board[sqIdx] = turn 
  // when the line of code below runs, the turn will update by multiplying by -1. In the initialization function, turn is equal to 1 which represents X (X goes first). When a user clicks on the next square, this handleClick function will run, and update the value of turn (by multiplying by negative one) which would update turn to -1 (0). The line below is how the player switches from X to O. 
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


// We track changes with state variables and reflect those changes to our users with the render (display) function 
// Make a change to state -> call upon render/display function  so that the changes are visible in the browser (HTML)
// When we need to make further changes in the game, we should always rely on the information in state (Javascript), and not make any evaluations based on the appearance of our HTML

// the render function runs every single time a move is made 
// we're gonna be accessing our state variables and manipulating the HTML based on our state variables
// in reference to board: we are referencing the board in the HTML, to manipulate that data based on the following if else statement 
// accessing the board tells us where we are putting an X or O or if its blank
// the value is stored inside board and through RENDER it grabs the value to store in the corresponding HTML 

// the idx refers to the corresponding square in the square
// board is my map and square idx is Missouri 
// after the board is updated, we need to look at the board as a whole
// the square is only holding three options of data, either blank x or O. that is all that square does but the board monitors all of the individual squares. 




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
// below // after we render, we need to check if the game is still going on, thats why we need to check if a winner has been set
// below displays who's turn it is if the game is still going
  if (winner === null) {
    if(turn === 1) {
      messageEl.textContent = "Player One- Time to play!"
    } else {
      messageEl.textContent = "Player Two- Time to play!"
    }
    // below, if the game is finished, we are setting the message to either its a tie or congratulating player one or two won
  } else if (winner === 'T') {
    messageEl.textContent = "It's a tie!"
  } else if (winner === 1) {
    messageEl.textContent = "Congrats Player One, You Won!"
    } else if (winner === -1)
    messageEl.textContent = "Congrats Player Two, You Won!"
}
  


