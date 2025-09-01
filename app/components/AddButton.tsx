// components/AddButton.tsx

type AddButtonProps = {
    text: string;
    colorClass?: string; // 背景色クラス
    onClick: () => void;
};

export default function AddButton({ text, colorClass = "bg-blue-500", onClick }: AddButtonProps) {
    return (
        <button
            className={`px-3 py-1 text-white rounded ${colorClass} hover:opacity-90 transition`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
