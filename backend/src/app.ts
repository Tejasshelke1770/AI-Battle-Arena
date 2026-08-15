import express from "express";
import cors from "cors";
import graphFun from "../src/services/graph.ai.services.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/api/invoke", async (req, res) => {
  const userMessage = req.body.message;
  const data = await graphFun(userMessage);
  res.status(200).json(data);
});

export default app;
