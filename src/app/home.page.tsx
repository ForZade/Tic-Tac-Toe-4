import { useTicTacToe } from "../hooks/useTicTacToe.hook"
import { useState } from "react";

export default function HomePage() {
    const { createLobby, joinLobby } = useTicTacToe();
    const [code, setCode] = useState<string>('');

    return (
        <main className="w-screen h-screen flex items-center justify-center flex-col gap-16 bg-slate-700 text-slate-100">
            <h1 className="text-5xl font-black">
                <span className="text-blue-400">Tic</span>
                <span className="text-green-400">Tac</span>
                <span className="text-red-400">Toe</span>
            </h1>
            <section className="flex flex-col gap-4 items-center">
                <h2 className="text-xl">Enter lobby code</h2>
                <input 
                    type="text" 
                    maxLength={6}
                    className="w-60 border-2 border-white bg-slate-200 bg-repeat-x rounded-lg p-2 text-black text-center"
                    inputMode="numeric"
                    onChange={(e) => setCode(e.target.value)}
                />
                <button
                    className="w-full px-4 py-2 border-2 border-white/10 rounded-xl bg-slate-400 font-bold hover:scale-95 hover:bg-slate-500 transition-all duration-200"
                    onClick={() => joinLobby(code)}
                >
                    Join
                </button>

                <h2>or</h2>

                <button
                    className="w-full px-4 py-2 border-2 border-white/10 rounded-xl bg-green-500 font-bold hover:scale-95 hover:bg-green-600 transition-all duration-200"
                    onClick={createLobby}
                >
                    Create a Lobby
                </button>
            </section>
        </main>
    )
}