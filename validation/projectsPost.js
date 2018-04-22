const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const { validateMembers, membersSanitizer } = require('./validations');

module.exports = [
    // Validate fields.
    body('name', 'Name must be specified').exists().trim()
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('body', 'Body must be specified').exists().trim(),
    body('status', 'status must be specified').exists().trim().matches(/^(inactive|active|declined|completed)$/i)
        .withMessage('Message can be only inactive|active|declined|completed'),
    body('author', 'Author must be specified').exists().isInt({ min: 1 }).withMessage('Author must be a Integer'),
    body('members', 'Member must be specified').exists().custom(validateMembers).withMessage('Member must be an Int'),

    // Sanitize fields.
    sanitizeBody('name').trim().escape(),
    sanitizeBody('body').trim().escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('author').toInt(),
    sanitizeBody('members').customSanitizer(membersSanitizer)
];
