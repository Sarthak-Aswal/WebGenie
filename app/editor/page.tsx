"use client";
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Save, RotateCw, Loader2, Download, Smartphone, Tablet, Monitor, FolderTree } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOAnalyzer } from '@/components/seo-analyzer';
import JSZip from 'jszip';

interface ProjectFiles {
  'index.html': string;
  'css/styles.css': string;
  'js/main.js': string;
}

export default function EditorPage() {
  const [files, setFiles] = useState<ProjectFiles>({
    'index.html': '',
    'css/styles.css': '',
    'js/main.js': '',
  });
  const [activeFile, setActiveFile] = useState<keyof ProjectFiles>('index.html');
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [previewWidth, setPreviewWidth] = useState('100%');
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const router = useRouter();

  useEffect(() => {
    const generatedTemplate = sessionStorage.getItem('generatedTemplate');
    
    if (generatedTemplate) {
      try {
        const template = JSON.parse(generatedTemplate);
        setFiles({
          'index.html': template.html || getEmptyTemplate(),
          'css/styles.css': template.css || getEmptyCSS(),
          'js/main.js': template.js || getEmptyJS(),
        });
      } catch (error) {
        console.error('Error parsing template:', error);
        setFiles({
          'index.html': getEmptyTemplate(),
          'css/styles.css': getEmptyCSS(),
          'js/main.js': getEmptyJS(),
        });
      }
    } else {
      setFiles({
        'index.html': getEmptyTemplate(),
        'css/styles.css': getEmptyCSS(),
        'js/main.js': getEmptyJS(),
      });
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
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="container">
    <h1>Welcome to Your New Website</h1>
    <p>Start editing here...</p>
  </div>
  <script src="js/main.js"></script>
</body>
</html>`;
  };

  const getEmptyCSS = () => {
    return `/* Main Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  line-height: 1.6;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  color: #333;
  text-align: center;
}

@media (max-width: 768px) {
  body {
    padding: 10px;
  }
}`;
  };

  const getEmptyJS = () => {
    return `// Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Website loaded successfully!');
});`;
  };

  const handleDeviceChange = (device: 'mobile' | 'tablet' | 'desktop') => {
    setActiveDevice(device);
    switch (device) {
      case 'mobile':
        setPreviewWidth('375px');
        break;
      case 'tablet':
        setPreviewWidth('768px');
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
      localStorage.setItem('lastSavedFiles', JSON.stringify(files));
      toast.success('Files saved locally');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save files');
    }
  };

  const handleDownload = async () => {
    try {
      const zip = new JSZip();
      
      // Add files to zip
      zip.file('index.html', files['index.html']);
      zip.file('css/styles.css', files['css/styles.css']);
      zip.file('js/main.js', files['js/main.js']);
      
      // Generate zip file
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Files downloaded');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download files');
    }
  };

  const handleRefreshPreview = () => {
    setIsPreviewLoading(true);
    const iframe = document.getElementById('preview') as HTMLIFrameElement;
    if (iframe) {
      const html = files['index.html']
        .replace('<link rel="stylesheet" href="css/styles.css">', `<style>${files['css/styles.css']}</style>`)
        .replace('<script src="js/main.js"></script>', `<script>${files['js/main.js']}</script>`);

      const newIframe = document.createElement('iframe');
      newIframe.id = 'preview';
      newIframe.className = 'w-full h-full border-0';
      newIframe.sandbox = 'allow-same-origin allow-scripts allow-modals allow-forms';
      newIframe.srcdoc = html;
      newIframe.onload = () => setIsPreviewLoading(false);
      
      const container = iframe.parentElement;
      container?.removeChild(iframe);
      container?.appendChild(newIframe);
    }
  };

  const handleNewProject = () => {
    if (!confirm('Are you sure? Unsaved changes will be lost.')) {
      return;
    }
    setFiles({
      'index.html': getEmptyTemplate(),
      'css/styles.css': getEmptyCSS(),
      'js/main.js': getEmptyJS(),
    });
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
        {/* File Explorer and Editor */}
        <div className="flex-1 border-r overflow-hidden flex">
          {/* File Explorer */}
          <div className="w-48 border-r bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-4">
              <FolderTree className="h-4 w-4" />
              <span className="font-medium">Project Files</span>
            </div>
            <div className="space-y-2">
              {(Object.keys(files) as Array<keyof ProjectFiles>).map((file) => (
                <button
                  key={file}
                  onClick={() => setActiveFile(file)}
                  className={`w-full text-left px-2 py-1 rounded text-sm ${
                    activeFile === file ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                  }`}
                >
                  {file}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage={
                activeFile.endsWith('.html') ? 'html' :
                activeFile.endsWith('.css') ? 'css' :
                'javascript'
              }
              value={files[activeFile]}
              onChange={(value) => setFiles(prev => ({
                ...prev,
                [activeFile]: value || ''
              }))}
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
            />
          </div>
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
                    srcDoc={files['index.html']}
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin allow-scripts allow-modals allow-forms"
                    onLoad={() => setIsPreviewLoading(false)}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="seo" className="flex-1 overflow-auto">
              <SEOAnalyzer html={files['index.html']} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}