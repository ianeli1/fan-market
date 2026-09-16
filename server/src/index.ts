import express from "express";
import cors from "cors";
import fansRouter from "./routes/fans";

const app = express();
const PORT = 4000;

// Allow the React app (running on a different port) to talk to us.
app.use(cors());
app.use(express.json());

// A tiny health check so you can tell the server is alive.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/fans", fansRouter);

app.listen(PORT, () => {
  console.log(`Fan Market API is running on http://localhost:${PORT}`);
});
