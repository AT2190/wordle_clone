// The secret word to guess
const word = "PLANT";

// Track which guess row we're on (0 = first row)
let currentRow = 0;

// Track the current word being typed
let currentGuess = "";

// Reference to the board in HTML
const board = document.getElementById("game-board");

// --- Create the grid (6 rows x 5 tiles) ---
for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.className = "row"; // style it as a row

  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "tile"; // style it as a tile
    row.appendChild(tile); // add tile to the row
  }

  board.appendChild(row); // add row to the board
}

// --- Listen for keyboard input ---
document.addEventListener("keydown", (e) => {
  if (currentRow >= 6) return; // stop if all guesses used

  const key = e.key.toUpperCase(); // convert to uppercase

  // If user hits Enter
  if (key === "ENTER") {
    if (currentGuess.length === 5) {
      checkGuess(); // check if guess is correct
    }

  // If user hits Backspace
  } else if (key === "BACKSPACE") {
    currentGuess = currentGuess.slice(0, -1); // remove last letter
    updateTiles(); // update UI

  // If letter key and guess isn't full yet
  } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
    currentGuess += key; // add letter to guess
    updateTiles(); // update UI
  }
});

// --- Update tiles on screen based on currentGuess ---
function updateTiles() {
  const row = board.children[currentRow]; // get current row
  for (let i = 0; i < 5; i++) {
    row.children[i].textContent = currentGuess[i] || ""; // update tile letter or clear
  }
}

// --- Check the guess against the answer word ---
function checkGuess() {
  const row = board.children[currentRow];
  const guess = currentGuess;

  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    const letter = guess[i];

    // Correct letter, correct spot
    if (letter === word[i]) {
      tile.classList.add("correct");

    // Correct letter, wrong spot
    } else if (word.includes(letter)) {
      tile.classList.add("present");

    // Letter not in word
    } else {
      tile.classList.add("absent");
    }
  }

  // If the guess is exactly right
  if (guess === word) {
    alert("You win!"); // Show win message
  }

  // Move to the next row
  currentGuess = "";
  currentRow++;
}
