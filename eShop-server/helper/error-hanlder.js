// error-handler.js

const errorHandler = (err, req, res, next) => {
    const timestamp = new Date().toISOString();
  
    if (err.name === 'UnauthorizedError') {
      // Handle unauthorized access
      return res.status(401).json({
        error: {
          name: 'UnauthorizedError',
          message: 'Invalid token',
          details: err.message,
          timestamp,
          url: req.originalUrl
        }
      });
    }
  
    // Handle other types of errors
    console.error(err);
    res.status(500).json({
      error: {
        name: 'InternalError',
        message: 'Internal Server Error',
        details: err.message,
        timestamp,
        url: req.originalUrl
      }
    });
  };
  
  module.exports = errorHandler;
  