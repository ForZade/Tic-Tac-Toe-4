import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

let socket: Socket;

export function useTicTacToe() {
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [turn, setTurn] = useState<string>('X');
    const [winner, setWinner] = useState<string>('');
    const [lobbyCode, setLobbyCode] = useState<string>('');
    const [playerSymbol, setPlayerSymbol] = useState<string>('');
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameReady, setGameReady] = useState<boolean>(false);

    const serverUrl = 'http://localhost:3000';
    const navigate = useNavigate();

    useEffect(() => {
        socket = io(serverUrl);

        socket.on("lobby-created", ({ lobbyCode, symbol }) => {
            setLobbyCode(lobbyCode);
            setPlayerSymbol(symbol);
            navigate(`/lobby/${lobbyCode}`);
        });

        socket.on("lobby-joined", ({ lobbyCode, symbol }) => {
            setLobbyCode(lobbyCode);
            setPlayerSymbol(symbol);
            setGameReady(true);
            navigate(`/lobby/${lobbyCode}`);
        });
        
        socket.on("game-start", ({ board, turn }) => {
            setBoard(board);
            setTurn(turn);
            setWinner('');
            setGameStarted(true);
        });

        socket.on("update-board", ({ board, turn }) => {
            setBoard(board);
            setTurn(turn);
        });

        socket.on("winner", ({ winner }) => {
            setWinner(winner);
            setGameStarted(false);
        });

        socket.on("player-left", () => {
            setGameStarted(false);
            alert('Your opponent left the game');
        });

        socket.on("error", (message: string) => {
            alert(message);
        });

        return () => {
            socket.disconnect();
        }
    }, [serverUrl])

    function createLobby() {
        try {
            socket.emit('create-lobby');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    function joinLobby(code: string) {
        try {
            socket.emit('join-lobby', code);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    function startGame() {
        setGameStarted(true);
        setGameReady(false);
    }

    function makeMove(index: number) {
        if (winner || board[index] || turn !== playerSymbol) return;
        
        try {
            socket.emit("make-move", index);

        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    function resetGame() {
        try {
            socket.emit("reset-game");
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return {
        board,
        turn,
        winner,
        lobbyCode,
        playerSymbol,
        gameStarted,
        gameReady,
        createLobby,
        joinLobby,
        startGame,
        makeMove,
        resetGame
    }
}
