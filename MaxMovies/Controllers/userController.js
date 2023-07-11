import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModal from "../Modals/adminmodal.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModal.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred while registering user.' });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful.",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred while logging in." });
  }
};
