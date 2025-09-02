"use client";
import NodeArea from "../Node/NodeArea";
import { NodeData } from "./usePlanner";

interface Props {
    date: string;
    dayIndex: number;
    nodes: NodeData[];
    onChange: (newNodes: NodeData[]) => void;
}

export default function DayPlan({ date, dayIndex, nodes, onChange }: Props) {
    return (
        <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">
                Day {dayIndex + 1} ({date})
            </h3>
            <NodeArea nodes={nodes} setNodes={onChange} />
        </div>
    );
}