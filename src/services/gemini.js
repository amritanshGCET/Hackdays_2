const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.8-flash';

export async function generateApiMessage(prompt) {
  if (!apiKey) {
    return `Your API plan for "${prompt}" is ready to explore.`;
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are the API Forge assistant. Reply in one concise, friendly sentence (under 120 characters) describing the API being created from this request. Do not use markdown. Request: ${prompt}`,
        }],
      }],
    }),
  });

  if (!response.ok) {
    let details = '';
    try {
      const errorData = await response.json();
      details = errorData.error?.message ? ` ${errorData.error.message}` : '';
    } catch {
      details = '';
    }
    throw new Error(`Gemini request failed (${response.status}).${details}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || `Your API plan for "${prompt}" is ready to explore.`;
}