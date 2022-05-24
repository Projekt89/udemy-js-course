'use strict';

// buttons
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// render elements
const dice = document.querySelector('.dice');
const scoreP1 = document.querySelector('#score--0');
const pointsOnHoldP1 = document.querySelector('#current--0');
const scoreP2 = document.querySelector('#score--1');
const pointsOnHoldP2 = document.querySelector('#current--1');
const editNameBtns = document.querySelectorAll('.edit-btn');

// PREPARE GAME SCREEN AND COMMON FUNCTIONS
dice.classList.add('hidden');
rollBtn.setAttribute('disabled', '');
holdBtn.setAttribute('disabled', '');

const renderUpdate = reset => {
  scoreP1.textContent = reset ? 0 : player1.score;
  scoreP2.textContent = reset ? 0 : player2.score;
  pointsOnHoldP1.textContent = reset ? 0 : player1.hold;
  pointsOnHoldP2.textContent = reset ? 0 : player2.hold;
};

const switchPlayer = () => {
  currentPlayer
    ? currentPlayer.element.parentNode.classList.remove('player--active')
    : null;
  currentPlayer =
    currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  currentPlayer.element.parentNode.classList.add('player--active');
};

const changeName = e => {
  const modal = document.querySelector('.edit-name-container');
  const overlay = document.querySelector('.overlay');
  const input = document.querySelector('.new-name');
  const confirm = document.querySelector('.btn--modal');
  let newName = '';
  input.value = newName;

  const validateNameChange = () => {
    if (newName === '') return;

    if (e.target.parentNode.id === player1.element.id) {
      player1.name = newName;
      e.target.nextElementSibling.textContent = player1.name;
    } else {
      player2.name = newName;
      e.target.previousElementSibling.textContent = player2.name;
    }
  };

  modal.classList.remove('hidden');
  input.focus();

  input.onkeyup = () => {
    newName = input.value;
  };

  //cases in which modal gets hidden
  //confirm change name
  confirm.onclick = () => {
    validateNameChange();
    modal.classList.add('hidden');
  };

  //cancel name change
  overlay.onclick = () => {
    modal.classList.add('hidden');
  };

  window.onkeydown = e => {
    if (e.key === 'Enter') {
      validateNameChange();
      modal.classList.add('hidden');
    }
    if (e.key === 'Escape') modal.classList.add('hidden');
  };
};

// PREPARE PLAYERS
class Player {
  constructor(name, element) {
    this.name = name;
    this.element = element;
    score: 0;
    hold: 0;
  }
  changeName(name) {
    this.name = name;
  }
  updateScore(score) {
    this.score = score;
  }
  updateHold(hold) {
    this.hold = hold;
  }
  reset() {
    this.score = 0;
    this.hold = 0;
    this.element.parentNode.classList.remove(
      'player--winner',
      'player--active'
    );
  }
}

const player1 = new Player('Player 1', document.querySelector('#name--0'));
const player2 = new Player('Player 2', document.querySelector('#name--1'));
let currentPlayer;

// GAME LOGIC STAGES  //

// NEW GAME
const initalizeGame = () => {
  //render update
  dice.classList.remove('hidden');
  editNameBtns.forEach(btn => btn.classList.add('hidden'));
  rollBtn.removeAttribute('disabled');
  holdBtn.removeAttribute('disabled');
  renderUpdate(true);
  // player update
  player1.reset();
  player2.reset();
  currentPlayer = false;
  switchPlayer();
};

// DURING GAME
const rollDice = () => {
  const roll = Math.ceil(Math.random() * 6);
  dice.src = `dice-${roll}.png`;
  resolveRoll(roll);
  //render update
  renderUpdate();
};

const resolveRoll = points => {
  if (points === 1) {
    currentPlayer.updateHold(0);
    switchPlayer();
  } else {
    currentPlayer.updateHold(currentPlayer.hold + points);
  }
};

const updateScore = () => {
  currentPlayer.updateScore(currentPlayer.score + currentPlayer.hold);
  currentPlayer.updateHold(0);
  renderUpdate();

  if (checIsfWinner()) {
    rollBtn.setAttribute('disabled', '');
    holdBtn.setAttribute('disabled', '');
    return;
  }
  switchPlayer();
};

// END GAME
const checIsfWinner = () => {
  if (currentPlayer.score >= 100) {
    currentPlayer.element.parentNode.classList.add('player--winner');
    return true;
  }
};

// GAME CONTROLS
newGameBtn.addEventListener('click', initalizeGame);
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', updateScore);
editNameBtns.forEach(btn => btn.addEventListener('click', changeName));
