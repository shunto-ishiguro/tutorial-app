"use client";
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
    const handleSelect = (range: { startDate: string; endDate: string }) => {
        setDateRange(getDatesInRange(range.startDate, range.endDate));
    };

    return (
        <div className="w-64 p-4 bg-gray-100 space-y-4">
            <h2 className="font-bold">操作パネル</h2>

            <DateRangePicker onSelect={handleSelect} />

            {dates.length > 0 && (
                <div className="space-y-4">
                    {dates.map((date) => (
                        <div key={date} className="space-y-2">
                            <h4 className="font-semibold text-sm">{date}</h4>
                            {(["移動", "宿泊", "食事", "観光"] as NodeType[]).map((type) => (
                                <button
                                    key={`${date}-${type}`}
                                    className="w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        setAddingType(type);
                                        setTargetDate(date);
                                    }}
                                >
                                    {type}を追加
                                </button>
                            ))}
                        </div>
                    ))}
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