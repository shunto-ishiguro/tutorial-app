//components/Planner/Planner.tsx

"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { usePlanner } from "./usePlanner";
import PlannerSidebar from "./PlannerSidebar";
import PlannerContent from "./PlannerContent";

//プラン作成画面全体のコンポーネント。プラン作成のすべてを管理、表示している。
export default function Planner() {
    const planner = usePlanner();
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
    });

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800">
            <PlannerSidebar {...planner} onPrint={handlePrint} />
            <PlannerContent {...planner} ref={printRef} />
        </div>
    );
}
