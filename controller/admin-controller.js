import BookConference from "../model/BookConference.js";
import BookRoom from "../model/BookRoom.js";
import Conferences from "../model/Conference.js";
import Menu from "../model/Menu.js";
import Rooms from "../model/Rooms.js";
export const getAdmin = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    const bookedRooms = await BookRoom.find();
    const conferenceRooms = await Conferences.find();
    const bookedConference = await BookConference.find();
    const menuItems = await Menu.find();
    res.render("admin/admin-dashboard", {
      rooms: rooms,
      bookedRooms: bookedRooms,
      conferenceRooms: conferenceRooms,
      bookedConference: bookedConference,
      menuItems: menuItems,
    });
  } catch (error) {
    console.log("An error occured:" + error);
    res.status(500).json({ error: "Unabe to fetch the rooms." });
  }
};

export const addRoom = async (req, res) => {
  let { type, single, double, total, url } = req.body;
  if (type === "Twin Room") {
    double = undefined;
  }

  try {
    if (!type || !single || !total || !url) {
      return res
        .status(400)
        .json({ error: "Please provide all room details." });
    }
    const isAlreadySaved = await Rooms.findOne({ roomtype: type });
    if (isAlreadySaved) {
      return res.status(409).json({ message: "The room is already saved." });
    }
    const room = new Rooms({
      roomtype: type,
      singlePrice: single,
      doublePrice: double,
      totalRooms: total,
      availableRooms: total,
      imageUrl: url,
    });
    const savedRoom = await room.save();
    return res.status(201).json({
      message: "Room added successfully!",
      room: savedRoom,
    });
  } catch (error) {
    console.error("Error saving room:", error);
    return res
      .status(500)
      .json({ error: "Failed to add room. Try again later." });
  }
};

export const addConferenceRoom = async (req, res) => {
  const { confname, capacity, charges, confdesc, url } = req.body;
  try {
    if (!confname || !capacity || !confdesc || !charges || !url) {
      return res.status(400).json({ error: "Kindly fill in all the fields." });
    }
    const isAlreadySaved = await Conferences.findOne({ name: confname });
    if (isAlreadySaved) {
      return res
        .status(409)
        .json({ error: "The conference room is already saved." });
    }
    const conference = new Conferences({
      name: confname,
      capacity: capacity,
      charges: charges,
      description: confdesc,
      imageUrl: url,
      status: "Available",
    });
    const savedConference = await conference.save();
    res.status(201).json({
      message: "Conference room added successfully.",
      conference: savedConference,
    });
  } catch (error) {
    console.log("Error saving confernce room:", error);
    return res
      .status(500)
      .json({ error: "Failed to add room. Try again later." });
  }
};

export const addMenuItem = async (req, res) => {
  const { name, price, imageUrl } = req.body;
  if (!name || !price || !imageUrl) {
    return res.status(400).json({ message: "Kindly fill in all the fields" });
  }
  try {
    const menuItem = new Menu({
      itemName: name,
      itemPrice: price,
      itemImageUrl: imageUrl,
    });
    await menuItem.save();
    res.status(201).json({ message: "Menu item added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding menu Item" });
  }
};
