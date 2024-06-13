import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", false);
const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());

app.use("/books", booksRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
