import React from 'react';

const Block = ({ type, props }) => {
  // Base styles for all blocks
  const blockBaseStyles = "p-4 border border-gray-300 rounded shadow-sm mb-2"; // Removed margin, handled by SortableBlockItem

  switch (type) {
    case 'text':
      return (
        <div className={`${blockBaseStyles} bg-blue-50 hover:bg-blue-100 transition-colors duration-150 ease-in-out`}>
          <p className="font-semibold text-blue-800 mb-2">Text Block</p>
          {/* Ensure text wraps and doesn't overflow */}
          <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
            {props?.content || "Default text content. Edit me!"}
          </p>
        </div>
      );
    case 'image':
      return (
        <div className={`${blockBaseStyles} bg-green-50 hover:bg-green-100 transition-colors duration-150 ease-in-out`}>
          <p className="font-semibold text-green-800 mb-2">Image Block</p>
          {props?.src ? (
            <img
              src={props.src}
              alt={props?.alt || "User image"}
              // Responsive image: max width 100%, auto height, rounded corners
              className="max-w-full h-auto rounded-md shadow"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-md">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M16.5 10.5V6.75a.75.75 0 00-1.5 0v3.75m-.75 0A2.25 2.25 0 0113.5 12.75v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V9.75A4.5 4.5 0 1112 5.25v1.5a.75.75 0 001.5 0v-1.5a3 3 0 00-3-3H7.5a3 3 0 00-3 3v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V9A2.25 2.25 0 019 6.75v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V9A.75.75 0 009 8.25H7.5A.75.75 0 006.75 9v1.5a.75.75 0 001.5 0v-1.5A2.25 2.25 0 0110.5 9V6.75a.75.75 0 00-1.5 0V9A.75.75 0 009 9.75v1.5a.75.75 0 001.5 0v-1.5a3 3 0 00-3-3H4.5a3 3 0 00-3 3v1.5a.75.75 0 001.5 0v-1.5A.75.75 0 013.75 9h1.5a.75.75 0 01.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V12a2.25 2.25 0 01-2.25 2.25H3.75a.75.75 0 000 1.5h1.5a3.75 3.75 0 003.75-3.75V9.75A.75.75 0 009 9V6.75a.75.75 0 00-1.5 0V9A.75.75 0 009 9.75v1.5a.75.75 0 001.5 0V9.75a.75.75 0 00-.75-.75H8.25A.75.75 0 007.5 9v1.5a.75.75 0 001.5 0V9.75A.75.75 0 009 9V6.75a.75.75 0 00-1.5 0V9a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a3 3 0 013-3h1.5a3 3 0 013 3V9.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a.75.75 0 00-1.5 0v3.75zm-1.5.75a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75z"></path></svg>
              <p className="text-gray-500 text-sm">Placeholder Image</p>
            </div>
          )}
        </div>
      );
    case 'button':
      return (
        <div className={`${blockBaseStyles} bg-yellow-50 hover:bg-yellow-100 transition-colors duration-150 ease-in-out text-center`}> {/* Centered button */}
          <p className="font-semibold text-yellow-800 mb-2">Button Block</p>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg transition-all duration-150 ease-in-out">
            {props?.text || "Click Me"}
          </button>
        </div>
      );
    default:
      return (
        <div className={`${blockBaseStyles} bg-gray-100`}>
          <p className="font-semibold text-gray-800">Unknown Block Type</p>
          <p className="text-sm text-gray-600">This block type is not recognized.</p>
        </div>
      );
  }
};

export default Block;
