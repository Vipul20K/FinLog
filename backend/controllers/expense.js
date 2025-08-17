const Expense = require("../models/ExpenseModel");

// @desc Add Expense
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {

        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // if (Number(amount) <= 0) {
        //     return res.status(400).json({ message: 'Amount must be a positive number!' });
        // }

        const expense = new Expense({
            title,
            amount,
            category,
            description,
            date,
            user: req.user.id, // ✅ Attach logged-in user
        });

        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
         console.error("Error saving expense:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc Get All Expenses for Logged-in User
// exports.getExpense = async (req, res) => {
//     try {
//         const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
//         res.status(200).json(expenses);
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

exports.getExpense = async (req, res) => {
  try {
    const { start, end } = req.query;
    const filter = { user: req.user.id };

    // Helper function to parse and validate date strings
    const parseDate = (dateStr) => {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? null : d;
    };

    if (start && end) {
      const startDate = parseDate(start);
      const endDate = parseDate(end);

      if (startDate && endDate) {
        if (start === end) {
          // If filtering by the same day, cover entire day range
          const dayStart = new Date(startDate.setHours(0, 0, 0, 0));
          const dayEnd = new Date(startDate.setHours(23, 59, 59, 999));
          filter.date = { $gte: dayStart, $lte: dayEnd };
        } else {
          // Normal range filter
          filter.date = { $gte: startDate, $lte: endDate };
        }
      }
    } else if (start) {
      const startDate = parseDate(start);
      if (startDate) filter.date = { $gte: startDate };
    } else if (end) {
      const endDate = parseDate(end);
      if (endDate) filter.date = { $lte: endDate };
    }

    const expenses = await Expense.find(filter).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// @desc Delete Expense (only if it belongs to current user)
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findOne({ _id: id, user: req.user.id }); // ✅ Secure ownership check

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }

        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
