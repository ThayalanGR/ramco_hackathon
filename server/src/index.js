import { dbconfig, middleware } from "./config";
import express from "express";
import {
  retailRoutes,
  customerRoutes,
  smsRoutes,
  authRoutes,
  whatsappRoutes
} from "./modules";
import transporter from "./modules/mail";
import config from "config";

const app = express();
const PORT = process.env.PORT || 2000;

dbconfig();
middleware(app);

app.get("/", (req, res) => {
  res.send("Hi from team .YAG");
});

app.use("/retailer", retailRoutes);
app.use("/customer", customerRoutes);
app.use("/sms", smsRoutes);
app.use("/auth", authRoutes);
app.use("/whatsapp", whatsappRoutes);
app.post("/sendmail", (req, res) => {
  const { to, message, subject, mailList } = req.body;
  try {
    if (!mailList) {
      const mailOptions = {
        from: `${config.get("username")}@gmail.com`,
        to,
        subject,
        html: `<p>${message}</p>`
      };

      setTimeout(function() {
        transporter.sendMail(mailOptions);
      }, 0);

      res.json({
        msg: `email has been successfully sent to ${to}`,
        status: true
      });
    } else {
      mailList.forEach(to => {
        const mailOptions = {
          from: `${config.get("username")}@gmail.com`,
          to,
          subject,
          html: `<p>${message}</p>`
        };

        setTimeout(function() {
          transporter.sendMail(mailOptions);
        }, 0);
      });
      res.json({
        msg: `email has been successfully sent to ${mailList.toString()}`,
        status: true
      });
    }
  } catch (error) {
    console.error(error.message);
    res.json({
      msg: `email has not been sent`,
      status: false
    });
  }
});

app.get("/:phoneno", (req, res) => {
  const phoneNum = decodeURIComponent(req.params.phoneno);
  res.redirect(
    `http://192.168.15.210:3000/callback/${null}/${null}?mobile=${phoneNum}`
  );
});
app.listen(PORT, () => {
  console.log("openbeats server up and running!");
});
