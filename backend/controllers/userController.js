const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, whatsappNumber } = req.body;

    if (!name && !email && !whatsappNumber) {
      return res.status(400).json({ message: 'Nothing to update' });
    }

    if (whatsappNumber && !/^\d{10}$/.test(whatsappNumber)) {
      return res.status(400).json({ message: 'Invalid WhatsApp number' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (whatsappNumber !== undefined) user.whatsappNumber = whatsappNumber;

    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        whatsappNumber: user.whatsappNumber,
      },
    });
  } catch (err) {
    console.error('Update Profile Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
