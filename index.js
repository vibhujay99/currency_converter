// const transferRoutes = require('./routes/transferRoutes');
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import transferRoutes from "./routes/transferRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/transfers", transferRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.error(err));
