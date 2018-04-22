const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const { validateMembers, membersSanitizer } = require('./validations');

module.exports = [
    // Validate fields.
    body('name', 'Name must be specified').exists().trim()
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('description', 'Description must be specified').exists().trim(),
    body('mark', 'Mark must be Integer').exists().isInt({ min: 1 }).withMessage('Mark minimum is 1'),
    body('status', 'status must be specified').exists().trim().matches(/^(inactive|active|declined|completed)$/i)
        .withMessage('Message can be only inactive|active|declined|completed'),
    body('project', 'Project must be specified').exists().isInt({ min: 1 }).withMessage('Project must be an Integer and bigger then 0'),
    body('author', 'Author must be specified').exists().isInt({ min: 1 }).withMessage('Author must be a Integer and bigger then 0'),
    body('members', 'Member must be specified').exists().custom(validateMembers).withMessage('Member must be an Integer and bigger then 0'),

    // Sanitize fields.
    sanitizeBody('name').trim().escape(),
    sanitizeBody('description').trim().escape(),
    sanitizeBody('mark').toInt(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('project').toInt(),
    sanitizeBody('author').toInt(),
    sanitizeBody('members').customSanitizer(membersSanitizer)
];
