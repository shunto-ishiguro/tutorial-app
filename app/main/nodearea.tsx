'use client';
import { useState } from "react";

//基本となるノードのひな型
const MainNode = ({ type, id }: { type: string, id: number }) => {
    if (type == 'train') return <TrainNode />;
    if (type == 'sightseeing') return <SightseeingNode />;
    if (type == 'eating') return <EatingNode />;
    if (type == 'hotel') return <HotelNode />;
}

//各ノード
const TrainNode = () => {
    return (
        <div style={{
            padding: '8px',
            margin: '4px',
            background: '#ccc',
            cursor: 'grab',
        }}>
            train
        </div>
    );
}
const SightseeingNode = () => {
    return (
        <div style={{
            padding: '8px',
            margin: '4px',
            background: '#ccc',
            cursor: 'grab',
        }}>
            train
        </div>
    );
}
const EatingNode = () => {
    return (
        <div style={{
            padding: '8px',
            margin: '4px',
            background: '#ccc',
            cursor: 'grab',
        }}>
            train
        </div>
    );
}
const HotelNode = () => {
    return (
        <div style={{
            padding: '8px',
            margin: '4px',
            background: '#ccc',
            cursor: 'grab',
        }}>
            train
        </div>
    );
}

//ノードを描画するエリア
export default function NodeArea(){
    const [nodes, setNodes] = useState<number[]>([1,1]);
    return (
        <div>
            {nodes.map((id) => (
                <MainNode key={id} id={1} type={"train"} />
            ))}
        </div>
    );
}