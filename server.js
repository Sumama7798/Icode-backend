import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";
import createRoutes from "./routes/create.route.js";
import cardsRoutes from "./routes/cards.route.js";
import cors from "cors";
import superAdminRoutes from "./routes/superAdmin.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//allows us to get data from req.body
app.use(
  cors({
    origin: ["https://icodeltd.com", "https://icode-admin-panel.vercel.app"], // Allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/admin/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/admin/create", createRoutes);
app.use("/api/admin/super",superAdminRoutes)
app.use("/api", cardsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to iCode API");
});

connectDB();
app.listen(PORT, () => {
  console.log("server is running on http://localhost:" + PORT);
  console.log("MONGO_URI:", process.env.MONGO_URI);
});
