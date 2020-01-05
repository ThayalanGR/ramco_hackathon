import { dbconfig, middleware } from "./config";
import express from "express";
import { retailRoutes, customerRoutes, authRoutes } from "./modules";

const app = express();
const PORT = process.env.PORT || 2000;

dbconfig();
middleware(app);

app.get("/", (req, res) => {
  res.send("Hi from team .YAG");
});

app.use("/retailer", retailRoutes);
app.use("/customer", customerRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("openbeats server up and running!");
});
