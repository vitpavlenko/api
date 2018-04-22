const { query } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

const validatePagination = require('./validatePagination');
const { 
    validateName,
    validateString, 
    validateStatus, 
    validatePositiveInt, 
    validatePersonName 
} = require('./validations');

const validateGet = require('./validateGet');

module.exports = [
    query('name').trim().custom(validateName).withMessage('Name must have only alphanumeric characters.'),
    query('description').trim().custom(validateString).withMessage('Description must have only alphanumeric characters.'),
    query('project').custom(validatePositiveInt).withMessage('Project must be an positive integer'),
    query('mark').custom(validatePositiveInt).withMessage('Mark must be an positive integer'),

    sanitizeQuery('name').trim().escape(),
    sanitizeQuery('description').trim().escape(),
    sanitizeQuery('project').toInt(),
    sanitizeQuery('mark').toInt()
].concat(validateGet, validatePagination);
