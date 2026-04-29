"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const PLATFORM_STRATEGIES = {
  linkedin: {
    prompt: "Generate a professional, thought-leadership style LinkedIn post. Focus on industry impact, innovation, and long-term vision. Use a sophisticated tone.",
    fallback: {
      title: "Neural Frontiers: BME CONCLAVE 2026",
      body: "The convergence of biological intelligence and silicon-based logic at the BME Conclave 2026 was unprecedented.",
      quote: "Technology is no longer a tool; it is an evolution.",
      hashtags: "#CORESHIFT #INTELLIGENCE #BME2026"
    }
  },
  instagram: {
    prompt: "Generate a high-energy, visual-first Instagram caption. Focus on aesthetics, vibes, and futuristic 'wow' factor. Use emojis.",
    fallback: {
      title: "BME 2026: THE NEURAL SHIFT",
      body: "Witness the genesis of the next human iteration. Biological intelligence meets silicon logic. 🧠⚡️",
      quote: "The future is no longer a destination. It's a calculation.",
      hashtags: "#NEURAL #EVOLUTION #BME2026"
    }
  },
  casestudy: {
    prompt: "Generate a structured Technical Report/Case Study summary. Focus on metrics, methodology, and specific clinical observations. Return a professional report format.",
    fallback: {
      title: "ANALYTICAL REPORT: NEURAL INTEGRATION",
      body: "The BME Conclave 2026 dataset reveals a 45% increase in neural-link stability compared to 2025 prototypes.",
      quote: "Data confirms a shift from experimental to viable neural infrastructure.",
      hashtags: "#RESEARCH #DATA #BME2026"
    }
  }
};

export async function forgeContent(platform: string, context: string) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  const strategy = PLATFORM_STRATEGIES[platform as keyof typeof PLATFORM_STRATEGIES] || PLATFORM_STRATEGIES.linkedin;

  // Simulate heavy processing time
  await new Promise(resolve => setTimeout(resolve, 3000));

  if (!apiKey) return strategy.fallback;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let multimodalData = null;

    // Try to extract Google Drive File ID for real multimodal analysis
    const driveIdMatch = context.match(/[-\w]{25,}/);
    if (driveIdMatch && context.includes("drive.google.com")) {
      const fileId = driveIdMatch[0];
      try {
        const response = await fetch(`https://drive.google.com/uc?export=download&id=${fileId}`);
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          multimodalData = {
            inlineData: {
              data: Buffer.from(buffer).toString("base64"),
              mimeType: "image/jpeg" // Fallback to image, Gemini is smart enough to handle some mismatch
            }
          };
        }
      } catch {
        console.log("Multimodal Fetch Failed (Safe Fallback to Text Analysis)");
      }
    }

    const prompt = `You are Forge-AI, an elite multimodal content engine. 
    Platform Context: ${platform}
    Asset Context: ${context}
    
    TASK: ${strategy.prompt}
    
    REQUIREMENTS:
    1. Return ONLY valid JSON with fields: "title", "body", "quote", "hashtags".
    2. If an image/video is provided, analyze the visual details (lighting, subjects, technology shown).
    3. Theme: Neural Frontiers & BME Conclave 2026.`;

    const result = multimodalData 
      ? await model.generateContent([prompt, multimodalData])
      : await model.generateContent(prompt);
      
    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return strategy.fallback;
  }
}
