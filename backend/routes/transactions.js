const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { getTransactions,deleteTransaction } = require('../controllers/WappTransaction');
const {sendWhatsAppMessage} = require('../controllers/sendWhatsApp');
 const { handleTwilioStatus } = require("../controllers/twilioStatus");
 const { handleWhatsAppWebhook } = require('../controllers/whatsapp');
 const { getAnalytics } = require('../controllers/analytics');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyWappUser = require('../middlewares/verifyWappUser');
const router = require('express').Router();


router
  //  Normal Transactions
  .post('/add-income', authMiddleware, addIncome)
  .get('/get-incomes', authMiddleware, getIncomes)
  .delete('/delete-income/:id', authMiddleware, deleteIncome)
  .post('/add-expense', authMiddleware, addExpense)
  .get('/get-expenses', authMiddleware, getExpense)
  .delete('/delete-expense/:id', authMiddleware, deleteExpense)

  //  WhatsApp Transactions
  .get('/get-WhatsAppTransactions', authMiddleware, getTransactions)
  .delete('/delete-WhatsAppTransaction/:id', authMiddleware, deleteTransaction)

  // Analytics
  router.get('/analytics', authMiddleware, getAnalytics);

  //WhatsApp-Twilio Config
  router.post('/send-message', sendWhatsAppMessage);
  router.post("/twilio-status", handleTwilioStatus);   // Route to receive Twilio status updates
  router.post('/webhook', verifyWappUser, handleWhatsAppWebhook);   // Webhook route for WhatsApp messages





module.exports = router;