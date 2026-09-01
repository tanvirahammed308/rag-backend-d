# RAG Backend

A backend API for a **Retrieval-Augmented Generation (RAG) chatbot** built with Node.js, Express.js, MongoDB, and OpenAI.

The backend allows users to:

* Upload PDF documents
* Extract text from PDFs
* Split documents into chunks
* Generate embeddings
* Store document chunks and embeddings in MongoDB
* Ask questions about uploaded documents
* Retrieve relevant document chunks
* Generate AI-powered answers

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **OpenAI API**
* **unpdf** — PDF text extraction
* **Multer** — File upload handling
* **Axios** — API requests
* **CORS**
* **dotenv**
* **Vercel** — Deployment

---

## 📁 Project Structure

```text
rag-backend/
│
├── api/
│   └── index.js
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── chat.controller.js
│   │   └── document.controller.js
│   │
│   ├── middlewares/
│   │   └── upload.middleware.js
│   │
│   ├── models/
│   │   └── DocumentChunk.js
│   │
│   ├── routes/
│   │   ├── chat.routes.js
│   │   └── document.routes.js
│   │
│   ├── services/
│   │   ├── chat.service.js
│   │   ├── document.service.js
│   │   └── embedding.service.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/tanvirahammed308/rag-backend-d.git
```

Go into the project directory:

```bash
cd rag-backend-d
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

OPENAI_API_KEY=your_openai_api_key

FRONTEND_URL=http://localhost:3000
```

For production, set:

```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Example

```env
PORT=5000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rag

OPENAI_API_KEY=your_openai_api_key

FRONTEND_URL=https://rag-frontend-d.vercel.app
```

> Never commit `.env` to GitHub.

Make sure `.gitignore` contains:

```gitignore
node_modules/
.env
.vercel/
```

---

# 🗄️ MongoDB

This project uses MongoDB to store document chunks and their embeddings.

You can use:

* MongoDB Atlas
* Local MongoDB

For MongoDB Atlas, create a database and copy the connection string into:

```env
MONGODB_URI=your_connection_string
```

---

# 📄 PDF Processing

PDF files are processed using `unpdf`.

The upload flow is:

```text
PDF File
   ↓
Multer
   ↓
PDF Buffer
   ↓
unpdf
   ↓
Extracted Text
   ↓
Text Chunks
   ↓
Embeddings
   ↓
MongoDB
```

The project uses `unpdf` instead of `pdf-parse`.

This avoids the `pdfjs-dist` / `@napi-rs/canvas` compatibility problems that occurred during Vercel deployment.

---

# 🧠 RAG Architecture

The application follows a standard RAG pipeline.

```text
                USER
                 │
                 ▼
          Upload PDF
                 │
                 ▼
        Extract PDF Text
                 │
                 ▼
          Split into Chunks
                 │
                 ▼
        Generate Embeddings
                 │
                 ▼
             MongoDB
                 │
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
      Query           Document Data
        │
        ▼
 Generate Query Embedding
        │
        ▼
 Find Relevant Chunks
        │
        ▼
       LLM
        │
        ▼
      Answer
```

---

# 📡 API Endpoints

## Health Check

### GET `/`

Checks whether the API is running.

Example:

```http
GET /
```

Response:

```json
{
  "message": "RAG API is running"
}
```

---

# 📤 Upload Document

### POST `/api/documents/upload`

Uploads and processes a PDF document.

### Request

Use `multipart/form-data`.

Field name:

```text
document
```

Example:

```http
POST /api/documents/upload
Content-Type: multipart/form-data
```

### Response

```json
{
  "message": "Document processed successfully",
  "chunks": 15
}
```

### Error Response

```json
{
  "message": "PDF file is required"
}
```

---

# 💬 Chat

### POST `/api/chat`

Sends a question to the RAG system.

Example request:

```json
{
  "message": "What is this document about?"
}
```

Example response:

```json
{
  "answer": "The document is about..."
}
```

---

# 🌐 CORS

The backend allows requests from the frontend using the `FRONTEND_URL` environment variable.

Example:

```env
FRONTEND_URL=https://rag-frontend-d.vercel.app
```

Express configuration:

```js
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
```

For local development:

```env
FRONTEND_URL=http://localhost:3000
```

---

# 💻 Development

Start the development server:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

Production start:

```bash
npm start
```

---

# 🔧 Package Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

---

# ☁️ Vercel Deployment

The backend can be deployed to Vercel using the `api/index.js` entry point.

`api/index.js`:

```js
import "dotenv/config";

import app from "../src/app.js";
import connectDB from "../src/config/db.js";

await connectDB();

export default app;
```

After deployment, your API will be available at:

```text
https://your-project.vercel.app
```

Health check:

```text
https://your-project.vercel.app/
```

---

# 🔑 Vercel Environment Variables

Add these variables in your Vercel project settings:

```text
MONGODB_URI
OPENAI_API_KEY
FRONTEND_URL
```

For example:

```text
MONGODB_URI = your MongoDB URI

OPENAI_API_KEY = your OpenAI API key

FRONTEND_URL = https://rag-frontend-d.vercel.app
```

After changing environment variables, redeploy the project.

---

# 🧪 Testing

You can test the API using:

* Postman
* Thunder Client
* Insomnia
* Frontend application
* Browser for the health check endpoint

### Health Check

```http
GET https://your-project.vercel.app/
```

### Upload

```http
POST https://your-project.vercel.app/api/documents/upload
```

Body:

```text
form-data

document → your-file.pdf
```

### Chat

```http
POST https://your-project.vercel.app/api/chat
```

Body:

```json
{
  "message": "Summarize this document."
}
```

---

# ⚠️ Important: OpenAI API Credits

The embedding and chat functionality uses the OpenAI API.

If the API account has no available credits, requests can fail with:

```text
429 RateLimitError
```

For example:

```text
You have no credits remaining.
```

This is an OpenAI billing/quota issue, not an Express or MongoDB issue.

---

# 🛠️ Troubleshooting

## PDF processing error

If you see:

```text
ENOENT: no such file or directory,
open './test/data/05-versions-space.pdf'
```

make sure the project is not using an incompatible `pdf-parse` version.

This project uses:

```text
unpdf
```

for PDF processing.

---

## CORS Error

If the browser shows:

```text
No 'Access-Control-Allow-Origin' header
```

check:

```env
FRONTEND_URL=https://your-frontend.vercel.app
```

The URL must exactly match the frontend origin.

For example:

```env
FRONTEND_URL=https://rag-frontend-d.vercel.app
```

Then redeploy the backend.

---

## 404 Error

Make sure the API URL contains `/api`:

```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

Then the frontend request:

```text
/documents/upload
```

becomes:

```text
https://your-backend.vercel.app/api/documents/upload
```

---

# 🔒 Security

Never expose these values in frontend code:

```text
OPENAI_API_KEY
MONGODB_URI
```

Keep them in backend environment variables.

Do not commit:

```text
.env
```

to GitHub.

---

# 📌 Current API Base URL

Production:

```text
https://rag-backend-d-yxyo.vercel.app/api
```

Frontend environment variable:

```env
NEXT_PUBLIC_API_URL=https://rag-backend-d-yxyo.vercel.app/api
```

---

# 👨‍💻 Author

**Tanvir**

Built as a full-stack RAG chatbot project using:

```text
Next.js
React
Express.js
MongoDB
OpenAI
unpdf
Vercel
```


