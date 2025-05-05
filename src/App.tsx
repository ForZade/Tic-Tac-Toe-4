import BoardButton from "./components/boardButton.component";
import { useTicTacToe } from "./hooks/useTicTacToe.hook";

export default function App() {
    const { board, selectField, turn, moves, winner } = useTicTacToe();

    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center gap-16">
            {
                winner ? <h1 className="text-3xl"><span className="font-bold">{winner}</span>has won the game!</h1> :
                <h1 className="text-3xl">Its <span className="font-bold">{turn}</span>'s turn</h1>
            }
            <section className="grid grid-cols-3 grid-rows-3 gap-2">
                {
                    board.map((item, index) => (
                        <BoardButton 
                            key={index} 
                            onClick={() => selectField(index)}
                            turn={turn}
                            disabled={moves.includes(index)}
                        >
                            {item}
                        </BoardButton>
                    ))
                }
            </section>
        </main>
    )
}