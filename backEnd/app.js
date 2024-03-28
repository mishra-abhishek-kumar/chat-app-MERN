//import required to create express app
import express from "express";
//import required to congigure .env file
import dotenv from "dotenv";
//import required to access cookies
import cookieParser from "cookie-parser";

//import required for routing
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connectToMongoDB from "./db/coonnectToMongoDB.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //help to parse request from body in JSON format
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
// 	res.send("Hello World!!");
// });

app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server running on port: ${PORT}`);
});
