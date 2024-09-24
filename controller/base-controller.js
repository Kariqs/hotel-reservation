import Rooms from "../model/Rooms.js";
import Conferences from "../model/Conference.js";
export const getDashboard = (req, res) => {
  res.render("base/dashboard");
};

const fetchRoom = async (keyword, res) => {
  try {
    const room = await Rooms.findOne({ roomtype: keyword });
    if (room) {
      res.render("base/room", { room: room, title: room.roomtype + " Room" });
    } else {
      res.status(404).send("Room not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export const getRoom = async (req, res) => {
  const type = req.query.type;
  switch (type) {
    case "deluxe":
      await fetchRoom("Deluxe", res);
      break;
    case "standard":
      await fetchRoom("Standard", res);
      break;
    case "twin":
      await fetchRoom("Twin", res);
      break;
    default:
      res.status(400).send("Invalid room type");
      break;
  }
};

export const getConferenceRooms = async (req, res) => {
  try {
    const conferenceRooms = await Conferences.find();
    res.render("base/conference-rooms", { conferenceRooms: conferenceRooms });
  } catch (error) {
    console.log("error:" + error);
    res.status(500).json({ error: "Failed to fetch conference rooms" });
  }
};
