import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "../routes/todoRoute.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("server is running succesfully");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database is connected succesfully ");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/todo", todoRoutes);
