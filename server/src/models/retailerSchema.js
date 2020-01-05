import mongoose, { Schema } from "mongoose";
const RetailerSchema = mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now()
  },
  retailerName: String,
  emailId: String,
  mobileNo: Number,
  shortLink: String,
  customers: Array,
  password: String,
  mobile: Number
});

var Retailer = mongoose.model("Retailer", RetailerSchema);

export { Retailer };
