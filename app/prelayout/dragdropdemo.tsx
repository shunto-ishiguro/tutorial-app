'use client';
//インポートをしている。分割代入的な感じで少しずつインポートできるよん
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';

//サイドバーにあるドラッグできるアイテム。propsとしてidという文字列を受け取っている
const SidebarItem = ({ id }: { id: UniqueIdentifier }) => {
    //useDraggable関数の戻り値のオブジェクトを分割代入している。オブジェクトを引数にとるからオブジェクトの形式で渡している
    const { attributes, listeners, setNodeRef } = useDraggable({ id });
    return (
        <div
            ref={setNodeRef}
            {...listeners} //イベントハンドラの設定(展開すると、onPointerDown={listeners.onPointerDown} onKeyDown={listners.onKeyDown}みたいな感じ)
            {...attributes}
            //シンプルなCSSでのドラッグアイテムの設定
            style={{
                padding: '8px',
                margin: '4px',
                background: '#ccc',
                cursor: 'grab',
            }}
        >
            {id}
        </div>
    );
};

//ドロップできるエリア。itemsという文字列の配列を受け取っている
const MainDropZone = ({ items }: { items: UniqueIdentifier[] }) => {
    //おなじくオブジェクトの形式でidという変数を渡している。値を代入しておいてある
    const { setNodeRef } = useDroppable({ id: 'main' });
    return (
        //はじめのdivはエリアを表す
        <div
            ref={setNodeRef}
            style={{
                minHeight: '200px',
                padding: '16px',
                background: '#f0f0f0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '8px',
            }}
        >
            {items.map((item, index) => ( //受け取ったitemsの個数だけアイテムとなるdivを複製。itemはitemsから取得した文字列、indexはループごとに変わるやつ
                /*<div
                    key={index}
                    style={{
                        background: '#90caf9',
                        padding: '8px',
                        textAlign: 'center',
                    }}
                >
                    {item}
                </div>*/
                <SidebarItem key={item + index.toString()} id={item} />
            ))}
        </div>
    );
};

//上ふたつをまとめたコンポーネント、外部からはこれを使う
export default function DragDropDemo() {
    const sidebarItems = ['A', 'B', 'C'];
    //ドロップエリアのアイテムを動的に変更可能として宣言している。これで変更すると再描画される
    const [mainItems, setMainItems] = useState<UniqueIdentifier[]>([]);

    //ドラッグ終了時つまりドロップ時の処理を記述した関数
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
        const draggedId = active.id;
        const overId = over.id; //ここのidはmainしか返ってこないよん
        // 挿入位置のインデックスを取得
        const overIndex = mainItems.findIndex((item) => item === overId);
        if (overIndex === -1) {
            // overが空白領域（末尾）なら末尾に追加
            setMainItems((prev) => [...prev, draggedId]);
            console.log("追加判定");
        } else {
            // 間に挿入
            setMainItems((prev) => [...prev.slice(0, overIndex), draggedId, ...prev.slice(overIndex)]);
            console.log("挿入判定");
        }
    };
    
    return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '24px' }}>
        <aside style={{ width: '150px', background: '#eee', padding: '16px' }}>
          <h3>Sidebar</h3>
          {sidebarItems.map((id) => (
            <SidebarItem key={id} id={id} />
          ))}
        </aside>
        <main style={{ flex: 1 }}>
          <h3>Main Area</h3>
          <MainDropZone items={mainItems} />
        </main>
      </div>
    </DndContext>
  );
}