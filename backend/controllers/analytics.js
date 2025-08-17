// const express = require('express');
// const router = express.Router();
// const Income = require('../models/IncomeModel');
// const Expense = require('../models/ExpenseModel');
// const WAppTransaction = require('../models/WappTransaction');
// const mongoose = require('mongoose');
// const authMiddleware = require('../middlewares/authMiddleware');

// //  group by month
// const groupByMonth = [
//   {
//     $group: {
//       _id: {
//         year: { $year: '$timestamp' },
//         month: { $month: '$timestamp' },
//         type: '$type'
//       },
//       totalAmount: { $sum: '$amount' }
//     }
//   },
//   {
//     $sort: { '_id.year': 1, '_id.month': 1 }
//   }
// ];

// // Date filter helper (same logic as getIncomes)
// function buildDateRange(start, end, dateField) {
//   const filter = {};
//   const parseDate = (dateStr) => {
//     const d = new Date(dateStr);
//     return isNaN(d.getTime()) ? null : d;
//   };

//   if (start && end) {
//     const startDate = parseDate(start);
//     const endDate = parseDate(end);

//     if (startDate && endDate) {
//       if (start === end) {
//         // Same day filter
//         const dayStart = new Date(startDate);
//         dayStart.setHours(0, 0, 0, 0);
//         const dayEnd = new Date(startDate);
//         dayEnd.setHours(23, 59, 59, 999);
//         filter[dateField] = { $gte: dayStart, $lte: dayEnd };
//       } else {
//         filter[dateField] = { $gte: startDate, $lte: endDate };
//       }
//     }
//   } else if (start) {
//     const startDate = parseDate(start);
//     if (startDate) filter[dateField] = { $gte: startDate };
//   } else if (end) {
//     const endDate = parseDate(end);
//     if (endDate) filter[dateField] = { $lte: endDate };
//   }

//   return filter;
// }

// //  analytics route
// router.get('/analytics', authMiddleware, async (req, res) => {
//   const userId = req.user.id;
//   const { start, end } = req.query;

//   if (!userId) {
//     return res.status(400).json({ message: 'Missing user ID in headers' });
//   }

//   try {
//     // Build consistent filters
//     const incomeFilter = { user: new mongoose.Types.ObjectId(userId), ...buildDateRange(start, end, 'date') };
//     const expenseFilter = { user: new mongoose.Types.ObjectId(userId), ...buildDateRange(start, end, 'date') };
//     const wappFilter = { user: new mongoose.Types.ObjectId(userId), ...buildDateRange(start, end, 'timestamp') };

//     const [incomes, expenses, wapp] = await Promise.all([
//       Income.aggregate([
//         { $match: incomeFilter },
//         {
//           $group: {
//             _id: { year: { $year: '$date' }, month: { $month: '$date' } },
//             totalIncome: { $sum: '$amount' }
//           }
//         }
//       ]),
//       Expense.aggregate([
//         { $match: expenseFilter },
//         {
//           $group: {
//             _id: { year: { $year: '$date' }, month: { $month: '$date' } },
//             totalExpense: { $sum: '$amount' }
//           }
//         }
//       ]),
//       WAppTransaction.aggregate([
//         { $match: wappFilter },
//         ...groupByMonth
//       ])
//     ]);

//     // Transform WhatsApp data
//     const whatsappIncome = [];
//     const whatsappExpense = [];

//     wapp.forEach(entry => {
//       const data = {
//         year: entry._id.year,
//         month: entry._id.month,
//         total: entry.totalAmount
//       };
//       if (entry._id.type === 'income') whatsappIncome.push(data);
//       else if (entry._id.type === 'expense') whatsappExpense.push(data);
//     });

//     // Merge all monthly data
//     const monthlySummary = {};
//     function addToSummary(arr, type) {
//       arr.forEach(item => {
//         const key = `${item.year}-${item.month}`;
//         if (!monthlySummary[key]) monthlySummary[key] = { income: 0, expense: 0 };
//         monthlySummary[key][type] += item.totalIncome || item.totalExpense || item.total;
//       });
//     }

//     addToSummary(incomes, 'income');
//     addToSummary(expenses, 'expense');
//     addToSummary(whatsappIncome, 'income');
//     addToSummary(whatsappExpense, 'expense');

//     // Totals
//     const totalIncome = incomes.reduce((acc, i) => acc + i.totalIncome, 0) +
//                         whatsappIncome.reduce((acc, i) => acc + i.total, 0);
//     const totalExpense = expenses.reduce((acc, e) => acc + e.totalExpense, 0) +
//                          whatsappExpense.reduce((acc, e) => acc + e.total, 0);

//     // Category distribution
//     const [regularIncomeCat, regularExpenseCat, whatsappCat] = await Promise.all([
//       Income.aggregate([
//         { $match: incomeFilter },
//         { $group: { _id: '$category', total: { $sum: '$amount' } } }
//       ]),
//       Expense.aggregate([
//         { $match: expenseFilter },
//         { $group: { _id: '$category', total: { $sum: '$amount' } } }
//       ]),
//       WAppTransaction.aggregate([
//         { $match: wappFilter },
//         { $group: { _id: { category: '$category', type: '$type' }, total: { $sum: '$amount' } } }
//       ])
//     ]);

//     const categoryMap = {};
//     const addCategoryData = (arr, type) => {
//       arr.forEach(entry => {
//         const key = `${type}:${entry._id}`;
//         categoryMap[key] = (categoryMap[key] || 0) + entry.total;
//       });
//     };

//     addCategoryData(regularIncomeCat, 'income');
//     addCategoryData(regularExpenseCat, 'expense');

//     whatsappCat.forEach(entry => {
//       const key = `${entry._id.type}:${entry._id.category}`;
//       categoryMap[key] = (categoryMap[key] || 0) + entry.total;
//     });

//     const categoryDistribution = Object.entries(categoryMap).map(([key, total]) => {
//       const [type, category] = key.split(':');
//       return { type, category, total };
//     });

//     res.status(200).json({
//       monthlySummary,
//       totalIncome,
//       totalExpense,
//       categoryDistribution
//     });

//   } catch (err) {
//     console.error('Analytics generation failed:', err);
//     res.status(500).json({ message: 'Analytics generation failed' });
//   }
// });

// module.exports = router;


// controllers/analyticsController.js
const Income = require('../models/IncomeModel');
const Expense = require('../models/ExpenseModel');
const WAppTransaction = require('../models/WappTransaction');
const mongoose = require('mongoose');

// Helper: Group by month pipeline
const groupByMonth = [
  {
    $group: {
      _id: {
        year: { $year: '$timestamp' },
        month: { $month: '$timestamp' },
        type: '$type'
      },
      totalAmount: { $sum: '$amount' }
    }
  },
  {
    $sort: { '_id.year': 1, '_id.month': 1 }
  }
];

// Helper: Build date range filter
function buildDateRange(start, end, dateField) {
  const filter = {};
  const parseDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  if (start && end) {
    const startDate = parseDate(start);
    const endDate = parseDate(end);

    if (startDate && endDate) {
      if (start === end) {
        // Same day filter
        const dayStart = new Date(startDate);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(startDate);
        dayEnd.setHours(23, 59, 59, 999);
        filter[dateField] = { $gte: dayStart, $lte: dayEnd };
      } else {
        filter[dateField] = { $gte: startDate, $lte: endDate };
      }
    }
  } else if (start) {
    const startDate = parseDate(start);
    if (startDate) filter[dateField] = { $gte: startDate };
  } else if (end) {
    const endDate = parseDate(end);
    if (endDate) filter[dateField] = { $lte: endDate };
  }

  return filter;
}

exports.getAnalytics = async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'Missing user ID in headers' });
  }

  try {
    // Build filters
    const incomeFilter = { user: new mongoose.Types.ObjectId(userId), ...buildDateRange(start, end, 'date') };
    const expenseFilter = { user: new mongoose.Types.ObjectId(userId), ...buildDateRange(start, end, 'date') };
    const wappFilter = { user: new mongoose.Types.ObjectId(userId), ...buildDateRange(start, end, 'timestamp') };

    const [incomes, expenses, wapp] = await Promise.all([
      Income.aggregate([
        { $match: incomeFilter },
        {
          $group: {
            _id: { year: { $year: '$date' }, month: { $month: '$date' } },
            totalIncome: { $sum: '$amount' }
          }
        }
      ]),
      Expense.aggregate([
        { $match: expenseFilter },
        {
          $group: {
            _id: { year: { $year: '$date' }, month: { $month: '$date' } },
            totalExpense: { $sum: '$amount' }
          }
        }
      ]),
      WAppTransaction.aggregate([
        { $match: wappFilter },
        ...groupByMonth
      ])
    ]);

    // Transform WhatsApp data
    const whatsappIncome = [];
    const whatsappExpense = [];

    wapp.forEach(entry => {
      const data = {
        year: entry._id.year,
        month: entry._id.month,
        total: entry.totalAmount
      };
      if (entry._id.type === 'income') whatsappIncome.push(data);
      else if (entry._id.type === 'expense') whatsappExpense.push(data);
    });

    // Merge all monthly data
    const monthlySummary = {};
    function addToSummary(arr, type) {
      arr.forEach(item => {
        const key = `${item._id?.year || item.year}-${item._id?.month || item.month}`;
        if (!monthlySummary[key]) monthlySummary[key] = { income: 0, expense: 0 };
        monthlySummary[key][type] += item.totalIncome || item.totalExpense || item.total;
      });
    }

    addToSummary(incomes, 'income');
    addToSummary(expenses, 'expense');
    addToSummary(whatsappIncome, 'income');
    addToSummary(whatsappExpense, 'expense');

    // Totals
    const totalIncome = incomes.reduce((acc, i) => acc + i.totalIncome, 0) +
                        whatsappIncome.reduce((acc, i) => acc + i.total, 0);
    const totalExpense = expenses.reduce((acc, e) => acc + e.totalExpense, 0) +
                         whatsappExpense.reduce((acc, e) => acc + e.total, 0);

    // Category distribution
    const [regularIncomeCat, regularExpenseCat, whatsappCat] = await Promise.all([
      Income.aggregate([
        { $match: incomeFilter },
        { $group: { _id: '$category', total: { $sum: '$amount' } } }
      ]),
      Expense.aggregate([
        { $match: expenseFilter },
        { $group: { _id: '$category', total: { $sum: '$amount' } } }
      ]),
      WAppTransaction.aggregate([
        { $match: wappFilter },
        { $group: { _id: { category: '$category', type: '$type' }, total: { $sum: '$amount' } } }
      ])
    ]);

    const categoryMap = {};
    const addCategoryData = (arr, type) => {
      arr.forEach(entry => {
        const key = `${type}:${entry._id}`;
        categoryMap[key] = (categoryMap[key] || 0) + entry.total;
      });
    };

    addCategoryData(regularIncomeCat, 'income');
    addCategoryData(regularExpenseCat, 'expense');

    whatsappCat.forEach(entry => {
      const key = `${entry._id.type}:${entry._id.category}`;
      categoryMap[key] = (categoryMap[key] || 0) + entry.total;
    });

    const categoryDistribution = Object.entries(categoryMap).map(([key, total]) => {
      const [type, category] = key.split(':');
      return { type, category, total };
    });

    res.status(200).json({
      monthlySummary,
      totalIncome,
      totalExpense,
      categoryDistribution
    });

  } catch (err) {
    console.error('Analytics generation failed:', err);
    res.status(500).json({ message: 'Analytics generation failed' });
  }
};
