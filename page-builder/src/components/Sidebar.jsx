import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const availableBlocks = [
  { id: 'text', name: 'Text Block' },
  { id: 'image', name: 'Image Block' },
  { id: 'button', name: 'Button Block' },
];

const DraggableBlock = ({ block }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: block.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 100, // Ensure dragged item is on top
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 border border-gray-300 rounded mb-3 bg-white hover:bg-blue-50 shadow-sm cursor-grab active:cursor-grabbing active:shadow-lg transition-all duration-150 ease-in-out"
    >
      <p className="text-sm font-medium text-gray-700">{block.name}</p>
    </div>
  );
};

const Sidebar = () => {
  return (
    // Sidebar container: Full width on small screens, fixed width on medium and up.
    // Added more padding and a subtle border.
    <div className="w-full md:w-64 lg:w-72 h-auto md:h-screen bg-gray-50 p-4 md:p-6 border-r border-gray-200 overflow-y-auto shadow-md md:shadow-none">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Available Blocks</h2>
      <div>
        {availableBlocks.map((block) => (
          <DraggableBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
