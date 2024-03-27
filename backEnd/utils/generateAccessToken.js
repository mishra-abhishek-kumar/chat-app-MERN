import jwt from "jsonwebtoken";

const generateAccessTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, //to make time in millisec
		httpOnly: true, //prevent XSS or cross-site server attack
		sameSite: "strict", //CSRF attacks
        secure: process.env.NODE_ENV !== "development"
	});
};

export default generateAccessTokenAndSetCookie;