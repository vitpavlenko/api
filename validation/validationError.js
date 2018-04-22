const { validationResult } = require('express-validator/check');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
        return res.status(400).json(errors.array()); //sends all errors with status 400 Bad Request
    return next();
};
