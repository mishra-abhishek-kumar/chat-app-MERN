//import required to create express app
import express from "express";
//import required to congigure .env file
import dotenv from "dotenv";

//import required for routing
import authRoutes from "./routes/auth.js";
import connectToMongoDB from "./db/coonnectToMongoDB.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //help to parse request from body in JSON format

app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
// 	res.send("Hello World!!");
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port: ${PORT}`)
});