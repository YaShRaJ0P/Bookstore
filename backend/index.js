import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "https://bookstore-frontend-two.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/books", booksRoute);
app.get("/", (req, res) => {
  res.send("Server is running.");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
