import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookConferenceSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  checkinTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid time format!`,
    },
  },
  checkoutTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid time format!`,
    },
  },
  organisationName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
});

const BookConference = mongoose.model("BookConference", bookConferenceSchema);
export default BookConference;
