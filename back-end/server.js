const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/send-emails", async (req, res) => {
  const { emails, subject, body } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      // Configure your email transport (SMTP, OAuth, etc.)
    });

    for (const email of emails) {
      await transporter.sendMail({
        from: "your-email@example.com",
        to: email,
        subject,
        text: body,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
