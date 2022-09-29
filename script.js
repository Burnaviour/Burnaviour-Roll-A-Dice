'use strict';
//getting elemensts
let currentScore = 0;

let activePlayer = 0;
let playing = true;
let scores = [0, 0];

const activePlayer0EL = document.querySelector('.player--0');
const activePlayer1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHHold = document.querySelector('.btn--hold');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');

//
function reset() {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  diceEl.classList.add('hidden');
  if (
    document.querySelector(`.player--0`).classList.contains('player--winner')
  ) {
    document.querySelector(`.player--0`).classList.remove('player--winner');
  } else {
    document.querySelector(`.player--1`).classList.remove('player--winner');
  }
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  document.getElementById(`score--0`).textContent = scores[0];
  document.getElementById(`score--1`).textContent = scores[1];
  document.querySelector(`.player--0`).classList.add('player--active');
}
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer0EL.classList.toggle('player--active');
  activePlayer1EL.classList.toggle('player--active');
}
diceEl.classList.add('hidden');
score0EL.textContent = 0;
score1EL.textContent = 0;
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      console.log(activePlayer);
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 1000) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  reset();
});
