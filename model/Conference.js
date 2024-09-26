import mongoose from "mongoose";
const Schema = mongoose.Schema;

const confSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  charges: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  bookingId: {
    type: String,
  },
});

const Conferences = mongoose.model("Conference", confSchema);
export default Conferences;
