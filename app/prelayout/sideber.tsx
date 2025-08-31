'use client';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SidebarItem = ({ id, title }: { id: string; title: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    padding: '8px',
    margin: '4px',
    background: '#aaaaaa',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {title}
    </div>
  );
};


export default function Sidebar() {
  const items = ['item1', 'item2', 'item3', 'item4'];

  return (
    <aside style={{ width: '240px', padding: '16px', background: '#f4f4f4' }}>
      <DndContext>
        <SortableContext items={items}>
          {items.map((id) => (
            <SidebarItem key={id} id={id} title={id} />
          ))}
        </SortableContext>
      </DndContext>
    </aside>
  );
}
