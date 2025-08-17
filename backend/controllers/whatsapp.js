// const express = require('express');
// const router = express.Router();
// const Transaction = require('../models/WappTransaction');
// const verifyWappUser = require('../middlewares/verifyWappUser'); 
// const parseMessage=require('../utils/parseMessage'); 


// router.post('/webhook',verifyWappUser,async (req, res) => {
//   const msgBody = req.body.Body;
//   const msgFrom = req.body.From;

//   if (!msgBody || !msgFrom) {
//     return res.sendStatus(400);
//   }

//   console.log(`WhatsApp message from ${msgFrom}: ${msgBody}`);

//   const data = parseMessage(msgBody);
//   if (!data) {
//     return res.send(
//       `<Response><Message>Invalid format. Use something like : "expense 100 food" or "income 500 freelance"</Message></Response>`
//     );
//   }

//   try {
//     const transaction = new Transaction({
//       ...data,
//       user: req.user.id,
//       source: 'WhatsApp',
//     });

//     await transaction.save();

//     res.send(
//       `<Response><Message>${data.type.toUpperCase()} of ₹${data.amount} for "${data.category}" logged successfully.</Message></Response>`
//     );
//   } catch (err) {
//     console.error(err);
//     res.send(`<Response><Message>Failed to log transaction. Please try again later.</Message></Response>`);
//   }
// });
// module.exports = router;


const Transaction = require('../models/WappTransaction');
const parseMessage = require('../utils/parseMessage');

exports.handleWhatsAppWebhook = async (req, res) => {
  const msgBody = req.body.Body;
  const msgFrom = req.body.From;

  if (!msgBody || !msgFrom) {
    return res.sendStatus(400);
  }

  console.log(`WhatsApp message from ${msgFrom}: ${msgBody}`);

  const data = parseMessage(msgBody);
  if (!data) {
    return res.send(
      `<Response><Message>Invalid format. Use something like: "expense 100 food" or "income 500 freelance"</Message></Response>`
    );
  }

  try {
    const transaction = new Transaction({
      ...data,
      user: req.user.id,
      source: 'WhatsApp',
    });

    await transaction.save();

    return res.send(
      `<Response><Message>${data.type.toUpperCase()} of ₹${data.amount} for "${data.category}" logged successfully.</Message></Response>`
    );
  } catch (err) {
    console.error(err);
    return res.send(
      `<Response><Message>Failed to log transaction. Please try again later.</Message></Response>`
    );
  }
};
