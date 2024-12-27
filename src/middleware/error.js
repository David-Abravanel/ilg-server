import dotenv from "dotenv";
dotenv.config();

export const errorHandler = (err, req, res, next) => {
  console.error(`${err.stack}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const handle404 = (req, res, next) => {
  const error = new Error(
    `http://localhost:${process.env.BE_PORT}${req.originalUrl}`
  );
  error.statusCode = 404;
  next(error);
};
