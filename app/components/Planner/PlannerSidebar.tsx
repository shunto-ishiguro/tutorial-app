//components/Planner/PlannerSidebar.tsx

"use client";
import { useState } from "react";
import DateRangePicker from "../DateRangePicker";
import { NodeType } from "../Node/nodeConfig";
import { getDatesInRange } from "../utils/date";
import { usePlanner } from "./usePlanner";

interface Props extends ReturnType<typeof usePlanner> {
    onPrint: () => void;
}

export default function PlannerSidebar({
    dates,
    setDateRange,
    setAddingType,
    setTargetDate,
    onPrint,
}: Props) {
    const [selectedType, setSelectedType] = useState<NodeType>("移動");
    const [selectDate, setSelectDate] = useState("");

    const handleSelectRange = (range: { startDate: string; endDate: string }) => {
        setDateRange(getDatesInRange(range.startDate, range.endDate));
    };

    const handleAddClick = () => {
        if (!selectDate) return alert("日付を選択してください");
        setAddingType(selectedType);
        setTargetDate(selectDate);
    };

    return (
        <div className="w-64 p-4 bg-gray-100 space-y-4">
            <h2 className="font-bold">操作パネル</h2>

            <DateRangePicker onSelect={handleSelectRange} />

            {dates.length > 0 && (
                <div className="space-y-2">
                    <select
                        value={selectDate}
                        onChange={(e) => setSelectDate(e.target.value)}
                        className="w-full p-1 border rounded"
                    >
                        <option value="">日付を選択</option>
                        {dates.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as NodeType)}
                        className="w-full p-1 border rounded"
                    >
                        {(["移動", "宿泊", "食事", "観光"] as NodeType[]).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleAddClick}
                        className="w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                        ノードを追加
                    </button>
                </div>
            )}

            <button
                onClick={onPrint}
                className="w-full mt-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
                PDF化
            </button>
        </div>
    );
}
