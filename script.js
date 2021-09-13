const cards = document.querySelectorAll('.memory-card');
let pairs = 12; // enter the number of cards here

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
  checkWin();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 600);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));

// when HTML document content is loaded shuffle the board
document.addEventListener('DOMContentLoaded', shuffle());

// Action : each time a pair is made check if there are no others left
function checkWin() {
  pairs--;
  if (pairs === 0) {
    cards.forEach(card => unflipCards);
    displayWin();
  }
}

// Action : display the winning menu
const cont = document.querySelector('.memory-game');
const winCont = document.querySelector('.win-screen');
function displayWin() {
  cont.style.display = 'none';
  winCont.style.display = 'block';
}