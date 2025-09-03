// components/Planner/PlannerSidebar.tsx

"use client";
import { useState } from "react";
import DateRangePicker from "../DateRangePicker";
import { NodeType } from "../Node/nodeConfig";
import { getDatesInRange } from "../utils/date";
import { usePlanner } from "./usePlanner";

interface Props extends ReturnType<typeof usePlanner> {
    onPrint: () => void;
}

//操作パネル全体のコンポーネント。propsとして日付や追加するノードのタイプ、そのノードの日付を設定できる関数を受け取っている。
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
        <div className="w-full md:w-64 p-4 bg-gray-100 space-y-4 text-gray-800">
            <h2 className="font-bold text-gray-900">操作パネル</h2>

            <DateRangePicker onSelect={handleSelectRange} /*日付ピッカーを管理するコンポーネント*/ />

            {dates.length > 0 && ( //設定された日付がおかしかったら日付セレクタ、タイプセレクタ、追加ボタンを表示しない
                <div className="space-y-2">
                    <select
                        value={selectDate}
                        onChange={(e) => setSelectDate(e.target.value)}
                        className="w-full p-2 border rounded text-gray-800"
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
                        className="w-full p-2 border rounded text-gray-800"
                    >
                        {(["移動", "宿泊", "食事", "観光"] as NodeType[]).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleAddClick}
                        className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                    >
                        ノードを追加
                    </button>
                </div>
            )}

            <button
                onClick={onPrint}
                className="w-full mt-4 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
            >
                PDF化
            </button>
        </div>
    );
}
