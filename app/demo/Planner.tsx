// components/Planner.tsx
"use client";

import { useState } from "react";
import { NodeType } from "../components/nodeConfig";
import NodeCard from "../components/NodeCard";
import AddButton from "../components/AddButton";
import NodeForm from "../components/NodeForm";

interface NodeData {
    type: NodeType;
    rows: { label: string; value: string }[];
}

// ノードタイプごとの色
const typeColorMap: Record<NodeType, string> = {
    移動: "bg-blue-500",
    食事: "bg-orange-500",
    宿泊: "bg-green-500",
    観光: "bg-purple-500",
};

export default function Planner() {
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [showForm, setShowForm] = useState<NodeType | null>(null);

    // フォーム完了時にノードを追加
    const handleComplete = (rows: { label: string; value: string }[]) => {
        if (!showForm) return;
        const newNode: NodeData = { type: showForm, rows };
        setNodes([newNode, ...nodes]);
        setShowForm(null);
    };

    return (
        <div className="p-4 flex flex-col gap-4">
            {/* ノード追加ボタン群 */}
            <div className="flex gap-2 flex-wrap">
                {(Object.keys(typeColorMap) as NodeType[]).map((t) => (
                    <AddButton
                        key={t}
                        text={`${t}追加`}
                        colorClass={typeColorMap[t]}
                        onClick={() => setShowForm(t)}
                    />
                ))}
            </div>

            {/* 入力フォーム */}
            {showForm && (
                <NodeForm
                    type={showForm}
                    colorClass={typeColorMap[showForm]}
                    onComplete={handleComplete}
                    onCancel={() => setShowForm(null)}
                />
            )}

            {/* ノード表示 */}
            <div className="flex flex-col gap-4">
                {nodes.map((node, idx) => (
                    <NodeCard key={idx} type={node.type} rows={node.rows} />
                ))}
            </div>
        </div>
    );
}
