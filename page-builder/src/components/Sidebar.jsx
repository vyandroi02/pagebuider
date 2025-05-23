import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Button } from "@/components/ui/button";

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
    <Button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      variant="outline"
      className="w-full mb-3 cursor-grab active:cursor-grabbing justify-start" 
    >
      {block.name}
    </Button>
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
