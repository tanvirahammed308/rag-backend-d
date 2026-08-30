import DocumentChunk from "../models/DocumentChunk.js";
import createEmbedding from "./embedding.service.js";
import chunkText from "../utils/chunkText.js";

const processDocument = async (text, documentName) => {
  // 1. Split the document into chunks
  const chunks = chunkText(text);

  // 2. Create embeddings for all chunks concurrently
  const documents = await Promise.all(
    chunks.map(async (content, index) => {
      const embedding = await createEmbedding(content);

      return {
        documentName,
        content,
        embedding,
        metadata: {
          chunkIndex: index,
        },
      };
    })
  );

  // 3. Save all chunks and embeddings to MongoDB
  const savedDocuments = await DocumentChunk.insertMany(documents);

  return savedDocuments;
};

export default processDocument;