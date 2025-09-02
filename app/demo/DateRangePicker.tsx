"use client";

import { useState } from "react";

type DateRange = {
    startDate: string;
    endDate: string;
};

interface Props {
    onSelect: (range: DateRange) => void;
}

export default function DateRangePicker({ onSelect }: Props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (startDate && endDate) {
            onSelect({ startDate, endDate });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-center gap-4 bg-gray-100 p-4 rounded-xl"
        >
            <label className="flex items-center gap-2">
                出発日:
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-1 border rounded"
                    required
                />
            </label>
            <label className="flex items-center gap-2">
                帰宅日:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-1 border rounded"
                    required
                />
            </label>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                日程決定
            </button>
        </form>
    );
}
