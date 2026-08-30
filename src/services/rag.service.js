import openai from "../config/openai.js";
import DocumentChunk from "../models/DocumentChunk.js";
import createEmbedding from "./embedding.service.js";

const askQuestion = async (question) => {
  // 1. Create embedding for user question
  const queryEmbedding = await createEmbedding(question);

  // 2. Vector search
  const results = await DocumentChunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 5,
      },
    },
    {
      $project: {
        content: 1,
        documentName: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  // 3. Prepare context
  const context = results
    .map((item) => item.content)
    .join("\n\n");

  // 4. Send context + question to LLM
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content:
          "Answer the question using only the provided context. If the answer is not in the context, say you don't know.",
      },
      {
        role: "user",
        content: `
Context:

${context}

Question:

${question}
        `,
      },
    ],
  });

  return {
    answer: response.choices[0].message.content,
    sources: results,
  };
};

export default askQuestion;