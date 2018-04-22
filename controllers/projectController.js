const Project = require('../models/project');
const Task = require('../models/task');

const { pagintaion, queryUser, searchUser, sort } = require('./query');

exports.createProject = async (req, res, next) => {

    const project = new Project({ //creating new Project
        name: req.body.name,
        body: req.body.body,
        status: req.body.status.toLowerCase(),
        author: req.body.author,
        members: req.body.members
    });
    try {
        sort(project.members);
        await project.save(); //saving project
        console.log(`project saved to db ${project}`);
        return res.status(200).json(project); //sending created project
    } catch (err) {
        err.status = 400;
        console.error(err);
        return next(err); //let next handler handle error
    }
};

exports.getProjects = async (req, res, next) => {

    try {
        const keys = Object.keys(req.query);
        const query = {};
        const pag = {
            lean: true //to get normal js objects
        };
        const user = {};

        keys.forEach((el) => { 
            if (['name', 'body', 'status'].includes(el))
                query[el] = req.query[el];
            pagintaion(el, pag, req); //to paginate projects
            queryUser(el, query, user, req); //to find by user parameters
        });

        if (req.query.taskmark) {

            const tasks = await Task.find({
                mark: {
                    $gte: req.query.taskmark //find all tasks with mark greater or equal
                }
            });

            query['projectId'] = [];
            tasks.forEach((el) => query['projectId'].push(el.project));
        }

        await searchUser(user, query);

        const projects = await Project.paginate(query, pag); //finding projects with pagination information

        for (const el of projects.docs) { //for every project in projects
            const completed = await Task.find({ status: 'completed', project: [el.projectId] }); //finding all completed tasks for this project
            el.averageMark = completed.reduce((prev, cur) => prev + cur.mark, 0) / completed.length || 'no completed tasks'; //calculating sum of all completed tasks and deleting on tasks length
            delete el.id;
        }
        
        //definitely worse method to calculate average mark
         
        // projects.docs = await Promise.all(projects.docs.map(async (el) => {
        //     const completed = await Task.find({ status: 'completed', project: el.projectId });
        //     el.averageMark = completed.reduce((prev, cur) => prev + cur.mark, 0) / completed.length || 'no completed tasks';
        //     return el;
        // }));

        return res.status(200).json(projects); //sending projects
    } catch (err) {
        err.status = 400;
        console.error(err);
        return next(err); //let next handler handle error
    }
};
