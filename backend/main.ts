import express from 'express';
import { createServer} from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

interface GameState {
    players: { [socketId: string]: string},
    board: string[],
    turn: string;
}

const games: Record<string, GameState> = {}; // key: lobbyCode
const socketToLobby: Record<string, string> = {};


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("create-lobby", () => {
        const lobbyCode = generateLobbyCode();

        const game: GameState = {
            players: { [socket.id]: 'X' },
            board: Array(9).fill(''),
            turn: 'X',
        };

        games[lobbyCode] = game;
        socketToLobby[socket.id] = lobbyCode;

        socket.join(lobbyCode);
        socket.emit("lobby-created", { lobbyCode, symbol: "X" });
    });

    socket.on('join-lobby', (lobbyCode: string) => {
        const game = games[lobbyCode];
        if (!game) return socket.emit('error', 'Lobby not found');
        if (Object.keys(game.players).length >= 2) return socket.emit('Error', 'Lobby is full');

        game.players[socket.id] = "O";
        socketToLobby[socket.id] = lobbyCode;
        socket.join(lobbyCode);

        socket.emit("lobby-joined", { lobbyCode, symbol: "O" });

        io.to(lobbyCode).emit('game-start', {
            board: game.board,
            turn: game.turn,
        });
    });

    socket.on('make-move', (index: number) => {
        const lobbyCode = socketToLobby[socket.id];
        const game = games[lobbyCode];

        if (!game) return;

        const symbol = game.players[socket.id];
        if (!symbol || game.board[index] || game.turn !== symbol) return;

        game.board[index] = symbol;
        game.turn = symbol === 'X' ? 'O' : 'X';

        io.to(lobbyCode).emit('update-board', { board: game.board, turn: game.turn });

        const winner = checkForWin(game.board, symbol);

        if (winner) {
            io.to(lobbyCode).emit('winner', { winner });
        }
    });

    socket.on('reset-game', () => {
        const lobbyCode = socketToLobby[socket.id];
        const game = games[lobbyCode];
        if (!game) return;

        game.board = Array(9).fill('');
        game.turn = 'X';
        io.to(lobbyCode).emit('reset-board', { board: game.board, turn: game.turn });
    })

    socket.on('disconnect', () => {
        const lobbyCode = socketToLobby[socket.id];
        const game = games[lobbyCode];
        if (!game) return;
        delete game.players[socket.id];
        delete socketToLobby[socket.id];
        io.to(lobbyCode).emit('player-disconnected');

        if (Object.keys(game.players).length === 0) {
            delete games[lobbyCode];
        }
    });
});

function generateLobbyCode() {
    return Math.random().toString(36).substring(2, 9);
}

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

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});