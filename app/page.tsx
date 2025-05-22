// Update the generateWithGemini function in app/page.tsx
const generateWithGemini = async (userPrompt: string) => {
  try {
    const apiKey = "AIzaSyB_MsKOez2l0Mfs";
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
            text: `Generate a complete, modern, and responsive website based on this description. 
            Return the code split into three separate sections marked with ---HTML---, ---CSS---, and ---JS--- respectively.
            
            Requirements:
            - Create semantic HTML5 structure
            - Write modern, responsive CSS with flexbox/grid
            - Add interactive JavaScript features
            - Ensure mobile-first design
            - Include proper meta tags and SEO elements
            - Add appropriate comments
            - Use modern best practices
            
            Description: ${userPrompt}`
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

    // Parse the sections
    const htmlMatch = generatedText.match(/---HTML---([\s\S]*?)(?=---CSS---|$)/);
    const cssMatch = generatedText.match(/---CSS---([\s\S]*?)(?=---JS---|$)/);
    const jsMatch = generatedText.match(/---JS---([\s\S]*?)$/);

    const template = {
      name: prompt || "Generated Website",
      html: htmlMatch?.[1]?.trim() || '',
      css: cssMatch?.[1]?.trim() || '',
      js: jsMatch?.[1]?.trim() || ''
    };

    sessionStorage.setItem('generatedTemplate', JSON.stringify(template));
    router.push('/editor');
  } catch (err) {
    console.error("Generation error:", err);
    throw new Error('Failed to generate website. Please try a different prompt.');
  }
};