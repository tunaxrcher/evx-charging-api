const { body } = require('express-validator');

const loginValidation = [
    body('email').notEmpty().withMessage('email is required.'),
    // body('password').isLength({ min: 8, max: 100 }).withMessage('Password must be more than 8 characters long').trim(),
];

const registerValidation = [
    body('email').notEmpty().withMessage('phone is required.'),
    body('password').isLength({ min: 8, max: 100 }).withMessage('Password must be more than 8 characters long').trim(),
];

module.exports = {
    loginValidation,
    registerValidation,
};
