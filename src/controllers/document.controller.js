import { extractText } from "unpdf";
import processDocument from "../services/document.service.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const uint8Array = new Uint8Array(req.file.buffer);

    const result = await extractText(uint8Array);

    const text = result.text.join("\n");

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