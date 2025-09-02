//components/Node/NodeArea.tsx

"use client";
import NodeCard from "./NodeCard";
import { NodeData } from "../Planner/usePlanner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface NodeAreaProps {
    nodes: NodeData[];
    setNodes?: (newNodes: NodeData[]) => void;
    onEditNode?: (node: NodeData) => void;
}

export default function NodeArea({ nodes, setNodes, onEditNode }: NodeAreaProps) {
    if (!nodes) return null;

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination || !setNodes) return;
        const newNodes = Array.from(nodes);
        const [moved] = newNodes.splice(result.source.index, 1);
        newNodes.splice(result.destination.index, 0, moved);
        setNodes(newNodes);
    };

    const handleDelete = (id: string) => {
        if (!setNodes) return;
        setNodes(nodes.filter((n) => n.id !== id));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="nodes">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {nodes.map((node, index) => (
                            <Draggable key={node.id} draggableId={node.id} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <NodeCard
                                            type={node.type}
                                            rows={node.rows}
                                            onEdit={() => onEditNode && onEditNode(node)}
                                            onDelete={() => handleDelete(node.id)}
                                        />
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
