//components/Planner/PlannerContent.tsx

"use client";
import { forwardRef } from "react";
import DayPlan from "./DayPlan";
import NodeForm from "../Node/NodeForm";
import { usePlanner } from "./usePlanner";

interface PlannerContentProps extends ReturnType<typeof usePlanner> { }

const PlannerContent = forwardRef<HTMLDivElement, PlannerContentProps>(
    ({
        dates,
        plans,
        addingType,
        targetDate,
        setAddingType,
        setTargetDate,
        addNode,
        updateDayNodes,
    }, ref) => {
        return (
            <div className="flex-1 p-2 sm:p-4 text-gray-800" ref={ref}>
                <h2 className="text-xl font-bold mb-4 text-gray-900">プラン内容</h2>
                {dates.length === 0 && <p className="text-gray-600">日程を選択してください</p>}

                {dates.map((date, index) => {
                    const isAddingForm = addingType && targetDate === date;
                    return (
                        <div key={date} className="mb-4">
                            <DayPlan
                                date={date}
                                dayIndex={index}
                                nodes={plans[date] || []}
                                onChange={(newNodes) => updateDayNodes(date, newNodes)}
                            />

                            {isAddingForm && (
                                <NodeForm
                                    type={addingType!}
                                    colorClass="bg-blue-500"
                                    onComplete={(rows) => addNode(rows)}
                                    onCancel={() => {
                                        setAddingType(null);
                                        setTargetDate("");
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
);

PlannerContent.displayName = "PlannerContent";
export default PlannerContent;
