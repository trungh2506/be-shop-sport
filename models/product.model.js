import mongoose from "mongoose";

const size_list = new Schema({
  size_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const product_schema = new Schema({
  state: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  images: {
    type: [String],
  },
  description: {
    type: String,
  },
  size_list: {
    type: [size_list],
  },
  is_deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default Product = mongoose.model("Product", product_schema);
