import mongoose from "mongoose";
const Schema = mongoose.Schema;
const menuSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemImageUrl: {
    type: String,
    required: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
