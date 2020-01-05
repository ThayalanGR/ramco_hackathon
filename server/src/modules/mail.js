import config from "config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.get("username"),
		pass: config.get("gpword"),
	},
});

export default transporter;
