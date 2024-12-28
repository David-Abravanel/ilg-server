import chalk from "chalk";

export const logger = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    // colors for methods
    const methodColor = {
      GET: chalk.green,
      POST: chalk.cyan,
      PATCH: chalk.yellow,
      DELETE: chalk.magenta,
      PUT: chalk.blue,
      HEAD: chalk.magentaBright,
    };

    const methodColored = methodColor[req.method] || chalk.white;

    console.log(
      `[${methodColored(req.method)}]: ${chalk.gray(
        `http://localhost:${process.env.BE_PORT}${req.originalUrl}`
      )}  ${chalk.gray(":::")}   [${chalk.yellow("Request")}]`
    );

    // colors for statuses
    res.on("finish", () => {
      const statusColor = res.statusCode < 400 ? chalk.green : chalk.red;
      console.log(
        `[${methodColored(req.method)}]: ${statusColor(
          `http://localhost:${process.env.BE_PORT}${req.originalUrl}`
        )}  ${chalk.gray(":::")}  status: ${statusColor(res.statusCode)}`
      );
    });
  }
  next();
};
