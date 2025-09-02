//components/Planner/DayPlan.tsx

"use client";
import NodeArea from "../Node/NodeArea";
import NodeForm from "../Node/NodeForm"; // ← ここを追加
import { NodeData } from "./usePlanner";
import { useState } from "react";

interface Props {
    date: string;
    dayIndex: number;
    nodes: NodeData[];
    onChange: (newNodes: NodeData[]) => void;
}

interface EditingNodeState {
    node: NodeData;
}

export default function DayPlan({ date, dayIndex, nodes, onChange }: Props) {
    const [editingNode, setEditingNode] = useState<EditingNodeState | null>(null);

    return (
        <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">
                Day {dayIndex + 1} ({date})
            </h3>

            {/* NodeAreaに編集・削除・ドラッグ機能を渡す */}
            <NodeArea
                nodes={nodes}
                setNodes={onChange}
                onEditNode={(node) => setEditingNode({ node })}
            />

            {/* ノード編集フォーム */}
            {editingNode && (
                <NodeForm
                    type={editingNode.node.type}
                    colorClass="bg-yellow-500"
                    initialData={editingNode.node.rows}
                    onComplete={(rows) => {
                        const updatedNodes = nodes.map((n) =>
                            n.id === editingNode.node.id ? { ...n, rows } : n
                        );
                        onChange(updatedNodes);
                        setEditingNode(null);
                    }}
                    onCancel={() => setEditingNode(null)}
                />
            )}
        </div>
    );
}