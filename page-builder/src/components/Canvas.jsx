import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Block from './Block';
import { useBlocks } from '../context/BlocksContext';

const SortableBlockItem = ({ block }) => {
  const { selectBlock, selectedBlockId } = useBlocks();
  const isSelected = block.id === selectedBlockId;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: {
      type: 'canvas-block',
      sortableContainerId: 'canvas-sortable',
      itemData: block,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    // Applied border directly via className for consistency
    // border: isSelected ? '2px solid #3b82f6' : (isDragging ? '2px dashed gray' : '1px solid #ccc'),
    marginBottom: '10px', // Keep margin between items
    cursor: 'pointer',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => selectBlock(block.id)}
      // Added Tailwind classes for borders and selection state
      className={`rounded ${isDragging ? 'shadow-lg border-2 border-dashed border-gray-400' : 'border border-gray-300'} ${isSelected ? 'border-2 border-blue-500 shadow-md' : 'hover:border-gray-400'}`}
    >
      <Block type={block.type} props={block.props} />
    </div>
  );
};

const Canvas = () => {
  const { canvasBlocks } = useBlocks();
  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-area',
  });

  const dropZoneBaseStyle = "rounded-lg min-h-[200px] p-6 w-full flex flex-col items-center justify-center transition-colors duration-150 ease-in-out";
  const dropZoneStyle = isOver
    ? `${dropZoneBaseStyle} border-4 border-dashed border-blue-500 bg-blue-50`
    : `${dropZoneBaseStyle} border-2 border-dashed border-gray-300 bg-white hover:border-gray-400`;

  return (
    // Canvas container: Takes remaining space in flex row, full width on small screens.
    // Added more padding and specific background.
    <div
      ref={setDroppableNodeRef}
      className="flex-grow h-auto md:h-screen bg-gray-200 p-4 md:p-6 overflow-y-auto" // Changed bg-white to bg-gray-200 for contrast
    >
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center md:text-left">Canvas</h2>
      {canvasBlocks && canvasBlocks.length > 0 ? (
        <SortableContext
          items={canvasBlocks.map(b => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {/* Container for sortable items, ensuring it takes up reasonable space */}
          <div className="max-w-3xl mx-auto space-y-0"> {/* Centered content with max-width */}
            {canvasBlocks.map((block) => (
              <SortableBlockItem key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      ) : (
        <div className={`${dropZoneStyle} max-w-3xl mx-auto`}> {/* Centered dropzone */}
          <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          <p className="text-gray-500 text-lg font-semibold">Drop blocks here</p>
          <p className="text-sm text-gray-400">Drag components from the sidebar to build your page.</p>
        </div>
      )}
    </div>
  );
};

export default Canvas;
