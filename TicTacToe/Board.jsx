
import React, { useState } from 'react';
import Square from './Square';

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index) => {
        if (squares[index] || calculateWinner(squares)) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    const winner = calculateWinner(squares);
    const isTie = !winner && squares.every(square => square !== null);
    const status = winner ? `Winner: ${winner}` : isTie ? "It's a Tie!" : `Next Player: ${isXNext ? 'X' : 'O'}`;

    const handleReplay = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {squares.slice(0, 3).map((value, i) => (
                    <Square key={i} value={value} onClick={() => handleClick(i)} />
                ))}
            </div>
            <div className="board-row">
                {squares.slice(3, 6).map((value, i) => (
                    <Square key={i + 3} value={value} onClick={() => handleClick(i + 3)} />
                ))}
            </div>
            <div className="board-row">
                {squares.slice(6, 9).map((value, i) => (
                    <Square key={i + 6} value={value} onClick={() => handleClick(i + 6)} />
                ))}
            </div>
            {(winner || isTie) && (
                <button className="replay-button" onClick={handleReplay}>
                    Replay
                </button>
            )}
        </div>
    );
}


function calculateWinner(squares) {
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
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
