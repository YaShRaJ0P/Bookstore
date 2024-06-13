import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", false);
const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(
  cors({
    origin: ["https://bookstore-ofx6bxw3t-yashraj0ps-projects.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/books", booksRoute);
app.use("/user", userRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
