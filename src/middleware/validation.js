import { param, body, validationResult } from "express-validator";

const ALLOWED_FIELDS = ["title", "body", "userId", "comments"];

export const validatePostId = [
  param("id").isUUID().withMessage("Invalid post ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const validatePostBody = [
  body("userId").isInt().withMessage("User ID must be an integer"),
  body("title").notEmpty().trim().withMessage("Title is required"),
  body("body").notEmpty().trim().withMessage("Body is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }
    next();
  },
];

const validateFieldValue = (value, fieldName) => {
  switch (fieldName) {
    case "userId":
      return Number.isInteger(value) && value > 0;
    case "title":
      return typeof value === "string";
    case "body":
      return typeof value === "string";
    case "comments":
      return typeof value === "string";
    default:
      return false;
  }
};

export const validateUpdateField = [
  param("postId").isUUID().withMessage("Invalid post ID format"),
  body("field")
    .trim()
    .isIn(ALLOWED_FIELDS)
    .withMessage(`Field must be one of: ${ALLOWED_FIELDS.join(", ")}`),
  body("value")
    .notEmpty()
    .withMessage("Value is required")
    .custom((value, { req }) => {
      const fieldName = req.body.field;
      if (!validateFieldValue(value, fieldName)) {
        throw new Error(`Invalid value for field ${fieldName}`);
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }
    next();
  },
];
