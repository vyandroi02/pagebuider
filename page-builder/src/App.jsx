import React from 'react';
import { DndContext } from '@dnd-kit/core';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import { BlocksProvider, useBlocks } from './context/BlocksContext';
import './App.css'; // Keep this for any global styles if needed

// InnerApp component to access context for handleDragEnd
const InnerApp = () => {
  const { addBlock, moveBlock } = useBlocks();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // console.log("Drag End Event:", event); // Keep for debugging if needed

    if (!over) {
      // console.log("No drop target.");
      return;
    }

    const isSidebarBlock = ['text', 'image', 'button'].includes(active.id);

    if (isSidebarBlock && over.id === 'canvas-drop-area') {
      const blockType = active.id;
      addBlock(blockType);
      // console.log(`New block of type ${blockType} to be added via context.`);
    } else if (active.data.current?.sortableContainerId === 'canvas-sortable' && over.data.current?.sortableContainerId === 'canvas-sortable') {
      if (active.id !== over.id) {
        moveBlock(active.id, over.id);
        // console.log(`Block ${active.id} to be reordered over ${over.id} via context.`);
      } else {
        // console.log("Dropped on self, no reorder needed.");
      }
    } else {
      // console.log("Drag operation not recognized or not on a valid target for the current logic.");
      // console.log("Active ID:", active.id, "Active Data:", active.data.current);
      // console.log("Over ID:", over.id, "Over Data:", over.data.current);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Main container: flex column on small screens, flex row on medium and up */}
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <Sidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </DndContext>
  );
};


function App() {
  return (
    <BlocksProvider>
      <InnerApp />
    </BlocksProvider>
  );
}

export default App;
