//components/Planner/Planner.tsx

"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { usePlanner } from "./usePlanner";
import PlannerSidebar from "./PlannerSidebar";
import PlannerContent from "./PlannerContent";

export default function Planner() {
    const planner = usePlanner();
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
    });

    return (
        <div className="flex">
            <PlannerSidebar {...planner} onPrint={handlePrint} />
            <PlannerContent {...planner} ref={printRef} />
        </div>
    );
}