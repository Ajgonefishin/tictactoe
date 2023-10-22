import {useState} from 'react';

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        const nextSquares = squares.slice();
        if (nextSquares[i] || calculateWinner(squares)) {
            return
        }
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setXIsNext(!xIsNext)
        setSquares(nextSquares);
    }

    const gameGrid = squares.map((square, index) =>
        <Square value={square} onSquareClick={() => handleClick(index)} />
    );

    const winner = calculateWinner(squares)
    let visibility = false;
    if (winner) {
        visibility = true;
    }

    return (
        <>
            <WinnerBox winner={winner} isVisible={visibility} />
            <div className="flex h-screen justify-center items-center ">
                <div className="inline-grid grid-cols-3">
                    {gameGrid}
                </div>
            </div>
        </>
    );
}

function Square({value, onSquareClick}) {
    return (
        <button
            className="w-16 h-16 font-bold text-3xl border-4 rounded-lg border-zinc-400 hover:bg-gray-300"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function WinnerBox({winner, isVisible}) {
    let winnerBoxClassName = "w-100% h-16 border-4 border-black-300 flex justify-center items-center p-2"
    if (!isVisible) {
        winnerBoxClassName += " invisible"
    }
    return (
        <div className="flex justify-center w-screen absolute top-2">
            <div className={winnerBoxClassName}>
                {winner} has won!
            </div>
        </div>

    )
}

function calculateWinner(squares) {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < wins.length; i++) {
        const [a, b, c] = wins[i]
        if (squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a]
        }
    }
    return null
}