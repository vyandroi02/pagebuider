import React, { useState, useEffect } from 'react';
import { useBlocks } from '../context/BlocksContext';

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

  const commonInputClass = "mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500";
  const commonButtonClass = "w-full px-4 py-2 text-white rounded-md shadow-sm transition-colors duration-150 ease-in-out";
  const commonLabelClass = "block text-sm font-medium text-gray-700 mb-1";


  if (!selectedBlock) {
    return (
      <div className="w-full md:w-72 lg:w-80 h-auto md:h-screen bg-gray-50 p-4 md:p-6 border-l border-gray-200 overflow-y-auto shadow-md md:shadow-none">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Properties</h3>
        <p className="text-sm text-gray-500 mb-6">Select a block to edit its properties.</p>
        <div>
          <button
            onClick={handleExportJson}
            className={`${commonButtonClass} bg-green-600 hover:bg-green-700`}
          >
            Export Page JSON
          </button>
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
            <label htmlFor="content" className={commonLabelClass}>
              Text Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="4"
              className={commonInputClass}
              value={currentProps.content || ''}
              onChange={handleInputChange}
            />
          </div>
        );
      case 'image':
        return (
          <>
            <div>
              <label htmlFor="src" className={commonLabelClass}>
                Image URL
              </label>
              <input
                type="text"
                id="src"
                name="src"
                className={commonInputClass}
                value={currentProps.src || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="alt" className={commonLabelClass}>
                Alt Text
              </label>
              <input
                type="text"
                id="alt"
                name="alt"
                className={commonInputClass}
                value={currentProps.alt || ''}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 'button':
        return (
          <div>
            <label htmlFor="text" className={commonLabelClass}>
              Button Text
            </label>
            <input
              type="text"
              id="text"
              name="text"
              className={commonInputClass}
              value={currentProps.text || ''}
              onChange={handleInputChange}
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
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this block?')) {
              removeBlock(selectedBlockId);
            }
          }}
          className={`${commonButtonClass} bg-red-600 hover:bg-red-700`}
        >
          Delete Block
        </button>
        <button
          onClick={() => selectBlock(null)}
          className={`${commonButtonClass} bg-gray-500 hover:bg-gray-600`}
        >
          Deselect
        </button>
        <button
          onClick={handleExportJson}
          className={`${commonButtonClass} bg-green-600 hover:bg-green-700`}
        >
          Export Page JSON
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
