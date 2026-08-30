import express from "express";
import cors from "cors";

import documentRoutes from "./routes/document.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "RAG API is running",
  });
});

export default app;