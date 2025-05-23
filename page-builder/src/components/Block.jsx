import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Block = ({ type, props }) => {
  switch (type) {
    case 'text':
      return (
        <Card className="mb-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-blue-800 text-base">Text Block</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
              {props?.content || "Default text content. Edit me!"}
            </p>
          </CardContent>
        </Card>
      );
    case 'image':
      return (
        <Card className="mb-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-green-800 text-base">Image Block</CardTitle>
          </CardHeader>
          <CardContent>
            {props?.src ? (
              <img
                src={props.src}
                alt={props?.alt || "User image"}
                className="max-w-full h-auto rounded-md shadow"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 flex flex-col items-center justify-center rounded-md">
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20"> {/* Placeholder SVG */}
                  <path d="M16.5 10.5V6.75a.75.75 0 00-1.5 0v3.75m-.75 0A2.25 2.25 0 0113.5 12.75v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V9.75A4.5 4.5 0 1112 5.25v1.5a.75.75 0 001.5 0v-1.5a3 3 0 00-3-3H7.5a3 3 0 00-3 3v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V9A2.25 2.25 0 019 6.75v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V9A.75.75 0 009 8.25H7.5A.75.75 0 006.75 9v1.5a.75.75 0 001.5 0v-1.5A2.25 2.25 0 0110.5 9V6.75a.75.75 0 00-1.5 0V9A.75.75 0 009 9.75v1.5a.75.75 0 001.5 0v-1.5a3 3 0 00-3-3H4.5a3 3 0 00-3 3v1.5a.75.75 0 001.5 0v-1.5A.75.75 0 013.75 9h1.5a.75.75 0 01.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V12a2.25 2.25 0 01-2.25 2.25H3.75a.75.75 0 000 1.5h1.5a3.75 3.75 0 003.75-3.75V9.75A.75.75 0 009 9V6.75a.75.75 0 00-1.5 0V9A.75.75 0 009 9.75v1.5a.75.75 0 001.5 0V9.75a.75.75 0 00-.75-.75H8.25A.75.75 0 007.5 9v1.5a.75.75 0 001.5 0V9.75A.75.75 0 009 9V6.75a.75.75 0 00-1.5 0V9a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a3 3 0 013-3h1.5a3 3 0 013 3V9.75a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6.75a.75.75 0 00-1.5 0v3.75zm-1.5.75a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75z"></path>
                </svg>
                <p className="text-gray-500 text-sm mt-1">Placeholder Image</p>
              </div>
            )}
          </CardContent>
        </Card>
      );
    case 'button':
      return (
        <Card className="mb-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-yellow-800 text-base">Button Block</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Button variant="default" size="default"> 
              {props?.text || "Click Me"}
            </Button>
          </CardContent>
        </Card>
      );
    default:
      return (
        <Card className="mb-2 border-dashed border-red-400">
          <CardHeader>
            <CardTitle className="text-red-700 text-base">Unknown Block Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">This block type is not recognized.</p>
          </CardContent>
        </Card>
      );
  }
};

export default Block;
