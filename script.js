function createGame() {
  const gameBoard = [
    ["O", "X", "X"],
    ["X", "O", "O"],
    ["O", "X", "X"],
  ];
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
  const placeMarker = (player, xCoord, yCoord) => {
    if (gameBoard[xCoord][yCoord] === "-") {
      gameBoard[xCoord][yCoord] = player.marker;
    }
  };
  return { placeMarker, printBoard, evaluate, isFull };
}

function createPlayer(letter) {
  const marker = letter;
  const isPlayerMarker = (x) => {
    return marker === x;
  };
  return { marker, isPlayerMarker };
}

function gameController() {
  const game = createGame();
  const playerX = createPlayer("X");
  const playerO = createPlayer("O");
  if (playerX.isPlayerMarker(game.evaluate())) {
    console.log("Player X wins!");
  } else if (playerO.isPlayerMarker(game.evaluate())) {
    console.log("Player O wins!");
  } else if (game.evaluate() === "draw") {
    console.log(game.evaluate());
  }
}
gameController();
