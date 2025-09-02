"use client";
import NodeCard from "./NodeCard";
import { NodeData } from "../Planner/usePlanner";

interface NodeAreaProps {
    nodes: NodeData[];
    setNodes?: (newNodes: NodeData[]) => void;
}

export default function NodeArea({ nodes, setNodes }: NodeAreaProps) {
    if (!nodes) return null;

    return (
        <div className="space-y-2">
            {nodes.map((node) => (
                <NodeCard key={node.id} type={node.type} rows={node.rows} />
            ))}
        </div>
    );
}