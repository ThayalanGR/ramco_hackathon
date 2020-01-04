import mongoose from "mongoose";

export default async () => {
  let mongoUrl = "mongodb://localhost:27017/ramco-retail";
  await mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log("Connection Successful!");
    })
    .catch(err => console.error("Mongo db connection failed!", err.message));
};
