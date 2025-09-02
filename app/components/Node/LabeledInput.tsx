type LabeledInputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
};

export default function LabeledInput({ label, placeholder, value, onChange }: LabeledInputProps) {
    return (
        <div className="flex items-center gap-2">
            {/* 左にラベル */}
            <span className="w-20 text-gray-700">{label}</span>
            {/* 入力欄に例を表示 */}
            <input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 border p-1 rounded"
            />
        </div>
    );
}
