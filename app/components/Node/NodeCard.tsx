//components/Node/NodeCard.tsx

import { nodeFieldConfig, NodeType } from "./nodeConfig";

type NodeCardProps = {
    type: NodeType;
    rows: { label: string; value: string }[];
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function NodeCard({ type, rows, onEdit, onDelete }: NodeCardProps) {
    const orderedLabels = nodeFieldConfig[type].map(f => f.label);
    const displayRows = orderedLabels
        .map(label => rows.find(r => r.label === label))
        .filter((r): r is { label: string; value: string } => !!r);

    return (
        <div className="border rounded-xl p-4 shadow-sm bg-white w-full max-w-[600px] mx-auto text-sm flex flex-col gap-2 text-gray-800">
            <div className="font-bold text-gray-900 mb-2 flex justify-between items-center">
                <span>{type}</span>
                <div className="flex gap-2">
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            className="px-2 py-1 bg-yellow-400 text-white rounded hover:opacity-90 text-xs"
                        >
                            編集
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={onDelete}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:opacity-90 text-xs"
                        >
                            削除
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center text-gray-700">
                {displayRows.map((row, idx) => (
                    <span key={idx} className="break-words">
                        <span className="font-semibold">{row.label}:</span> {row.value}
                    </span>
                ))}
            </div>
        </div>
    );
}
