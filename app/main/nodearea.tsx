'use client';
import { useState } from "react";

//基本となるノードのひな型
const MainNode = (props : { type: string, id: number, startTime: string, endTime: string, content: string}) => {
    if (props.type == 'train') return <TrainNode {...props} />;
    if (props.type == 'sightseeing') return <SightseeingNode {...props} />;
    if (props.type == 'eating') return <EatingNode {...props} />;
    if (props.type == 'hotel') return <HotelNode {...props} />;
}

//各ノード
const TrainNode = ({ type, id, startTime, endTime, content}: { type: string, id: number, startTime: string, endTime: string, content: string}) => {
    return (
        <div style={{
            padding: '8px',
            margin: '4px',
            background: '#ccc',
            cursor: 'grab',
        }}>
            {startTime} <br />
            {content} <br />
            {endTime}
        </div>
    );
}
const SightseeingNode = ({ type, id, startTime, endTime, content}: { type: string, id: number, startTime: string, endTime: string, content: string}) => {
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
const EatingNode = ({ type, id, startTime, endTime, content}: { type: string, id: number, startTime: string, endTime: string, content: string}) => {
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
const HotelNode = ({ type, id, startTime, endTime, content}: { type: string, id: number, startTime: string, endTime: string, content: string}) => {
    return (
        <div style={{
            padding: '8px',
            margin: '4px',
            background: '#ccc',
            cursor: 'grab',
        }}>
            {startTime} <br />
            {content} <br />
            {endTime}
        </div>
    );
}

//ノードを描画するエリア
export default function NodeArea(){
    const [nodes, setNodes] = useState([
        { id: 1, type: "train", startTime: "12:00", endTime: "12:35", content: "札幌駅 美唄駅"},
        { id: 2, type: "hotel", startTime: "15:00", endTime: "10:00", content: "美唄グランドホテル"},
    ]);
    return (
        <div>
            {nodes.map((props) => (
                <MainNode key={props.id} {...props} />
            ))}
        </div>
    );
}