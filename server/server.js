import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { cardRouter } from "./routes/cardRoutes.js";

//config env
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    withCredentials: true,
  })
);

//connecting database
connectDB();

//routes
app.use("/api/v1/userAuth", userRouter);
app.use("/api/v1/cards", cardRouter);

app.get("/", (req, res) => {
  res.send("Flash cards app is live now");
});

app.listen(PORT, (req, res) => {
  console.log(`App is running on ${PORT}`);
});
