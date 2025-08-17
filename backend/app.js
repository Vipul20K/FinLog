const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const authRoutes = require('./routes/auth'); 
const transactionRoutes = require('./routes/transactions'); 


require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

// Auth-Routes
app.use('/api/v1', authRoutes); 

//Transaction Routes
app.use('/api/v1', transactionRoutes);



const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
  });
};

server();
