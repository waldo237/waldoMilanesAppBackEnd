/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const { ProjectSchema } = require('../models/projectModel');
const { UserSchema } = require('../models/userModel');

const User = mongoose.model('User', UserSchema);
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
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * @function getProjectsByTechnology fetch all the projects in the database
 */
exports.getProjectsByTechnology = (req, res) => {
  try {
    Project.find({ technology: req.params.technology }, (err, projects) => {
      if (err) res.status(500).send('An  error occured while fetching the data');
      if (!projects) return res.status(500).send('An  error occured while fetching the data');
      return res.json(projects);
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @function getProject the project specified in the id
 */
exports.getProject = (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Project.findOne({ _id: id }, (err, project) => {
      if (err) throw err;
      if (!project) {
        return res.status(500).send('The project you are looking for was not found!');
      }
      return res.json(project);
    });
  } catch (error) {
    res.status(500).send('An  error occured while fetching the data');
  }
};

/**
 * @function postProject allow the admin to post new projects
 */
exports.postProject = (req, res) => {
  try {
    const newProject = Project(req.body);
    newProject.save((err, project) => {
      if (err) res.status(400).send({ message: `There was when saving the project: ${err.message}` });
      return res.json(project);
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function updateProject allow the admin to update an existing project
 */
exports.updateProject = (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Project.updateOne({ _id: id }, req.body, { runValidators: true, new: true }, (err, project) => {
      if (err) res.send(err.message);
      // console.log(project);
      return (project.nModified) ? res.json('The project was modified correctly.') : res.status(404).send('The update did not take effect.');
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function deleteProject allow the admin to delete an existing project
 */
exports.deleteProject = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Project.deleteOne({ _id: id }, (err, query) => {
      if (err) throw err;
      return (query.n) ? res.send(`${query.n} was deleted.`) : res.status(404).send('An error occured while trying to delete item.');
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function postProjectRating post a like or diske on an arcle.
 * fetch the _id from the body.
 * find an project by id. Push a rating(like|dislike). Send a notification.
 */
exports.postProjectRating = (req, res, next) => {
  try {
    const { id, rating } = req.body;
    Project.updateOne({ _id: id }, { $push: { rating } },
      { runValidators: true }, (err, project) => {
        if (err) throw err;
        if (!project) return res.status(404).send('Project not found.');
        return (project.nModified)
          ? res.json({ message: 'Thanks for your feedback.' })
          : res.status(401).send('Something went wrong, we could not get your feedback.');
      });
  } catch (error) {
    next(error.message);
  }
};

/**
 * @function postProjectComment post a comment on an arcle.
 * fetch the _id from the body.
 * find an project by id. Push a comment. Send confirmation to the user.
 */
exports.postProjectComment = (req, res, next) => {
  try {
    const { id, comment, userId } = req.body;
    const { isValid } = mongoose.Types.ObjectId;
    if (!isValid(userId) || !isValid(id)) {
      return res.status(401).send({ message: 'Issue with request, please check and try again.' });
    }
    User.findOne({ _id: userId }, (error, user) => {
      if (error) throw error;
      if (!user) return res.status(401).send({ message: "you can't send comment with these credentials. please log in." });

      return Project.updateOne({ _id: id }, {
        $push: {
          comments: {
            comment,
            userId,
          },
        },
      },
      { runValidators: true }, (err, project) => {
        if (err) throw err;
        if (!project) return res.status(404).send('Project not found.');
        return (project.nModified)
          ? res.status(200).json({ message: 'The comment was added successfully.' })
          : res.status(401).json({ message: 'The comment was not added. Please try again.' });
      });
    });
  } catch (error) {
    next(error.message);
  }
};

/**
 * @function updateProjectComment find an project by id,
 * query a comment made by user_id, make the update, send notification.
 */
exports.updateProjectComment = (req, res, next) => {
  try {
    const { comment, userId, commentId } = req.body;
    const { isValid } = mongoose.Types.ObjectId;
    if (!isValid(userId) || !isValid(commentId)) {
      return res.status(401).send({ message: 'Issue with request, please check and try again.' });
    }

    User.findOne({ _id: userId }, (error, user) => {
      if (error) throw error;
      if (!user) return res.status(401).json({ message: "you can't send comment with these credentials. please log in." });

      return Project.updateOne({ 'comments._id': commentId }, {
        $set: { 'comments.$.comment': comment },
      },
      { runValidators: true }, (err, project) => {
        if (err) throw err;
        if (!project) return res.status(404).send('Project not found.');
        return (project.nModified)
          ? res.status(200).json({ message: 'The the comment was updated correctly.' })
          : res.status(401).json({ message: 'The update did not take effect.' });
      });
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @function deleteProjectComment delete a comment on an project.
 * find an project by id,
 * query a comment made by user_id, delete the comment, send notification.
 */
exports.deleteProjectComment = async (req, res, next) => {
  try {
    const { id, userId, commentId } = req.body;
    const { isValid } = mongoose.Types.ObjectId;
    if (!isValid(userId) || !isValid(commentId) || !isValid(id)) {
      return res.status(401).send({ message: 'Issue with request, please check and try again.' });
    }

    User.findOne({ _id: userId }, (error, user) => {
      if (error) throw error;
      if (!user) return res.status(401).json({ message: "you can't send comment with these credentials. please log in." });

      return Project.updateOne({ _id: id },
        { $pull: { comments: { _id: commentId, userId } } },
        { runValidators: true, new: true }, (err, project) => {
          if (err) throw err;

          if (!project) return res.status(404).send('Project not found.');
          return (project.nModified)
            ? res.status(200).json({ message: 'The the comment was deleted correctly.' })
            : res.status(401).json({ message: 'The removal did not take effect.' });
        });
    });
  } catch (error) {
    next(error);
  }
};
