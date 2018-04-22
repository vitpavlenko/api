const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = [
    // Validate fields.
    body('email', 'Email must be specified').isEmail().withMessage('must be an email').trim(),
    body('name', 'Name must be specified').exists().trim()
        .isAlpha().withMessage('Name has non-alpha characters.'),
    body('surname', 'Surname must be specified').exists().trim()
        .isAlpha().withMessage('Surname has non-alpha characters.'),

    // Sanitize fields.
    sanitizeBody('email').trim().normalizeEmail(),
    sanitizeBody('name').trim().escape(),
    sanitizeBody('surname').trim().escape()
];
