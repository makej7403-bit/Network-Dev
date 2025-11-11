const express = require('express');
const router = express.Router();

// WARNING: Virtual numbers and SMS verification are regulated.
// This route demonstrates example calls to Twilio (requires Twilio credentials and funds).

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (accountSid && authToken) {
  const twilio = require('twilio')(accountSid, authToken);

  // Purchase number (example - requires Twilio funds)
  router.post('/buy-number', async (req, res) => {
    try {
      const { country } = req.body;
      const numbers = await twilio.availablePhoneNumbers(country || 'US').local.list({ limit: 1 });
      if (!numbers || numbers.length === 0) return res.status(404).json({ error: 'no numbers' });
      const bought = await twilio.incomingPhoneNumbers.create({ phoneNumber: numbers[0].phone_number });
      res.json({ bought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'twilio error' });
    }
  });

  // Send SMS (verification)
  router.post('/send-sms', async (req, res) => {
    try {
      const { to, body } = req.body;
      const message = await require('twilio')(accountSid, authToken).messages.create({
        body: body || 'Your Global Light verification code: 123456',
        from: process.env.TWILIO_PHONE_NUMBER,
        to
      });
      res.json({ sid: message.sid });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'send failed' });
    }
  });
} else {
  router.get('/', (req, res) => {
    res.json({ msg: 'Twilio credentials not configured' });
  });
}

module.exports = router;
