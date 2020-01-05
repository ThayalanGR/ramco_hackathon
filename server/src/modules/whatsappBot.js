import twilio from "twilio";
import config from "config";
import { Router } from "express";
import config from "config";

const routes = Router();

twilio(config.get("twilio").account_sid, config.get("twilio").auth_token);
const { MessagingResponse } = twilio.twiml;

routes.post("/incoming", (req, res) => {
	const twiml = new MessagingResponse();
	res.set("Content-Type", "text/xml");
	if (req.body.Body.toLowerCase() === "login using whatsapp") {
		const phoneNumber = req.body.From.substring(9);
		let url = `${config.get("liveServerUrl")}/${encodeURIComponent(
			phoneNumber,
		)}`;
		twiml.message(`Hurrah....!!!Your logged in visit this link *${url}*.`);
		res.status(200).send(twiml.toString());
	} else {
		twiml.message(
			"Type 'Login using whatsapp' to get logged in or register using whatsapp.",
		);
		res.status(200).send(twiml.toString());
	}
});

export default routes;
