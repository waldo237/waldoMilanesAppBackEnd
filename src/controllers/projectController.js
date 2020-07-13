const mongoose = require('mongoose')
const { ProjectSchema } = require('../models/projectModel');
const Project = mongoose.model('Project', ProjectSchema);

/**
 * @function getAllProjects fetch all the projects in the database
 */
exports.getAllProjects = (req, res) => {
    try {
        Project.find({}, (err, projects) => {
            if (err) res.status(500).send('An  error occured while fetching the data');
            if (projects.length <= 0) return res.status(500).send('An  error occured while fetching the data');
            return res.json(projects);
        })
    } catch (error) {
        console.log(error)
    }
}
/**
 * @function getProjectsByTechnology fetch all the projects in the database
 */
exports.getProjectsByTechnology = (req, res) => {
    try {
        Project.find({technology: req.params.technology}, (err, projects) => {
            if (err) res.status(500).send('An  error occured while fetching the data');
            if (!projects) return res.status(500).send('An  error occured while fetching the data');
            return res.json(projects);
        })
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function getProject the project specified in the id
 */
exports.getProject = (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        Project.findOne({ _id: id }, (err, project) => {
            if (err) throw err;
            if (!project) {
                return res.status(500).send('The project you are looking for was not found!')
            } else {
                return res.json(project);
            };
        })
    } catch (error) {
        res.status(500).send('An  error occured while fetching the data');
    }
}

/**
 * @function postProject allow the admin to post new projects
 */
exports.postProject = (req, res) => {
    try {
        const newProject = Project(req.body);
        newProject.save((err, project) => {
            if (err) res.status(400).send({ message: `There was when saving the project: ${err.message}` });
            return res.json(project);
        })
    } catch (error) {
        res.status(500).send(`caught error: ${error}`)
    }
}

/**
 * @function updateProject allow the admin to update an existing project
 */
exports.updateProject = (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        Project.updateOne({ _id: id }, req.body, { runValidators: true, new: true }, (err, project) => {
            if (err) res.send(err.message);
            console.log(project)
            return (project.nModified) ? res.json('The project was modified correctly.') : res.status(404).send('The update did not take effect.');
        })
    } catch (error) {
        res.status(500).send(`caught error: ${error}`)
    }
}

/**
 * @function deleteProject allow the admin to delete an existing project
 */
exports.deleteProject = async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        Project.deleteOne({ _id: id }, (err, query) => {
            if (err) throw err;
            (query.n) ? res.send(`${query.n} was deleted.`) : res.status(404).send('An error occured while trying to delete item.');
        })

    } catch (error) {
        res.status(500).send(`caught error: ${error}`)
    }
}