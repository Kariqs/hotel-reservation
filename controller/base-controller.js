import randomatic from "randomatic";
import BookConference from "../model/BookConference.js";
import BookRoom from "../model/BookRoom.js";
import Conferences from "../model/Conference.js";
import Rooms from "../model/Rooms.js";
import { bookingEmail } from "../utils/sendmail.js";
export const getDashboard = (req, res) => {
  res.render("base/dashboard");
};

const fetchRoom = async (keyword, res) => {
  try {
    const room = await Rooms.findOne({ roomtype: keyword });
    if (room) {
      res.render("base/room", {
        room: room,
        title: room.roomtype + " Room",
        availableRooms: room.availableRooms,
      });
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

export const bookRoom = async (req, res) => {
  const { roomType, name, email, phone, type, number, arrival, departure } =
    req.body;
  try {
    // Find the room based on room type
    const rooms = await Rooms.findOne({ roomtype: roomType });

    // Check if room exists
    if (!rooms) {
      return res.status(404).json({ message: "Room type not found." });
    }

    // Parse the number of rooms to book, ensuring it's a valid integer
    const roomsToBook = parseInt(number, 10);

    // If roomsToBook is not a valid number, or less than 1, return an error
    if (isNaN(roomsToBook) || roomsToBook < 1) {
      return res
        .status(400)
        .json({ message: "Invalid number of rooms selected." });
    }

    // Check if the number of available rooms is sufficient
    if (rooms.availableRooms < roomsToBook) {
      return res.status(400).json({
        message: "Please choose a lower number of rooms, not enough available.",
      });
    }

    //generate a booking ID
    const bookingId = randomatic("A0", 8);
    // Create a new booking entry
    const bookRoom = new BookRoom({
      roomType: roomType,
      name: name,
      email: email,
      phone: phone,
      type: type,
      number: roomsToBook,
      arrival: arrival,
      departure: departure,
      bookingId: bookingId,
    });

    // Save the booking details to the database
    const bookedRoom = await bookRoom.save();

    // Subtract the booked rooms from available rooms
    rooms.availableRooms = rooms.availableRooms - roomsToBook;

    // Save the room with the updated availability
    await rooms.save();

    //send email with info
    bookingEmail(
      email,
      name,
      `You have successfully booked a stay with us. You booked ${roomsToBook} room(s).
       Your booking code is ${bookingId}, keep this email and present the booking code at the reception when checking in.`,
      "ROOM BOOKED SUCCESSFULLY",
      null
    );
    // Send the success response
    res.status(201).json({
      message: "Room booked successfully. Check your email for more info.",
      bookedRoom,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to book room." });
  }
};

export const bookConference = async (req, res) => {
  const {
    roomName,
    arrivalDate,
    departureDate,
    checkinTime,
    checkoutTime,
    organisationName,
    email,
  } = req.body;
  try {
    const room = await Conferences.findOne({ name: roomName });
    if (!room) {
      return res.status(400).json({ message: "Room not found!" });
    }
    if (room.status === "Booked") {
      return res.status(400).json({
        message: "This room is already booked.",
      });
    }
    const bookingId = randomatic("A0", 8);
    const bookConferenceRoom = new BookConference({
      roomName: roomName,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      checkinTime: checkinTime,
      checkoutTime: checkoutTime,
      organisationName: organisationName,
      email: email,
      bookingId: bookingId,
    });
    const bookedConferenceRoom = await bookConferenceRoom.save();
    room.status = "Booked";
    room.bookingId = bookingId;
    await room.save();
    bookingEmail(
      email,
      organisationName,
      `You have successfully booked a conference room with us.
       Your booking code is ${bookingId}, keep this email and present the booking code at the reception when checking in.`,
      "CONFERENCE ROOM BOOKED SUCCESSFULLY",
      null
    );
    res.status(201).json({
      message:
        "Conference room booked successfully. Check your email for more info.",
      bookedConferenceRoom: bookedConferenceRoom,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to book conference room." });
  }
};


