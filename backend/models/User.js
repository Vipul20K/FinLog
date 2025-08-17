const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  whatsappNumber: {
  type: String,
  unique: true,
  sparse: true, // allows users without WhatsApp numbers
}
});

module.exports = mongoose.model("User", userSchema);
