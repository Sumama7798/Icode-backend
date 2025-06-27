import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateToken, setCookies } from "../utils/authUtils.js";

export const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    //authentication
    const { accessToken, refreshToken } = generateToken(user._id);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).send(error.message);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateToken(user._id);

      // Set tokens as HTTP-only cookies
      setCookies(res, accessToken, refreshToken);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Error logging out" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,             // ✅ Must be true for SameSite: 'none'
      sameSite: "none",         // ✅ allow cookies cross-site (Vercel <-> Railway)
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ token: accessToken }); // ✅ Send token to frontend
  } catch (error) {
    console.log("Error in refresh token controller", error.message);
    res.status(500).json({ message: "Error refreshing token" });
  }
};

