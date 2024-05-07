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

//booking validation

const bookingValidation = () => {
    return [
        body('hotel_id')
            .notEmpty()
            .withMessage('Hotel ID is required')
            .isNumeric()
            .withMessage('Hotel ID must be a number'),

        body('user_id')
            .notEmpty()
            .withMessage('User ID is required')
            .isNumeric()
            .withMessage('User ID must be a number'),

        body('no_rooms')
            .notEmpty()
            .withMessage('Number of rooms is required')
            .isNumeric()
            .withMessage('Number of rooms must be a number'),

        body('total_booking_amount')
            .notEmpty()
            .withMessage('Total booking amount is required')
            .isNumeric()
            .withMessage('Total booking amount must be a number'),

        body('checkin_date')
            .notEmpty()
            .withMessage('Check-in date is required')
            .isISO8601()
            .withMessage('Check-in date must be in ISO8601 format (YYYY-MM-DD)'),

        body('checkout_date')
            .notEmpty()
            .withMessage('Check-out date is required')
            .isISO8601()
            .withMessage('Check-out date must be in ISO8601 format (YYYY-MM-DD)'),

        body('bookingDescriptionList')
            .notEmpty()
            .withMessage('Booking description list is required')
            .isArray({ min: 1 })
            .withMessage('Booking description list must contain at least one item')
            .custom((value, { req }) => {
                for (const booking of value) {
                    if (!booking.room_id || !booking.booking_amount_room || !booking.checkin_date || !booking.checkout_date) {
                        throw new Error('Booking description list must contain room_id, booking_amount_room, checkin_date, and checkout_date for each item');
                    }
                }
                return true;
            })
            .withMessage('Each item in the booking description list must contain room_id, booking_amount_room, checkin_date, and checkout_date')
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
  bookingValidation
};
