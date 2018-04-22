const { query } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

const validatePagination = require('./validatePagination');
const { validatePersonName } = require('./validations');

module.exports = [
    query('name').trim().custom(validatePersonName).withMessage('Name must have only alpha characters.'),
    query('surname').trim().custom(validatePersonName).withMessage('Surname must have only alpha characters.'),

    sanitizeQuery('name').trim().escape(),
    sanitizeQuery('surname').trim().escape(),
].concat(validatePagination);
