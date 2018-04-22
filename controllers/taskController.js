const Task = require('../models/task');

const { pagintaion, queryUser, searchUser, sort } = require('./query');

exports.createTask = async (req, res, next) => {

    const task = new Task({ //creating new Task
        name: req.body.name,
        description: req.body.description,
        mark: req.body.mark,
        status: req.body.status.toLowerCase(),
        project: req.body.project,
        author: req.body.author,
        members: sort(req.body.members)
    });
    try {
        await task.save(); //saving new task
        console.log(`task saved to db ${task}`);
        return res.status(200).json(task); //sending saved task
    } catch (err) {
        err.status = 400;
        console.error(err);
        return next(err); //let next handler handle error
    }
};


exports.getTasks = async (req, res, next) => {

    try {
        const keys = Object.keys(req.query);
        const query = {};
        const pag = {};
        const user = {};

        keys.forEach((el) => {
            if (['name', 'description', 'status'].includes(el))
                query[el] = req.query[el];
            pagintaion(el, pag, req); //to paginate projects
            queryUser(el, query, user, req); //to find by user parameters
        });

        if (req.query.mark)
            query.mark = {
                $gte: req.query.mark //to find tasks with mark greater or equal
            }

        await searchUser(user, query);
        
        const tasks = await Task.paginate(query, pag); //finding tasks
        
        return res.status(200).json(tasks); //sending found tasks
    } catch (err) {
        err.status = 400;
        console.error(err);
        return next(err); //let next handler handle error
    }
};
