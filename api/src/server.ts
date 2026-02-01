// api/src/server.ts

import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  console.log("Health check hit");
  res.status(200).json({
    status: "UP",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/version', (req, res) => {
    const payload = {
      name: "wanderwise-api",
      version: '1.0.0',
      lastUpdated: new Date().toISOString()
    };
    // Respond with JSON data
    res.status(200).json(payload);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
