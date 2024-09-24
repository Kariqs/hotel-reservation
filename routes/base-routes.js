import express from "express";
import { getDashboard, getRoom } from "../controller/base-controller.js";

const router = express.Router();

router.get("/", getDashboard);
router.get("/room", getRoom);

export default router;
