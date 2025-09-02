//components/Planner/usePlanner.ts

"use client";
import { useState } from "react";
import { NodeType } from "../Node/nodeConfig";
import { getDatesInRange } from "../utils/date";

export interface NodeData {
    id: string;
    type: NodeType;
    rows: { label: string; value: string }[];
}

export function usePlanner() {
    const [dates, setDates] = useState<string[]>([]);
    const [plans, setPlans] = useState<Record<string, NodeData[]>>({});
    const [addingType, setAddingType] = useState<NodeType | null>(null);
    const [targetDate, setTargetDate] = useState<string>("");

    const setDateRange = (newDates: string[]) => {
        setDates(newDates);
        setPlans(Object.fromEntries(newDates.map((d) => [d, plans[d] || []])));
    };

    const addNode = (rows: { label: string; value: string }[]) => {
        if (!addingType || !targetDate) return;
        const newNode: NodeData = {
            id: Date.now().toString(),
            type: addingType,
            rows,
        };
        setPlans((prev) => ({
            ...prev,
            [targetDate]: [...(prev[targetDate] || []), newNode],
        }));
        setAddingType(null);
        setTargetDate("");
    };

    const updateDayNodes = (date: string, newNodes: NodeData[]) => {
        setPlans((prev) => ({ ...prev, [date]: newNodes }));
    };

    return {
        dates,
        plans,
        addingType,
        targetDate,
        setAddingType,
        setTargetDate,
        setDateRange,
        addNode,
        updateDayNodes,
    };
}
