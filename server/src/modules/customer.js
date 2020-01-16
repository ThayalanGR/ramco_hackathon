import { Router } from "express";
import { Customer, Retailer } from "../models";

const routes = Router();

routes.get("/getall", (req, res) => {
  Customer.find({}, function(err, docs) {
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
routes.get("/getbyid/:id", (req, res) => {
  Customer.find({ retailerId: req.params.id }, function(err, docs) {
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

routes.post("/create", async (req, res) => {
  const { name, email, mobile, retailerId } = req.body;
  const customer = new Customer({
    name,
    email,
    mobile,
    coupons: [],
    invoices: [],
    retailerId
  });

  await customer.save();

  let { _id } = customer;

  let retailer = await Retailer.findOne({ _id: retailerId });

  await retailer.customers.push(_id);

  await retailer.save();

  res.send({
    status: true,
    data: {
      customer: customer,
      retailer: retailer
    }
  });
});

export default routes;
