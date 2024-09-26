import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
  roomType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
  },
  number: {
    type: Number,
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
  departure: {
    type: Date,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("BookRoom", bookingSchema);
export default Book;
