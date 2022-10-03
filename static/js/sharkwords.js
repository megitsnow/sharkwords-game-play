const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numCorrect = 0;


const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;


const handleCorrectGuess = (letter, wordLength) => {
  let correctLetters = 0;
  const wordSpots = document.querySelectorAll(`.letter-box.${letter}`);
  for (const wordSpot of wordSpots) {
    wordSpot.innerHTML = letter;
    correctLetters += 1;
  }
  numCorrect+=correctLetters
  if (numCorrect === wordLength){
    document.querySelector("#win").style.display = "block";
  }


}  


const handleWrongGuess = () => {
  numWrong += 1;
  if (numWrong === 5){
    document.querySelector("#play-again").style.display = "block";
    const btns = document.querySelectorAll("button");
    document.body.style.backgroundImage = "url('/static/images/sharkattack.webp')";
    for (const btn of btns) {
      btn.disabled = true;
    }
  } else {
    document.querySelector("#shark-img img").src = `/static/images/guess${numWrong}.png`

  }
};


const resetGame = () => {
  window.location = '/sharkwords';
};


(function startGame() {
  const randomNum = parseInt(Math.floor(Math.random() * WORDS.length) + 1)
  const word = WORDS[randomNum]
  const wordLength = word.length;

  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
      button.addEventListener('click', (evt) => {
        const button = evt.target;
        console.log(button);
        if (isLetterInWord(button.innerHTML)) {
          handleCorrectGuess(button.innerHTML, wordLength);
        } else {
          handleWrongGuess();
        }
      });
  }

  document.querySelector('#play-again').addEventListener('click', resetGame)
  document.querySelector('#win').addEventListener('click', resetGame)

})();


