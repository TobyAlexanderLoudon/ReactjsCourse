export default function GameBoard({ board, onSelectSquare, onRestart }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                  aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}${playerSymbol ? ` - ${playerSymbol}` : ''}`}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
      <button className="reset" onClick={onRestart}>
        Reset
      </button>
    </ol>
  );
}
