# flightradar
Cheap Flight prices tracker for personal use

# Distill Webhook Relay

Receives Distill.io webhooks and forwards them to Telegram and/or email.

## Setup

1. Clone this repo  
2. Add environment variables in Render dashboard:
   - `TELEGRAM_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `EMAIL_USER` (optional)
   - `EMAIL_PASS` (optional)
   - `EMAIL_TO` (optional)
3. Deploy on Render as a Web Service.
4. In Distill: set Webhook URL to `https://<your-app>.onrender.com/distill`.
