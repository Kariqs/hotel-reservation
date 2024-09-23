import express from "express";
import { getAdmin, addRoom } from "../controller/admin-controller.js";

const router = express.Router();

router.get("/", getAdmin);
router.post("/rooms/add", addRoom);

export default router;
