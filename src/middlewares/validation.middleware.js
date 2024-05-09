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
const ownerRegisterValidator = [
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
const ownerUpdateValidator = [
  body("owner_name").trim().notEmpty().withMessage("name cannot be empty"),
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
const ownerLoginValidator = [
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
];
const hotelAddValidation = [
  body("hotel_name").notEmpty().withMessage("Hotel name is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("parking").optional().isBoolean().withMessage("parking must be boolean"),
  body("wifi").optional().isBoolean().withMessage("parking must be boolean"),
  body("swimming_pool")
    .optional()
    .isBoolean()
    .withMessage("parking must be boolean"),
  body("room_service")
    .optional()
    .isBoolean()
    .withMessage("parking must be boolean"),
  body("fitness_center")
    .optional()
    .isBoolean()
    .withMessage("parking must be boolean"),
  body("dining").optional().isBoolean().withMessage("parking must be boolean"),
];
const roomAddValidation = [
  body("room_size").isInt().withMessage("room size must be an integer"),
  body("bed_size")
    .trim()
    .toUpperCase()
    .custom((value) => {
      let size_enum = ["SINGLE_BED", "DOUBLE_BED", "KINGSIZE_BED"];
      if (!size_enum.includes(value)) {
        throw new Error("size not appropiate");
      }
      return true;
    }),
  body("max_people_accomodate")
    .isInt()
    .withMessage("Max people accommodate must be an integer"),
  body("base_fare").isInt().withMessage(" base fare must be an integer"),
  body("max_people_accomodate")
    .isInt()
    .withMessage("Max people accommodate must be an integer"),
  body("ac_non_ac").isBoolean().withMessage("Ac-Non Ac   must be an Boolean"),
];
module.exports = {
  adminValidator,
  ownerRegisterValidator,
  ownerUpdateValidator,
  ownerLoginValidator,
  hotelAddValidation,
  roomAddValidation,
};
