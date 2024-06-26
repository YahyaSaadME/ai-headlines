const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(text,platform,toGenerate) {
    try {
      
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
    const result = await chatSession.sendMessage(`create ${toGenerate=="headline"||toGenerate=="hash tags"?'10':'a'} ${toGenerate} on ${text} for ${platform}`);
    return result
    
  } catch (error) {
    return "Something went wrong!"
      
  }
  }
  
  module.exports = run