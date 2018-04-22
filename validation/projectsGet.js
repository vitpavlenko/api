const { query, validationResult } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

const validatePagination = require('./validatePagination');
const { validateName, validateString, validatePositiveInt } = require('./validations');

const validateGet = require('./validateGet');

module.exports = [
    query('name').trim().custom(validateName).withMessage('Name must have only alpha characters.'),
    query('body').trim().custom(validateString).withMessage('Body must have only alphanumeric characters.'),
    query('taskmark').custom(validatePositiveInt).withMessage('Task mark must be an positive integer'),

    sanitizeQuery('name').trim().escape(),
    sanitizeQuery('body').trim().escape(),
    sanitizeQuery('taskmark').toInt(),
].concat(validateGet, validatePagination);
