import BoardButton from "./components/boardButton.component";
import { useTicTacToe } from "./hooks/useTicTacToe.hook";

export default function App() {
    const { board, selectField, turn } = useTicTacToe();

    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center">
            <section className="grid grid-cols-3 grid-rows-3 gap-2">
                {
                    board.map((item, index) => (
                        <BoardButton 
                            key={index} 
                            onClick={() => selectField(index)}
                            turn={turn}
                        >
                            {item}
                        </BoardButton>
                    ))
                }
            </section>
        </main>
    )
}