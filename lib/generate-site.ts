import type { NextApiRequest, NextApiResponse } from 'next';

interface GeneratedFiles {
  html: string;
  css: string;
  js: string;
}

const GEMINI_API_KEY = "AIzaSyBMnwO0L5CeCfOG7t2CmeyvuuSal2z51ug"; // Store in .env.local

export async function generateSite(prompt: string): Promise<GeneratedFiles> {
  try {
    const geminiPrompt = `Generate a complete, modern, and responsive website based on this description. 
    Return the code split into three separate sections marked with ---HTML---, ---CSS---, and ---JS--- respectively.
    
    Requirements:
    - Create semantic HTML5 structure
    - Write modern, responsive CSS with flexbox/grid
    - Add interactive JavaScript features
    - Ensure mobile-first design
    - Include proper meta tags and SEO elements
    - Add appropriate comments
    - Use modern best practices
    
    Description: ${prompt}`;

    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: geminiPrompt }] }],
      }),
    });

    const result = await geminiRes.json();
    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No content generated');
    }

    // Parse the sections
    const htmlMatch = generatedText.match(/---HTML---([\s\S]*?)(?=---CSS---|$)/);
    const cssMatch = generatedText.match(/---CSS---([\s\S]*?)(?=---JS---|$)/);
    const jsMatch = generatedText.match(/---JS---([\s\S]*?)$/);

    return {
      html: htmlMatch?.[1]?.trim() || '',
      css: cssMatch?.[1]?.trim() || '',
      js: jsMatch?.[1]?.trim() || '',
    };
  } catch (error) {
    console.error('Generation error:', error);
    throw new Error('Failed to generate website');
  }
}