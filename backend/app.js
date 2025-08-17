const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const authRoutes = require('./routes/auth'); 
const transactionRoutes = require('./routes/transactions'); 
const userRoutes=require('./routes/userRoutes');


require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",    // development
  "https://fin-log.vercel.app" // production
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

}));

// Auth-Routes
app.use('/api/v1', authRoutes); 

//Transaction Routes
app.use('/api/v1', transactionRoutes);

//User Routes
app.use('/api/v1', userRoutes); 

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
  });
};

server();
