import { useState } from "react";
import { checkForWin } from "../utils/winChecker";

export function useTicTacToe() {
    const [turn, setTurn] = useState('X');
    const [winner, setWinner] = useState('');
    const [board, setBoard] = useState(Array(9).fill(''));

    function resetGame() {
        setBoard(Array(9).fill(''));
        setWinner('');
        setTurn('X');
    }

    async function selectField(index: number) {
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

    return {
        turn,
        winner,
        board,
        selectField,
    }
}
