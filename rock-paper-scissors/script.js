/* eslint-disable no-undef */
// Row i is the player move. Column j is the computer move.
// Index 0 is Rock, 1 is Paper, 2 is Scissors.
// Ex. winner[0][1] = CPU_WIN : Player plays Rock. Computer plays Paper. Computer wins.
const TIE = 0;
const PLAYER_WIN = 1;
const CPU_WIN = 2;
const WINNER = [
  [TIE, CPU_WIN, PLAYER_WIN],
  [PLAYER_WIN, TIE, CPU_WIN],
  [CPU_WIN, PLAYER_WIN, TIE],
];
function computerPlay() {
  return Math.floor(Math.random() * (3 - 0) + 0);
}
// function getUserInput() {
//   const selection = prompt('Play a move:').toLowerCase();
//   if (selection === 'rock') {
//     return 0;
//   }
//   if (selection === 'paper') {
//     return 1;
//   }
//   if (selection === 'scissors') {
//     return 2;
//   }
//   alert('Not a valid move. Move must be either Rock, Paper, or Scissors.');
//   return getUserInput();
// }

function playRound(playerSelection, computerSelection) {
  return WINNER[playerSelection][computerSelection];
}
// function game(numRounds) {
//   let playerSelection;
//   let computerSelection;
//   let numRoundsPlayerWon = 0;
//   for (let i = 0; i < numRounds; i++) {
//     playerSelection = getUserInput();
//     computerSelection = computerPlay();
//     roundScore = playRound(playerSelection,computerSelection);
//     if (roundScore === 1) {
//       numRoundsPlayerWon++;
//     }
//     else if (roundScore === 2) {
//       numRoundsPlayerWon--;
//     }
//   }
//   if (numRoundsPlayerWon > 0) {
//     return `You won the Best of ${numRounds}!`;
//   }
//   if (numRoundsPlayerWon === 0) {
//     return 'Tie!';
//   }
//   return `You lost the Best of ${numRounds}!`;
// }
function convertNumToMove(num) {
  if (num === 0) {
    return 'Rock';
  }
  if (num === 1) {
    return 'Paper';
  }
  if (num === 2) {
    return 'Scissors';
  }
  return 'Error';
}
const buttons = document.querySelectorAll('button');
let selection;
let playerScore = 0;
let cpuScore = 0;
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    selection = button.getAttribute('class');
    if (selection === 'rock') {
      selection = 0;
    } else if (selection === 'paper') {
      selection = 1;
    } else if (selection === 'scissors') {
      selection = 2;
    }
    cpuSelection = computerPlay();
    const winner = playRound(selection, cpuSelection);
    if (winner === PLAYER_WIN) {
      playerScore += 1;
      document.querySelector('#player-score').textContent = playerScore;
    } else if (winner === CPU_WIN) {
      cpuScore += 1;
      document.querySelector('#cpu-score').textContent = cpuScore;
    }
    const playerMove = document.querySelector('#player-move');
    playerMove.textContent = convertNumToMove(selection);
    const cpuMove = document.querySelector('#cpu-move');
    cpuMove.textContent = convertNumToMove(cpuSelection);
  });
});
