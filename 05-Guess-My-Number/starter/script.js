'use strict';

//render elements
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const body = document.querySelector('body');
//input
const guessInput = document.querySelector('.guess');
//buttons
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const resetScoreBtn = document.querySelector('.resetScore');
//prepare the game
let solution, scoreCount, pastGuesses;
const numberOfRounds = 10;

const initializeGame = () => {
  solution = Math.floor(Math.random() * 51);
  pastGuesses = [];
  scoreCount = numberOfRounds;
  score.textContent = scoreCount;
};

const displayMessage = text => {
  message.textContent = text;
};

checkBtn.addEventListener('click', e => {
  const guess = guessInput.value !== '' ? Number(guessInput.value) : false;

  // guess validation
  if (!guess && guess !== 0) {
    displayMessage('👈 Type in a number');
    return;
  }

  if (guess < 0 || guess > 50) {
    displayMessage('Number has to be between 0 and 50 😅');
    return;
  }

  if (pastGuesses.indexOf(guess) !== -1) {
    displayMessage("You've checked that number allready 🙃");
    return;
  }

  // win check
  if (guess === solution) {
    displayMessage('You have won! 🏆');
    number.textContent = guess;
    number.style.width = '30rem';
    body.style.backgroundColor = '#60b347';
    if (Number(score.textContent) > Number(highscore.textContent)) {
      highscore.textContent = score.textContent;
    }
    return;
  } else {
    guess > solution
      ? displayMessage('To High... ')
      : displayMessage('To Low... ');
  }

  pastGuesses.push(guess);
  scoreCount--;
  score.textContent = scoreCount;

  if (scoreCount === 0) {
    displayMessage("You've lost (╯°□°）╯︵ ┻━┻");
    return;
  }
});

againBtn.addEventListener('click', () => {
  solution = Math.floor(Math.random() * 21);
  displayMessage('Start guessing...');
  scoreCount = numberOfRounds;
  score.textContent = scoreCount;
  guessInput.value = null;
  number.textContent = '?';
  number.style = '';
  body.style = '';
  pastGuesses = [];
});

resetScoreBtn.addEventListener('click', () => {
  highscore.textContent = 0;
});

initializeGame();
