import express from "express";
import {
  getDashboard,
  getRoom,
  getConferenceRooms,
} from "../controller/base-controller.js";

const router = express.Router();

router.get("/", getDashboard);
router.get("/room", getRoom);
router.get("/conference-rooms", getConferenceRooms);

export default router;
