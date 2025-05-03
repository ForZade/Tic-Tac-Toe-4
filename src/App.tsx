import { useState } from "react";

export default function App() {
    const [turn, setTurn] = useState('X');
    const [winner, setWinner] = useState('');
    const [board, setBoard] = useState([
        '', '', '',
        '', '', '',
        '', '', ''
    ]);

    function checkForWin(board: string[], player: string) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => board[index] === player)
        );
    }

    async function handleClick(index: number) {
        if (board[index] || winner) return;

        const newBoard = board.map((item, idx) => idx === index ? turn : item)
        setBoard(newBoard);

        const winStatus = checkForWin(newBoard, turn);

        if (winStatus) {
            setWinner(turn);
            alert(`Player ${turn} won!`);
            resetGame();
            return;
        }

        setTurn(turn === 'X' ? 'O' : 'X');
    }

    function resetGame() {
        setBoard([
            '', '', '',
            '', '', '',
            '', '', ''
        ]);
        setWinner('');
        setTurn('X');
    }

    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center">
            <section className="grid grid-cols-3 grid-rows-3 gap-2">
                {
                    board.map((item, index) => (
                        <button 
                            key={index}
                            className="w-20 h-20 bg-red-400 grid place-items-center"
                            onClick={() => handleClick(index)}
                        >
                            {item}
                        </button>
                    ))
                }
            </section>
        </main>
    )
}