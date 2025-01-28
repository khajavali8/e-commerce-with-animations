import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: String, 
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: String, 
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
