import { extractText } from "unpdf";
import processDocument from "../services/document.service.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const { text } = await extractText(req.file.buffer);

    const savedChunks = await processDocument(
      text,
      req.file.originalname
    );

    return res.status(201).json({
      message: "Document processed successfully",
      chunks: savedChunks.length,
    });
  } catch (error) {
    console.error("PDF processing error:", error);

    return res.status(500).json({
      message: "Failed to process document",
      error: error.message,
    });
  }
};