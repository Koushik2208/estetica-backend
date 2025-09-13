module.exports = (err, req, res, next) => {
  // if (process.env.NODE_ENV !== 'production') {
  //   console.error(err);
  // }

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status,
    message: err.message || "Something went wrong on the server.",
  });
};
