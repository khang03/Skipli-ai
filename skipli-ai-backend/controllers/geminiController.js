const { GeneratePostCaptions } = require("../services/gemini");

class GeminiController {
  async getPromptResponse(req, res) {
    const { prompt, tone } = req.body;

    try {
      const createCaptions = await GeneratePostCaptions(prompt, tone);
      const splitCaption = createCaptions
        .split(/\n+/) // tách từng dòng
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => {
          const caption = line.replace(/^\d+\.\s*/, "").trim(); // loại bỏ số thứ tự nếu có
          return {
            topic: prompt,
            caption,
            share: false,
          };
        });
      res.json({ success: true, response: splitCaption });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new GeminiController();
