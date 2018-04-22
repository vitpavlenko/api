const { query } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

const { validateIntWithPlus, validatePositiveIntWithPlus } = require('./validations');

module.exports = [
    query('page').trim().custom(validatePositiveIntWithPlus).withMessage('Page must be integer and bigger then 0'),
    query('offset').trim().custom(validateIntWithPlus).withMessage('Offset must be integer and bigger or equal 0'),
    query('limit').trim().custom(validateIntWithPlus).withMessage('Limit must be integer and bigger or equal 0'),
    
    sanitizeQuery('page').toInt(),
    sanitizeQuery('offset').toInt(),
    sanitizeQuery('limit').toInt()
];
