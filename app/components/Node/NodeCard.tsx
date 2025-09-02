import { nodeFieldConfig, NodeType } from "./nodeConfig";

type NodeCardProps = {
    type: NodeType;
    rows: { label: string; value: string }[];
};

export default function NodeCard({ type, rows }: NodeCardProps) {
    const orderedLabels = nodeFieldConfig[type].map(f => f.label);
    const displayRows = orderedLabels
        .map(label => rows.find(r => r.label === label))
        .filter((r): r is { label: string; value: string } => !!r);

    return (
        <div className="border rounded-xl p-4 shadow-sm bg-white w-full max-w-[600px] mx-auto text-sm">
            <div className="font-bold text-gray-700 mb-2">{type}</div>
            <div className="flex flex-wrap gap-4 items-center">
                {displayRows.map((row, idx) => (
                    <span key={idx} className="break-words">
                        <span className="font-semibold">{row.label}:</span> {row.value}
                    </span>
                ))}
            </div>
        </div>
    );
}