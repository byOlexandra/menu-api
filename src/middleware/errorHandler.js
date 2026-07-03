export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware:', err);
  const status = err.status || err.statusCode;

  if (status) {
    return res.status(status).json({
      status: 'error',
      statusCode: status,
      message: err.message,
    });
  }

  res.status(500).json({
    status: 'fail',
    message: 'Server Internal Error',
  });
};
