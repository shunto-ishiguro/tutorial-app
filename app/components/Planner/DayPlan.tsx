//components/Planner/DayPlan.tsx

"use client";
import NodeArea from "../Node/NodeArea";
import NodeForm from "../Node/NodeForm";
import { NodeData } from "./usePlanner";
import { useState } from "react";

//受け取るpropsの中身を決めるインターフェース
interface Props {
    date: string;
    dayIndex: number;
    nodes: NodeData[];
    onChange: (newNodes: NodeData[]) => void;
}

//操作するノードのデータのためのインターフェース
interface EditingNodeState {
    node: NodeData;
}

//受け取ったpropsをもとに日付ごとのノードを表示するコンポーネント
export default function DayPlan({ date, dayIndex, nodes, onChange }: Props) {
    const [editingNode, setEditingNode] = useState<EditingNodeState | null>(null);
//今の日付と線→その日のノード一覧を出力
    return (
        <div className="border-b pb-4 mb-4 text-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Day {dayIndex + 1} ({date})
            </h3>

            <NodeArea
                nodes={nodes}
                setNodes={onChange}
                onEditNode={(node) => setEditingNode({ node })}
            />

            {editingNode && ( //ノード編集中のときはノードフォームを表示する
                <NodeForm
                    type={editingNode.node.type}
                    colorClass="bg-yellow-500"
                    initialData={editingNode.node.rows}
                    onComplete={(rows) => { //ノードフォームで完了ボタンが押されたときの処理
                        const updatedNodes = nodes.map((n) =>
                            n.id === editingNode.node.id ? { ...n, rows } : n
                        ); //編集中のノードとidが一緒のノードにrowsを追加
                        onChange(updatedNodes);
                        setEditingNode(null);
                    }}
                    onCancel={() => setEditingNode(null)}
                />
            )}
        </div>
    );
}
