//components/Planner/PlannerContent.tsx

"use client";
import { forwardRef } from "react";
import DayPlan from "./DayPlan";
import NodeForm from "../Node/NodeForm";
import { usePlanner } from "./usePlanner";

interface PlannerContentProps extends ReturnType<typeof usePlanner> { }

//プラン内容を表示するコンポーネント
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

                {dates.map((date, index) => { //日付に合わせて枠を表示する
                    const isAddingForm = addingType && targetDate === date; //ノード追加画面を出すかの分岐。目的の日付のところに画面が出る
                    return (
                        <div key={date} className="mb-4">
                            <DayPlan //その日の予定のノードが羅列されるコンポーネント
                                date={date}
                                dayIndex={index}
                                nodes={plans[date] || []}
                                onChange={(newNodes) => updateDayNodes(date, newNodes)}
                            />

                            {isAddingForm && ( //ノード追加フェーズの時はノード追加フォームを表示する
                                <NodeForm
                                    type={addingType!}
                                    colorClass="bg-blue-500"
                                    onComplete={(rows) => addNode(rows)} //完了ボタンの時の動作
                                    onCancel={() => { //キャンセルボタンの時の動作
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
