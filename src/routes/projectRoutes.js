const { loginRequired } = require('../controllers/userController');
const {
  getAllProjects, getProjectsByTechnology, getProject,
  postProject, updateProject, deleteProject, postProjectRating,
  postProjectComment, updateProjectComment, deleteProjectComment,
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

  app.route('/project/rating')
    .post(postProjectRating);

  app.route('/project/comment')
    .post(loginRequired, postProjectComment);

  app.route('/project/comment/:id')
    .put(loginRequired, updateProjectComment)
    .delete(loginRequired, deleteProjectComment);
};

module.exports = routes;
