const { body } = require("express-validator");

const adminValidator = [
  body("admin_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("admin_email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("email must contain @gmail.com"),
  body("admin_password")
    .trim()
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("password length should be greater than 5"),
  body("admin_phoneno")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("phoneno cannot be empty")
    .custom((value) => {
      const phoneRegex = /^(?:\+?\d{1,3}\s?)?(?:\d{10})$/;
      if (!phoneRegex.test(value)) {
        throw new Error("invalid phoneno");
      }
      return true;
    }),
];
const ownerValidator = [
  body("owner_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("email must contain @gmail.com"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("password length should be greater than 5"),
  body("contact_no")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("phoneno cannot be empty")
    .custom((value) => {
      const phoneRegex = /^(?:\+?\d{1,3}\s?)?(?:\d{10})$/;
      if (!phoneRegex.test(value)) {
        throw new Error("invalid contact no");
      }
      return true;
    }),
  body("gender")
    .optional()
    .trim()
    .toUpperCase()
    .custom((value) => {
      let gender_enum = ["MALE", "FEMALE", "OTHERS"];
      if (!gender_enum.includes(value)) {
        throw new Error("Gender not appropiate");
      }
      return true;
    }),
];

module.exports = { adminValidator, ownerValidator };
