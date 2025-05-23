import React, { useState, useEffect } from 'react';
import { useBlocks } from '../context/BlocksContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PropertiesPanel = () => {
  const { selectedBlockId, canvasBlocks, updateBlock, removeBlock, selectBlock } = useBlocks();
  const [currentProps, setCurrentProps] = useState({});

  const selectedBlock = canvasBlocks.find(block => block.id === selectedBlockId);

  useEffect(() => {
    if (selectedBlock) {
      setCurrentProps(selectedBlock.props);
    } else {
      setCurrentProps({});
    }
  }, [selectedBlockId, selectedBlock]);

  const handleExportJson = () => {
    if (canvasBlocks.length === 0) {
      alert("Canvas is empty. Add some blocks before exporting.");
      return;
    }
    const jsonString = JSON.stringify(canvasBlocks, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-layout.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    // console.log("Exported canvasBlocks as JSON.");
  };

  if (!selectedBlock) {
    return (
      <div className="w-full md:w-72 lg:w-80 h-auto md:h-screen bg-gray-50 p-4 md:p-6 border-l border-gray-200 overflow-y-auto shadow-md md:shadow-none">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Properties</h3>
        <p className="text-sm text-gray-500 mb-6">Select a block to edit its properties.</p>
        <div>
          <Button onClick={handleExportJson} className="w-full">Export Page JSON</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === 'checkbox' ? checked : value;
    const newProps = { ...currentProps, [name]: val };
    setCurrentProps(newProps);
    updateBlock(selectedBlockId, { [name]: val });
  };

  const renderPropertyFields = () => {
    if (!selectedBlock) return null;

    switch (selectedBlock.type) {
      case 'text':
        return (
          <div>
            <Label htmlFor="content">Text Content</Label>
            <Textarea
              id="content"
              name="content"
              rows="4"
              value={currentProps.content || ''}
              onChange={handleInputChange}
              placeholder="Enter text content..."
              className="mt-1"
            />
          </div>
        );
      case 'image':
        return (
          <>
            <div>
              <Label htmlFor="src">Image URL</Label>
              <Input
                type="text"
                id="src"
                name="src"
                value={currentProps.src || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/image.png"
                className="mt-1"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                type="text"
                id="alt"
                name="alt"
                value={currentProps.alt || ''}
                onChange={handleInputChange}
                placeholder="Descriptive alt text"
                className="mt-1"
              />
            </div>
          </>
        );
      case 'button':
        return (
          <div>
            <Label htmlFor="text">Button Text</Label>
            <Input
              type="text"
              id="text"
              name="text"
              value={currentProps.text || ''}
              onChange={handleInputChange}
              placeholder="Click me"
              className="mt-1"
            />
          </div>
        );
      default:
        return <p className="text-sm text-gray-500">This block type has no editable properties.</p>;
    }
  };

  return (
    <div className="w-full md:w-72 lg:w-80 h-auto md:h-screen bg-gray-50 p-4 md:p-6 border-l border-gray-200 overflow-y-auto shadow-md md:shadow-none">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">Properties: <span className="font-normal capitalize">{selectedBlock.type}</span></h3>
        <p className="text-xs text-gray-500 truncate mb-4">ID: {selectedBlock.id}</p>
        <div className="space-y-4">
          {renderPropertyFields()}
        </div>
      </div>
      <div className="space-y-3">
        <Button variant="destructive" onClick={() => { if (window.confirm('Are you sure you want to delete this block?')) { removeBlock(selectedBlockId); } }} className="w-full">Delete Block</Button>
        <Button variant="outline" onClick={() => selectBlock(null)} className="w-full">Deselect</Button>
        <Button onClick={handleExportJson} className="w-full">Export Page JSON</Button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
