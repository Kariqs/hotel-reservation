import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import base_routes from "../routes/base-routes.js";
import admin_routes from "../routes/admin-routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/hotel-reservation";
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(base_routes);
app.use("/admin", admin_routes);

async function startServer(port, mongo_uri) {
  try {
    await mongoose.connect(mongo_uri, {});
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer(PORT, MONGODB_URL);

export default app;
