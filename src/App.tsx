import { useTicTacToe } from "./hooks/useTicTacToe.hook";

export default function App() {
    const { board, selectField } = useTicTacToe();

    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center">
            <section className="grid grid-cols-3 grid-rows-3 gap-2">
                {
                    board.map((item, index) => (
                        <button 
                            key={index}
                            className="w-20 h-20 bg-red-400 grid place-items-center"
                            onClick={() => selectField(index)}
                        >
                            {item}
                        </button>
                    ))
                }
            </section>
        </main>
    )
}