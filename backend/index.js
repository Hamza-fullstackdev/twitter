import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = config.PORT || 5000;

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    exposedHeaders: "Content-Type,Authorization",
    optionsSuccessStatus: 200,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
});
