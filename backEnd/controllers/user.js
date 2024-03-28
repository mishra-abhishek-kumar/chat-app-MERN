import User from "../models/user.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		//fetch every user except the loggedin user without password
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
		}).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.log("Error in getUsersForSidebar controller", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
