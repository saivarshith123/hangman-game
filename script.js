const words = ["apple", "banana", "cherry", "orange", "grapes"];
let word = "";
let guessedLetters = [];
let attempts = 6;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function updateDisplay() {
  const wordDisplay = document.getElementById("wordDisplay");
  wordDisplay.innerText = word
    .split("")
    .map(letter => guessedLetters.includes(letter) ? letter : "_")
    .join(" ");

  document.getElementById("guessedLetters").innerText = guessedLetters.length ? guessedLetters.join(", ") : "None";
  document.getElementById("attemptsLeft").innerText = attempts;
}

function guessLetter() {
  const input = document.getElementById("letterInput");
  const letter = input.value.toLowerCase();

  if (!letter || !/[a-z]/.test(letter) || guessedLetters.includes(letter)) {
    input.value = "";
    return;
  }

  guessedLetters.push(letter);

  if (!word.includes(letter)) {
    attempts--;
  }

  updateDisplay();
  checkGameStatus();
  input.value = "";
}

function checkGameStatus() {
  const result = document.getElementById("resultMessage");

  if (word.split("").every(letter => guessedLetters.includes(letter))) {
    result.textContent = "🎉 You won!";
    disableInput();
  } else if (attempts <= 0) {
    result.textContent = `💀 You lost! The word was "${word}".`;
    disableInput();
  }
}

function disableInput() {
  document.getElementById("letterInput").disabled = true;
}

function resetGame() {
  word = getRandomWord();
  guessedLetters = [];
  attempts = 6;
  document.getElementById("letterInput").disabled = false;
  document.getElementById("resultMessage").textContent = "";
  updateDisplay();
}

resetGame();

document.getElementById("letterInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") guessLetter();
});
