import express from "express";
import {
  getAdmin,
  addRoom,
  addConferenceRoom,
  addMenuItem,
} from "../controller/admin-controller.js";

const router = express.Router();

router.get("/", getAdmin);
router.post("/rooms/add", addRoom);
router.post("/conference/add", addConferenceRoom);
router.post("/menu/add", addMenuItem);

export default router;
