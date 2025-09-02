"use client";
import { useState } from "react";
import { NodeType } from "./nodeConfig";
import FormInputs from "./FormInputs";

type NodeFormProps = {
    type: NodeType;
    colorClass: string;
    onComplete: (rows: { label: string; value: string }[]) => void;
    onCancel: () => void;
};

export default function NodeForm({ type, colorClass, onComplete, onCancel }: NodeFormProps) {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const handleComplete = () => {
        const rows = Object.entries(formData).map(([label, value]) => ({ label, value }));
        onComplete(rows);
        setFormData({});
    };

    return (
        <div className="border p-4 rounded bg-gray-100 flex flex-col gap-2">
            <FormInputs type={type} formData={formData} setFormData={setFormData} />
            <div className="flex gap-2 mt-2">
                <button
                    className={`flex-1 ${colorClass} text-white rounded px-3 py-1 hover:opacity-90`}
                    onClick={handleComplete}
                >
                    完了
                </button>
                <button
                    className={`flex-1 bg-gray-400 text-white rounded px-3 py-1 hover:opacity-90`}
                    onClick={onCancel}
                >
                    キャンセル
                </button>
            </div>
        </div>
    );
}