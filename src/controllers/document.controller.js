import pdfParse from "pdf-parse";
import processDocument from "../services/document.service.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const data = await pdfParse(req.file.buffer);

    const savedChunks = await processDocument(
  data.text,
  req.file.originalname
);

    res.status(201).json({
      message: "Document processed successfully",
      chunks: savedChunks.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to process document",
      error: error.message,
    });
  }
};