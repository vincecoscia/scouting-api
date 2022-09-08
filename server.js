const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const franchises = require('./routes/franchises')

const app = express();

// Body parser
app.use(express.json())

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/franchises', franchises)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold))

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server
  server.close(() => process.exit(1))
})