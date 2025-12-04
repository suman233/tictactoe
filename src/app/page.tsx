"use client";
import { useState } from "react";

type WinLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


const result = calculateWinner(board);
  const winner = result?.player;
  const winningLine = result?.line;
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
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        paddingTop: 40,
        backgroundColor: darkMode ? "#0f172a" : "#f9fafb",
        color: darkMode ? "#f1f5f9" : "#111827",
        transition: "0.3s",
      }}
    >
      <h1>Tic Tac Toe</h1>

      {/* THEME SWITCHER */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "15px",
          background: darkMode ? "#e2e8f0" : "#1f2937",
          color: darkMode ? "#1f2937" : "#fff",
        }}
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "Match Draw!"
          : `Turn: ${isXNext ? "X" : "O"}`}
      </h2>

      <div style={{ position: "relative", width: "380px", margin: "0 auto" }}>
        <div style={styles.board}>
          {board.map((value, index) => (
            <button
              key={index}
              style={{
                ...styles.cell,
                backgroundColor: darkMode ? "#1e293b" : "#10a887",
                color: darkMode ? "#f8fafc" : "#ffffff",
                border: darkMode ? "2px solid #334155" : "2px solid #065f46",
              }}
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          ))}
        </div>
        {/* ✅ WINNING LINE */}
        {winningLine && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "380px",
              height: "380px",
              pointerEvents: "none",
            }}
          >
            <line
              x1={winningLine.x1}
              y1={winningLine.y1}
              x2={winningLine.x2}
              y2={winningLine.y2}
              stroke={darkMode ? "#8e25e4" : "#f10e66"}
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                strokeDasharray: 400,
                strokeDashoffset: 400,
                animation: "draw 1s forwards",
              }}
            />
          </svg>
        )}
      </div>

      <button
        onClick={resetGame}
        style={{
          ...styles.reset,
          backgroundColor: darkMode ? "#334155" : "#10b981",
          color: "#fff",
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

// ✅ Winner logic
function calculateWinner(board: string[]) {
  const CELL = 120;
  const GAP = 10;

  const C1 = CELL / 2;
  const C2 = CELL + GAP + CELL / 2;
  const C3 = CELL * 2 + GAP * 2 + CELL / 2;

  const lines: [number, number, number, WinLine][] = [
    [0, 1, 2, { x1: 0, y1: C1, x2: 380, y2: C1 }],
    [3, 4, 5, { x1: 0, y1: C2, x2: 380, y2: C2 }],
    [6, 7, 8, { x1: 0, y1: C3, x2: 380, y2: C3 }],

    [0, 3, 6, { x1: C1, y1: 0, x2: C1, y2: 380 }],
    [1, 4, 7, { x1: C2, y1: 0, x2: C2, y2: 380 }],
    [2, 5, 8, { x1: C3, y1: 0, x2: C3, y2: 380 }],

    [0, 4, 8, { x1: 0, y1: 0, x2: 380, y2: 380 }],
    [2, 4, 6, { x1: 380, y1: 0, x2: 0, y2: 380 }],
  ];

  for (const [a, b, c, line] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
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
    transition: "0.2s",
  },
  reset: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};
