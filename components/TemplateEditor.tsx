"use client"; // Mark this component as a Client Component
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { supabase } from '@/lib/supabase';
import { Template } from '@/types/template'; // Import the Template type

export default function TemplateEditor({ id }: { id: string }) {
  const router = useRouter(); // Initialize useRouter from next/navigation
  const [template, setTemplate] = useState<Template | null>(null);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch template data from Supabase
  useEffect(() => {
    fetchTemplate(id);
  }, [id]);

  const fetchTemplate = async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) throw error;
      setTemplate(data);
      setCode(data.html); // Set initial code (HTML)
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  // Update the preview iframe when code changes
  useEffect(() => {
    const iframe = document.getElementById('preview') as HTMLIFrameElement;
    if (iframe) {
      iframe.srcdoc = code; // Update iframe content
    }
  }, [code]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!template) {
    return <div>Template not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{template.name}</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-primary hover:underline"
          >
            Back to Examples
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Code Editor */}
        <div className="flex-1 p-4 md:p-6 border-r">
          <h2 className="text-lg font-semibold mb-4">Edit Code</h2>
          <Editor
            height="80vh"
            defaultLanguage="html"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
            }}
          />
        </div>

        {/* Preview */}
        <div className="flex-1 p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <iframe
            id="preview"
            srcDoc={code}
            className="w-full h-[80vh] border rounded-lg"
          />
        </div>
      </main>
    </div>
  );
}