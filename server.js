const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO   = process.env.EMAIL_TO;

app.post("/distill", async (req, res) => {
  const payload = req.body;
  const msg = `Distill Alert\nURL: ${payload.page.url}\nChange: ${JSON.stringify(payload.diff)}`;

  // Telegram
  if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: msg
      });
    } catch (e) { console.error("Telegram error", e); }
  }

  // Email
  if (EMAIL_USER && EMAIL_PASS && EMAIL_TO) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });
    try {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: EMAIL_TO,
        subject: "Distill Price Alert",
        text: msg
      });
    } catch (e) { console.error("Email error", e); }
  }

  res.status(200).send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Relay listening on port ${port}`));
