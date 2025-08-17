// // routes/whatsapp.js
// const express = require('express');
// const router = express.Router();
// const client = require('./twilioClient');

// router.post('/send-message', async (req, res) => {
//   const { message, to } = req.body;

//   try {
//     const response = await client.messages.create({
//       from: 'whatsapp:+14155238886', // Twilio sandbox number
//       to: `whatsapp:${to}`,
//       body: message,
//     });

//     res.status(200).json({ sid: response.sid });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;


const client = require('./twilioClient'); 

exports.sendWhatsAppMessage = async (req, res) => {
  const { message, to } = req.body;

  try {
    const response = await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: `whatsapp:${to}`,
      body: message,
    });

    return res.status(200).json({ sid: response.sid });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
