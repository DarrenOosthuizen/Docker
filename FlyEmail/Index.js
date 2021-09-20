const express = require("express"); //express
const morgan = require("morgan"); // HTTP request logger middleware
const helmet = require("helmet"); // Help secure Express/Connect apps with various HTTP headers
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");

const port = process.env.PORT || 3000;
var transporter = nodemailer.createTransport({
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  secure: false,
  auth: {
    user: process.env.EMAILADDRESS,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendCVEmail = async (to) => {
  let html = await readFile("./Email/CVEmail.html", "utf8");
  let template = handlebars.compile(html);
  let htmltosend = template();
  var mailOptions = {
    from: process.env.EMAILADDRESS,
    to,
    subject: "Darren Oosthuizen CV",
    html: htmltosend,
    attachments: [
      {
        filename: "DarrenOosthuizenCV.pdf",
        path: "./Email/DarrenOosthuizenCV.pdf",
        contentType: "application/pdf",
      },
    ],
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("CV Email sent to : " + to + "  :" + info.response);
    }
  });
};

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    res.status(200);
    res.send("");
  } catch (error) {
    next(error);
  }
});

app.post("/sendCVEmail", (req, res, next) => {
  try {
    res.json({
      success: "true",
      message: "Mail sent",
    });
    sendCVEmail(req.headers["to"]);
  } catch (error) {
    next(error);
  }
});

app.use(function (req, res, next) {
  res.status(404).send(`404 NOT FOUND, INVALID URL > ${req.originalUrl}`);
});

//Error
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  const stack = process.env.NODE_ENV === "production" ? error.stack : "🌌";
  res.json({
    message: error.message,
    stack,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
