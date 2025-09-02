
"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import NodeCard from "../components/NodeCard";
import { NodeType } from "../components/nodeConfig";

interface NodeData {
    id: string;
    type: string;
    rows: { label: string; value: string }[];
}

export default function NodeArea({ nodes, setNodes }: {
    nodes: NodeData[];
    setNodes: (nodes: NodeData[]) => void;
}) {
    // 並べ替え処理
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newNodes = Array.from(nodes);
        const [moved] = newNodes.splice(result.source.index, 1);
        newNodes.splice(result.destination.index, 0, moved);
        setNodes(newNodes);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="nodes">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col gap-2"
                    >
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
    );
}
