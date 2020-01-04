import mongoose from "mongoose";
const RetailerSchema = mongoose.Schema({
  retailerName: String,
  emailId: String,
  mobileNo: Number,
  shortLink: String,
  creationDate: {
    type: Date,
    default: Date.now()
  }
});

var Retailer = mongoose.model("Retailer", RetailerSchema);

export { Retailer };
