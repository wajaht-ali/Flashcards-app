import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { userRouter } from "./routes/userRoutes.js";
import { cardRouter } from "./routes/cardRoutes.js";
import { subjectRouter } from "./routes/subjectRoutes.js";
import { chatRouter } from "./routes/chatRoutes.js";

//config env
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://flashcards-app-gray.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//connecting database
connectDB();

//routes
app.use("/api/v1/userAuth", userRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Flash cards app is live now");
});

app.listen(PORT, (req, res) => {
  console.log(`App is running on ${PORT}`);
});
