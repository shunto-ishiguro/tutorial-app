//components/Node/LabeledInput.tsx

type LabeledInputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
};

export default function LabeledInput({ label, placeholder, value, onChange }: LabeledInputProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="w-20 text-gray-700">{label}</span>
            <input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 border p-2 rounded text-gray-800 placeholder-gray-400"
            />
        </div>
    );
}
