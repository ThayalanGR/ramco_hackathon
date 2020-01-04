import mongoose from "mongoose";
const CustomerSchema = mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  coupons: [
    {
      couponId: String,
      isAvailed: {
        type: Boolean,
        default: false
      }
    }
  ],
  Invoices: Array,
  retailerId: String,
  creationDate: {
    type: Date,
    default: Date.now()
  }
});

var Customer = mongoose.model("Customer", CustomerSchema);

export { Customer };
