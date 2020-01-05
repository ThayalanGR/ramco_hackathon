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

routes.post("/login", (req, res) => {
  Retailer.findOne({ emailId: req.body.email }, function(err, data) {
    if (err) {
      res.send({ status: false, data: "Invalid Credentials!" });
    } else {
      console.log(data);

      if (data.password !== req.body.password)
        res.send({ status: false, data: "Invalid Credentials!" });
      else res.send({ status: true, data: data });
    }
  });
});

routes.get("/getid/:name", async (req, res) => {
  const name = req.params.name;
  let data = await Retailer.findOne({ shortLink: name });
  res.send(data);
});

routes.post("/register", (req, res) => {
  const { retailerName, emailId, mobileNo, password } = req.body;
  const retailer = new Retailer({
    retailerName,
    emailId,
    mobileNo,
    shortLink: retailerName
      .trim()
      .replace(/[^\w]/gi, "")
      .toLowerCase(),
    password
  });

  retailer.save(function(err, docs) {
    if (err)
      res.send({
        status: false,
        data: err.toString()
      });
    res.send({
      status: true,
      data: docs
    });
  });
});

export default routes;
