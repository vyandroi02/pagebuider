import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';

const BlocksContext = createContext();

export const useBlocks = () => useContext(BlocksContext);

export const BlocksProvider = ({ children }) => {
  const [canvasBlocks, setCanvasBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null); // New state for selected block

  const addBlock = (blockType) => {
    let defaultProps = {};
    switch (blockType) {
      case 'text':
        defaultProps = { content: 'New Text Block' };
        break;
      case 'image':
        defaultProps = { src: 'https://via.placeholder.com/150', alt: 'New Image' }; // Added placeholder for image
        break;
      case 'button':
        defaultProps = { text: 'New Button' };
        break;
      default:
        break;
    }
    const newBlock = { id: uuidv4(), type: blockType, props: defaultProps };
    setCanvasBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    console.log(`New block of type ${blockType} added via context.`);
  };

  const moveBlock = (activeId, overId) => {
    setCanvasBlocks((items) => {
      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === overId);
      if (oldIndex === -1 || newIndex === -1) {
        console.warn("Could not find items for reordering in context.");
        return items;
      }
      console.log(`Reordering block ${activeId} from index ${oldIndex} to ${newIndex} via context.`);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const updateBlock = (blockId, newProps) => {
    setCanvasBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, props: { ...block.props, ...newProps } } : block
      )
    );
    console.log(`Block ${blockId} updated via context with props:`, newProps);
  };

  const removeBlock = (blockId) => {
    setCanvasBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== blockId));
    // Also deselect if the removed block was selected
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    console.log(`Block ${blockId} removed via context.`);
  };

  // Function to set selected block ID
  const selectBlock = (blockId) => {
    setSelectedBlockId(blockId);
    console.log(`Block ${blockId} selected.`);
  };


  const value = {
    canvasBlocks,
    addBlock,
    moveBlock,
    updateBlock,
    removeBlock,
    selectedBlockId,
    selectBlock, // Changed from setSelectedBlockId to selectBlock for clarity
  };

  return <BlocksContext.Provider value={value}>{children}</BlocksContext.Provider>;
};
