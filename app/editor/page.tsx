"use client";
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

export default function EditorPage() {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for generated template in session storage
    const generatedTemplate = sessionStorage.getItem('generatedTemplate');
    
    if (generatedTemplate) {
      try {
        const template = JSON.parse(generatedTemplate);
        setCode(template.html);
        // Clear the storage after use
        sessionStorage.removeItem('generatedTemplate');
      } catch (error) {
        console.error('Error parsing template:', error);
        // Fallback to empty template
        setCode(getEmptyTemplate());
      }
    } else {
      // If no generated template, use empty template
      setCode(getEmptyTemplate());
    }
    
    setIsLoading(false);
  }, []);

  const getEmptyTemplate = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Welcome to Your New Website</h1>
  <p>Start editing here...</p>
</body>
</html>`;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading editor...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">WebGenie Editor</h1>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
              Save
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 border-r overflow-hidden">
          <div className="h-full">
            <Editor
              height="100%"
              defaultLanguage="html"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-hidden">
          <iframe
            id="preview"
            srcDoc={code}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </main>
    </div>
  );
}