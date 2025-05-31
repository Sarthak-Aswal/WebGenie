"use client";
import { useEffect, useState } from 'react';
import { analyzeSEO } from '@/lib/seo-analyzer';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SEOAnalyzerProps {
  html: string;
}

export function SEOAnalyzer({ html }: SEOAnalyzerProps) {
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeSEO> | null>(null);

  useEffect(() => {
    const result = analyzeSEO(html);
    setAnalysis(result);
  }, [html]);

  if (!analysis) return null;

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">SEO Score</h3>
          <span className="text-2xl font-bold">{analysis.score}%</span>
        </div>
        <Progress value={analysis.score} className="h-2" />
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
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="text-muted-foreground">
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}