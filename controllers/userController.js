const User = require('../models/user');

exports.createUser = async (req, res, next) => {

    const user = new User({ //creating new User
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname
    });
    try {
        await user.save(); //saving user in DB
        console.log(`user saved to db ${user}`);
        return res.status(200).json(user); //sanding created user
    } catch (err) {
        err.status = 400;
        console.error(err);
        return next(err); //let next handler handle error
    }
};

const { pagintaion } = require('./query');

exports.getUsers = async (req, res, next) => {

    try {
        const keys = Object.keys(req.query);
        const query = {};
        const pag = {};

        keys.forEach(el => {
            if (['name', 'surname'].includes(el))
                query[el] = req.query[el];
            pagintaion(el, pag, req); //to paginate projects
        });

        const users = await User.paginate(query, pag); //finding users

        return res.status(200).json(users); //sanding users
    } catch (err) {
        err.status = 400;
        console.error(err);
        return next(err); //let next handler handle error
    } 
};
