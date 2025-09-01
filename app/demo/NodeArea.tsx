"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import NodeCard from "../components/NodeCard";
import { NodeType } from "../components/nodeConfig";
import NodeForm from "../components/NodeForm";

interface NodeData {
    id: string;
    type: NodeType;
    rows: { label: string; value: string }[];
}

export default function NodeArea() {
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [addingType, setAddingType] = useState<NodeType | null>(null);

    // 並べ替え処理
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newNodes = Array.from(nodes);
        const [moved] = newNodes.splice(result.source.index, 1);
        newNodes.splice(result.destination.index, 0, moved);
        setNodes(newNodes);
    };

    // ノード追加
    const addNode = (type: NodeType) => {
        setAddingType(type);
    };

    const handleComplete = (rows: { label: string; value: string }[]) => {
        const newNode: NodeData = {
            id: Date.now().toString(),
            type: addingType!,
            rows,
        };
        setNodes([...nodes, newNode]);
        setAddingType(null);
    };

    return (
        <div className="p-4">
            {/* ノード追加ボタン */}
            <div className="flex gap-2 mb-4">
                {(["移動", "宿泊", "食事", "観光"] as NodeType[]).map((type) => (
                    <button
                        key={type}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => addNode(type)}
                    >
                        {type}を追加
                    </button>
                ))}
            </div>

            {/* 入力フォーム */}
            {addingType && (
                <NodeForm
                    type={addingType}
                    colorClass="bg-green-500"
                    onComplete={handleComplete}
                    onCancel={() => setAddingType(null)}
                />
            )}

            {/* DnDエリア */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="nodes">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-2">
                            {nodes.map((node, index) => (
                                <Draggable key={node.id} draggableId={node.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <NodeCard type={node.type} rows={node.rows} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
