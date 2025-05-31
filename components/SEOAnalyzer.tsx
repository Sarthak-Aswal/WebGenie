"use client";
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SEOAnalyzerProps {
  html: string;
}

interface SEOResult {
  score: number;
  suggestions: string[];
  checks: {
    title: boolean;
    description: boolean;
    headings: boolean;
    images: boolean;
    links: boolean;
    keywords: boolean;
  };
}

export default function SEOAnalyzer({ html }: SEOAnalyzerProps) {
  const [analysis, setAnalysis] = useState<SEOResult | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const analyzeSEO = (html: string): SEOResult => {
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

      const metaDescription = doc.querySelector('meta[name="description"]');
      if (!metaDescription || !metaDescription.getAttribute('content')) {
        suggestions.push('Add a meta description');
        score -= 15;
      } else if (metaDescription.getAttribute('content')!.length < 120 || metaDescription.getAttribute('content')!.length > 160) {
        suggestions.push('Meta description length should be between 120-160 characters');
        score -= 10;
        checks.description = true;
      } else {
        checks.description = true;
      }

      const h1 = doc.querySelectorAll('h1');
      if (h1.length === 0) {
        suggestions.push('Add an H1 heading');
        score -= 10;
      } else if (h1.length > 1) {
        suggestions.push('Use only one H1 heading per page');
        score -= 5;
      } else {
        checks.headings = true;
      }

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
      if (!hasImageIssues) checks.images = true;

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
      if (!hasLinkIssues) checks.links = true;

      const bodyText = doc.body.textContent || '';
      if (bodyText.length < 300) {
        suggestions.push('Add more content to improve keyword density');
        score -= 10;
      } else {
        checks.keywords = true;
      }

      score = Math.max(0, Math.min(100, score));

      return {
        score,
        suggestions,
        checks,
      };
    };

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
