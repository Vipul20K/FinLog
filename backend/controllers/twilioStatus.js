
// const express = require("express");
// const router = express.Router();

// router.post("/twilio-status", (req, res) => {
//   const status = req.body.MessageStatus;
//   const messageSid = req.body.MessageSid;
//   console.log(`Message SID: ${messageSid}, Status: ${status}`);


//   res.status(200).send("Status received");
// });

// module.exports = router;


// controllers/twilioStatusController.js

exports.handleTwilioStatus = (req, res) => {
  const status = req.body.MessageStatus;
  const messageSid = req.body.MessageSid;

  console.log(`Message SID: ${messageSid}, Status: ${status}`);

  // Optional: Save to DB or trigger additional logic here

  return res.status(200).send("Status received");
};
