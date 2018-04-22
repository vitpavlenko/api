/**
 * validating inputed parameter
 * @param value can be single or Array(if there is check) or missing
 * @returns true if value is missing else returns validation result
 */

exports.validatePositiveIntWithPlus = (value) => {
    if (value) {
        if (value > 0) 
            return /^\+?[\d]+$/.test(value);
        return false
    }
    return true
};

const testPositiveInt = (value) => {
    return /^[\d]+$/.test(value);
}

exports.validatePositiveInt = (value) => {
    if (value) {
        if (Array.isArray(value))
            return value.every(testPositiveInt);
        return testPositiveInt(value);
    }
    return true
};

const validateInt = exports.validateInt = (value) => {
    if (value)
        return /^[\d]+$/.test(value);
    return true
};

exports.validateIntWithPlus = (value) => {
    if (value)
        return /^\+?[\d]+$/.test(value);
    return true
};

exports.validateName = (value) => {
    if (value) 
        return /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(value);
    return true;
};

exports.validateString = (value) => {
    if (value) 
        return /^(\w+\s?)+$/.test(value);
    return true;
};

const statusMatch = (value) => {
    return value.match(/inactive|active|declined|completed/i);
};

exports.validateStatus = (value) => {
    if (value) {
        if (Array.isArray(value))
            return value.every(statusMatch);
        return statusMatch(value);
    }
    return true;
};

const matchPersonName = (value) => {
    return /^[A-Za-z]+$/.test(value)
};

exports.validatePersonName = (value) => {
    if (value) {
        if (Array.isArray(value))
            return value.every(matchPersonName);
        return matchPersonName(value);
    }
    return true;
};

exports.validateMembers = (item) => item.every((element) => validateInt(element));

exports.membersSanitizer = (value) => Number(value);
