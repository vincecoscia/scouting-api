const ErrorResponse = require('../utils/errorResponse')
const multer = require('multer')

const errorHandler = (err, req, res , next) => {
  let error = {...err }

  error.message = err.message

  // Log to console for dev
  console.log(err.name.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if(err.code === 11000) {
    const message = 'Resource already exists'
    error = new ErrorResponse(message, 400)
  }

  // Mongoose Validation error
  if(err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }

  // Multer error handling
  if (err instanceof multer.MulterError) {
    if(err.code === "LIMIT_FILE_SIZE") {
      const message = 'File is too large'
      error = new ErrorResponse(message, 400)
    }

    if(err.code === "LIMIT_FILE_COUNT") {
      const message = 'Please only upload one file'
      error = new ErrorResponse(message, 400)
    }

    if(err.code === "LIMIT_UNEXPECTED_FILE") {
      const message = 'File must be a CSV'
      error = new ErrorResponse(message, 400)
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler;