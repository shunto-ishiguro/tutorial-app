'use client';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
const SidebarItem = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
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

const MainDropZone = ({ items }: { items: string[] }) => {
  const { setNodeRef } = useDroppable({ id: 'main' });
  return (
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
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            background: '#90caf9',
            padding: '8px',
            textAlign: 'center',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default function DragDropDemo() {
  const sidebarItems = ['A', 'B', 'C'];
  const [mainItems, setMainItems] = useState<string[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over) return;

  const draggedId = active.id;
  const overId = over.id;

  // 挿入位置のインデックスを取得
  const overIndex = mainItems.findIndex((item) => item === overId);
  if (overIndex === -1) {
    // overが空白領域（末尾）なら末尾に追加
    setMainItems((prev) => [...prev, draggedId]);
  } else {
    // 間に挿入
    setMainItems((prev) => [
      ...prev.slice(0, overIndex),
      draggedId,
      ...prev.slice(overIndex),
    ]);
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