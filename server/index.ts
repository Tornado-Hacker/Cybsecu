import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Register API routes
const server = registerRoutes(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;