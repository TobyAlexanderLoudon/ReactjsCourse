import { useState, useMemo } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './data/winning-combinations.js';

const BOARD_SIZE = 3;

const SYMBOLS = {
  X: 'X',
  O: 'O',
};

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = Array(BOARD_SIZE)
  .fill(null)
  .map(() => Array(BOARD_SIZE).fill(null));

function deriveActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === SYMBOLS.X
    ? SYMBOLS.O
    : SYMBOLS.X;
}

function deriveGameBoard(gameTurns) {
  return gameTurns.reduce(
    (gameBoard, turn) => {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
      return gameBoard;
    },
    [...INITIAL_GAME_BOARD.map((array) => [...array])],
  );
}

function deriveWinner(gameBoard, players) {
  for (const combination of WINNING_COMBINATIONS) {
    const [first, second, third] = combination.map(
      (pos) => gameBoard[pos.row][pos.col],
    );

    if (first && first === second && first === third) {
      return players[first];
    }
  }

  return undefined;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = useMemo(() => deriveGameBoard(gameTurns), [gameTurns]);
  const winner = useMemo(
    () => deriveWinner(gameBoard, players),
    [gameBoard, players],
  );
  const hasDraw = gameTurns.length === BOARD_SIZE * BOARD_SIZE && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {Object.entries(PLAYERS).map(([symbol, name]) => (
            <Player
              key={symbol}
              initialName={name}
              symbol={symbol}
              isActive={activePlayer === symbol}
              onChangeName={handlePlayerNameChange}
            />
          ))}
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} onRestart={handleRestart} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
