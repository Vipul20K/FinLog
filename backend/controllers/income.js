const Income = require("../models/IncomeModel");

// @desc Add Income
exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // if (amount <= 0 || typeof amount !== 'number') {
        //     return res.status(400).json({ message: 'Amount must be a positive number!' });
        // }

        const income = new Income({
            title,
            amount,
            category,
            description,
            date,
            user: req.user.id, // ✅ Attach user
        });

        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



exports.getIncomes = async (req, res) => {
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
          // Filter for the full day range when start and end are same
          const dayStart = new Date(startDate);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(startDate);
          dayEnd.setHours(23, 59, 59, 999);

          filter.date = { $gte: dayStart, $lte: dayEnd };
        } else {
          // Filter between start and end normally
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

    const incomes = await Income.find(filter).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc Delete income (only if it belongs to current user)
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await Income.findOne({ _id: id, user: req.user.id }); // ✅ Check ownership

        if (!income) {
            return res.status(404).json({ message: 'Income not found or unauthorized' });
        }

        await Income.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
