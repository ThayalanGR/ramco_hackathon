import { Router } from "express";
import { Retailer } from "../models";

const routes = Router();

routes.get("/getall", (req, res) => {
  Retailer.find({}, function(err, docs) {
    if (err)
      res.send({
        status: false,
        data: null,
        log: err.toString()
      });
    res.send({
      status: true,
      data: docs
    });
  });
});

routes.get("/getid/:name", async (req, res) => {
  const name = req.params.name;
  let { _id } = await Retailer.findOne({ shortLink: name });
  res.send({ retailerId: _id });
});

routes.post("/create", (req, res) => {
  const { retailerName, emailId, mobileNo } = req.body;
  const retailer = new Retailer({
    retailerName,
    emailId,
    mobileNo,
    shortLink: retailerName
      .trim()
      .replace(/[^\w]/gi, "")
      .toLowerCase()
  });

  retailer.save(function(err, docs) {
    if (err)
      res.send({
        status: false,
        data: null,
        log: err.toString()
      });
    res.send({
      status: true,
      data: docs
    });
  });
});

export default routes;
