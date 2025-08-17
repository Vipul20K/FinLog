# 💰 FinLog – Track, Manage & Analyze Your Expenses

A **full-stack expense tracker** application that allows users to manage **income & expenses**, view **analytics**, and even **log transactions via WhatsApp** using **Twilio API**. Built using **React (Vite)**, **Node.js**, and **MongoDB**.

---

## ✨ Features

✅ Add, Edit, Delete income & expense transactions

✅ WhatsApp Integration – Log your expenses or income directly by sending a message on WhatsApp. No need to open the app every time!

✅ Natural Language Parsing using Compromise.js to understand WhatsApp messages like:

  - spent 200 on groceries

  - got 5000 from freelance

✅ Twilio Webhook for Message Status – Real-time delivery and status updates for your WhatsApp messages

✅ Context API for Global State Management – Smooth state sharing across components without prop drilling

✅ Charts & Analytics – Visualize your spending patterns and income flow with dynamic charts

✅ JWT Authentication – Secure login and API protection

✅ Cloud MongoDB (Atlas) Support – Scalable and secure data storage in the cloud

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Third-Party Services**: Twilio WhatsApp API
- **Parsing & NLP**: Compromise.js
- **Deployment:** Vercel(Frontend), Render(Backend)

---
🚀 Installation & Setup

# 1. Clone the repository
git clone https://github.com/your-username/finlog.git
cd finlog-expense-tracker

# 2. Install dependencies
cd client && npm install && cd ../server && npm install

# 3. Create .env files

## Client (frontend/.env)
VITE_API_BASE_URL=http://localhost:5000/api/v1

## Server (backend/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# 4. Run the development servers
# In one terminal (Backend):
cd server && npm run dev

# In another terminal (Frontend):
cd client && npm run dev

🤝 Contributing

1.Fork the repo
2.Create your feature branch (git checkout -b feature-name)
3.Commit changes (git commit -m "Add feature")
4.Push to branch (git push origin feature-name)
5.Create a Pull Request
