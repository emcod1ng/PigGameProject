'use strict';
// scores
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curentScore0El = document.getElementById('current--0');
const curentScore1El = document.getElementById('current--1');

// Players:
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerName0El = document.getElementById('name--0');
const playerName1El = document.getElementById('name--1');

// btns:
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Dice:
const diceEl = document.querySelector('.dice');

// PLAYER NAMES:
// let player1 = prompt('Player 1:');
// let player2 = prompt('Player 2:');
let player1 = 'Asmir';
let player2 = 'Emir';

// DEFINISANE VARIJABLE KOJE CEMO KORISTI U PROJEKTU:
let scores, curentScore, playing, activePlayer, win;
let winnerScores = [0, 0];

const init = function () {
  // reset:
  scores = [0, 0];
  curentScore = 0;
  activePlayer = 0;
  playing = true;
  win = 0;

  // reset elements:
  score0El.textContent = 0;
  score1El.textContent = 0;
  curentScore0El.textContent = 0;
  curentScore1El.textContent = 0;

  // Dice hidden:
  diceEl.classList.add('hidden');

  //Show buttons roll and hold
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');

  //back active class and remove winner class:
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // back and player name:
  playerName0El.textContent = player1;
  playerName1El.textContent = player2;
};

init();

// PROMENITI IGRACA:
const switchPlayer = function () {
  // POSTAVITI 'currentScore' NA 0:
  curentScore = 0;
  // PRIKAZATI DINAMICNO NA APP currentScore:
  document.getElementById(`current--${activePlayer}`).textContent = curentScore;

  // FUNKCIONALNOST: DA PROMENIMO AKTIVNOG PLAYER-a AKO JE BIO 0 NA 1 ili SUPROTNO:
  // activePlayer === 0 ? 1: 0;  TERNARNI OPERATOR - SKRACENI OBLIK IF-ELSE
  // USLOV: activePlayer === 0
  // ? 1 - TACNO
  // : 0 - NETACNO
  activePlayer = activePlayer === 0 ? 1 : 0;

  // KORSTICEMO TOGGLE UGRADJENU KLASU ZA DODAVANJE/UKIDANJE AKTIVNE KLASE:
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLL BTN:
btnRoll.addEventListener('click', function () {
  // console.log('radi!'); // RADI!

  // AKO JE IGRA U TOKU: (IGRA MOZE BITI U TOKU SAMO AKO SE IGRA TJ AKO NIJE WIN SITUACIJA BILA.)
  if (playing) {
    // NAPRAVITI BROJ OD 1-6
    const randomNum = Math.trunc(Math.random() * 6 + 1);
    console.log(randomNum);

    // PRIKAZATI SLIKU:
    diceEl.classList.remove('hidden');

    //PRIKAZATI DINAMICNO SLIKU NA OSNOVU BROJA KOJI RADNOM PADA: `img/dice-${dice}.png`
    diceEl.src = `img/dice-${randomNum}.png`;

    // AKO NIJE 1 ONDA JE DOBRO - SABRATI SVE BROJEVE U currentScore:
    if (randomNum !== 1) {
      // DODATI TRENUTNI RANDOMNUM NA CURRENTSCORE:
      curentScore += randomNum;

      // PRIKAZATI DINAMICNO KOLIKO JE currentScore NA APP:
      document.getElementById(`current--${activePlayer}`).textContent =
        curentScore;
      // ELSE ZA NIJE DOBRO: (AKO PADNE BROJ 1.)
    } else {
      // POZVATI F-JU 'switchPlayer'
      switchPlayer();
    }
  }
});

// // HOLD BTN:
// btnHold.addEventListener('click', function () {
//   // console.log('radi?');

//   // AKO JE IGRA U TOKU:
//   if (playing) {
//     //Task 1:
//     //Dodati trenutni rezultat u scores[] ( nasu bazu za poene )
//     scores[activePlayer] += curentScore;

//     //Task 2:
//     //Prikazati taj rezultat i na UI:
//     document.getElementById(`score--${activePlayer}`).textContent =
//       scores[activePlayer];

//     //Task 3:
//     //ako je rezultat >= 15 onda:
//     if (scores[activePlayer] >= 100) {
//       //1) prekini igru
//       playing = false;

//       //2) ispisi ko je pobedio: 'WINNER!'
//       document.getElementById(`name--${activePlayer}`).textContent = `${
//         activePlayer === 0 ? 'Asmir' : 'Emir'
//       } is WINNER`;

//       //3)Uvecaj jednu pobedu za 1  i 4) Dodaj je na ukupnim pobedama 'winScores'
//       winnerScores[activePlayer] += ++win;

//       //4) Prikazi tu pobedu gore u 'TOTAL WIN: 0'
//       document.getElementById(
//         `win--${activePlayer}`
//       ).textContent = `TOTAL WIN: ${winnerScores[activePlayer]}`;

//       //5) Dodaj pobedniku klasu 'player--winner'
//       document
//         .querySelector(`.player--${activePlayer}`)
//         .classList.add('player--winner');

//       //6) Sakrij roll,hold i sliku
//       btnRoll.classList.add('hidden');
//       btnHold.classList.add('hidden');
//       diceEl.classList.add('hidden');
//     } else {
//       switchPlayer();
//     }
//   }
// });

// EMIR:
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += curentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 5) {
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent = `WINNER!`;
      winnerScores[activePlayer] += ++win;
      document.getElementById(
        `win--${activePlayer}`
      ).textContent = `Total win: ${winnerScores[activePlayer]}`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// BTN NEW:
btnNew.addEventListener('click', init);
