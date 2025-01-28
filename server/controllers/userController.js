import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';
import userLogin from '../models/userLogin.js'
import dotenv from 'dotenv';

dotenv.config();

class UserController {
  async getAllProducts(req, res) {
    try {
      const products = await userModel.find(); 
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductsByType(req, res) {
    try {
      const { type } = req.params;
      if (!type) {
        return res.status(400).json({ message: "Product type is required" });
      }
      const products = await userModel.find({ productType: type });
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found for the specified type" });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

//login
async register(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await userLogin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userLogin({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async login(req, res) {
  try {
    const { email, password } = req.body;
    console.log('Email received:', email);  
    const user = await userLogin.findOne({ email });
    console.log('User found:', user);  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


  // Logout 
  logout(req, res) {
    try {
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
