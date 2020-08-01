const { loginRequired } = require('../controllers/userController');
const {
  getAllProjects, getProjectsByTechnology, getProject, postProject, updateProject, deleteProject,
} = require('../controllers/projectController');

const routes = (app) => {
  // registration route
  app.route('/projects')
    .get(getAllProjects)
    .post(loginRequired, postProject);
  app.route('/projects/:technology')
    .get(getProjectsByTechnology)
    .post(loginRequired, postProject);
  app.route('/project/:id')
    .get(loginRequired, getProject)
    .put(loginRequired, updateProject)
    .delete(loginRequired, deleteProject);
};

module.exports = routes;
