function globalErrorHandler(err, req, res, next) {
  console.error("Server Error:", err.message || err);
  return res.status(500).json({
    is_success: false,
    error: err.message || "Internal server error"
  });
}

module.exports = { globalErrorHandler };
