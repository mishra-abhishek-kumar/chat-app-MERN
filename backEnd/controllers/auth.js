import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateAccessTokenAndSetCookie from "../utils/generateAccessToken.js";

export const signUp = async (req, res) => {
	try {
		const { fullName, userName, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Password doesn't match" });
		}

		const user = await User.findOne({ userName });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//https://avatar-placeholder.iran.liara.run/  (API endpoint for random image)
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

		const newUser = new User({
			fullName,
			userName,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			//generates JWT token
			generateAccessTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				userName: newUser.userName,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const logIn = async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName });
		const isPasswordCorrect = await bcrypt.compare(
			password,
			user?.password || ""
		);

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid userId or password" });
		}

		generateAccessTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			userName: user.userName,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const logOut = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
