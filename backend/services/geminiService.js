const axios = require("axios");

async function analyzeEmotion(text) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze the emotion of this journal entry.

Return ONLY JSON:

{
 "emotion": "",
 "keywords": [],
 "summary": ""
}

Journal: ${text}`
              }
            ]
          }
        ]
      }
    );

    let output = response.data.candidates[0].content.parts[0].text;

    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(output);

  } catch (error) {
    console.log("Gemini Error:", error.response?.data || error.message);

    return {
      emotion: "unknown",
      keywords: [],
      summary: "Analysis failed"
    };
  }
}

module.exports = analyzeEmotion;