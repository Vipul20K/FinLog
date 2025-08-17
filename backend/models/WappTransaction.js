
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  source: { type: String }, // e.g., 'WhatsApp'
  userPhone: { type: String }, // WhatsApp number
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // 👈 added
});

module.exports = mongoose.model('WAppTransaction', transactionSchema);
