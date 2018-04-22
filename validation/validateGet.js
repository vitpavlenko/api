const { query, validationResult } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

const {
    validateName,
    validateString,
    validateStatus,
    validatePositiveInt,
    validatePersonName
} = require('./validations');

const statusToLower = (value) => {
    return value.toLowerCase();
}

const sanitizeStatus = (value) => {
    if (Array.isArray(value)) {
        return  value.map(statusToLower);
    }
    return statusToLower(value);
};

module.exports = [
    query('status').trim().custom(validateStatus).withMessage('Status can be only inactive|active|declined|completed'),
    query('authorname').custom(validatePersonName).withMessage('Author Name has non-alpha characters'),
    query('authorsurname').custom(validatePersonName).withMessage('Author Surname has non-alpha characters'),
    query('membername').custom(validatePersonName).withMessage('member Name has non-alpha characters'),
    query('membersurname').custom(validatePersonName).withMessage('member Surname has non-alpha characters'),
    query('memberId').custom(validatePositiveInt).withMessage('MemberId must be an positive integer'),

    sanitizeQuery('authorname').trim().escape(),
    sanitizeQuery('authorsurname').trim().escape(),
    sanitizeQuery('membername').trim().escape(),
    sanitizeQuery('membersurname').trim().escape(),
    sanitizeQuery('memberId').toInt(),
    (req, res, next) => {
        if (req.query.status)
            req.query.status = sanitizeStatus(req.query.status); //change status to lowerCase AcTiVE -> active 
        return next();
    }
]
