import express from "express";
import {
  getDashboard,
  getRoom,
  getConferenceRooms,
  bookRoom,
  bookConference,
} from "../controller/base-controller.js";

const router = express.Router();

router.get("/", getDashboard);
router.get("/room", getRoom);
router.get("/conference-rooms", getConferenceRooms);
router.post("/book-room", bookRoom);
router.post("/book-conference", bookConference);

export default router;
