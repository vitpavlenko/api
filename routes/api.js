const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');

const validateGetUser = require('../validation/userGet');
const validatePostUser = require('../validation/userPost');
const validateGetTasks = require('../validation/taskGet');
const validatePostTask = require('../validation/taskPost');
const validatePostProjects = require('../validation/projectsPost');
const validateGetProjects = require('../validation/projectsGet');

const errorValidation = require('../validation/validationError');

router.post('/tasks', validatePostTask, errorValidation, taskController.createTask);
router.get('/tasks', validateGetTasks, errorValidation, taskController.getTasks);

router.post('/users', validatePostUser, errorValidation, userController.createUser);
router.get('/users', validateGetUser, errorValidation, userController.getUsers);

router.post('/projects', validatePostProjects, errorValidation, projectController.createProject);
router.get('/projects', validateGetProjects, errorValidation, projectController.getProjects);

module.exports = router;
