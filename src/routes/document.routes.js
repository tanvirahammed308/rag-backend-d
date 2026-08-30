import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  uploadDocument,
} from "../controllers/document.controller.js";

const router = express.Router();



router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);

export default router;