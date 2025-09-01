import LabeledInput from "./LabeledInput";
import { nodeFieldConfig, NodeType } from "./nodeConfig";

type FormInputsProps = {
    type: NodeType;
    formData: { [key: string]: string };
    setFormData: (data: { [key: string]: string }) => void;
};

export default function FormInputs({ type, formData, setFormData }: FormInputsProps) {
    return (
        <>
            {nodeFieldConfig[type].map(({ label, placeholder }) => (
                <LabeledInput
                    key={label}
                    label={label}
                    placeholder={placeholder}
                    value={formData[label] || ""}
                    onChange={(val) => setFormData({ ...formData, [label]: val })}
                />
            ))}
        </>
    );
}
