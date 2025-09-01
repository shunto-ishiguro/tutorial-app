// components/nodeConfig.ts
export type NodeType = "移動" | "食事" | "宿泊" | "観光"; //ユニオン型

export const nodeFieldConfig: Record<NodeType, { label: string; placeholder: string }[]> = {
    移動: [
        { label: "出発", placeholder: "(例)東京駅" },
        { label: "到着", placeholder: "(例)大阪駅" },
        { label: "出発時刻", placeholder: "(例)13:00" },
        { label: "到着時刻", placeholder: "(例)14:00" },
    ],
    宿泊: [
        { label: "場所", placeholder: "(例)レステルマル" },
        { label: "Check in", placeholder: "(例)18:00" },
        { label: "Check out", placeholder: "(例)09:00" },
    ],
    食事: [
        { label: "場所", placeholder: "(例)丸亀製麵" },
        { label: "開始時刻", placeholder: "(例)12:00" },
        { label: "終了時刻", placeholder: "(例)13:30" },
    ],
    観光: [
        { label: "場所", placeholder: "(例)大阪城" },
        { label: "開始時刻", placeholder: "(例)10:00" },
        { label: "終了時刻", placeholder: "(例)11:00" },
    ],
};
