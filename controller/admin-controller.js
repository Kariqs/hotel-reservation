import Rooms from "../model/Rooms.js";
export const getAdmin = (req, res) => {
  res.render("admin/admin-dashboard");
};

export const addRoom = async (req, res) => {
  let { type, single, double, total, url } = req.body;
  if (type === "Twin Room") {
    double = undefined;
  }
  if (!type || !single || !total || !url) {
    return res.status(400).json({ error: "Please provide all room details." });
  }
  try {
    const room = new Rooms({
      roomtype: type,
      singlePrice: single,
      doublePrice: double,
      totalRooms: total,
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
