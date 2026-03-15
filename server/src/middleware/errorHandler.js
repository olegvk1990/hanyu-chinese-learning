class AppError extends Error {
  constructor(message, statusCode = 500, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal server error',
      code
    }
  });
}

module.exports = {
  AppError,
  asyncHandler,
  errorHandler
};
