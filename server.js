import app from "./src/app.js";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.BE_PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(
    `[${chalk.green("startup")}]: server running at ${chalk.greenBright(
      `http://localhost:${PORT}`
    )}`
  );
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  server.close(() => process.exit(1));
});
