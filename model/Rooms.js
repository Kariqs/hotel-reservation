import mongoose from "mongoose";
const Schema = mongoose.Schema;
const roomsSchema = new Schema({
  roomtype: {
    type: String,
    required: true,
  },
  singlePrice: {
    type: Number,
    required: true,
  },
  doublePrice: {
    type: Number,
  },
  totalRooms: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Rooms = mongoose.model("Rooms", roomsSchema);
export default Rooms;
