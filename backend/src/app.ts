import express from "express";
import graphFun from "../src/services/graph.ai.services.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/api/test-graph", async (req, res) => {
  const userMessage = req.body.message;
  const data = await graphFun(userMessage);
  res.status(200).json({ data });
});

export default app;
