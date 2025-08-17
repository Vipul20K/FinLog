

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTx = await Transaction.findByIdAndDelete(id);
    
    if (!deletedTx) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting transaction' });
  }
};


const Transaction = require('../models/WappTransaction');



exports.getTransactions = async (req, res) => {
  try {
    const { start, end } = req.query; // Expecting ISO date strings
    const filter = { user: req.user.id };

    // Helper function to safely parse dates
    const parseDate = (dateStr) => {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? null : d;
    };

    if (start && end) {
      const startDate = parseDate(start);
      const endDate = parseDate(end);
      if (startDate && endDate) {
        if (start === end) {
          // If filtering by the same day, cover the entire day's range
          const dayStart = new Date(startDate);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(startDate);
          dayEnd.setHours(23, 59, 59, 999);

          filter.timestamp = { $gte: dayStart, $lte: dayEnd };
        } else {
          // Normal range filter
          filter.timestamp = { $gte: startDate, $lte: endDate };
        }
      }
    } else if (start) {
      const startDate = parseDate(start);
      if (startDate) filter.timestamp = { $gte: startDate };
    } else if (end) {
      const endDate = parseDate(end);
      if (endDate) filter.timestamp = { $lte: endDate };
    }

    const transactions = await Transaction.find(filter).sort({ timestamp: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Server error fetching transactions' });
  }
};



// @desc Delete a transaction only if it belongs to current user
// exports.deleteTransaction = async (req, res) => {
//   try {
//     const { id } = req.params;
//      // ✅ Validate ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid transaction ID' });
//     }

//     const tx = await Transaction.findOne({ _id: id, user: req.user.id }); // ✅ check ownership

//     if (!tx) {
//       return res.status(404).json({ message: 'Transaction not found or unauthorized' });
//     }

//     await Transaction.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Transaction deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error while deleting transaction' });
//   }
// };
