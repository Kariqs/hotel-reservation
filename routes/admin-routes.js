import express from "express";
import {
  getAdmin,
  addRoom,
  addConferenceRoom,
} from "../controller/admin-controller.js";

const router = express.Router();

router.get("/", getAdmin);
router.post("/rooms/add", addRoom);
router.post("/conference/add", addConferenceRoom);

export default router;
