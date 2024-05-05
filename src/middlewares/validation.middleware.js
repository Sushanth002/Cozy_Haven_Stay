const { body, validationResult } = require('express-validator');

const strongPassword = (value) => {
    if (!/[A-Z]/.test(value)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(value)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(value)) {
      throw new Error('Password must contain at least one number');
    }
    if (!/[^a-zA-Z0-9]/.test(value)) {
      throw new Error('Password must contain at least one special character');
    }
    return true;
  };

// Validation rules for user registration
const userRegistrationValidationRules = () => {
  return [
    body('user_name')
         .notEmpty()
         .withMessage('User name is required'),
    body('password')
         .notEmpty()
         .withMessage('Password is required')
         .isLength({ min: 6 })
         .withMessage('Password must be at least 6 characters long')
         .custom(strongPassword)
         .withMessage('Password must be strong with minimun 1 uppercase letter and 1 special character'),
    body('email')
         .notEmpty()
         .withMessage('email is required')
         .trim()
         .isEmail()
         .withMessage('Invalid email address'),
    body('gender')
         .notEmpty()
         .withMessage('Gender is required')
         .isIn(['MALE', 'FEMALE'])
         .withMessage('Gender must be either MALE or FEMALE'),
    body("contact_no")
         .notEmpty()
         .withMessage('Contact number is required')
         .isNumeric()
         .withMessage('Contact number must contain only numbers')
         .isLength({ min: 10, max: 10})
         .withMessage("Contact Number should be 10 Digits"),
    body("address")
         .notEmpty()
         .withMessage('Address is required'),
  ];
};

//user Login Validation

const loginValidation = () => {
    return [
        body('email')
         .notEmpty()
         .withMessage('email is required')
         .trim()
         .isEmail()
         .withMessage('Invalid email address'),
        body('password')
         .notEmpty()
         .withMessage('Password is required')
         .isLength({ min: 6 })
         .withMessage('Password must be at least 6 characters long')
         .custom(strongPassword)
         .withMessage('Password must be strong with minimun 1 uppercase letter and 1 special character'),
    ];
};


//Update User Validation

const updateUserValididation = ()=>{
    return [
        body('user_name')
         .notEmpty()
         .withMessage('User name is required'),
        body('gender')
         .notEmpty()
         .withMessage('Gender is required')
         .isIn(['MALE', 'FEMALE'])
         .withMessage('Gender must be either MALE or FEMALE'),
        body("contact_no")
         .notEmpty()
         .withMessage('Contact number is required')
         .isNumeric()
         .withMessage('Contact number must contain only numbers')
         .isLength({ min: 10, max: 10})
         .withMessage("Contact Number should be 10 Digits"),
        body("address")
         .notEmpty()
         .withMessage('Address is required'),
    ];

}


//Posting Reviews Validation

const postReviewValidation = ()=>{
    return [
        body('bookingId')
            .notEmpty()
            .withMessage('Booking ID is required')
            .isNumeric()
            .withMessage('Booking ID must be a number'),
        
        body('reviewMessage')
            .notEmpty()
            .withMessage('Review message is required'),
        
        body('rating')
            .notEmpty()
            .withMessage('Rating is required')
            .isFloat({ min: 1, max: 5 })
            .withMessage('Rating must be any number between 1 and 5')
    ];

};

// Middleware function to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map(error => error.msg);
  // Return validation errors
  return res.status(400).json({ errors: errorMessages });
};

module.exports = {
  userRegistrationValidationRules,
  loginValidation,
  updateUserValididation,
  postReviewValidation,
  validate,
};
