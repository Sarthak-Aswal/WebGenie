
"use client";
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

export function analyzeSEO(html: string): SEOResult {
  if (typeof window === 'undefined') {
    return {
      score: 0,
      suggestions: ['SEO analysis only runs in the browser.'],
      checks: {
        title: false,
        description: false,
        headings: false,
        images: false,
        links: false,
        keywords: false,
      },
    };
  }

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

  // (same checks as before...)


  // Check title
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

  // Check meta description
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

  // Check headings hierarchy
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

  // Check images
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

  // Check links
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

  // Check keywords in content
  const bodyText = doc.body.textContent || '';
  if (bodyText.length < 300) {
    suggestions.push('Add more content to improve keyword density');
    score -= 10;
  } else {
    checks.keywords = true;
  }

  // Ensure score stays within 0-100
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    suggestions,
    checks,
  };
}