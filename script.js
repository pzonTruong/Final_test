let boardState = ["", "", "", "", "", "", "", "", ""];
let playing = false;
let endGame = false; 
let currentPlayer = "x";
let nextGameStartPlayer = "x";

//đường dẫn ảnh
const imgX = "./assets/x.png"
const imgO = "./assets/o.png"

const statusText = document.getElementById("status-text");
const currentTurnDisplay = document.getElementById("current-turn");
const cells = document.querySelectorAll(".cell");
const btnStart = document.getElementById("btn-start");
const btnReplay = document.getElementById("btn-replay");

//điều kiện thắng - dọc - ngang - chéo
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

//rset
function cleanBoard() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("win-cell");
    });
    endGame = false;
}

btnStart.addEventListener("click", () => {
    if (!playing && !endGame) { //kiểm tra có ấn được nút start ko
        startGame();
    }
});

btnReplay.addEventListener("click", () => {
    if (endGame) {
        setupNextGame();
        startGame();
    }
});

function startGame() {
    statusText.innerText = "Hãy chiến đấu hết mình!";
    playing = true;
    endGame = false;
    currentTurnDisplay.innerText = currentPlayer;

    if (boardState.every(cell => cell === "")) {
    }
}

function setupNextGame() {
    cleanBoard();
    nextGameStartPlayer = nextGameStartPlayer === "x" ? "o" : "x";
    currentPlayer = nextGameStartPlayer;
    currentTurnDisplay.innerText = currentPlayer;
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// --- SỬA ĐỔI 2: Logic Click ô (Xử lý lỗi click vào ảnh & chặn click khi thắng) ---
function handleCellClick(event) {
    const clickedCell = event.target.closest('.cell');
    if (!clickedCell) return;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    if (boardState[clickedCellIndex] !== "" || !playing) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
        
    const img = document.createElement('img');
    img.src = (currentPlayer === "x") ? imgX : imgO;
    img.alt = currentPlayer;
    // 
    cell.appendChild(img);
}

function switchTurn() {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    currentTurnDisplay.innerText = currentPlayer;
}

function checkResult() {
    let roundWon = false;
    let winningIndices = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningIndices = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Người chơi ${currentPlayer.toUpperCase()} thắng!`;

        winningIndices.forEach(index => {
            cells[index].classList.add("win-cell");
        });

        playing = false;
        endGame = true;
        return;
    }

    let roundDraw = !boardState.includes("");
    if (roundDraw) {
        statusText.innerText = "Trò chơi Hoà!";
        playing = false;
        endGame = true;
        return;
    }

    switchTurn();
}