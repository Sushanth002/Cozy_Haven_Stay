const ApiError = require("../utils/ApiError");

// const errorHandler = (err, req, res, next) => {
//   if (err instanceof ApiError) {
//     res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//       errors: err.errors,
//     });
//   } else {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// module.exports = errorHandler;


// const errorHandler = (err, req, res, next) => {
//   console.error(err); // Log the error
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({ success: false, message });
// };

// module.exports = errorHandler;

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;