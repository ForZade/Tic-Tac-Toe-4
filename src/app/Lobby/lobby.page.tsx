import BoardButton from "../../components/boardButton.component"
import { useTicTacToe } from "../../hooks/useTicTacToe.hook"

export default function LobbyPage() {
    const { board, turn, winner, gameStarted, gameReady, makeMove, startGame } = useTicTacToe();

    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center gap-16 bg-slate-700 text-slate-100">
            {
                winner ? <h1 className="text-3xl"><span className="font-bold">{winner}</span>has won the game!</h1> :
                gameStarted ? <h1 className="text-3xl">Its <span className="font-bold">{turn}</span>'s turn</h1> :
                <h1 className="text-3xl">Waiting for players...</h1>
            }
            {
                gameReady && <button 
                    className="px-20 py-2 text-xl border-2 border-white/10 rounded-xl bg-green-500 font-bold hover:scale-95 hover:bg-green-600 transition-all duration-200"
                    onClick={() => startGame()}
                >
                    Start Game
                </button>
            }
            {
                gameStarted && <section className="grid grid-cols-3 grid-rows-3 gap-2">
                {
                    board.map((item, index) => (
                        <BoardButton 
                            key={index} 
                            onClick={() => makeMove(index)}
                            turn={turn}
                        >
                            {item}
                        </BoardButton>
                    ))
                }
            </section>
            }
        </main>
    )
}