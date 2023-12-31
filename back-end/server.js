const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/send-emails", async (req, res) => {
  const { email, subject, body } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "ReservationPro",
        address: process.env.GMAIL_USER,
      }, // sender address
      to: email, // list of receivers
      // cc: ["d.chubenko996@gmail.com"],
      subject, // Subject line
      text: body, // plain text body
      // html: "<b>Hello world?</b>", // html body
    };

    await transporter.sendMail(mailOptions);
    console.log("Email has been sent!");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
