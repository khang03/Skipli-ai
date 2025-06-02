require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function GeneratePostCaptions(prompt, tone) {
  const fullPrompt = `Viết vài ví dụ về caption với giọng điệu "${tone}" cho yêu cầu sau: ${prompt} kèm hashtag, với mỗi kết quả bắt đầu bằng số thứ tự`;
  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error("Lỗi khi gọi Gemini API: " + error.message);
  }
}

module.exports = { GeneratePostCaptions };
