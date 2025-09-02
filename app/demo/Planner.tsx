"use client";

import { useState, useRef } from "react";
import DateRangePicker from "./DateRangePicker";
import NodeArea from "./NodeArea";
import { NodeType } from "../components/nodeConfig";
import NodeForm from "../components/NodeForm";
import { useReactToPrint } from "react-to-print";

interface NodeData {
    id: string;
    type: NodeType;
    rows: { label: string; value: string }[];
}

function getDatesInRange(start: string, end: string): string[] {
    const dates: string[] = [];
    const current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
    }

    return dates;
}

export default function Planner() {
    const [dates, setDates] = useState<string[]>([]);
    const [plans, setPlans] = useState<Record<string, NodeData[]>>({});
    const [addingType, setAddingType] = useState<NodeType | null>(null);
    const [targetDate, setTargetDate] = useState<string>("");

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const handleSelect = (range: { startDate: string; endDate: string }) => {
        const d = getDatesInRange(range.startDate, range.endDate);
        setDates(d);
        const initPlans: Record<string, NodeData[]> = {};
        d.forEach((date) => {
            initPlans[date] = [];
        });
        setPlans(initPlans);
    };

    const handleComplete = (rows: { label: string; value: string }[]) => {
        if (!addingType || !targetDate) return;
        const newNode: NodeData = {
            id: Date.now().toString(),
            type: addingType,
            rows,
        };
        setPlans({
            ...plans,
            [targetDate]: [...plans[targetDate], newNode],
        });
        setAddingType(null);
        setTargetDate("");
    };

    return (
        <div className="flex">
            {/* 左側に操作パネル */}
            <div className="w-64 p-4 bg-gray-100 space-y-4">
                <h2 className="font-bold">操作パネル</h2>

                {/* 日付選択 */}
                <DateRangePicker onSelect={handleSelect} />

                {/* ノード追加ボタン */}
                {dates.length > 0 && (
                    <div className="space-y-2">
                        {(["移動", "宿泊", "食事", "観光"] as NodeType[]).map((type) => (
                            <button
                                key={type}
                                className="w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => setAddingType(type)}
                            >
                                {type}を追加
                            </button>
                        ))}
                    </div>
                )}

                {/* PDF化ボタン */}
                <button
                    onClick={handlePrint}
                    className="w-full mt-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                    PDF化
                </button>
            </div>

            {/* 右側に旅行プラン本体 (PDF対象) */}
            <div className="flex-1 p-8" ref={printRef}>
                <h1 className="text-2xl font-bold mb-6">旅行プラン</h1>

                {/* ノードフォーム（1つだけ表示） */}
                {addingType && (
                    <div className="mb-6">
                        <label className="block mb-2">
                            挿入する日:
                            <select
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                className="ml-2 p-1 border rounded"
                            >
                                <option value="">選択してください</option>
                                {dates.map((date, idx) => (
                                    <option key={date} value={date}>
                                        Day {idx + 1} ({date})
                                    </option>
                                ))}
                            </select>
                        </label>
                        {targetDate && (
                            <NodeForm
                                type={addingType}
                                colorClass="bg-green-500"
                                onComplete={handleComplete}
                                onCancel={() => setAddingType(null)}
                            />
                        )}
                    </div>
                )}

                {/* 日ごとのプラン */}
                {dates.length > 0 && (
                    <div className="mt-8">
                        {dates.map((date, index) => (
                            <div key={date} className="border-b pb-6 mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    Day {index + 1} ({date})
                                </h2>
                                <NodeArea
                                    nodes={plans[date]}
                                    setNodes={(newNodes) =>
                                        setPlans({ ...plans, [date]: newNodes })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
