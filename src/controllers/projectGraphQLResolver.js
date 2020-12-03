const mongoose = require('mongoose');

const { ProjectSchema } = require('../models/projectModel');

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
  projects: async () => {
    try {
      const projectsFetched = await Project.find({}, (err, projects) => {
        if (err) { res.status(500).send('An  error occured while fetching the data'); }

        return projects;
      });
      return projectsFetched.map((project) => project);
    } catch (error) {
      throw error;
    }
  },

  project: async (id) => {
    try {
      const response = await Project.findOne({ _id: id }, (err, project) => {
        if (err) console.log(err);
        if (!project) {
          return 'The project you are looking for was not found!';
        }
        return project;
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
