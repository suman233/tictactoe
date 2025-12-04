"use client";
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Tic Tac Toe</h1>

      <h2>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "Match Draw!"
          : `Turn: ${isXNext ? "X" : "O"}`}
      </h2>

      <div style={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            style={styles.cell}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button onClick={resetGame} style={styles.reset}>
        Reset Game
      </button>
    </div>
  );
}

// ✅ Winner logic
function calculateWinner(board: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  return null;
}

const styles = {
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 120px)",
    gap: "10px",
    justifyContent: "center",
    margin: "20px auto",
  },
  cell: {
    width: "120px",
    height: "120px",
    fontSize: "2.5rem",
    cursor: "pointer",
    borderRadius: "10px",
    border: "2px solid #333",
    backgroundColor: "#10a887",
  },
  reset: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
