"use client";
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Save, RotateCw, Loader2, Download, Smartphone, Tablet, Monitor } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOAnalyzer } from '@/components/seo-analyzer';

export default function EditorPage() {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [fileName, setFileName] = useState('untitled.html');
  const [previewWidth, setPreviewWidth] = useState('100%');
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const router = useRouter();

    useEffect(() => {
    const generatedTemplate = sessionStorage.getItem('generatedTemplate');
    
    if (generatedTemplate) {
      try {
        const template = JSON.parse(generatedTemplate);
        setCode(template.html);
      } catch (error) {
        console.error('Error parsing template:', error);
        setCode(getEmptyTemplate());
      }
    } else {
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
      line-height: 1.6;
      background-color: #f5f5f5;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Your New Website</h1>
    <p>Start editing here...</p>
  </div>
</body>
</html>`;
  };

  const handleDeviceChange = (device: 'mobile' | 'tablet' | 'desktop') => {
    setActiveDevice(device);
    switch (device) {
      case 'mobile':
        setPreviewWidth('375px'); // iPhone SE width
        break;
      case 'tablet':
        setPreviewWidth('768px'); // iPad Mini width
        break;
      case 'desktop':
        setPreviewWidth('100%');
        break;
    }
    setIsPreviewLoading(true);
    handleRefreshPreview();
  };

  const handleSave = () => {
    try {
      localStorage.setItem('lastSavedCode', code);
      toast.success('Code saved locally');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save code');
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('File downloaded');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleRefreshPreview = () => {
    setIsPreviewLoading(true);
    const iframe = document.getElementById('preview') as HTMLIFrameElement;
    if (iframe) {
      const newIframe = document.createElement('iframe');
      newIframe.id = 'preview';
      newIframe.className = 'w-full h-full border-0';
     newIframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-modals allow-forms');

      newIframe.srcdoc = code;
      newIframe.onload = () => setIsPreviewLoading(false);
      
      const container = iframe.parentElement;
      container?.removeChild(iframe);
      container?.appendChild(newIframe);
    }
  };

  const handleNewProject = () => {
    if (code !== getEmptyTemplate() && !confirm('Are you sure? Unsaved changes will be lost.')) {
      return;
    }
    setCode(getEmptyTemplate());
    setFileName('untitled.html');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-background border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">WebGenie Editor</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push('/')}>
              Back to Generator
            </Button>
            <Button variant="outline" onClick={handleNewProject}>
              New Project
            </Button>
            
            <div className="border rounded-lg p-1 flex gap-1 bg-muted">
              <Button
                variant={activeDevice === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('mobile')}
                className="px-3"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                variant={activeDevice === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('tablet')}
                className="px-3"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={activeDevice === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('desktop')}
                className="px-3"
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" onClick={handleRefreshPreview}>
              <RotateCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor */}
        <div className="flex-1 border-r overflow-hidden">
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
              wordWrap: 'on',
              formatOnPaste: true,
              formatOnType: true,
            }}
            loading={<div className="flex items-center justify-center h-full">Loading editor...</div>}
          />
        </div>

        {/* Preview and SEO Analysis */}
        <div className="flex-1">
          <Tabs defaultValue="preview" className="h-full flex flex-col">
            <TabsList className="mx-4 mt-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="flex-1">
              <div className="h-full bg-gray-100 dark:bg-gray-900 flex items-start justify-center p-4">
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                )}
                <div 
                  className="bg-white dark:bg-black h-full overflow-auto transition-all duration-300 shadow-lg"
                  style={{ 
                    width: previewWidth,
                    maxWidth: '100%'
                  }}
                >
                  <iframe
                    id="preview"
                    srcDoc={code}
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin allow-scripts allow-modals allow-forms"
                    onLoad={() => setIsPreviewLoading(false)}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="seo" className="flex-1 overflow-auto">
              <SEOAnalyzer html={code} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}