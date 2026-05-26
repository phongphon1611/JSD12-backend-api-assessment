import express from "express";
import cors from "cors";
import { router as apiRouter } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Custom middleware: request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/api", apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

const server = app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}😎😋😊😉😆😅😄🤣😂😁😀`,
  );
});
