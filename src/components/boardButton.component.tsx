import { Icon } from '@iconify/react';

export default function BoardButton({ onClick, children, turn, disabled }: { onClick: () => void, children: React.ReactNode, turn: string, disabled?: boolean }) {
    return (
        <button 
            className={`
                w-20 h-20 grid place-items-center transition-all duration-200 relative group
                ${children === 'X' ? 'bg-red-400' : children === 'O' ? 'bg-blue-400' : 'bg-slate-300'}
                ${!children && 'hover:bg-slate-400'}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {
                children === "X" ? <Icon icon="tabler:x" className="w-full h-full scale-80 text-white" />
                : children === "O" ? <Icon icon="tabler:circle" className="w-full h-full scale-80 text-white" />
                : null
            }
            {
                !children && turn === 'X' ? 
                <Icon 
                    icon="tabler:x" 
                    className="
                        absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full scale-0 group-hover:scale-80 z-10 select-none 
                        pointer-events-none transition-all duration-300 group-hover:text-red-700
                    " 
                />
                : !children && turn === 'O' ? 
                <Icon 
                    icon="tabler:circle" 
                    className="
                        absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full scale-0 group-hover:scale-80 z-10 select-none 
                        pointer-events-none transition-all duration-300 group-hover:text-blue-700
                    " 
                />
                : null
            }
        </button>
    )
}