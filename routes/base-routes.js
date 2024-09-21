import express from "express";
import { getDashboard } from "../controller/base-controller.js";

const router = express.Router();

router.get("/", getDashboard);

export default router;

