const User = require('../models/User');

const DEFAULT_COUNTRY_CODE = '91'; // India

function extractLocalNumber(fullNumber) {
  // Remove "whatsapp:" and "+" then extract last 10 digits (local number)
  return fullNumber.replace(/\D/g, '').slice(-10);
}

module.exports = async function verifyWappUser(req, res, next) {
  try {
    const from = req.body.From; // e.g., 'whatsapp:+917033540700'
    if (!from) return res.sendStatus(400);

    const localNumber = extractLocalNumber(from); // e.g., '7033540700'

    const user = await User.findOne({ whatsappNumber: localNumber });

    if (!user) {
      return res.send(
        `<Response><Message>User not found. Please register first.</Message></Response>`
      );
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
