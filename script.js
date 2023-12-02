const game = (function () {
  const gameBoard = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  let players = [];

  const isFull = () => {
    return (
      !gameBoard[0].includes("-") &&
      !gameBoard[1].includes("-") &&
      !gameBoard[2].includes("-")
    );
  };

  //   returns winning marker if it exists
  const evaluate = () => {
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2] &&
        gameBoard[i][0] != "-"
      ) {
        return gameBoard[i][0];
      }
      if (
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i] &&
        gameBoard[0][i] != "-"
      ) {
        return gameBoard[0][i];
      }
    }
    if (
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2] &&
      gameBoard[1][1] != "-"
    ) {
      return gameBoard[1][1];
    }
    if (
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0] &&
      gameBoard[1][1] != "-"
    ) {
      return gameBoard[1][1];
    }
    if (isFull()) {
      return "draw";
    }
    return null;
  };

  const placeMarker = (xCoord, yCoord) => {
    if (gameBoard[xCoord][yCoord] === "-" && !evaluate()) {
      gameBoard[xCoord][yCoord] = turn.get().marker;
    }
  };

  const addPlayer = (player) => {
    players.push(player);
  };

  const turn = (function () {
    let counter = 0;
    // returns the player whose turn it is. always starts the game with x
    const get = function () {
      if (counter === 0) {
        return players.filter((player) => {
          return player.isPlayerMarker("X");
        })[0];
      } else if (counter % 2 === 1) {
        return players.filter((player) => {
          return player.isPlayerMarker("O");
        })[0];
      } else {
        return players.filter((player) => {
          return player.isPlayerMarker("X");
        })[0];
      }
    };
    // changes the player of the turn
    const change = function () {
      if (!evaluate()) {
        counter++;
      }
    };
    return { get, change };
  })();

  const clearBoard = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameBoard[i][j] = "-";
      }
    }
  };

  const getBoard = function () {
    return gameBoard;
  };

  return {
    getBoard,
    clearBoard,
    addPlayer,
    placeMarker,
    isFull,
    evaluate,
    players,
    turn,
  };
})();

function createPlayer(letter) {
  const marker = letter;
  const isPlayerMarker = (x) => {
    return marker === x;
  };

  return { marker, isPlayerMarker };
}

(function gameSetup() {
  const playerX = createPlayer("X");
  const playerO = createPlayer("O");
  game.addPlayer(playerX);
  game.addPlayer(playerO);
})();

(function displayController() {
  const dialog = document.querySelector("dialog");
  const startGameBtn = dialog.querySelector(".start-game-btn");
  const cells = document.querySelectorAll(".cell");
  const gameInfo = document.querySelector(".game-info");
  dialog.showModal();

  const renderBoard = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (game.getBoard()[i][j] != "-") {
          cells[i * 3 + j].innerText = game.getBoard()[i][j];
        }
      }
    }
  };

  const updateInfo = function () {
    if (!game.evaluate()) {
      gameInfo.innerText = `Player ${game.turn.get().marker}'s turn.`;
    }
    else {
      if (game.evaluate() === "draw") {
        gameInfo.innerText = `It's a draw.`
      }
      else {
        gameInfo.innerText = `Player ${game.evaluate()} won.`
      }
      dialog.showModal();
    }
  }
  
  startGameBtn.addEventListener("click", () => {
    dialog.close();
  });

  for (const cell of cells) {
    cell.addEventListener("click", (e) => {
      game.placeMarker(
        parseInt(e.target.getAttribute("data-x")),
        parseInt(e.target.getAttribute("data-y"))
      );
      game.turn.change();
      renderBoard();
      updateInfo();
    });
  }
})();
