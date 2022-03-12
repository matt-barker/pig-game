'use strict';

// Selecting elements
const player0EL = document.querySelector('.player--0'),
  player1EL = document.querySelector('.player--1'),
  score0El = document.getElementById('score--0'),
  score1El = document.getElementById('score--1'),
  diceEl = document.querySelector('.dice'),
  btnNew = document.querySelector('.btn--new'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  current0El = document.getElementById('current--0'),
  current1El = document.getElementById('current--1');

// Starting conditions

let currentScore = 0,
  activePlayer = 0,
  playing = true,
  scores = [0, 0];

const resetScores = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0EL.classList.add('player--active');
};

resetScores();

const newGame = function () {
  resetScores();
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--active', 'player--winner');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for a rolled 1: if true,
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if score is >= 100
    //finish game
    if (scores[activePlayer] >= 20) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  console.log('new game');
  newGame();
});
