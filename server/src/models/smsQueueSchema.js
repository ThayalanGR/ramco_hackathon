import mongoose from "mongoose";
const smsQueueSchema = mongoose.Schema({
	mobile: String,
	message: String,
});

const SMSQueue = mongoose.model("SMSQueue", smsQueueSchema);

export { SMSQueue };
