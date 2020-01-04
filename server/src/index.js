import { dbconfig, middleware } from "./config";
import express from "express";
import { retailRoutes, customerRoutes } from "./modules";
import passport from "passport";
import passportStrategy from "./config/passport";

const app = express();
const PORT = process.env.PORT || 2000;

dbconfig();
middleware(app);

app.get("/", (req, res) => {
	res.send("Hi from team .YAG");
});

app.use("/retailer", retailRoutes);
app.use("/customer", customerRoutes);

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

app.listen(PORT, () => {
	console.log("openbeats server up and running!");
});
