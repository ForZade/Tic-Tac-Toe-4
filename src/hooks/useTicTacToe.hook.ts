import { useState } from "react";
import { checkForWin } from "../utils/winChecker";

export function useTicTacToe() {
    const [turn, setTurn] = useState<string>('X');
    const [winner, setWinner] = useState<string>('');
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [moves, setMoves] = useState<number[]>([]);

    function resetGame() {
        setBoard(Array(9).fill(''));
        setWinner('');
        setTurn('X');
        setMoves([]);
    }

    async function selectField(index: number) {
        if (board[index] || winner) return;

        const newBoard = board.map((item, idx) => idx === index ? turn : item)
        setBoard(newBoard);

        const newMoves = [...moves, index];
        setMoves(newMoves);

        const winStatus = checkForWin(newBoard, turn);

        if (winStatus) {
            setWinner(turn);
            alert(`Player ${turn} won!`);
            resetGame();
            return;
        }

        if (newMoves.length >= 7) {
            const moveToClear = moves[0];
            const clearedBoard = newBoard.map((item, idx) => idx === moveToClear ? '' : item);
            setMoves(newMoves.slice(1));
            setBoard(clearedBoard);
        }

        console.log(newMoves.length, moves.length);

        setTurn(turn === 'X' ? 'O' : 'X');
    }

    return {
        turn,
        winner,
        board,
        selectField,
    }
}
