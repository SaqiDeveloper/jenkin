const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const { translator, handleResponse } = require("./helpers");

app.use(translator);
app.use(handleResponse);

const sendEmail = async () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 465,
    secure: true,
    auth: {
      user: "testnaxtech@gmail.com", // generated ethereal user
      pass: "ncfapiijnxzwvxmf", // generated ethereal password
    },
  });

  const message = {
    from: "noreply@gmail.com", //
    to: "saqlainhaider434@gmail.com",
    subject: "subject",
    html: "<h1>Hello from Naxtech</h1>",
  };

  const email = await transporter.sendMail(message);
  return email;
};

app.get("/", async (req, res) => {
  // const message = req.translate('welcome');
  const d = await sendEmail();
  res.send({ message: "welcome", Response: d });
});

app.get("/not-found", (req, res) => {
  const message = req.translate("error.notFound");
  res.send(message);
});

app.get("/not-found/:id", (req, res) => {
  console.blog("abc");
  const message = req.translate("error.notFound");
  res.send({ message });
});

app.get("/server-error", (req, res) => {
  const message = req.translate("error.serverError");
  res.status(500).send(message);
});

app.listen(4000, () => {
  console.log("Server is Running on port 4000");
});
