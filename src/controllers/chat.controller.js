import askQuestion from "../services/rag.service.js";

export const chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const result = await askQuestion(question);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to answer question",
      error: error.message,
    });
  }
};