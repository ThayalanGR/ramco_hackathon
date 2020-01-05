import { Router } from "express";
// import { Customer, Retailer } from "../models";
import passport from "passport";

const routes = Router();

routes.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

routes.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const payload = { customer: req.user };
    res.redirect(
      `http://localhost:3000/callback/${payload.customer.name}/${payload.customer.email}`
    );
  }
);
routes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"]
  })
);
routes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const payload = { customer: req.user };
    res.redirect(
      `http://localhost:3000/callback/${payload.customer.name}/${payload.customer.email}`
    );
  }
);


export default routes;
