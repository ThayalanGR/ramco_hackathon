import { dbconfig, middleware } from "./config";
import express from "express";
import { retailRoutes, customerRoutes, smsRoutes } from "./modules";
import passport from "passport";
import transporter from "./modules/mail";
import config from "config";

const app = express();
const PORT = process.env.PORT || 2000;

dbconfig();
middleware(app);

app.get("/", (req, res) => {
	res.send("Hi from team .YAG");
});

app.use("/retailer", retailRoutes);
app.use("/customer", customerRoutes);
app.use("/sms", smsRoutes);

app.get(
	"/auth/facebook",
	passport.authenticate("facebook", { scope: ["email"] }),
);

app.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", { session: false }),
	(req, res) => {
		const payload = { customer: req.user };
		res.redirect(
			`http://localhost:3000/callback/${payload.customer.name}/${payload.customer.email}`,
		);
	},
);
app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["email", "profile"],
	}),
);
app.get(
	"/auth/google/callback",
	passport.authenticate("google", { session: false }),
	(req, res) => {
		const payload = { customer: req.user };
		res.redirect(
			`http://localhost:3000/callback/${payload.customer.name}/${payload.customer.email}`,
		);
	},
);

app.post("/sendmail", (req, res) => {
	const { to, message, subject } = req.body;
	const mailOptions = {
		from: `${config.get("username")}@gmail.com`,
		to,
		subject,
		html: `<p>${message}</p>`,
	};
	try {
		setTimeout(function() {
			transporter.sendMail(mailOptions);
		}, 0);

		res.json({
			msg: `email has been successfully sent to ${to}`,
			status: true,
		});
	} catch (error) {
		console.error(error.message);
		res.json({
			msg: `email has not been sent`,
			status: false,
		});
	}
});

app.listen(PORT, () => {
	console.log("openbeats server up and running!");
});
