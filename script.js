const game = (function () {
  const gameBoard = [
    ["O", "X", "X"],
    ["X", "O", "O"],
    ["O", "X", "X"],
  ];

  let players = [];

  const printBoard = () => {
    for (const row of gameBoard) {
      console.log(row);
    }
  };

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

  const logResult = () => {
    if (playerX.isPlayerMarker(game.evaluate())) {
      console.log("Player X wins!");
    } else if (playerO.isPlayerMarker(game.evaluate())) {
      console.log("Player O wins!");
    } else if (game.evaluate() === "draw") {
      console.log(game.evaluate());
    }
  };

  const placeMarker = (xCoord, yCoord) => {
    if (gameBoard[xCoord][yCoord] === "-") {
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
      counter++;
      console.log(`It's player ${game.turn.get().marker}'s turn.`);
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

  return {
    placeMarker,
    printBoard,
    evaluate,
    isFull,
    logResult,
    addPlayer,
    clearBoard,
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

(function gameController() {
  const playerX = createPlayer("X");
  const playerO = createPlayer("O");
  game.addPlayer(playerX);
  game.addPlayer(playerO);
})();
