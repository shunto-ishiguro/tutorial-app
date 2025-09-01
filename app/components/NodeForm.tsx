// NodeForm.tsx
"use client";
import { useState } from "react";
import { NodeType } from "./nodeConfig";
import FormInputs from "./FormInputs";

type NodeFormProps = {
    type: NodeType;
    onComplete: (rows: { label: string; value: string }[]) => void;
};

export default function NodeForm({ type, onComplete }: NodeFormProps) {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const handleComplete = () => {
        const rows = Object.entries(formData).map(([label, value]) => ({ label, value }));
        onComplete(rows);
        setFormData({});
    };

    return (
        <div className="border p-4 rounded bg-gray-100 flex flex-col gap-2">
            <FormInputs type={type} formData={formData} setFormData={setFormData} />
            <button
                className="mt-2 bg-blue-500 text-white rounded px-3 py-1 hover:opacity-90"
                onClick={handleComplete}
            >
                完了
            </button>
        </div>
    );
}
