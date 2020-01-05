import { Router } from "express";
import { SMSQueue } from "../models/index";

const routes = Router();

routes.post("/create", async (req, res) => {
	const { mobile, message, mobileList } = req.body;
	try {
		if (!mobileList) {
			const sms = new SMSQueue({ mobile, message });
			await sms.save();
			res.send(sms);
		} else {
			let sucessList = [];
			mobileList.forEach(async mobile => {
				const sms = new SMSQueue({ mobile, message });
				await sms.save();
				sucessList.unshift(sms);
			});
			res.send({ msg: "Successfully sent to the list of numbers" });
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send({ msg: "Server Error" });
	}
});

routes.get("/list", async (req, res) => {
	const { mobile, message } = req.body;
	try {
		const smsqueue = await SMSQueue.find();
		await SMSQueue.remove({});
		res.send(smsqueue);
	} catch (error) {
		console.error(error.message);
		res.status(500).send({ msg: "Server Error" });
	}
});

export default routes;
