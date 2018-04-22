const User = require('../models/user');

const sort = exports.sort = (value) => {
    if (Array.isArray(value))
        return value.sort((a, b) => a - b);
    return value;
};

exports.pagintaion = (el, pag, req) => {
    if (['page', 'offset', 'limit'].includes(el))
        pag[el] = Number(req.query[el]);
};

exports.queryUser = (el, query, user, req) => {
    if ('memberId' === el)
        query['members'] = req.query[el];
    if (['authorname', 'authorsurname', 'membername', 'membersurname'].includes(el))
        user[el] = req.query[el];
};

exports.searchUser = async (user, query) => {
    const userKeys = Object.keys(user);
    if (userKeys.length) { //need search by author or member
        const search = {};
        userKeys.forEach((el) => search[el.replace(/author|member/, '')] = user[el]);
    
        const users = await User.find(search);
        console.log(users);
    
        if (userKeys.includes('membername') || userKeys.includes('membersurname')) {
            query['members'] = [];
            users.forEach((el) => query['members'].push(el.userId));
        }
    
        if (userKeys.includes('authorname') || userKeys.includes('authorsurname')) {
            query['author'] = [];
            users.forEach((el) => query['author'].push(el.userId));
        }
        sort(query['members']);
    }
};
