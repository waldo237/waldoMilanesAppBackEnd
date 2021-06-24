const mongoose = require('mongoose');

const { ProjectSchema } = require('../models/projectModel');

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
  projects: async () => {
    try {
      const projectsFetched = await Project.find({}, (err, projects) => {
        if (err) console.log('An  error occured while fetching the data', err);
        return projects;
      });
      return projectsFetched.map((project) => project);
    } catch (error) {
      console.log(error);
    }
  },

  project: async (id) => {
    const mId = mongoose.Types.ObjectId(id);
    try {
      const response = await Project.findOne({ _id: mId }, (err, project) => {
        if (err) console.log(err);
        if (!project) {
          return 'The project you are looking for was not found!';
        }
        return project;
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
