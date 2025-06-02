"use client";
import { useEffect, useState, useRef, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Dynamically import components to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading editor...</div>
});

const Button = dynamic(() =>
  import('@/components/ui/button').then(mod => mod.Button)
);
const Tabs = dynamic(() => import('@/components/ui/tabs').then(mod => mod.Tabs));
const TabsContent = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsContent));
const TabsList = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsList));
const TabsTrigger = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsTrigger));


// Dynamically import icons
const SaveIcon = dynamic(() => import('lucide-react').then(mod => mod.Save));
const RotateCwIcon = dynamic(() => import('lucide-react').then(mod => mod.RotateCw));
const Loader2Icon = dynamic(() => import('lucide-react').then(mod => mod.Loader2));
const DownloadIcon = dynamic(() => import('lucide-react').then(mod => mod.Download));
const SmartphoneIcon = dynamic(() => import('lucide-react').then(mod => mod.Smartphone));
const TabletIcon = dynamic(() => import('lucide-react').then(mod => mod.Tablet));
const MonitorIcon = dynamic(() => import('lucide-react').then(mod => mod.Monitor));
const SparklesIcon = dynamic(() => import('lucide-react').then(mod => mod.Sparkles));
const CheckCircle2 = dynamic(() => import('lucide-react').then(mod => mod.CheckCircle2));
const Progress = dynamic(
  () => import('@/components/ui/progress').then(mod => mod.Progress),
  { ssr: false }
);

const CustomProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

// SEOAnalyzer component with custom progress bar
const SEOAnalyzer = ({ html }: { html: string }) => {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const analyzeSEO = (html: string) => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const suggestions: string[] = [];
        let score = 100;

        const checks = {
          title: false,
          description: false,
          headings: false,
          images: false,
          links: false,
          keywords: false,
        };

        // Title check
        const title = doc.querySelector('title');
        if (!title || !title.textContent) {
          suggestions.push('Add a title tag to your page');
          score -= 15;
        } else if (title.textContent.length < 30 || title.textContent.length > 60) {
          suggestions.push('Title length should be between 30-60 characters');
          score -= 10;
          checks.title = true;
        } else {
          checks.title = true;
        }

        // Description check
        const metaDescription = doc.querySelector('meta[name="description"]');
        if (!metaDescription || !metaDescription.getAttribute('content')) {
          suggestions.push('Add a meta description');
          score -= 15;
        } else {
          const descLength = metaDescription.getAttribute('content')!.length;
          if (descLength < 120 || descLength > 160) {
            suggestions.push('Meta description length should be between 120-160 characters');
            score -= 10;
          }
          checks.description = true;
        }

        // Headings check
        const h1 = doc.querySelectorAll('h1');
        if (h1.length === 0) {
          suggestions.push('Add an H1 heading');
          score -= 10;
        } else if (h1.length > 1) {
          suggestions.push('Use only one H1 heading per page');
          score -= 5;
        }
        checks.headings = h1.length === 1;

        // Images check
        const images = doc.querySelectorAll('img');
        let hasImageIssues = false;
        images.forEach(img => {
          if (!img.getAttribute('alt')) {
            if (!hasImageIssues) {
              suggestions.push('Add alt text to all images');
              score -= 10;
              hasImageIssues = true;
            }
          }
        });
        checks.images = !hasImageIssues;

        // Links check
        const links = doc.querySelectorAll('a');
        let hasLinkIssues = false;
        links.forEach(link => {
          if (!link.textContent?.trim()) {
            if (!hasLinkIssues) {
              suggestions.push('Ensure all links have descriptive text');
              score -= 5;
              hasLinkIssues = true;
            }
          }
        });
        checks.links = !hasLinkIssues;

        // Content check
        const bodyText = doc.body.textContent || '';
        if (bodyText.length < 300) {
          suggestions.push('Add more content to improve keyword density');
          score -= 10;
        }
        checks.keywords = bodyText.length >= 300;

        score = Math.max(0, Math.min(100, score));

        setAnalysis({
          score,
          suggestions,
          checks,
        });
      } catch (error) {
        console.error("SEO Analysis error:", error);
        setAnalysis({
          score: 0,
          suggestions: ['Failed to analyze SEO. Please check your HTML syntax.'],
          checks: {
            title: false,
            description: false,
            headings: false,
            images: false,
            links: false,
            keywords: false,
          }
        });
      }
    };

    analyzeSEO(html);
  }, [html]);

  if (!analysis) return <div className="flex items-center justify-center h-full">Analyzing SEO...</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">SEO Score</h3>
          <span className="text-2xl font-bold">{analysis.score}%</span>
        </div>
        <CustomProgressBar value={analysis.score} />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">SEO Checks</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(analysis.checks).map(([key, passed]) => (
            <div key={key} className="flex items-center gap-2">
              {passed ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="capitalize">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {analysis.suggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Suggestions</h4>
          <ul className="space-y-1 text-sm">
            {analysis.suggestions.map((suggestion: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
              <li key={index} className="text-muted-foreground">
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
const XCircle = dynamic(() => import('lucide-react').then(mod => mod.XCircle));
export default function EditorPage() {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [fileName, setFileName] = useState('');
  const [previewWidth, setPreviewWidth] = useState('100%');
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    const loadInitialData = async () => {
      if (typeof window !== 'undefined') {
        const generatedTemplate = sessionStorage.getItem('generatedTemplate');
        
        if (generatedTemplate) {
          try {
            const template = JSON.parse(generatedTemplate);
            setCode(template.html);
            setProjectId(template.projectId);
            setFileName(template.name);
          } catch (error) {
            console.error('Error parsing template:', error);
            setCode(getEmptyTemplate());
          }
        } else {
          setCode(getEmptyTemplate());
        }
      }
      
      setIsLoading(false);
    };

    loadInitialData();

    return () => {
      authListener?.subscription.unsubscribe();
    };
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

  const handleSaveToCloud = async () => {
    setIsSaving(true);
    try {
      let nameToUse = fileName;

      if (!projectId || fileName === "") {
        const userInput = prompt("Enter a name for your project:");
        if (!userInput || userInput.trim() === "") {
          toast.error("Project name is required to save.");
          setIsSaving(false);
          return;
        }
        nameToUse = userInput.trim();
        setFileName(nameToUse);
      }

      const upsertData = {
        user_id: user.id,
        name: nameToUse,
        html_code: code,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = projectId
        ? await supabase.from("projects").update(upsertData).eq("id", projectId)
        : await supabase.from("projects").insert(upsertData).select();

      if (error) throw error;

      if (!projectId && data) {
        setProjectId(data[0]?.id);
      }

      toast.success(projectId ? "Project updated" : "Project saved");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem('lastSavedCode', code);
    toast.success('Code saved locally');
    handleSaveToCloud();
  };

  const handleDownload = () => {
    if (typeof window !== 'undefined') {
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
    }
  };

  const handleRefreshPreview = () => {
    if (typeof window !== 'undefined') {
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
    }
  };

  const handleAiEdit = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsAiProcessing(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API;
      if (!apiKey) {
        throw new Error('API key is missing');
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Modify this HTML code based on the user's request. Return ONLY the complete modified HTML code with inline CSS and JavaScript. No explanations.
              
              Current HTML:
              ${code}
              
              User Request: ${aiPrompt}`
            }]
          }]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error('No generated content found in response');
      }

      // Basic validation
      if (!generatedText.includes('<!DOCTYPE html>') || !generatedText.includes('<html')) {
        throw new Error('Invalid HTML generated');
      }
const cleanedHtml = generatedText
  .replace(/^```html\s*/, '') // Remove starting '''html (with optional space/newline)
  .replace(/```$/, '');       // Remove ending '''
      setCode(cleanedHtml);
      toast.success("Code updated with AI modifications");
    } catch (error) {
      console.error("AI error:", error);
      toast.error("Failed to modify code. Please try a different prompt.");
    } finally {
      setIsAiProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-background border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">WebGenie Editor</h1>
          <div className="flex items-center gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask AI to modify code..."
                className="px-3 py-2 border rounded-md text-sm w-64"
                onKeyDown={(e) => e.key === 'Enter' && handleAiEdit()}
              />
              <Button 
                onClick={handleAiEdit}
                disabled={isAiProcessing}
              >
                {isAiProcessing ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <SparklesIcon className="h-4 w-4" />
                )}
                Apply
              </Button>
            </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push('/')}>
              Back to Generator
            </Button>
            
           

            <div className="border rounded-lg p-1 flex gap-1 bg-muted">
              <Button
                variant={activeDevice === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('mobile')}
                className="px-3"
              >
                <SmartphoneIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={activeDevice === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('tablet')}
                className="px-3"
              >
                <TabletIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={activeDevice === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('desktop')}
                className="px-3"
              >
                <MonitorIcon className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" onClick={handleRefreshPreview}>
              <RotateCwIcon className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            {user && (
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SaveIcon className="mr-2 h-4 w-4" />
                )}
                Save
              </Button>
            )}
            <Button onClick={handleDownload}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
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
          />
        </div>
        

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
                    <Loader2Icon className="h-8 w-8 animate-spin" />
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